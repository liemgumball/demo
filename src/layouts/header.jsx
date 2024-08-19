import { HomeIcon } from "lucide-react";
import { Button } from "@/components/ui/button.jsx";
import { Link } from "react-router-dom";
import { removeAuth } from "@/helpers/auth.js";
import { useUserStore } from "@/store/user";
import Navbar from "@/layouts/navbar.jsx";

const Header = () => {
  const removeUser = useUserStore((state) => state.removeUser);
  const user = useUserStore((state) => state.user);

  return (
    <header className="flex justify-between gap-4 items-center mb-4">
      <div className="flex gap-2 items-center">
        <Button variant="icon">
          <Link to="/">
            <HomeIcon />
          </Link>
        </Button>
        {user && user.role === "admin" && <Navbar />}
      </div>
      {user ? (
        <div className="space-x-2">
          <span>{user.username}</span>
          <Button
            onClick={() => {
              removeAuth();
              removeUser();
            }}
          >
            Logout
          </Button>
        </div>
      ) : (
        <div className="space-x-2">
          <Button asChild>
            <Link to="/login">Login</Link>
          </Button>
          <Button asChild variant="secondary">
            <Link to="/register">Sign up</Link>
          </Button>
        </div>
      )}
    </header>
  );
};

export default Header;
