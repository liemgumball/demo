import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <ul>
      <NavLink className="px-3 py-2 rounded" to="/users">
        User
      </NavLink>

      <NavLink className="px-3 py-2 rounded" to="/requests">
        Requests
      </NavLink>
    </ul>
  );
};

export default Navbar;
