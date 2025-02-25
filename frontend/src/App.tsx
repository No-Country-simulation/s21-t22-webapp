// import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AppRouter from './routes/Router';

const queryClient = new QueryClient();

export const App = () => {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <AppRouter />
        {/* <ReactQueryDevtools initialIsOpen={false} position="bottom-left" /> */}
      </QueryClientProvider>
    </>
  );
};

export default App;
