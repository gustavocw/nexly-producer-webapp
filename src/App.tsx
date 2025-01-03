import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "contexts/AuthContext";
import AppRoutes from "routes/routes";
import { Toaster } from "components/ui/toaster";
import { UserProvider } from "contexts/ProducerContext";

function App() {
  const queryClient = new QueryClient();

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <UserProvider>
            <AppRoutes />
            <Toaster />
          </UserProvider>
        </AuthProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;
