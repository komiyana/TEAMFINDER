import { useEffect, useState } from 'react';
import { FaDiscord, FaTwitch, FaUserEdit } from 'react-icons/fa';
import { GiCrosshair } from 'react-icons/gi';
import { Bolt, CircleX } from 'lucide-react';
import './ProfileWidget.scss';

const ProfileWidget = () => {
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [username, setUsername] = useState(() => localStorage.getItem('username') || 'Guest');
  const [rank, setRank] = useState<string | null>(() => localStorage.getItem('rank'));
  const [expanded, setExpanded] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [bio, setBio] = useState(() => localStorage.getItem('bio') || '');

  useEffect(() => {
    const savedImage = localStorage.getItem('profileImage');
    if (savedImage) setProfileImage(savedImage);
  }, []);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageUrl = reader.result as string;
        setProfileImage(imageUrl);
        localStorage.setItem('profileImage', imageUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  const connectRiotAccount = () => {
    const fetchedUsername = 'JettCracked#EUW';
    const fetchedRank = 'Diamond 2';
    setUsername(fetchedUsername);
    setRank(fetchedRank);
    localStorage.setItem('username', fetchedUsername);
    localStorage.setItem('rank', fetchedRank);
  };

  const handleSaveSettings = () => {
    localStorage.setItem('bio', bio);
    setShowSettings(false);
  };

  return (
    <>
      <div className={`profile-widget ${expanded ? 'expanded' : ''}`}>
        {expanded && (
          <button className="settings-btn" title="Settings" onClick={() => setShowSettings(true)}>
            <Bolt size={16} />
          </button>
        )}

        <div className="profile-toggle" onClick={() => setExpanded(prev => !prev)}>
          <img
            src={profileImage || 'https://api.dicebear.com/7.x/bottts/svg?seed=valorant'}
            alt="Profile"
          />
        </div>

        {expanded && (
          <>
            <input type="file" onChange={handleImageUpload} hidden id="profile-upload" />
            <label htmlFor="profile-upload" className="change-image-btn">
              <FaUserEdit style={{ marginRight: '6px' }} /> Change Image
            </label>

            <div className="username">{username}</div>
            {rank && <div className="rank">{rank}</div>}
            <div className="platforms">
              <a href="#" title="Twitch"><FaTwitch size={20} /></a>
              <a href="#" title="Discord"><FaDiscord size={20} /></a>
              <a href="#" title="Valorant Tracker"><GiCrosshair size={20} /></a>
            </div>
            {!rank && (
              <button onClick={connectRiotAccount} className="connect-btn">
                Connect Riot Account
              </button>
            )}
          </>
        )}
      </div>

      {showSettings && (
        <div className="settings-overlay" onClick={() => setShowSettings(false)}>
          <div className="settings-modal" onClick={e => e.stopPropagation()}>
            <div className="settings-left">
              <ul>
                <li className="active">Profile Info</li>
                <li>Linked Accounts</li>
                <li>Privacy</li>
                <li>Status</li>
                <li>About Me</li>
                <li>Game Settings</li>
              </ul>
            </div>
            <div className="settings-right">
              <div className="settings-header">
                <h3>Edit Profile</h3>
                <button onClick={() => setShowSettings(false)} className="close-btn">
                  <CircleX size={20} />
                </button>
              </div>
              <textarea
                placeholder="Write something about yourself..."
                value={bio}
                onChange={(e) => setBio(e.target.value)}
              />
              <button onClick={handleSaveSettings} className="save-btn">Save Changes</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProfileWidget;
