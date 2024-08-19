import { Button } from "@/components/ui/button.jsx";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="container mt-16 space-y-4">
      <h1 className="text-destructive text-center uppercase">
        Page not found!
      </h1>
      <div className="flex justify-center">
        <Button asChild>
          <Link to="/">Go back</Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
