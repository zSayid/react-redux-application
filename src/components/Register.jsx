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
import { validatePassword } from '../utils/validation';


const Register = () => {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(""); // State for email error
  const [passwordError, setPasswordError] = useState(""); // State for password error
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.auth.isLoading);

  const submitSignUpHandler = async (e) => {
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
    const user = { name, email, password };

    try {
      const response = await AuthService.userRegister(user);
      console.log("API Response:", response); // Debugging log
      dispatch(signUserSuccess());
      setName(""); 
      setEmail(""); 
      setPassword(""); 
    } catch (error) {
      console.log(error.response.data);
      dispatch(signUserFailure(error.response.errors));
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
          {emailError && <p style={{ color: "red" }}>{emailError}</p>} {/* Display email error */}
          <Input
            type={"password"}
            label={"Password"}
            state={password}
            className="gap-3"
            setState={setPassword}
            required={true}
          />
          {passwordError && <p style={{ color: "red" }}>{passwordError}</p>} {/* Display password error */}
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
