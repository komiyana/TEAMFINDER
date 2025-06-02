import { useEffect, useState } from 'react';
import './Feed.scss';
import { Heart, MessageCircle, ImagePlus, Trash2, Crosshair } from 'lucide-react';
import CommentPanel from './CommentPanel';

type Comment = {
  user: string;
  text: string;
};

type Post = {
  id: number;
  user: string;
  rank: string;
  avatar: string;
  content: string;
  image: string;
  time: string;
  likes: number;
  comments: number;
  liked: boolean;
  commentsList: Comment[];
};

const dummyPosts: Post[] = [
  {
    id: 1,
    user: 'JettMain#EU',
    rank: 'Diamond 3',
    avatar: 'src/assets/avatars/jett.png',
    content: 'Anyone wanna queue for ranked tonight?',
    image: '',
    time: 'Just now',
    likes: 12,
    comments: 1,
    liked: false,
    commentsList: [{ user: 'Reyna', text: 'Let’s go!' }]
  },
  {
    id: 2,
    user: 'OmenSmoke#NA',
    rank: 'Platinum 1',
    avatar: 'src/assets/avatars/omen.png',
    content: 'Smoke lineups for Breeze dropped. Check it out.',
    image: 'src/assets/posts/breeze-smokes.jpg',
    time: '5m ago',
    likes: 40,
    comments: 1,
    liked: false,
    commentsList: [{ user: 'You', text: 'Nice guide!' }]
  }
];

const dummyContacts = [
  'ReynaDodge#1452',
  'TheThreeSentinels#1652',
  'ChamberMain#4905',
  'HarborIsBad#4444',
  'SageWallNerf#6498',
  'ImagineHowBadUr#3523',
  'PhoenixFlashes#1234'
];

const Feed = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [input, setInput] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [activePost, setActivePost] = useState<Post | null>(null);
  const [editingPostId, setEditingPostId] = useState<number | null>(null);
  const [editingContent, setEditingContent] = useState('');

  useEffect(() => {
    const stored = localStorage.getItem('posts');
    if (stored) {
      setPosts(JSON.parse(stored));
    } else {
      setPosts(dummyPosts);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('posts', JSON.stringify(posts));
  }, [posts]);

  const handlePost = () => {
    if (!input.trim()) return;
    const newPost: Post = {
      id: Date.now(),
      user: 'YourUser#XYZ',
      rank: 'Immortal 1',
      avatar: 'src/assets/avatars/phoenix.png',
      content: input,
      image: file ? URL.createObjectURL(file) : '',
      time: 'Just now',
      likes: 0,
      comments: 0,
      liked: false,
      commentsList: []
    };
    setPosts([newPost, ...posts]);
    setInput('');
    setFile(null);
  };

  const handleLike = (id: number) => {
    setPosts(prev =>
      prev.map(post =>
        post.id === id
          ? {
              ...post,
              liked: !post.liked,
              likes: post.liked ? post.likes - 1 : post.likes + 1
            }
          : post
      )
    );
  };

  const handleAddComment = (postId: number, text: string) => {
    setPosts(prev => {
      const updated = prev.map(post =>
        post.id === postId
          ? {
              ...post,
              comments: post.comments + 1,
              commentsList: [...post.commentsList, { user: 'You', text }]
            }
          : post
      );

      const newActivePost = updated.find(p => p.id === postId) || null;
      setActivePost(newActivePost);

      return updated;
    });
  };

  const handleEdit = (postId: number) => {
    const post = posts.find((p) => p.id === postId);
    if (post) {
      setEditingPostId(postId);
      setEditingContent(post.content);
    }
  };

  const saveEdit = (postId: number) => {
    setPosts((prev) =>
      prev.map((post) =>
        post.id === postId ? { ...post, content: editingContent } : post
      )
    );
    setEditingPostId(null);
    setEditingContent('');
  };

  const handleDelete = (postId: number) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this post?');
    if (confirmDelete) {
      setPosts((prev) => prev.filter((post) => post.id !== postId));
      if (activePost?.id === postId) setActivePost(null);
    }
  };

  return (
    <div className="feed-layout valorant-theme">
      <aside className="feed-sidebar left">
        <div className="sidebar-section">
          <h4>VALORANT News</h4>
          <ul>
            <li>Patch Notes 7.03 released</li>
            <li>Agent tier list updated</li>
          </ul>
        </div>
        <div className="sidebar-section">
          <h4>Popular Agents</h4>
          <ul>
            <li>Jett</li>
            <li>Viper</li>
            <li>Omen</li>
          </ul>
        </div>
        <div className="sidebar-section">
          <h4>Upcoming Events</h4>
          <ul>
            <li>Valorant Showmatch – Tomorrow</li>
            <li>Rank Reset – Friday</li>
          </ul>
        </div>
        <div className="sidebar-section">
          <h4>Suggestions</h4>
          <ul>
            <li>Follow @BrimstoneMain</li>
            <li>Follow @ViperLineups</li>
          </ul>
        </div>
      </aside>

      <main className="feed-main">
        <div className="composer">
          <textarea
            placeholder="What's happening?"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            maxLength={500}
          />
          <div className="composer-footer">
            <label className="upload-btn">
              <ImagePlus size={16} />
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
              />
            </label>
            <button onClick={handlePost}>Post</button>
          </div>
        </div>

        <div className="post-feed">
          {posts.map((post) => (
            <div key={post.id} className="post-card">
              <img src={post.avatar} alt="avatar" className="avatar" />
              <div className="post-content">
                <div className="post-header">
                  <span className="username">{post.user}</span>
                  <span className="rank">{post.rank}</span>
                  <span className="time">• {post.time}</span>
                </div>

                {editingPostId === post.id ? (
                  <textarea
                    className="edit-textarea"
                    value={editingContent}
                    onChange={(e) => setEditingContent(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        saveEdit(post.id);
                      }
                    }}
                    rows={3}
                  />
                ) : (
                  <div className="text">{post.content}</div>
                )}

                {post.image && (
                  <div className="image-wrapper">
                    <img src={post.image} alt="post" className="post-img" />
                  </div>
                )}
                <div className="post-actions">
                  <div className="action" onClick={() => handleLike(post.id)}>
                    <Heart size={16} fill={post.liked ? '#ff4655' : 'none'} /> {post.likes}
                  </div>
                  <div className="action" onClick={() => setActivePost(post)}>
                    <MessageCircle size={16} /> {post.comments}
                  </div>
                  <div className="action edit" onClick={() => handleEdit(post.id)}>
                    <Crosshair size={16} /> 
                  </div>
                  <div className="action delete" onClick={() => handleDelete(post.id)}>
                    <Trash2 size={16} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      <aside className="feed-sidebar right">
        <div className="sidebar-section">
          <h4>Contacts</h4>
          <ul>
            {dummyContacts.map((c, i) => (
              <div key={i} className="contact-entry">
                <div className="contact-name">{c}</div>
                <input
                  type="text"
                  placeholder={`Message ${c.split('#')[0]}...`}
                  className="contact-message"
                />
              </div>
            ))}
          </ul>
        </div>
      </aside>

      {activePost && (
        <CommentPanel
          post={activePost}
          onClose={() => setActivePost(null)}
          onAddComment={handleAddComment}
        />
      )}
    </div>
  );
};

export default Feed;
