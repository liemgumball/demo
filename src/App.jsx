import { RouterProvider } from "react-router-dom";
import router from "@/routes/index.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster.jsx";

// Create a client
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />;
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
