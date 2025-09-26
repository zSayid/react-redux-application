import axios from "./api";

const AuthService = {
  userRegister(user) {
    const response = axios.post("/auth/register", user);
    return response;
  },
  userLogin(user) {
    const response = axios.post("/auth/login", user);
    return response;
  },

  getUser() {
    const response = axios.get("/auth/user");
    return response;
  },

  getCourses() {
    const response = axios.get("/courses");
    return response;
  },
};

export default AuthService;
