import { useEffect, useState } from 'react';
import { getEntries, createEntry, deleteEntry } from '../api/entries';
import { useAuth } from '../context/AuthContext';

export default function Home() {
  const { user, logoutUser } = useAuth();
  const [entries, setEntries] = useState([]);
  const [caption, setCaption] = useState('');
  const [location, setLocation] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    loadEntries();
  }, []);

  async function loadEntries() {
    try {
      const data = await getEntries();
      setEntries(data);
    } catch (err) {
      setError('Failed to load entries');
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!imageFile) {
      setError('Please select an image');
      return;
    }
    setSubmitting(true);
    setError('');
    try {
      const newEntry = await createEntry({ caption, location, imageFile });
      setEntries([newEntry, ...entries]);
      setCaption('');
      setLocation('');
      setImageFile(null);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to create entry');
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDelete(id) {
    try {
      await deleteEntry(id);
      setEntries(entries.filter((entry) => entry.id !== id));
    } catch (err) {
      setError('Failed to delete entry');
    }
  }

  return (
    <div>
      <header>
        <h1>My Adventure Log</h1>
        <p>Welcome, {user?.username}</p>
        <button onClick={logoutUser}>Log out</button>
      </header>

      <section>
        <h2>New Entry</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImageFile(e.target.files[0])}
            required
          />
          <input
            type="text"
            placeholder="Caption"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
          />
          <input
            type="text"
            placeholder="Location (optional)"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <button type="submit" disabled={submitting}>
            {submitting ? 'Posting...' : 'Add Entry'}
          </button>
        </form>
      </section>

      <section>
        <h2>Your Entries</h2>
        {loading ? (
          <p>Loading...</p>
        ) : entries.length === 0 ? (
          <p>No entries yet. Add your first adventure above!</p>
        ) : (
          entries.map((entry) => (
            <div key={entry.id} style={{ marginBottom: '2rem' }}>
              <img src={entry.image_url} alt={entry.caption || 'entry'} width="300" />
              <p>{entry.caption}</p>
              {entry.location && <p>📍 {entry.location}</p>}
              <p>{new Date(entry.entry_date).toLocaleDateString()}</p>
              <button onClick={() => handleDelete(entry.id)}>Delete</button>
            </div>
          ))
        )}
      </section>
    </div>
  );
}
