const configuredBase = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000';
const API_BASE = `${configuredBase.replace(/\/$/, '')}/api`;
async function agriApi(path, options = {}) {
  const token = localStorage.getItem('agriMarketToken');
  const response = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers || {}),
    },
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.error || `API request failed (${response.status})`);
  return data;
}
window.agriMarketAuth = {
  signup: (payload) => agriApi('/auth/signup', { method: 'POST', body: JSON.stringify(payload) }),
  requestOtp: (email, purpose = 'signup') => agriApi('/auth/request-otp', { method: 'POST', body: JSON.stringify({ email, purpose }) }),
  verifyOtp: (email, code, purpose = 'signup') => agriApi('/auth/verify-otp', { method: 'POST', body: JSON.stringify({ email, code, purpose }) }),
  resetPassword: (email, code, newPassword) => agriApi('/auth/reset-password', { method: 'POST', body: JSON.stringify({ email, code, newPassword }) }),
  login: async (phoneOrEmail, password) => {
    const result = await agriApi('/auth/login', { method: 'POST', body: JSON.stringify({ phone: phoneOrEmail, password }) });
    localStorage.setItem('agriMarketToken', result.token);
    localStorage.setItem('agriMarketUser', JSON.stringify(result.user));
    return result;
  },
  me: () => agriApi('/auth/me'),
  logout: () => { localStorage.removeItem('agriMarketToken'); localStorage.removeItem('agriMarketUser'); },
};
window.agriMarketApi = {
  orders: () => agriApi('/orders'),
  createOrder: (data) => agriApi('/orders', { method: 'POST', body: JSON.stringify(data) }),
  updateOrderStatus: (id, status) => agriApi(`/orders/${encodeURIComponent(id)}/status`, { method: 'PATCH', body: JSON.stringify({ status }) }),
  products: () => agriApi('/products'),
  createProduct: (data) => agriApi('/products', { method: 'POST', body: JSON.stringify(data) }),
  updateProduct: (id, data) => agriApi('/products/' + encodeURIComponent(id), { method: 'PUT', body: JSON.stringify(data) }),
  processors: () => agriApi('/processors'),
  buyerRequests: () => agriApi('/buyer-requests'),
  adminMe: () => agriApi('/admin/me'),
  adminUsers: () => agriApi('/admin/users'),
  adminProducts: () => agriApi('/admin/products'),
  adminProcessors: () => agriApi('/admin/processors'),
  createProcessor: (data) => agriApi('/admin/processors', { method: 'POST', body: JSON.stringify(data) }),
  updateProcessor: (id, data) => agriApi(`/admin/processors/${encodeURIComponent(id)}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteProcessor: (id) => agriApi(`/admin/processors/${encodeURIComponent(id)}`, { method: 'DELETE' }),
  deleteProduct: (id) => agriApi(`/products/${encodeURIComponent(id)}`, { method: 'DELETE' }),
};
