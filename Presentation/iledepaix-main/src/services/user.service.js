import axios from "axios";
import authHeader from "./auth-header";
const API_URL = "https://localhost:7015/api/users/";
class UserService {
  getUser() {
    return axios.get(API_URL + "user", { headers: authHeader() });
  }
}
export default new UserService();
