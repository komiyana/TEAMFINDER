import { useState } from 'react';
import './notifications.scss';

const tabs = ['Unread', 'Read', 'Archived'];

const mockNotifications = [
  {
    id: 1,
    avatar: 'src/assets/avatars/phoenix.png',
    title: 'Friend Request',
    body: 'Jett#EUW sent you a friend request.',
    time: 'October 11 • 11:00AM',
    group: 'Today',
    unread: true,
    type: 'invite',
  },
  {
    id: 2,
    avatar: 'src/assets/avatars/sova.png',
    title: 'New Message',
    body: 'Phoenix#UK: "Let’s queue up?"',
    time: 'October 11 • 11:05AM',
    group: 'Today',
    unread: true,
    type: 'message',
  },
  {
    id: 3,
    avatar: 'src/assets/avatars/raze.png',
    title: 'System Alert',
    body: 'Servers will restart at 3 AM UTC.',
    time: 'October 10 • 11:00AM',
    group: 'Yesterday',
    unread: false,
    type: 'alert',
  },
];

const NotificationsPanel = () => {
  const [activeTab, setActiveTab] = useState('Unread');

  const grouped = mockNotifications.reduce((acc, curr) => {
    if (activeTab === 'Unread' && !curr.unread) return acc;
    if (activeTab === 'Read' && curr.unread) return acc;
    acc[curr.group] = acc[curr.group] || [];
    acc[curr.group].push(curr);
    return acc;
  }, {} as Record<string, typeof mockNotifications>);

  return (
    <div className="notifications-panel">
      <div className="tabs">
        {tabs.map(tab => (
          <button
            key={tab}
            className={activeTab === tab ? 'active' : ''}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="panel-body">
        {Object.entries(grouped).map(([group, items]) => (
          <div key={group} className="group">
            <div className="group-header">
              <span>{group}</span>
              <button className="view-all">View All</button>
            </div>
            {items.map(n => (
              <div key={n.id} className={`notification-card ${n.unread ? 'unread' : ''}`}>
                <img src={n.avatar} alt="avatar" className="avatar" />
                <div className="content">
                  <div className="title">
                    <strong>{n.title}</strong>
                  </div>
                  <div className="body">{n.body}</div>
                  {n.type === 'invite' && (
                    <div className="actions">
                      <button className="accept">Accept</button>
                      <button className="decline">Decline</button>
                    </div>
                  )}
                  <div className="time">{n.time}</div>
                </div>
                {n.unread && <div className="unread-dot" />}
              </div>
            ))}
          </div>
        ))}
      </div>

      <div className="panel-footer">
        <button className="mark-read">✓ Mark all as read</button>
        <button className="view-all-notifications">View all notifications</button>
      </div>
    </div>
  );
};

export default NotificationsPanel;
