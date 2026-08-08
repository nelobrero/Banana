import api from './client';

export async function signup({ username, email, password }) {
  const { data } = await api.post('/auth/signup', { username, email, password });
  return data; // { user, token }
}

export async function login({ username, password }) {
  const { data } = await api.post('/auth/login', { username, password });
  return data; // { user, token }
}
