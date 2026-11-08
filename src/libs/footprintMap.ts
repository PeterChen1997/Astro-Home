import { geoArea, geoContains, geoMercator, geoPath } from 'd3-geo'
import type { GeoContext } from 'd3-geo'
import type { Feature, FeatureCollection } from 'geojson'

// 足迹地图：构建时把 src/data/footprints.json 渲染成一张可拖拽缩放的静态 SVG，
// 页面不依赖任何外部地图服务

export const MAP_WIDTH = 960
// 和 Google 地图一样用墨卡托投影，裁掉两极（不画南极洲）
const NORTH = 82
const SOUTH = -58
// 坐标保留一位小数：放大几十倍后边界依然平滑
const PRECISION = 10
const CONFIG_FILE = 'src/data/footprints.json'

type Bbox = [number, number, number, number]
type Point = [number, number]
type Rect = [number, number, number, number]

export type Place = { name: string; lng: number; lat: number }
export type Region = { name: string; places: Place[] }
export type View = { name: string; bbox?: Bbox }
export type FootprintConfig = { views: View[]; regions: Region[] }

// footprints.json 被 import 后推断出的结构
type RawConfig = {
  views: { name: string; bbox?: number[] }[]
  regions: { name: string; places: Place[] }[]
}

export type GeoData = {
  world: FeatureCollection // Natural Earth 1:50m 国界（不含中国、台湾、南极洲）
  provinces: FeatureCollection // DataV 标准中国省级边界（含台湾、港澳）
  nineDash: FeatureCollection // 南海九段线
}

export type Pin = { name: string; x: number; y: number }
// 视图在地图坐标里的矩形 [x, y, 宽, 高]，前端据此飞到对应区域
export type Preset = { name: string; rect: Rect }
export type Footprints = {
  regionCount: number
  placeCount: number
  width: number
  height: number
  land: string
  visited: string
  nineDash: string
  pins: Pin[]
  presets: Preset[]
}

function fail(message: string): never {
  throw new Error(`足迹配置 ${CONFIG_FILE}：${message}`)
}

function isFeatureCollection(value: unknown): value is FeatureCollection {
  return (
    typeof value === 'object' &&
    value !== null &&
    'type' in value &&
    value.type === 'FeatureCollection' &&
    'features' in value &&
    Array.isArray(value.features)
  )
}

export function toFeatureCollection(value: unknown, file: string) {
  if (!isFeatureCollection(value)) {
    throw new Error(`足迹地图：${file} 不是 GeoJSON FeatureCollection`)
  }
  // d3-geo 要求外环顺时针；环向反了会被当成「整个地球减去这块」（面积超过半球）
  const inverted = value.features.find(f => geoArea(f) > 2 * Math.PI)
  if (inverted) {
    throw new Error(
      `足迹地图：${file} 中「${featureName(inverted)}」的环向反了，请用 mapshaper 加 gj2008 重新导出`
    )
  }
  return value
}

function parseBbox(view: RawConfig['views'][number]): Bbox | undefined {
  const { bbox } = view
  if (!bbox) return undefined
  if (bbox.length !== 4 || bbox.some(n => !Number.isFinite(n))) {
    fail(`视图「${view.name}」的 bbox 必须是 [西经度, 南纬度, 东经度, 北纬度] 四个数字`)
  }
  const [west, south, east, north] = bbox
  if (west >= east || south >= north || south < SOUTH || north > NORTH) {
    fail(`视图「${view.name}」的 bbox 范围不合法（纬度需在 ${SOUTH} ~ ${NORTH} 之间）：${JSON.stringify(bbox)}`)
  }
  return [west, south, east, north]
}

export function parseConfig(raw: RawConfig): FootprintConfig {
  if (raw.views.length === 0) fail('views 至少要有一个视图')
  const views = raw.views.map(view => {
    if (!view.name) fail('每个视图都需要 name')
    return { name: view.name, bbox: parseBbox(view) }
  })
  raw.regions.forEach(region => {
    if (!region.name) fail('每个国家/地区都需要 name')
    region.places.forEach(place => {
      const where = `「${region.name} / ${place.name}」`
      if (!place.name) fail(`${region.name} 下有地点缺少 name`)
      if (!Number.isFinite(place.lng) || place.lng < -180 || place.lng > 180) {
        fail(`${where} 的 lng（经度）必须在 -180 ~ 180 之间`)
      }
      if (!Number.isFinite(place.lat) || place.lat < SOUTH || place.lat > NORTH) {
        fail(`${where} 的 lat（纬度）必须在 ${SOUTH} ~ ${NORTH} 之间`)
      }
    })
  })
  return { views, regions: raw.regions }
}

function featureName(feature: Feature) {
  const name = feature.properties?.name
  return typeof name === 'string' ? name : ''
}

