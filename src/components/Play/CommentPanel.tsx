import { useState, useEffect, useRef } from 'react';
import './CommentPanel.scss';
import { X } from 'lucide-react';

type Comment = {
  user: string;
  text: string;
};

type CommentPanelProps = {
  post: {
    id: number;
    user: string;
    commentsList: Comment[];
  };
  onClose: () => void;
  onAddComment: (postId: number, text: string) => void;
};

const CommentPanel = ({ post, onClose, onAddComment }: CommentPanelProps) => {
  const [comment, setComment] = useState('');
  const panelRef = useRef<HTMLDivElement>(null);

  const handleSubmit = () => {
    if (comment.trim()) {
      onAddComment(post.id, comment);
      setComment('');
    }
  };

  useEffect(() => {
    if (panelRef.current) {
      panelRef.current.scrollTop = panelRef.current.scrollHeight;
    }
  }, [post.commentsList]);

  return (
    <div className="comment-panel">
      <div className="panel-header">
        <span>Comments for {post.user}</span>
        <X className="close-btn" onClick={onClose} />
      </div>

      <div className="panel-body" ref={panelRef}>
        {post.commentsList.length === 0 ? (
          <p className="no-comments">No comments yet.</p>
        ) : (
          post.commentsList.map((c, i) => (
            <div key={i} className="comment">
              <strong>{c.user}:</strong> {c.text}
            </div>
          ))
        )}
      </div>

      <div className="panel-footer">
        <input
          type="text"
          placeholder="Write a comment..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
        />
        <button onClick={handleSubmit}>Send</button>
      </div>
    </div>
  );
};

export default CommentPanel;
