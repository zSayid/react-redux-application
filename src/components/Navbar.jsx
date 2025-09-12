import { Link } from "react-router-dom";
import logo from './constants/Copilot_20250912_191729.png';

const Navbar = () => {
  return (
    <div class="d-flex flex-column flex-md-row align-items-center pb-3 mb-4 border-bottom container pt-3">
      <Link to={'/'} >
      <img src={logo} alt="" width={70} style={{
        borderRadius: '50%'
      }}/>
      </Link>
      <nav class="d-inline-flex mt-2 mt-md-0 ms-md-auto">
        <Link to={'/login'} className="me-3 py-2 link-body-emphasis text-decoration-none" > Login</Link>
        <Link to={'/register'} className="me-3 py-2 link-body-emphasis text-decoration-none">Register</Link>
      </nav>
    </div>
  );
};

export default Navbar;
