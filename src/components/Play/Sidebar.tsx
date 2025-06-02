import { useState } from 'react'
import { Mail, Bell, Users, Settings, Megaphone } from 'lucide-react' // ← ADD Megaphone here
import './Sidebar.scss'

const Sidebar = ({ onSelect }: { onSelect: (section: string) => void }) => {
  const [active, setActive] = useState('lfg')

  const handleClick = (section: string) => {
    setActive(section)
    onSelect(section)
  }

  return (
    <div className="sidebar">
      <div
        className={`icon ${active === 'lfg' ? 'active' : ''}`}
        onClick={() => handleClick('lfg')}
        title="LFG Posts"
      >
        <Users />
      </div>
      <div
        className={`icon ${active === 'inbox' ? 'active' : ''}`}
        onClick={() => handleClick('inbox')}
        title="Inbox"
      >
        <Mail />
      </div>
      <div
        className={`icon ${active === 'notifications' ? 'active' : ''}`}
        onClick={() => handleClick('notifications')}
        title="Notifications"
      >
        <Bell />
      </div>

      {/* 🔥 New Feed Button */}
      <div
        className={`icon ${active === 'feed' ? 'active' : ''}`}
        onClick={() => handleClick('feed')}
        title="Feed"
      >
        <Megaphone />
      </div>

      <div
        className={`icon ${active === 'settings' ? 'active' : ''}`}
        onClick={() => handleClick('settings')}
        title="Settings"
      >
        <Settings />
      </div>
    </div>
  )
}

export default Sidebar
