import { Link, useNavigate } from "react-router-dom";
import logo from "./constants/Copilot_20250912_191729.png";
import { useDispatch, useSelector } from "react-redux";
import { removeItem } from "../helpers/persistence-storage";
import { logoutUser } from "../slice/auth";
import { IoMdCart } from "react-icons/io";


const Navbar = () => {
  const { loggedIn, user } = useSelector((state) => state.auth);
  const {items} = useSelector(state => state.cart)
  console.log(items)
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(logoutUser());
    removeItem("token");
    navigate("/login");
  };

  return (
    <div className="d-flex flex-md-row align-items-center pb-3 mb-4 border-bottom container pt-0 fixed-top"
    style={{
      backgroundColor: "#fff",   
      padding: "0.75rem 2rem",   
      zIndex: 1030,             
    }}
>
      <Link to={"/"}>
        <img
          src={logo}
          alt=""
          width={70}
          style={{
            borderRadius: "50%",
            marginRight: "15px", // Added margin to create space
          }}
        />
      </Link>
      <nav className="d-inline-flex mt-2 mt-md-0 ms-md-auto align-items-center">
      <Link to="/cart" className="btn btn-outline-primary me-3">
      <IoMdCart />
      Cart ({items.length})
      </Link>

  {loggedIn ? (
    <>
      <p className="mb-0 me-5 fw-medium fs-3 text-dark">
        {`Welcome, ${user?.name}`}
      </p>

      <button
        className="btn btn-outline-danger me-5"
        style={{ height: "2.5rem" }} // kept only if needed
        onClick={logoutHandler}
      >
        Logout
      </button>
    </>
  ) : (
    <>
{/* Styled login and register buttons */}
<Link className="btn btn-outline-primary me-2" to="/login">
  Login
</Link>
<Link className="btn btn-primary me-2" to="/register">
  Register
</Link>

    </>
  )}
</nav>

    </div>
  );
};

export default Navbar;
