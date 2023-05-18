import { FC } from 'react';

interface SidebarProps {
  
}

const Sidebar: FC<SidebarProps> = ({}) => {
  return <aside className='w-48 bg-red-500 min-h-screen sticky top-0'>Sidebar</aside>
}

export default Sidebar;