// 海边的城市在精简后的边界里可能落在海上，按由近到远的偏移再找一次
const NEARBY_OFFSETS: Point[] = [0, 0.1, 0.25].flatMap(r =>
  r === 0
    ? [[0, 0]]
    : [
        [r, 0],
        [-r, 0],
        [0, r],
        [0, -r],
        [r, r],
        [r, -r],
        [-r, r],
        [-r, -r]
      ]
)

function locate(features: Feature[], [lng, lat]: Point) {
  for (const [dx, dy] of NEARBY_OFFSETS) {
    const found = features.find(f => geoContains(f, [lng + dx, lat + dy]))
    if (found) return found
  }
  return undefined
}

// 紧凑的 SVG path：坐标按 PRECISION 取整、相对坐标编码，去掉取整后重复的点和退化的环
// （d3 默认输出带小数的绝对坐标，体积会大好几倍）
class CompactPathContext implements GeoContext {
  private output = ''
  private ring: Point[] = []

  moveTo(x: number, y: number) {
    this.flush(false)
    this.ring = [this.round(x, y)]
  }

  lineTo(x: number, y: number) {
    const point = this.round(x, y)
    const last = this.ring.at(-1)
    if (last && last.join() === point.join()) return
    this.ring.push(point)
  }

  closePath() {
    this.flush(true)
  }

  arc() {}

  result() {
    this.flush(false)
    const output = this.output
    this.output = ''
    return output
  }

  private round(x: number, y: number): Point {
    return [Math.round(x * PRECISION), Math.round(y * PRECISION)]
  }

  private flush(closed: boolean) {
    const ring = this.ring
    this.ring = []
    const first = ring.at(0)
    if (!first || ring.length < (closed ? 3 : 2)) return
    const deltas = ring.slice(1).flatMap((point, i) => {
      const [x, y] = point
      const [px, py] = ring.at(i) ?? first
      return [x - px, y - py]
    })
    // 负号本身就能分隔数字，正数前才需要空格
    const numbers = deltas
      .map(n => n / PRECISION)
      .map((n, i) => (i === 0 || n < 0 ? String(n) : ` ${n}`))
      .join('')
    const [x, y] = first
    this.output += `M${x / PRECISION} ${y / PRECISION}l${numbers}${closed ? 'z' : ''}`
  }
}

function round1(n: number) {
  return Math.round(n * 10) / 10
}

export function renderFootprints(config: FootprintConfig, geo: GeoData): Footprints {
  const places = config.regions.flatMap(region => region.places)

  // 中国按省级行政区点亮，其他国家按国家点亮
  const visitedProvinces = new Set<string>()
  const visitedCountries = new Set<string>()
  places.forEach(place => {
    const point: Point = [place.lng, place.lat]
    const province = locate(geo.provinces.features, point)
    if (province) {
      visitedProvinces.add(featureName(province))
      return
    }
    const country = locate(geo.world.features, point)
    if (country) {
      visitedCountries.add(featureName(country))
      return
    }
    console.warn(`[足迹地图] 「${place.name}」不在任何国家/省份边界内，只画点、不点亮区域`)
  })

  // 经度 -180~180 正好铺满 MAP_WIDTH，北纬 NORTH 对齐顶边
  const projection = geoMercator()
    .scale(MAP_WIDTH / (2 * Math.PI))
    .translate([MAP_WIDTH / 2, 0])
  const top = projection([0, NORTH])?.at(1) ?? 0
  projection.translate([MAP_WIDTH / 2, -top])
  const height = Math.round(projection([0, SOUTH])?.at(1) ?? 0)
  projection.clipExtent([
    [0, 0],
    [MAP_WIDTH, height]
  ])

  const context = new CompactPathContext()
  const path = geoPath(projection, context)
  const join = (features: Feature[]) => {
    features.forEach(f => path(f))
    return context.result()
  }
  const areas = [...geo.world.features, ...geo.provinces.features]
  const isVisited = (f: Feature) =>
    visitedCountries.has(featureName(f)) || visitedProvinces.has(featureName(f))

  const pins = places.flatMap(place => {
    const projected = projection([place.lng, place.lat])
    if (!projected) return []
    const [x, y] = projected
    return [{ name: place.name, x: round1(x), y: round1(y) }]
  })

  const presets = config.views.map((view): Preset => {
    if (!view.bbox) return { name: view.name, rect: [0, 0, MAP_WIDTH, height] }
    const [west, south, east, north] = view.bbox
    const [x0, y0] = projection([west, north]) ?? [0, 0]
    const [x1, y1] = projection([east, south]) ?? [MAP_WIDTH, height]
    return { name: view.name, rect: [round1(x0), round1(y0), round1(x1 - x0), round1(y1 - y0)] }
  })

  return {
    regionCount: config.regions.length,
    placeCount: places.length,
    width: MAP_WIDTH,
    height,
    land: join(areas.filter(f => !isVisited(f))),
    visited: join(areas.filter(isVisited)),
    nineDash: join(geo.nineDash.features),
    pins,
    presets
  }
}
