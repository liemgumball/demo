import { LoaderIcon } from "lucide-react";

// eslint-disable-next-line react/prop-types
const List = ({ children, isError, isLoading }) => {
  if (isLoading)
    return (
      <div className="flex p-2">
        <LoaderIcon className="animate-spin text-muted-foreground" />
      </div>
    );

  if (isError)
    return <h2 className="text-destructive">{"Something went wrong!"}</h2>;

  return children;
};

export default List;
