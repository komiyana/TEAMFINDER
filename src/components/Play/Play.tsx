import { useState } from 'react'
import Sidebar from './Sidebar'
import LFGForm from './LFGForm'
import ProfileWidget from './ProfileWidget'
import Inbox from './Inbox'
import NotificationsPanel from './notifications'
import Feed from './Feed'
import './Play.scss'
import './ProfileWidget.scss'

const Play = () => {
  const [section, setSection] = useState('lfg')
  const [showNotifications, setShowNotifications] = useState(false)
  const [posts, setPosts] = useState<any[]>([])

  const renderContent = () => {
    switch (section) {
      case 'lfg':
        return (
          <>
            <LFGForm onPost={(newPost) => setPosts((prev) => [newPost, ...prev])} />
            {posts.length > 0 && (
              <div className="lfg-cards">
                {posts.map((post, index) => (
                  <div key={index} className="lfg-card">
                    <h3>{post.rank} Player</h3>
                    <p><strong>Region:</strong> {post.region}</p>
                    <p><strong>Language:</strong> {post.language}</p>
                    <p><strong>About:</strong> {post.bio}</p>
                  </div>
                ))}
              </div>
            )}
          </>
        )
      case 'inbox':
        return <Inbox />
      case 'feed':
        return <Feed />
      case 'settings':
        return <div className="placeholder">⚙️ Settings coming soon</div>
      default:
        return null
    }
  }

  return (
    <div className="play-layout">
      <Sidebar onSelect={(val) => {
        if (val === 'notifications') {
          setShowNotifications(prev => !prev)
        } else {
          setSection(val)
          setShowNotifications(false)
        }
      }} />
      <div className="main-content">{renderContent()}</div>
      <ProfileWidget />
      {showNotifications && <NotificationsPanel />}
    </div>
  )
}

export default Play
