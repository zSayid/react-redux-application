import Logo from "../ui/Logo";
import Input from "../ui/Input";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  signUserStart,
  signUserSuccess,
  signUserFailure,
} from "../slice/auth";
import AuthService from "../service/auth";
import ValidationError from "../utils/validation-error";


const Register = () => {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.auth.isLoading);

  const submitSignUpHandler = async (e) => {
    e.preventDefault();
    dispatch(signUserStart());
    const user = { name, email, password };

    try {
      const response = await AuthService.userRegister(user);
      console.log("API Response:", response); // Debugging log
      dispatch(signUserSuccess());
      setName(""); 
      setEmail(""); 
      setPassword(""); 
    } catch (error) {
      console.log(error.response);
      dispatch(signUserFailure(error.response));
    }
  };

  return (
    <div className="text-center mt-5">
      <main className="form-signin w-25 m-auto">
        <form className="form-control" onSubmit={submitSignUpHandler}>
          <Logo />
          <div className="text-center">
            <h3 className="h3 mb-4">Please register</h3>
          </div>
          <Input
            label={"username"}
            state={name}
            className="gap-3"
            setState={setName}
            required={true}
          />
          <Input
            label={"Email"}
            state={email}
            className="gap-3"
            setState={setEmail}
            required={true}
          />
          <Input
            type={"password"}
            label={"Password"}
            state={password}
            className="gap-3"
            setState={setPassword}
            required={true}
          />
          <ValidationError />
          <button
            className="w-100 btn btn-lg btn-primary mt-2"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "Sign up"}
          </button>
        </form>
      </main>
    </div>
  );
};

export default Register;
