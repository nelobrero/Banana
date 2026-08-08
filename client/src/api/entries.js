import api from './client';

export async function getEntries() {
  const { data } = await api.get('/entries');
  return data;
}

export async function createEntry({ caption, location, entry_date, imageFile }) {
  const formData = new FormData();
  formData.append('image', imageFile);
  if (caption) formData.append('caption', caption);
  if (location) formData.append('location', location);
  if (entry_date) formData.append('entry_date', entry_date);

  const { data } = await api.post('/entries', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return data;
}

export async function deleteEntry(id) {
  const { data } = await api.delete(`/entries/${id}`);
  return data;
}

export async function updateEntry(id, updates) {
  const { data } = await api.put(`/entries/${id}`, updates);
  return data;
}
