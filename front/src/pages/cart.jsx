import {
  addToCart,
  getCart,
  getTotal,
  removeAll,
  removeFromCart,
} from "@/slices/cartSlice";
import { useEffect, useReducer } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getAll } from "@/slices/cartSlice";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Link from "next/link";
import Head from 'next/head'

const cart = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAll());
  }, []);

  const { cart, loading } = useSelector(getCart);
  const total = useSelector(getTotal);

  const [state, setState] = useState({
    name: "",
    email: "",
    city: "",
    postal: "",
    street: "",
    country: "",
    cart: JSON.stringify(cart),
  });

  const [fetchLoading, setFetchLoading] = useState(false);
  const [error, setError] = useState("");
  const [order, setOrder] = useState(null);

  const router = useRouter();

  useEffect(() => {
    console.log(router);
  }, []);

  if (loading) return "Loading...";

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setError("");
      setFetchLoading(true);
      const res = await axios.post("http://localhost:3001/api/orders", {
        ...state,
      });
      console.log(res.data);
      setOrder(res.data);
      setState({
        name: "",
        email: "",
        city: "",
        postal: "",
        street: "",
        country: "",
        cart: JSON.stringify(cart),
      });

      router.push("?success=true");
      dispatch(removeAll());
    } catch (error) {
      setError(error.response.data);
    } finally {
      setFetchLoading(false);
    }

    setState({
      name: "",
      email: "",
      city: "",
      postal: "",
      street: "",
      country: "",
      cart: JSON.stringify(cart),
    });
  };

  useEffect(() => {
    console.log("cart", state.cart);
    setState((prev) => ({ ...prev, cart: JSON.stringify(cart) }));
  }, [cart]);

  if (router.asPath.includes("/cart?success=true") && order !== null)
    return (
      <div className="max-w-[1100px] mx-auto px-6 py-3">
        <Head>
          <title>
            Cart
          </title>
        </Head>
        <div className="text-green-500 p-4 bg-green-100 border border-green-500 w-fit mx-auto">
          <h1 className="text-2xl text-center ">Thank you very much! </h1>
          <p className="text-center ">We will email you when order is sent.</p>
        </div>

        <div className="py-4 max-w-[300px] mx-auto w-full p-4 bg-zinc-200 border border-zinc-300 rounded-sm my-8">
          <h2 className="uppercase text-gray-600 gont-bold text-2xl text-center">
            Order info
          </h2>
          <div className="py-1 flex items-center gap-3">
            <p className="capitalize text-gray-700">Name: </p>
            <p className="text-gray-700 capitalize">{order?.name}</p>
          </div>
          <div className="py-1 flex items-center gap-3">
            <p className="capitalize text-gray-700">email: </p>
            <p className="text-gray-700">{order?.email}</p>
          </div>
          <div className="py-1 flex items-center gap-3">
            <p className="capitalize text-gray-700">city: </p>
            <p className="text-gray-700 capitalize">{order?.city}</p>
          </div>
          <div className="py-1 flex items-center gap-3">
            <p className="capitalize text-gray-700">country: </p>
            <p className="text-gray-700 capitalize">{order?.country}</p>
          </div>
          <div className="py-1 flex items-center gap-3">
            <p className="capitalize text-gray-700">street: </p>
            <p className="text-gray-700 capitalize">{order?.street}</p>
          </div>

          <div className="py-1 flex items-center gap-3">
            <p className="capitalize text-gray-700">total: </p>
            <p className="text-gray-700">
              $
              {order?.cart.reduce(
                (total, el) => total + el.price * el.amount,
                0
              )}
            </p>
          </div>

          <button
            onClick={() => router.replace("/")}
            className="w-full py-2 block text-center bg-zinc-800 text-white mt-4 rounded-sm"
          >
            Back to main page
          </button>
        </div>
      </div>
    );

  return (
    <div className="bg-zinc-200 min-h-screen pb-10">
        <Head>
          <title>
            Cart
          </title>
        </Head>
      <div className="max-w-[1100px] mx-auto px-5 pt-8 ">
        <div className="text-right"><Link href={'/'}><button className="bg-zinc-800 text-white py-1 px-4 border border-zinc-800 rounded-sm hover:bg-white hover:text-zinc-800 duration-300 my-3">Main page</button></Link></div>
        <div className="grid grid-cols-5 gap-5">
          <div className="lg:col-span-3 col-span-5 p-10 px-6 rounded-lg bg-white">
            <h1 className="text-2xl font-bold">Cart</h1>

            <table className="w-full mt-8 border-separate border-spacing-4">
              <thead className="text-gray-500 capitalize font-semibold text-lg   ">
                <tr>
                  <td>product</td>
                  <td>quantity</td>
                  <td>price</td>
                </tr>
              </thead>
              <tbody className="">
                {cart.length === 0 && (
                  <tr>
                    <td>No products in your cart</td>
                  </tr>
                )}
                {[...cart].reverse().map((el) => (
                  <tr className="" key={el._id}>
                    <td className="">
                      {" "}
                      <div className="flex flex-col">
                        <img
                          className="w-28 h-28 object-contain"
                          src={el.images[0].url}
                        />
                        <p className="text-sm py-2 text-gray-800 w-fit">
                          {el.name}
                        </p>
                      </div>
                    </td>
                    <td>
                      <div className="flex items-center gap-2">
                        <span
                          className="flex items-center justify-center w-8 h-8 bg-zinc-300 hover:bg-zinc-500 hover:text-zinc-200 duration-300 rounded-md cursor-pointer text-zinc-600"
                          onClick={() => dispatch(addToCart(el))}
                        >
                          +
                        </span>
                        <span className="text-zinc-700">{el.amount}</span>
                        <span
                          className="flex items-center justify-center w-8 h-8 bg-zinc-300 hover:bg-zinc-500 hover:text-zinc-200 duration-300 rounded-md cursor-pointer text-zinc-600"
                          onClick={() => dispatch(removeFromCart(el))}
                        >
                          -
                        </span>
                      </div>
                    </td>
                    <td className="font-semibold ">${el.price * el.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="p-4 border-t mt-4 text-right border-zinc-400">
              Total: ${total}
            </div>
          </div>
          <div className="lg:col-span-2 col-span-5 sm:p-10 p-4 rounded-lg bg-white">
            <h1 className="text-2xl font-bold capitalize">order information</h1>
            <form onSubmit={handleSubmit} className="mt-8">
              <input
                name="name"
                value={state.name}
                onChange={(e) =>
                  setState((prev) => ({
                    ...prev,
                    [e.target.name]: e.target.value,
                  }))
                }
                className="input w-full mb-2"
                type="text"
                placeholder="Name"
              />
              <input
                name="email"
                value={state.email}
                onChange={(e) =>
                  setState((prev) => ({
                    ...prev,
                    [e.target.name]: e.target.value,
                  }))
                }
                className="input w-full mb-2"
                type="email"
                placeholder="Email"
              />
              <div className="mb-2 flex items-center gap-2 ">
                <input
                  name="city"
                  value={state.city}
                  onChange={(e) =>
                    setState((prev) => ({
                      ...prev,
                      [e.target.name]: e.target.value,
                    }))
                  }
                  className="input w-1/2 "
                  type="text"
                  placeholder="City"
                />
                <input
                  name="postal"
                  value={state.postal}
                  onChange={(e) =>
                    setState((prev) => ({
                      ...prev,
                      [e.target.name]: e.target.value,
                    }))
                  }
                  className="input w-1/2 "
                  type="text"
                  placeholder="Postal Code"
                />
              </div>
              <input
                name="street"
                value={state.street}
                onChange={(e) =>
                  setState((prev) => ({
                    ...prev,
                    [e.target.name]: e.target.value,
                  }))
                }
                className="input w-full mb-2"
                type="text"
                placeholder="Street Address"
              />
              <input
                name="country"
                value={state.country}
                onChange={(e) =>
                  setState((prev) => ({
                    ...prev,
                    [e.target.name]: e.target.value,
                  }))
                }
                className="input w-full mb-2"
                type="text"
                placeholder="Country"
              />

              <button
                disabled={
                  !state.name ||
                  !state.email ||
                  !state.city ||
                  !state.street ||
                  !state.postal ||
                  !state.country ||
                  cart.length === 0
                }
                className="py-2 w-full text-white disabled:bg-gray-500 bg-zinc-800 font-normal rounded-sm border border-zinc-800 hover:bg-white hover:text-zinc-800  duration-300"
              >
                {fetchLoading ? "Loading..." : "Continue to payment"}
              </button>
              {error && <p className="py-4 text-xs text-red-500">{error}</p>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default cart;
