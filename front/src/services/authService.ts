import api from './api';

export default class AuthService {
  async login(credentials: {email: string; password: string}): Promise<any> {
    return api.post('/login', credentials);
  }

  async signup(user: {email: string; password: string}): Promise<any> {
    return api.post('/signup', user);
  }

  async logout() {
    return api.post('/logout');
  }
}
