import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Target, Users, Briefcase, Lock, FileText } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Tab {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

const tabs: Tab[] = [
  { name: 'Leads', href: '/admin/leads', icon: Target },
  { name: 'Membros', href: '/admin/members', icon: Users },
  { name: 'Patrocinados', href: '/admin/sponsored', icon: Briefcase },
  { name: 'Gestão de Acesso', href: '/admin/access', icon: Lock },
  { name: 'Artigos', href: '/admin/articles', icon: FileText },
];

export const TabNavigator: React.FC = () => {
  const location = useLocation();

  return (
    <div className="border-b border-gray-200">
      <nav className="-mb-px flex space-x-8 overflow-x-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = location.pathname === tab.href || (location.pathname === '/admin' && tab.href === '/admin/leads');
          
          return (
            <Link
              key={tab.name}
              to={tab.href}
              className={cn(
                'whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2',
                isActive
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              )}
            >
              <Icon className="w-5 h-5" />
              <span>{tab.name}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
};