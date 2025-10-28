import React from 'react';
import { Link } from 'react-router-dom';
import { BellIcon, SearchIcon } from 'lucide-react';
export function Header() {
  return <header className="bg-white border-b border-gray-200 z-10">
      <div className="flex items-center justify-between h-16 px-4 md:px-6">
        <div className="flex-1">
          <div className="relative max-w-md">
            <input type="text" placeholder="Search..." className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
            <SearchIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <Link to="/notifications" className="relative text-gray-500 hover:text-gray-700">
            <BellIcon className="h-6 w-6" />
            <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500"></span>
          </Link>
          <div className="flex items-center">
            <div className="h-8 w-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-medium">
              JD
            </div>
            <div className="ml-2 hidden md:block">
              <div className="text-sm font-medium text-gray-700">John Doe</div>
              <div className="text-xs text-gray-500">Admin</div>
            </div>
          </div>
        </div>
      </div>
    </header>;
}