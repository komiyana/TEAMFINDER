import { useEffect, useState } from 'react'
import './Inbox.scss'
import ProfileWidget from './ProfileWidget'

const initialMessages = [
  {
    from: 'Phoenix#UK',
    preview: 'Yo, down for a ranked?',
    full: ['Yo, down for a ranked?||10:30 AM', 'You there?||10:31 AM', 'Sure||10:32 AM', 'Let me know when||10:33 AM', 'dsfs||10:34 AM'],
    timestamp: Date.now(),
  },
  {
    from: 'Sage#NA',
    preview: 'Looking for a duo on Icebox',
    full: ['Looking for a duo?||10:10 AM', 'Icebox or Bind?||10:12 AM'],
    timestamp: Date.now(),
  },
  {
    from: 'Chamber#EU',
    preview: 'You still playing?',
    full: ['Still up for comp?||09:30 AM', 'I’ve got a squad||09:35 AM'],
    timestamp: Date.now(),
  },
  {
    from: 'Fade#TR',
    preview: 'Wanna scrim later?',
    full: ['Want to scrim later?||08:15 AM', 'Same time as last night?||08:17 AM'],
    timestamp: Date.now(),
  },
]

const friends = [
  {
    from: 'Brimstone#US',
    preview: 'Let\'s play Haven?',
    full: ['Hey, you free for Haven?||09:00 AM', 'Need a controller.||09:01 AM', 'Ping me.||09:03 AM'],
    avatar: 'src/assets/avatars/brimstone.png',
    status: 'online',
  },
  {
    from: 'Sova#EU',
    preview: 'Recon ready.',
    full: ['I\'ve got recon.||09:10 AM', 'Just waiting on teammates.||09:11 AM'],
    avatar: 'src/assets/avatars/sova.png',
    status: 'incognito',
  },
  {
    from: 'Raze#BR',
    preview: 'Boom bot go brr.',
    full: ['Let\'s rush B.||09:20 AM', 'Boom bot first.||09:21 AM'],
    avatar: 'src/assets/avatars/raze.png',
    status: 'away',
  },
  {
    from: 'Killjoy#DE',
    preview: 'Turret deployed.',
    full: ['Hold on, turret up.||09:30 AM', 'We can defend A site.||09:32 AM'],
    avatar: 'src/assets/avatars/killjoy.png',
    status: 'offline',
  },
]

const Inbox = () => {
  const [selected, setSelected] = useState<number | null>(0)
  const [newMessage, setNewMessage] = useState('')
  const [messages, setMessages] = useState(() => {
    const saved = localStorage.getItem('inboxMessages')
    return saved ? JSON.parse(saved) : [...initialMessages]
  })

  const [bio, setBio] = useState(() => localStorage.getItem('bio') || '')

  useEffect(() => {
    localStorage.setItem('inboxMessages', JSON.stringify(messages))
  }, [messages])

  useEffect(() => {
    const interval = setInterval(() => {
      setBio(localStorage.getItem('bio') || '')
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  const handleSend = () => {
    if (newMessage.trim() && selected !== null) {
      const updated = [...messages]
      updated[selected].full.push(`${newMessage}||${new Date().toLocaleTimeString()}`)
      updated[selected].timestamp = Date.now()
      setMessages(updated)
      setNewMessage('')
    }
  }

  const handleFriendClick = (friend: typeof friends[number]) => {
    setMessages((prev: typeof messages) => {
      const index = prev.findIndex((m: typeof messages[number]) => m.from === friend.from)
      if (index !== -1) {
        setSelected(index)
        return prev
      } else {
        const newFriend = {
          ...friend,
          full: friend.full,
          timestamp: Date.now(),
        }
        const newList = [...prev, newFriend]
        setSelected(newList.length - 1)
        return newList
      }
    })
  }

  const activeChat = selected !== null ? messages[selected] : null
  const sortedMessages = [...messages].sort((a, b) => b.timestamp - a.timestamp)

  return (
    <div className="inbox-layout">
      {/* LEFT: Message List */}
      <div className="message-list">
        <h2>Inbox</h2>
        {sortedMessages.map((msg, index) => (
          <div
            key={index}
            className={`message-preview ${selected === index ? 'active' : ''}`}
            onClick={() => setSelected(index)}
          >
            <div className="sender">📌 {msg.from}</div>
            <div className="preview">{msg.preview}</div>
          </div>
        ))}
      </div>

      {/* CENTER: Chat */}
      {activeChat && (
        <div className="chat-window">
          <div className="chat-header">
            <strong>{activeChat.from}</strong>
            <span className="rank">Diamond 2</span>
          </div>

          <div className="chat-body">
            {activeChat.full.map((line: string, idx: number) => {
              const [text, time] = (line || '').split('||')
              return (
                <div key={idx} className={`bubble ${idx % 2 === 0 ? 'left' : 'right'}`}>
                  {text}
                  <span className="timestamp">{time || ''}</span>
                </div>
              )
            })}
          </div>

          <div className="chat-input">
            <input
              type="text"
              placeholder="Type your message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            />
            <button onClick={handleSend}>➤</button>
          </div>
        </div>
      )}

      {/* RIGHT: Profile + About Me + Friends */}
      <div className="right-sidebar">
        <div className="top-row">
          <ProfileWidget />

          <div className="about-me">
            <h4>ABOUT ME</h4>
            <p>{bio || 'No bio set. Click ⚙️ in your profile to add one!'}</p>
          </div>
        </div>

        <div className="friend-status">
          <h4>FRIENDS</h4>
          {friends.map((friend) => (
            <div key={friend.from} className={`friend-entry ${friend.status}`}>
              <div className="avatar-wrapper" onClick={() => handleFriendClick(friend)}>
                <img src={friend.avatar} alt={friend.from} />
              </div>
              <div className="friend-info">
                <div className="username">{friend.from.split('#')[0]}</div>
                <input type="text" placeholder="Note..." />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Inbox
