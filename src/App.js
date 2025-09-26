import { Routes, Route } from "react-router-dom";
import { Login, Register, Navbar, Main } from "./components";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { signUserSuccess } from "./slice/auth";
import AuthService from "./service/auth";

const App = () => {
  const { loggedIn } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const getUser = async () => {
    try {
      const {data} = await AuthService.getUser();
	  dispatch(signUserSuccess(data));
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
	if (!loggedIn) {
	  getUser();
	}
  }, []); // eslint-disable-line react-hooks/exhaustive-deps


  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Main/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
};

export default App;
