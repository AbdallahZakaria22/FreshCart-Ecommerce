import "./App.css";
import "../node_modules/@fortawesome/fontawesome-free/css/all.min.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Components/Layout/Layout";
import Home from "./Components/Home/Home";
import Signin from "./Components/signin/Signin";
import Signup from "./Components/Signup/Signup";
import Products from "./Components/Products/Products";
import Categories from "./Components/Categories/Categories";
import Brands from "./Components/Brands/Brands";
import Cart from "./Components/Cart/Cart";
import NotFound from "./Components/NotFound/NotFound";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProtectedRoutes from "./Components/ProtectedRoutes/ProtectedRoutes";
import ProtectedAuth from "./Components/ProtectedAuth/ProtectedAuth";
import { QueryClient, QueryClientProvider } from "react-query";
import ProductDetails from "./Components/ProductDetails/ProductDetails";
import Wishlist from "./Components/Wishlist/Wishlist";
import AllOrders from "./Components/AllOrders/AllOrders";
import Checkout from "./Components/Checkout/Checkout";
import VerifyCode from "./Components/VerifyCode/VerifyCode";
import ForgetPassword from "./Components/ForgetPassword/ForgetPassword";
import ResetPassword from "./Components/ResetPassword/ResetPassword";

function App() {
  const queryClient = new QueryClient();

  let routes = createBrowserRouter([
    {
      path: "/FreshCart-Ecommerce/",
      element: <Layout />,
      children: [
        { index: true, element: <Home /> },
        {
          path: "/FreshCart-Ecommerce/login",
          element: (
            <ProtectedAuth>
              <Signin />{" "}
            </ProtectedAuth>
          ),
        },
        {
          path: "/FreshCart-Ecommerce/register",
          element: (
            <ProtectedAuth>
              {" "}
              <Signup />
            </ProtectedAuth>
          ),
        },
        {
          path: "/FreshCart-Ecommerce/products",
          element: (
            <ProtectedRoutes>
              <Products />
            </ProtectedRoutes>
          ),
        },
        {
          path: "/FreshCart-Ecommerce/products/:id",
          element: (
            <ProtectedRoutes>
              <ProductDetails />
            </ProtectedRoutes>
          ),
        },
        {
          path: "/FreshCart-Ecommerce/categories",
          element: (
            <ProtectedRoutes>
              <Categories />
            </ProtectedRoutes>
          ),
        },
        {
          path: "/FreshCart-Ecommerce/wishlist",
          element: (
            <ProtectedRoutes>
              <Wishlist />
            </ProtectedRoutes>
          ),
        },
        {
          path: "/FreshCart-Ecommerce/brands",
          element: (
            <ProtectedRoutes>
              <Brands />
            </ProtectedRoutes>
          ),
        },
        {
          path: "/FreshCart-Ecommerce/cart",
          element: (
            <ProtectedRoutes>
              <Cart />
            </ProtectedRoutes>
          ),
        },
        ,
        {
          path: "/FreshCart-Ecommerce/allOrders",
          element: (
            <ProtectedRoutes>
              <AllOrders />
            </ProtectedRoutes>
          ),
        },
        ,
        {
          path: "/FreshCart-Ecommerce/checkout",
          element: (
            <ProtectedRoutes>
              <Checkout />
            </ProtectedRoutes>
          ),
        },
        {
          path: "/FreshCart-Ecommerce/verify-code",
          element: <VerifyCode />,
        },
        {
          path: "/FreshCart-Ecommerce/forget-password",
          element: <ForgetPassword />,
        },
        {
          path: "/FreshCart-Ecommerce/reset-password",
          element: <ResetPassword />,
        },
        { path: "/FreshCart-Ecommerce/*", element: <NotFound /> },
      ],
    },
  ]);
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={routes}></RouterProvider>
        <ToastContainer />
      </QueryClientProvider>
    </>
  );
}

export default App;
