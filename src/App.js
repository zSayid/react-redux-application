import { Routes, Route } from "react-router-dom";
import { Login, Register, Navbar, Main } from "./components";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { signUserSuccess } from "./slice/auth";
import AuthService from "./service/auth";
import AuthCourseService from "./service/product.apiService";
import { getProductStart, getProductSuccess } from "./slice/product.slice";

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

  const getProducts = async () => {
    dispatch(getProductStart());
    try {
      const data = await AuthCourseService.getProducts();
      dispatch(getProductSuccess(data));
    } catch (error) {}
  };
  useEffect(() => {
    if (!loggedIn) {
      getUser();
    }
    getProducts();
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
