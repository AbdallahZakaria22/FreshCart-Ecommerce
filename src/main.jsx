import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./index.css";
import App from "./App.jsx";
import TokenContextProvider from "./Context/TokenContext.jsx";
import CartContextProvider from "./Context/CartContext.jsx";
import WishlistContextProvider from "./Context/WishlistContext.jsx";

createRoot(document.getElementById("root")).render(
  <WishlistContextProvider>
    <CartContextProvider>
      <TokenContextProvider>
        <StrictMode>
          <App />
        </StrictMode>
      </TokenContextProvider>
    </CartContextProvider>
  </WishlistContextProvider>
);
