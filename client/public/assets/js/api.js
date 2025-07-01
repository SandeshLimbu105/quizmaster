const API_BASE = 'http://localhost:5000/api';

// Auth endpoints
export const authService = {
  login: async (email, password) => {
    const response = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Login failed');
    }
    return await response.json();
  },

  register: async (username, email, password) => {
    const response = await fetch(`${API_BASE}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, email, password })
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Registration failed');
    }
    return await response.json();
  }
};

// Quiz endpoints
export const quizService = {
  getQuizzes: async () => {
    const response = await fetch(`${API_BASE}/quizzes`);
    if (!response.ok) throw new Error('Failed to fetch quizzes');
    return await response.json();
  },

  getQuizById: async (id) => {
    const response = await fetch(`${API_BASE}/quizzes/${id}`);
    if (!response.ok) throw new Error('Failed to fetch quiz');
    return await response.json();
  }
};

// Results endpoints
export const resultsService = {
  submitQuizResult: async (quizId, score) => {
    const response = await fetch(`${API_BASE}/results`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({ quizId, score })
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to submit quiz');
    }
    return await response.json();
  },

  getUserAttempts: async () => {
    const response = await fetch(`${API_BASE}/results/attempts`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
    if (!response.ok) throw new Error('Failed to fetch attempts');
    return await response.json();
  },

  getAttemptDetails: async (attemptId) => {
    const response = await fetch(`${API_BASE}/results/attempts/${attemptId}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
    if (!response.ok) throw new Error('Failed to fetch attempt details');
    return await response.json();
  }
};

// Leaderboard endpoint
export const leaderboardService = {
  getLeaderboard: async (category = '') => {
    const url = `${API_BASE}/leaderboard${category ? `?category=${category}` : ''}`;
    const response = await fetch(url);
    if (!response.ok) throw new Error('Failed to fetch leaderboard');
    return await response.json();
  }
};

// Helper function for authenticated requests
const authFetch = async (url, options = {}) => {
  options.headers = {
    ...options.headers,
    'Authorization': `Bearer ${localStorage.getItem('token')}`
  };
  const response = await fetch(url, options);
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Request failed');
  }
  return await response.json();
};