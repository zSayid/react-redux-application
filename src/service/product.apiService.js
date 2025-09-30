import axios from "./api";

const AuthCourseService = {
  async getProducts() {
    const response = await axios.get("/products");
    return response.data;
  },
};

export default AuthCourseService;
