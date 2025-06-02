import { useState } from 'react';
import './LFGForm.scss';
import { Globe, Languages, UserSearch, MessageSquareText } from 'lucide-react';

const LFGForm = ({ onPost }: { onPost: (post: any) => void }) => {
  const [rank, setRank] = useState('');
  const [region, setRegion] = useState('');
  const [language, setLanguage] = useState('');
  const [bio, setBio] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const postData = { rank, region, language, bio, timestamp: new Date() };
    onPost(postData);
    setRank('');
    setRegion('');
    setLanguage('');
    setBio('');
  };

  return (
    <form className="lfg-form" onSubmit={handleSubmit}>
      <h2>Looking For Game</h2>

      <div className="form-group">
        <UserSearch size={16} />
        <select value={rank} onChange={(e) => setRank(e.target.value)} required>
          <option value="">Select Rank</option>
          <option>Iron</option>
          <option>Bronze</option>
          <option>Silver</option>
          <option>Gold</option>
          <option>Platinum</option>
          <option>Diamond</option>
          <option>Ascendant</option>
          <option>Immortal</option>
          <option>Radiant</option>
        </select>
      </div>

      <div className="form-group">
        <Globe size={16} />
        <select value={region} onChange={(e) => setRegion(e.target.value)} required>
          <option value="">Select Region</option>
          <option>NA</option>
          <option>EU</option>
          <option>Asia</option>
          <option>LATAM</option>
          <option>KR</option>
        </select>
      </div>

      <div className="form-group">
        <Languages size={16} />
        <input
          type="text"
          placeholder="e.g. English"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          required
        />
      </div>

      <div className="form-group textarea-group">
        <MessageSquareText size={16} />
        <textarea
          placeholder="Tell others what you're looking for..."
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          required
        />
      </div>

      <button type="submit">Post LFG</button>
    </form>



  );
};

export default LFGForm;
