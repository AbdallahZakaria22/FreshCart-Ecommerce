import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

export let WishlistContext = createContext();

export default function WishlistContextProvider(props) {
  const [numberOfWishList, setNumberOfWishLists] = useState(0);
  const [WishLists, setWishLists] = useState([]);

  let headers = { token: localStorage.getItem("Token") };

  async function addToWishList(productId) {
    return await axios
      .post(
        "https://ecommerce.routemisr.com/api/v1/wishlist",
        {
          productId,
        },
        {
          headers,
        }
      )
      .then((data) => {
        toast.success(`${data.data.message}`);
        setNumberOfWishLists(data.data.data.length);

        getWishListItems();
      })
      .catch((error) => {
        toast.error(`${error.message}`);
      });
  }

  async function getWishListItems() {
    return await axios
      .get("https://ecommerce.routemisr.com/api/v1/wishlist", {
        headers,
      })
      .then((data) => {
        setNumberOfWishLists(data.data.count);

        setWishLists(data.data.data);
      })
      .catch((error) => {
        // toast.error(`${error.message}`);
      });
  }

  async function deleteItemOnWishList(id) {
    return await axios
      .delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`, {
        headers,
      })
      .then((data) => {
        toast.success(`Product is removed successfully from your Wishlist`);
        getWishListItems();
      })
      .catch((error) => {
        toast.error(`Erooooor`);
      });
  }

  useEffect(() => {
    getWishListItems();
  }, []);

  return (
    <WishlistContext.Provider
      value={{
        addToWishList,
        numberOfWishList,
        getWishListItems,
        WishLists,
        deleteItemOnWishList,
      }}
    >
      {props.children}
    </WishlistContext.Provider>
  );
}
