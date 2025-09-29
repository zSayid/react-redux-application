import axios from "./api";

const AuthCourseService = {
  async getCourses() {
    const response = await axios.get("/courses");
    return response.data;
  },
};

export default AuthCourseService;
