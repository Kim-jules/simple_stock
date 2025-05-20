import { Link } from "react-router-dom";
import { useAuth } from "../contexts/authContext";

const NavBar = () => {
  return (
    <nav className="antialiased font-sans text-sm flex justify-between py-5 px-32 bg-slate-100">
      <div className="logo">
        <h1 className="text-2xl font-sans font-black">Quino shop</h1>
      </div>
      <div className="links flex gap-8">
        <Link to={"/"}>Home</Link>
        <Link to={"/about"}>About</Link>
      </div>
      <div className="buttons grid grid-cols-2 gap-6 items-center">
        <Link
          to={"/login"}
          className="border border-black px-4 py-2 flex justify-center"
        >
          Login
        </Link>
        <Link
          to={"/register"}
          className="border border-black px-4 py-2 flex justify-center"
        >
          Register
        </Link>
      </div>
    </nav>
  );
};

export default NavBar;
