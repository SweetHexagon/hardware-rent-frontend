import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/categories';

class CategoriesService {

  async getAllCategories() {
    return await axios.get(API_URL, {headers: authHeader()});
  }
}

export default new CategoriesService();