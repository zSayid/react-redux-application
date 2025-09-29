import { Routes, Route } from "react-router-dom";
import { Login, Register, Navbar, Main } from "./components";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { signUserSuccess } from "./slice/auth";
import AuthService from "./service/auth";
import AuthCourseService from "./service/course";
import { getCourseStart, getCourseSuccess } from "./slice/course";

const App = () => {
  const { loggedIn } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const getUser = async () => {
    try {
      const { data } = await AuthService.getUser();
      dispatch(signUserSuccess(data));
    } catch (error) {
      console.log(error);
    }
  };

  const getCourses = async () => {
    dispatch(getCourseStart());
    try {
      const data = await AuthCourseService.getCourses();
      dispatch(getCourseSuccess(data));
    } catch (error) {}
  };
  useEffect(() => {
    if (!loggedIn) {
      getUser();
    }
    getCourses();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
};

export default App;
