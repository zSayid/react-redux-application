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
import { validatePassword } from "../utils/validation";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(""); // State for password error
  const [emailError, setEmailError] = useState(""); // State for email error
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.auth.isLoading);

  const submitLoginHandler = async (e) => {
    e.preventDefault();

    // Validate email and password fields
    if (!email) {
      setEmailError("Email is required.");
    } else {
      setEmailError("");
    }

    if (!password) {
      setPasswordError("Password is required.");
      return;
    }

    if (!validatePassword(password)) {
      setPasswordError("Password must be at least 8 characters long.");
      return;
    }

    setPasswordError(""); // Clear error if validation passes

    if (emailError) return; // Prevent submission if email error exists

    dispatch(signUserStart());
    const user = { email, password };

    try {
      const response = await AuthService.userLogin(user);
      dispatch(signUserSuccess(response.data)); 
      setEmail("");
      setPassword("");
    } catch (error) {
      console.error("API Error:", error); 
      dispatch(signUserFailure(error.response.errors));
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
          {emailError && <p style={{ color: "red" }}>{emailError}</p>} {/* Display email error */}
          <Input
            type={"password"}
            label={"Password"}
            state={password}
            className="gap-3"
            setState={setPassword}
          />
          {passwordError && <p style={{ color: "red" }}>{passwordError}</p>} {/* Display password error */}
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
