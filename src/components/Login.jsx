import Logo from "../ui/Logo";
import Input from "../ui/Input";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
  signUserStart,
  signUserSuccess,
  signUserFailure,
} from "../slice/auth";
import AuthService from "../service/auth";
import ValidationError from "../utils/validation-error";


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.auth.isLoading);

  const submitLoginHandler = async (e) => {
    e.preventDefault();


    dispatch(signUserStart());
    const user = { email, password };

    try {
      const response = await AuthService.userLogin(user);
      dispatch(signUserSuccess(response.data)); 
      setEmail("");
      setPassword("");
    } catch (error) {
      console.error("API Error:", error); 
      // Dispatch error with proper structure
      dispatch(
        signUserFailure({
          data: {
            errors: error.response?.data?.errors || ["An unexpected error occurred."],
          },
        })
      );
    }
  };

  return (
    <div className="tex-center mt-5" onSubmit={submitLoginHandler}>
      <main className="form-signin w-25 m-auto">
        <form className="form-control">
          <Logo />
          <div className="text-center">
            <h3 className="h3 mb-4">Please sign in</h3>
          </div>
          <Input
            label={"Email"}
            state={email}
            className="gap-3"
            setState={setEmail}
          />

          <Input
            type={"password"}
            label={"Password"}
            state={password}
            className="gap-3"
            setState={setPassword}
          />
          <ValidationError />
          <button
            className="w-100 btn btn-lg btn-primary mt-2"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "Sign In"}
          </button>
        </form>
      </main>
    </div>
  );
};

export default Login;
