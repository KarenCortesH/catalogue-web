import axios from 'axios';

const API_URL_BASE_URL = process.env.VUE_APP_API_BASE_URL;

class AuthService {
  // funcion para hacer el login
  async login(user) {
    const result = await axios({
      url: `${API_URL_BASE_URL}/api/v1/login/client`,
      method: 'post',
      data: {
        mobilephone: user.mobilephone
      }
    });

    const { data: { customer } } = result;

    localStorage.setItem('user', JSON.stringify(customer));

    return customer;
  }

  // funcion para hacer logout
  logout() {
    localStorage.removeItem('user');
  }
}

export default new AuthService();