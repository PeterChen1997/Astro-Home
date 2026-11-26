import { Menu, Transition } from '@headlessui/react'
import React, { Fragment } from 'react'
import { IoMenu, IoLogoGithub } from 'react-icons/io5/index.js'
import { BiRss } from 'react-icons/bi/index.js'

interface MenuItem {
  key: string
  path: string
  title: string
  target?: string
  icon?: React.ComponentType<{ className?: string }>
  hideIcon?: boolean
  hideTitle?: boolean
  umamiEvent?: string
}

// 桌面端导航菜单 - 简洁版
export const MENUS: MenuItem[] = [
  {
    key: 'posts',
    path: '/posts/index.html',
    title: '文章'
  },
  {
    key: 'weekly',
    path: 'https://blog.peterchen97.cn/ai-news/weekly/index.html',
    title: 'AI 周刊',
    target: '_blank',
    umamiEvent: 'nav_ai_weekly_open'
  },
  {
    key: 'recommends',
    path: '/recommends/index.html',
    title: '推荐博客'
  },
  {
    key: 'cangshuge',
    path: 'https://book.hweb.peterchen97.cn/',
    title: '藏书阁',
    target: '_blank'
  },
  {
    key: 'projects',
    path: '/projects/index.html',
    title: '项目'
  },
  {
    key: 'links',
    path: '/links/index.html',
    title: '友链'
  },
  {
    key: 'about',
    path: '/about/index.html',
    title: '关于'
  },
  {
    key: 'daily',
    path: 'https://daily.peterchen97.cn',
    title: '日常',
    target: '_blank'
  },
  {
    key: 'photos',
    path: 'https://peterchen97.notion.site/Public-Photos-11645019717480419bb4f12e5ed5e48a',
    title: '照片',
    target: '_blank'
  },
  {
    key: 'rss',
    path: '/rss.xml',
    title: 'RSS',
    icon: BiRss,
    hideTitle: true,
    target: '_blank'
  },
  {
    key: 'github',
    path: 'https://github.com/PeterChen1997',
    title: 'Github',
    icon: IoLogoGithub,
    hideTitle: true,
    target: '_blank'
  }
]

// 移动端菜单分组
const MOBILE_MENUS: MenuItem[] = [
  { key: 'posts', path: '/posts/index.html', title: '文章' },
  {
    key: 'weekly',
    path: 'https://blog.peterchen97.cn/ai-news/weekly/index.html',
    title: 'AI 周刊',
    target: '_blank',
    umamiEvent: 'nav_ai_weekly_open'
  },
  { key: 'recommends', path: '/recommends/index.html', title: '推荐博客' },
  { key: 'cangshuge', path: 'https://book.hweb.peterchen97.cn/', title: '藏书阁', target: '_blank' },
  { key: 'projects', path: '/projects/index.html', title: '项目' },
  { key: 'links', path: '/links/index.html', title: '友链' },
  { key: 'about', path: '/about/index.html', title: '关于' },
  { key: 'daily', path: 'https://daily.peterchen97.cn', title: '日常', target: '_blank' },
  { key: 'photos', path: 'https://peterchen97.notion.site/Public-Photos-11645019717480419bb4f12e5ed5e48a', title: '照片', target: '_blank' },
  { key: 'rss', path: '/rss.xml', title: 'RSS', target: '_blank' },
  { key: 'github', path: 'https://github.com/PeterChen1997', title: 'GitHub', target: '_blank' }
]

export default function DropdownMenu({ open }: { open?: boolean }) {
  return (
    <Menu
      as="div"
      className="inline-block text-left block md:hidden"
      __demoMode={open}
    >
      <div>
        <Menu.Button
          className="inline-flex items-center justify-center w-9 h-9 rounded-lg text-[color:var(--secondary)] hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
          aria-label="menu"
        >
          <IoMenu className="h-5 w-5" />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition ease-in duration-75"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <Menu.Items className="fixed left-0 right-0 top-[57px] bottom-0 z-50 bg-[color:var(--paper)] overflow-y-auto focus:outline-none">
          <div className="px-[22px] pt-2 pb-8">
            {MOBILE_MENUS.map(menu => (
              <Menu.Item key={menu.key}>
                {({ active }) => (
                  <a
                    href={menu.path}
                    target={menu.target}
                    rel={menu.target === '_blank' ? 'noopener noreferrer' : undefined}
                    data-umami-event={menu.umamiEvent}
                    className={`
                      flex items-center justify-between py-3.5 text-[17px] border-b border-[color:var(--line)] transition-colors
                      ${active ? 'text-[color:var(--muted)]' : 'text-[color:var(--ink)]'}
                    `}
                  >
                    <span>{menu.title}</span>
                    {menu.target === '_blank' && (
                      <svg className="w-3.5 h-3.5 text-[color:var(--muted)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    )}
                  </a>
                )}
              </Menu.Item>
            ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}
