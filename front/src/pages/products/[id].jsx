import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import { CheckBadgeIcon } from "@heroicons/react/24/outline";
import Head from "next/head";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import { useDispatch } from "react-redux";
import { addToCart } from "@/slices/cartSlice";
import Link from "next/link";

const SingleProduct = ({ product }) => {
  const [index, setIndex] = useState(0);

  const dispatch = useDispatch();

  const handleToCart = () => {
    dispatch(addToCart(product));
  };

  return (
    <div className="bg-zinc-200 min-h-screen">
      
      <Head>
        <title>{product.name}</title>
      </Head>
      <div className=" max-w-[1100px] mx-auto p-5 ">
      <div className="text-right">
          <Link href={"/"}>
            <button className="bg-zinc-800 text-white py-1 px-4 border border-zinc-800 rounded-sm hover:bg-white hover:text-zinc-800 duration-300 my-3">
              Main page
            </button>
          </Link>
        </div>
      <div className="flex flex-col lg:flex-row gap-12">
      <div className="flex-1 p-4 bg-white rounded-sm flex flex-col  ">
          <img
            className="w-full aspect-square object-contain"
            src={product.images[index].url}
          />
          <div className={`flex flex-wrap  gap-2 justify-center mt-8 `}>
            {product.images.map((el, i) => (
              <div
                onClick={() => setIndex(i)}
                key={i}
                className={`cursor-pointer border rounded-sm w-1/6 p-1 ${
                  index === i && "border-zinc-500 "
                }`}
              >
                <img
                  src={el.url}
                  className={`  object-contain w-full h-full`}
                />
              </div>
            ))}
          </div>
        </div>
   
        <div className="flex-[2] p-4">
          <h1 className="text-2xl capitalize font-bold text-zinc-800">
            {product.name}
          </h1>
          <p className="text-justify text-zinc-600">{product.desc}</p>

          <div className="flex flex-col gap-2 my-12 text-zinc-600">
            {product.features.map((el, i) => (
              <div className="text-xs flex items-start gap-1" key={i}>
                <CheckBadgeIcon className="h-6 flex-shrink-0" />
                <span className="flex items-center gap-1 self-center flex-wrap">
                  <span className="capitalize flex-shrink-0">
                    {el.name.replace("_", " ")}:
                  </span>{" "}
                  {Array.isArray(el.value)
                    ? el.value.map((ele, i) => (
                        <span
                          key={i}
                          className="px-2 py-1 bg-white rounded-full border"
                        >
                          {ele}
                        </span>
                      ))
                    : el.value}{" "}
                </span>
              </div>
            ))}
          </div>
          <div className="flex items-center mt-8 gap-4">
            <p className="py-3 font-bold">${product.price.toFixed()}</p>
            <button
              onClick={handleToCart}
              className="bg-zinc-800 justify-center  w-fit px-8 text-xs sm:text-sm text-white py-2 flex items-center  gap-2  rounded-sm  hover:bg-white  border-zinc-800 border  hover:text-zinc-800 duration-300 group"
            >
              <ShoppingCartIcon className="h-6 text-white group-hover:text-zinc-800 duration-300" />{" "}
              Add to cart
            </button>
          </div>
        </div>
      </div>
      
       
      </div>
    </div>
  );
};

export default SingleProduct;

export async function getServerSideProps({ params: { id } }) {
  const res = await axios(`http://localhost:3000/api/products?id=${id}`);

  return {
    props: { product: res.data },
  };
}
