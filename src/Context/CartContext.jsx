import axios from "axios";
import React from "react";
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

export let CartContext = createContext();

export default function CartContextProvider(props) {
  const [numberOfItem, setNumberOfItems] = useState(0);
  const [carProducts, setcarProducts] = useState([]);
  const [totalPrise, setTotalPrise] = useState(0);
  const [cartId, setcartId] = useState("");
  
  let headers = { token: localStorage.getItem("Token") };

  async function addToCart(productId) {
    return await axios
      .post(
        "https://ecommerce.routemisr.com/api/v1/cart",
        {
          productId,
        },
        {
          headers,
        }
      )
      .then((data) => {
        toast.success(`${data.data.message}`);
        setNumberOfItems(data.data.numOfCartItems);
        setcarProducts(data.data.data.products);
        setTotalPrise(data.data.data.totalCartPrice);
      })
      .catch((error) => {
        toast.error(`${error.message}`);
      });
  }

  async function getCartItems() {
    return await axios
      .get("https://ecommerce.routemisr.com/api/v1/cart", {
        headers,
      })
      .then((data) => {
        setTotalPrise(data.data.data.totalCartPrice);
        setcarProducts(data.data.data.products);
        setNumberOfItems(data.data.numOfCartItems);
        setcartId(data.data.cartId);
      })
      .catch((error) => {
        // toast.error(`${error.message}`);
      });
  }

  async function updateCart(id, count) {
    return await axios
      .put(
        `https://ecommerce.routemisr.com/api/v1/cart/${id}`,
        {
          count,
        },
        {
          headers,
        }
      )
      .then((data) => {
        toast.success(`Product is Updated successfully`);
        setNumberOfItems(data.data.numOfCartItems);
        setcarProducts(data.data.data.products);
        setTotalPrise(data.data.data.totalCartPrice);
      })
      .catch((error) => {});
  }

  async function deleteItemOnCart(id) {
    return await axios
      .delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, {
        headers,
      })
      .then((data) => {
        toast.success(`Product is removed successfully from your Cart`);
        setNumberOfItems(data.data.numOfCartItems);
        setcarProducts(data.data.data.products);
        setTotalPrise(data.data.data.totalCartPrice);
      })
      .catch((error) => {
        toast.error(`Erooooor`);
      });
  }

  async function cleerCart() {
    return await axios
      .delete(`https://ecommerce.routemisr.com/api/v1/cart`, {
        headers,
      })
      .then((data) => {
        toast.success(`Cart is cleared successfully`);
        getCartItems();
      })
      .catch((error) => {
        toast.error(`Erooooor`);
      });
  }

  async function OnlineCheckOut(shippingAddress) {
    return await axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${window.location.origin}`,
        {
          shippingAddress,
        },
        {
          headers,
        }
      )
      .then((data) => {
        window.location.href = data.data.session.url;
      })
      .catch((error) => {
        toast.error(`${error.message}`);
      });
  }
  async function CashCheckOut(shippingAddress) {
    return await axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,
        {
          shippingAddress,
        },
        {
          headers,
        }
      )
      .then((data) => {
        toast.success(`${data.data.status}`);
        window.location.href = `${window.location.origin}/FreshCart-Ecommerce/allOrders`;
        cleerCart();
      })
      .catch((error) => {
        toast.error(`${error.message}`);
      });
  }

  useEffect(() => {
    getCartItems();
  }, []);

  return (
    <CartContext.Provider
      value={{
        addToCart,
        numberOfItem,
        getCartItems,
        carProducts,
        updateCart,
        deleteItemOnCart,
        totalPrise,
        cleerCart,
        cartId,
        CashCheckOut,
        OnlineCheckOut,
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
}
