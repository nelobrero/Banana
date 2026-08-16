import { useEffect, useState } from 'react';
import { getEntries, createEntry, deleteEntry } from '../api/entries';
import { useAuth } from '../context/AuthContext';
import ImageCarousel from '../components/ImageCarousel';
import AddEntry from '../components/AddEntry';
import './Home.css';

export default function Home() {
  const { user, logoutUser } = useAuth();
  const [entries, setEntries] = useState([]);
  // const [caption, setCaption] = useState('');
  // const [location, setLocation] = useState('');
  // const [imageFiles, setImageFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  // const [submitting, setSubmitting] = useState(false);
  // const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    loadEntries();
  }, []);

  async function loadEntries() {
    try {
      const data = await getEntries();
      setEntries(data);
    } catch (err) {
      setError('Failed to load entries', err);
    } finally {
      setLoading(false);
    }
  }

  // async function handleSubmit(e) {
  //   e.preventDefault();
  //   if (imageFiles.length === 0) {
  //     setError('Please select an image');
  //     return;
  //   }
  //   setSubmitting(true);
  //   setError('');
  //   try {
  //     const newEntry = await createEntry({ caption, location, imageFiles });
  //     setEntries([newEntry, ...entries]);
  //     setCaption('');
  //     setLocation('');
  //     setImageFiles([]);
  //   } catch (err) {
  //     setError(err.response?.data?.error || 'Failed to create entry');
  //   } finally {
  //     setSubmitting(false);
  //   }
  // }

  async function handleDelete(id) {
    try {
      await deleteEntry(id);
      setEntries(entries.filter((entry) => entry.id !== id));
    } catch (err) {
      setError('Failed to delete entry', err);
    }
  }

  return (
    <div>
      <header className="header-style">
        <h1>Banana</h1>
        {/* <p>Welcome, {user?.username}</p> */}
        <div className="nav-links">
          <span className="nav-link" onClick={() => setShowModal(true)}>Add Entry</span>
          <span className="nav-link" onClick={logoutUser}>Log out</span>
        </div>
      </header>

       <section className="entries-section">
        {loading ? (
          <p>Loading...</p>
        ) : entries.length === 0 ? (
          <p>No entries yet. Add your first adventure above!</p>
        ) : (
          entries.map((entry) => (
            <div key={entry.id} style={{ marginBottom: '2rem' }}>
              <ImageCarousel images={entry.image_urls || [entry.image_url]} width="400" height="400" />
              <p>{entry.caption}</p>
              {entry.location && <p>📍 {entry.location}</p>}
              <p>{new Date(entry.entry_date).toLocaleDateString()}</p>
              <button onClick={() => handleDelete(entry.id)}>Delete</button>
            </div>
          ))
        )}
      </section>

      {showModal && (
          <AddEntry
            onClose={() => setShowModal(false)}
            onEntryAdded={(newEntry) => {
              setEntries([newEntry, ...entries]);
              setShowModal(false);
            }}
            // onSubmit={handleSubmit}
            // caption={caption}
            // setCaption={setCaption}
            // location={location}
            // setLocation={setLocation}
            // imageFiles={imageFiles}
            // setImageFiles={setImageFiles}
            // submitting={submitting}
            // error={error}
          />
        )}
    </div>
  );
}
