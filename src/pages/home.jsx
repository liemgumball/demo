import List from "@/components/list.jsx";
import { useQuery } from "@tanstack/react-query";
import { getAllResource } from "@/services/resourse.js";
import ResourceItem from "@/components/resource-item.jsx";

const Home = () => {
  const {
    isLoading,
    isError,
    data: resources,
  } = useQuery({
    queryKey: ["resources"],
    queryFn: getAllResource,
  });

  return (
    <main className="">
      <List isLoading={isLoading} isError={isError}>
        {resources && resources.length ? (
          <ul className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
            {resources.map((i) => (
              <ResourceItem {...i} key={i.id} />
            ))}
          </ul>
        ) : (
          <p className="text-muted-foreground text-center">No data!</p>
        )}
      </List>
    </main>
  );
};

export default Home;
