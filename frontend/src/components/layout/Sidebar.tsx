import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboardIcon, FoldersIcon, MessageSquareTextIcon, DatabaseIcon, BarChart3Icon, UsersIcon, SettingsIcon, ChevronRightIcon, MenuIcon, XIcon, MessageSquareIcon, LayoutTemplateIcon, CreditCardIcon, BookOpenIcon, LifeBuoyIcon } from 'lucide-react';
interface SidebarProps {
  className?: string;
}
export function Sidebar({
  className = ''
}: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const navigation = [{
    name: 'Dashboard',
    icon: LayoutDashboardIcon,
    href: '/'
  }, {
    name: 'Projects',
    icon: FoldersIcon,
    href: '/projects'
  }, {
    name: 'Chatbots',
    icon: MessageSquareTextIcon,
    href: '/chatbots'
  }, {
    name: 'Knowledge Base',
    icon: DatabaseIcon,
    href: '/knowledge-base'
  }, {
    name: 'Conversations',
    icon: MessageSquareIcon,
    href: '/conversations'
  }, {
    name: 'Templates',
    icon: LayoutTemplateIcon,
    href: '/templates'
  }, {
    name: 'Analytics',
    icon: BarChart3Icon,
    href: '/analytics'
  }, {
    name: 'User Management',
    icon: UsersIcon,
    href: '/users'
  }, {
    name: 'Billing',
    icon: CreditCardIcon,
    href: '/billing'
  }, {
    name: 'Documentation',
    icon: BookOpenIcon,
    href: '/documentation'
  }, {
    name: 'Support',
    icon: LifeBuoyIcon,
    href: '/support'
  }, {
    name: 'Settings',
    icon: SettingsIcon,
    href: '/settings'
  }];
  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };
  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };
  const toggleMobileSidebar = () => {
    setMobileOpen(!mobileOpen);
  };
  return <>
      {/* Mobile menu button */}
      <button className="fixed z-50 bottom-4 right-4 md:hidden bg-blue-600 text-white p-3 rounded-full shadow-lg" onClick={toggleMobileSidebar}>
        {mobileOpen ? <XIcon size={24} /> : <MenuIcon size={24} />}
      </button>
      {/* Mobile sidebar */}
      <div className={`fixed inset-0 z-40 bg-gray-900 bg-opacity-50 transition-opacity md:hidden ${mobileOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={toggleMobileSidebar}></div>
      {/* Sidebar */}
      <aside className={`bg-white border-r border-gray-200 h-full transition-all duration-300 ${collapsed ? 'w-20' : 'w-64'} ${mobileOpen ? 'translate-x-0' : '-translate-x-full'} fixed md:relative inset-y-0 left-0 z-40 md:translate-x-0 ${className}`}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className={`flex items-center justify-center h-16 border-b border-gray-200 ${collapsed ? 'px-2' : 'px-4'}`}>
            {collapsed ? <div className="bg-blue-600 text-white font-bold text-xl w-10 h-10 rounded-md flex items-center justify-center">
                C
              </div> : <div className="text-xl font-bold text-gray-900">
                ChatBot-Stack
              </div>}
          </div>
          {/* Navigation */}
          <nav className="flex-1 pt-4 pb-4 overflow-y-auto">
            <ul className="space-y-1 px-2">
              {navigation.map(item => <li key={item.name}>
                  <Link to={item.href} className={`flex items-center px-2 py-2 text-sm font-medium rounded-md group ${isActive(item.href) ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-100'}`}>
                    <item.icon className={`mr-3 flex-shrink-0 h-6 w-6 ${isActive(item.href) ? 'text-blue-600' : 'text-gray-400 group-hover:text-gray-500'} ${collapsed ? 'mx-auto' : ''}`} />
                    {!collapsed && <span>{item.name}</span>}
                  </Link>
                </li>)}
            </ul>
          </nav>
          {/* Collapse button */}
          <div className="border-t border-gray-200 p-4 hidden md:block">
            <button onClick={toggleSidebar} className="flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-gray-500 bg-gray-100 rounded-md hover:bg-gray-200">
              <ChevronRightIcon className={`h-5 w-5 transition-transform ${collapsed ? '' : 'rotate-180'}`} />
              {!collapsed && <span className="ml-2">Collapse</span>}
            </button>
          </div>
        </div>
      </aside>
    </>;
}