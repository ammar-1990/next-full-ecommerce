import { ShoppingCartIcon } from "@heroicons/react/24/solid";
import { useDispatch } from "react-redux";
import { addToCart } from "@/slices/cartSlice";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import Link from "next/link";
const NewProduct = ({ name, desc, features, images, cat, price ,_id,createdAt,updatedAt}) => {

  const dispatch = useDispatch()
const handleToCart = ()=>{
const product = {name,desc,features,images,cat,price,_id,createdAt,updatedAt}
dispatch(addToCart(product))

}


  return (
    <div className="col-span-6 md:col-span-3 lg:col-span-2  mb-4 flex flex-col gap-1 bg-white rounded-md overflow-hidden">
      <Swiper
     className="w-full"
      slidesPerView={1}
      spaceBetween={20}
    
    >
    {images.map(el=> <SwiperSlide className=" "><img className="object-contain aspect-square w-full " src={el.url} alt={name} /></SwiperSlide>)} 
    
      ...
    </Swiper>
   
      <div className="p-5 py-0 flex flex-col gap-2 mt-8">
        <h1 className="text-2xl font-semibold line-clamp-1">{name}</h1>
        <p className="text-sm text-zinc-400 text-justify line-clamp-3">
          {desc}
        </p>
        <div className="flex justify-between py-2 ">
        <p className="font-semibold">${price.toFixed(2)}</p>
        <p className="text-gray-500 uppercase">{cat}</p>
        </div>
      
      </div>
      <button onClick={handleToCart} className="bg-zinc-800 justify-center text-white py-3 flex items-center mb-0 m-2 gap-2  rounded-lg px-4 hover:bg-white  border-zinc-800 border  hover:text-zinc-800 duration-300 group">
        <ShoppingCartIcon className="h-6 text-white group-hover:text-zinc-800 duration-300" />{" "}
        Add to cart
      </button>
      <Link href={`/products/${_id}`} className="py-3 rounded-md text-zinc-800 border   justify-center  border-zinc-800 m-2 mt-0   bg-white flex items-center gap-2  hover:bg-zinc-800 hover:text-white duration-300">See more</Link>
    </div>
  );
};

export default NewProduct;
