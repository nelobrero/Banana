import { useState } from 'react';
import { createEntry } from '../api/entries';
import './AddEntry.css';

export default function AddEntry({ onClose, onEntryAdded }) {
  const [caption, setCaption] = useState('');
  const [location, setLocation] = useState('');
  const [imageFiles, setImageFiles] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit() {
    if (imageFiles.length === 0) {
      setError('Please select an image');
      return;
    }
    setSubmitting(true);
    setError('');
    try {
      const newEntry = await createEntry({ caption, location, imageFiles });
      onEntryAdded(newEntry);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to create entry');
    } finally {
      setSubmitting(false);
    }
  }
 return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-header">
          <input placeholder="Location" value={location}
  onChange={(e) => setLocation(e.target.value)} />
          <button onClick={onClose}>Close</button>
        </div>
       <div className="modal-image-area">
  <input
    type="file"
    accept="image/*"
    multiple
    onChange={(e) => setImageFiles(Array.from(e.target.files).slice(0, 10))}
  />
</div>  
        <div className="modal-caption">
          <input
  placeholder="Add Caption"
  value={caption}
  onChange={(e) => setCaption(e.target.value)}
/>
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
       <button className="modal-submit" onClick={handleSubmit} disabled={submitting}>
  {submitting ? 'Posting...' : 'Add Entry'}
</button>
      </div>
    </div>
  );
}