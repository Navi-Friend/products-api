import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Wrapper } from "./pages/Wrapper";
import { PAGES } from "./constants/constants";
import { Products } from "./pages/Products";
import { ToastContainer } from "react-toastify";
import { Statistics } from "./pages/Statistics";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const router = createBrowserRouter([
    {
        element: <Wrapper />,
        children: [
            {
                path: PAGES.main,
                element: <Products />,
            },
            {
                path: PAGES.statistics,
                element: <Statistics />,
            },
            {
                path: "*",
                element: <div>Страница не найдена</div>,
            },
        ],
    },
]);

const queryClient = new QueryClient();

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />

            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                closeOnClick
                pauseOnHover
                draggable
                theme="light"
            />
        </QueryClientProvider>
    );
}

export default App;

