import axios from "axios";
const API_URL = "http://localhost:7015/api/users/";
class AuthService {
  login(email, password) {
    console.log(email, password);
    // localStorage.setItem("user", JSON.stringify({ accessToken: "test" }));
    // Le code qui suit est à décommenter et à adapter avec le back
    return axios
      .post(API_URL + "login", {
        email,
        password,
      })
      .then((response) => {
        if (response.data.token) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }
        return response.data;
      });
    // Le bakc se présentera p-e comme ceci
    /**
     * {
     *  accessToken: "oifshdsjlkdgfsjd-sdfkhsgdfj",
     *  user: {
     *  sjkdfhkjsd: dsljfshjkdf
     *  slkdfhsdljf: qlkdhdqskf
     *  }
     * }
     *
     *
     */
  }
  logout() {
    localStorage.removeItem("user");
  }
  register(username, email, password) {
    return axios.post(API_URL + "signup", {
      username,
      email,
      password,
    });
  }
  getCurrentUser() {
    return JSON.parse(localStorage.getItem("user"));
  }
}
export default new AuthService();
