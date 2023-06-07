import { ShoppingCartIcon } from "@heroicons/react/24/solid";
import { useDispatch } from "react-redux";
import { addToCart } from "@/slices/cartSlice";
import { Swiper, SwiperSlide } from "swiper/react";
import { useState } from "react";
import "swiper/css";
import Link from "next/link";
const NewProduct = ({
  name,
  desc,
  features,
  images,
  cat,
  price,
  _id,
  createdAt,
  updatedAt,
}) => {
  const dispatch = useDispatch();
  const handleToCart = () => {
    const product = {
      name,
      desc,
      features,
      images,
      cat,
      price,
      _id,
      createdAt,
      updatedAt,
    };
    dispatch(addToCart(product));
  };

  const [index, setIndex] = useState(1);
  return (
    <div className="w-[330px]  flex flex-col gap-1 bg-white rounded-sm overflow-hidden pb-3">
      <Swiper
        className="w-full relative"
        slidesPerView={1}
        spaceBetween={20}
        onSlideNextTransitionStart={() => setIndex((prev) => prev + 1)}
        onSlidePrevTransitionStart={() => setIndex((prev) => prev - 1)}
      >
        <span className="absolute text-white px-6 bg-zinc-900/40 text-sm bottom-10 right-0 z-10">{`${index}/${images.length}`}</span>
        {images.map((el, i) => (
          <SwiperSlide className=" " key={el.url}>
            <img
              className="object-contain aspect-square w-full "
              src={el.url}
              alt={name}
            />
          </SwiperSlide>
        ))}
        ...
      </Swiper>

      <div className="p-5 py-0 flex flex-col gap-2 ">
        <h1 className="text-xl font-semibold line-clamp-1">{name}</h1>
        <p className="text-xs text-zinc-600 text-justify line-clamp-3 font-normal">
          {desc}
        </p>
        <div className="flex justify-between py-4">
          <p className="font-semibold text-xs">${price.toFixed(2)}</p>
          <Link href={`/categories?type=${cat.toLowerCase()}`} className="hover:underline underline-offset-2 decoration-zinc-600"><p className="text-gray-500 uppercase  text-xs">{cat}</p></Link>
        </div>
      </div>
      <div className="flex gap-2 items-center px-4">
        {" "}
        <button
          onClick={handleToCart}
          className="bg-zinc-800 justify-center flex-1 text-xs sm:text-sm text-white py-2 flex items-center  gap-2  rounded-sm  hover:bg-white  border-zinc-800 border  hover:text-zinc-800 duration-300 group"
        >
          <ShoppingCartIcon className="h-6 text-white group-hover:text-zinc-800 duration-300" />{" "}
          Add to cart
        </button>
        <Link
          href={`/products/${_id}`}
          className="py-2 rounded-sm text-zinc-800 border flex-1 text-xs sm:text-sm h-full   justify-center  border-zinc-800   bg-white flex items-center gap-2  hover:bg-zinc-800 hover:text-white duration-300"
        >
          More info
        </Link>
      </div>
    </div>
  );
};

export default NewProduct;
