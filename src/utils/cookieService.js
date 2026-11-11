import Cookies from 'js-cookie';

const TOKEN_KEY = 'auth_token';

export const cookieService = {
  // Save token (expires in 1 day, accessible across the whole app, strict CSRF protection)
  setToken: (token) => {
    Cookies.set(TOKEN_KEY, token, { expires: 1, path: '/', sameSite: 'strict' });
  },

  // Fetch token
  getToken: () => {
    return Cookies.get(TOKEN_KEY);
  },

  // Delete token (for logout)
  removeToken: () => {
    Cookies.remove(TOKEN_KEY, { path: '/' });
  }
};