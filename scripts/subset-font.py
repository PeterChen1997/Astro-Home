# /// script
# dependencies = ["fonttools", "brotli"]
# ///
"""生成博客正文衬线字体子集（思源宋体 CN VF，SIL OFL 1.1）。

与 AI 周刊「龙场来信」同源同名（Longchang Serif），但周刊的子集只含周刊用字，
博客要覆盖：GB2312 一级常用字 3755 个 + 博客现有全部文章用字 + ASCII / 常用标点。
新文章出现子集外的生僻字时，CSS 会回退到系统宋体，不会显示方框。

用法（新文章用了大量新字时重跑一次即可）：
  1. 从 https://github.com/adobe-fonts/source-han-serif/releases 下载 02_SourceHanSerif-VF.zip，
     解压得到 Variable/TTF/Subset/SourceHanSerifCN-VF.ttf
  2. uv run scripts/subset-font.py <SourceHanSerifCN-VF.ttf>
"""
import pathlib
import sys

from fontTools import subset

ROOT = pathlib.Path(__file__).resolve().parent.parent
OUT = ROOT / 'src/assets/fonts/longchang-serif.woff2'


def gb2312_level1() -> str:
    chars = []
    for hi in range(0xB0, 0xD8):
        for lo in range(0xA1, 0xFF):
            try:
                chars.append(bytes([hi, lo]).decode('gb2312'))
            except UnicodeDecodeError:
                pass
    return ''.join(chars)


def site_text() -> str:
    parts = []
    for ext in ('md', 'mdx', 'astro', 'tsx', 'ts'):
        for p in (ROOT / 'src').rglob(f'*.{ext}'):
            parts.append(p.read_text(encoding='utf-8'))
    return ''.join(parts)


def main() -> None:
    if len(sys.argv) != 2:
        sys.exit(__doc__)
    src = sys.argv[1]
    ascii_punct = ''.join(chr(c) for c in range(0x20, 0x7F))
    cjk_punct = '，。、；：？！“”‘’（）《》〈〉【】「」『』—…·～￥％＋－×÷＝'
    text = set(gb2312_level1() + site_text() + ascii_punct + cjk_punct)
    # 只保留字体本身能画的字符（emoji 等交给系统字体）
    options = subset.Options()
    options.flavor = 'woff2'
    options.layout_features = ['*']
    options.name_IDs = ['*']
    options.name_languages = ['*']
    font = subset.load_font(src, options)
    cmap = font.getBestCmap()
    unicodes = sorted(ord(c) for c in text if ord(c) in cmap)
    sub = subset.Subsetter(options)
    sub.populate(unicodes=unicodes)
    sub.subset(font)
    OUT.parent.mkdir(parents=True, exist_ok=True)
    subset.save_font(font, str(OUT), options)
    print(f'{len(unicodes)} glyphs -> {OUT.relative_to(ROOT)} ({OUT.stat().st_size // 1024} KB)')


if __name__ == '__main__':
    main()
