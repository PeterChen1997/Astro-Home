import { Menu, Transition } from '@headlessui/react'
import React, { Fragment } from 'react'
import { IoMenu } from 'react-icons/io5/index.js'
import DropdownMenuItem from './DropdownMenuItem'
import { IoLogoGithub } from 'react-icons/io5/index.js'
import { BiRss } from 'react-icons/bi/index.js'
import { PiTelegramLogo } from 'react-icons/pi/index.js'

export const MENUS = [
  {
    key: 'posts',
    path: '/posts/index.html',
    title: '文章'
  },
  {
    key: 'about',
    path: '/about/index.html',
    title: '关于'
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
    key: 'daily',
    path: 'https://daily.peterchen97.cn',
    title: '日常',
    hideIcon: true,
    target: '_blank'
  },
  {
    key: 'photos',
    path: 'https://peterchen97.notion.site/Public-Photos-11645019717480419bb4f12e5ed5e48a',
    title: '照片',
    hideIcon: true,
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

export default function DropdownMenu({ open }: { open?: boolean }) {
  return (
    <Menu
      as="div"
      className="relative inline-block text-left block md:hidden"
      __demoMode={open}
    >
      <div>
        <Menu.Button
          className="inline-flex justify-center rounded-md border border-zinc-400 dark:border-zinc-700 px-2 py-2 text-sm font-medium shadow-sm hover:bg-orange-200 dark:hover:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100 transition-all"
          aria-label="menu"
        >
          <IoMenu className="h-5 w-5" />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 w-56 bg-white origin-top-right rounded-md border border-zinc-400 dark:border-zinc-700 dark:bg-zinc-800 shadow-xl ring-1 ring-black ring-opacity-5 focus:outline-none divide-zinc-400 dark:divide-zinc-700">
          <div className="py-1">
            {/* <div className="px-3 py-2 uppercase font-bold text-xs">
              Categories
            </div> */}
            {MENUS.map(menu => {
              return (
                <DropdownMenuItem
                  key={menu.key}
                  href={menu.path}
                  target={menu.target}
                >
                  {menu.title}
                </DropdownMenuItem>
              )
            })}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}
