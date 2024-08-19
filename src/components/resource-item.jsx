import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.jsx";

import { Link } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const ResourceItem = ({ id, name, description }) => {
  return (
    <Link to={`/resources/${id}`}>
      <Card>
        <CardHeader>
          <CardTitle>{name}</CardTitle>
        </CardHeader>
        <CardContent></CardContent>
        <CardFooter>
          <CardDescription>{description}</CardDescription>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default ResourceItem;
