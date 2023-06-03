import { ShoppingCartIcon } from "@heroicons/react/24/solid";
import { useDispatch } from "react-redux";
import { addToCart } from "@/slices/cartSlice";

const Featured = ({product}) => {

const dispatch = useDispatch()

  return (
    <div className="bg-zinc-800 min-h-[500px]">
      <div className="max-w-[1100px] mx-auto px-5 py-2 flex flex-col md:flex-row gap-16 pt-20 justify-between items-center">
        <div className="flex flex-col gap-7 max-w-[600px]">
          <h1 className="text-white text-5xl">
           {product.name}
          </h1>
          <p className="text-white text-justify">
      {product.desc}
          </p>
          <div className="flex items-center gap-3 ">
            <button className="px-5 py-1 rounded-md text-white border border-white duration-300 hover:bg-white hover:text-zinc-800">
              Read more
            </button>
            <button onClick={()=>dispatch(addToCart(product))} className="px-5 py-1 rounded-md text-zinc-800 border border-zinc-800 hover:border-white  bg-white flex items-center gap-2  hover:bg-zinc-800 hover:text-white duration-300 ">
              <ShoppingCartIcon className="h-6" />
              Add to cart
            </button>
          </div>
        </div>
        <img className="max-w-[300px] w-full" src={product.images[1].url} alt="" />
      </div>
    </div>
  );
};

export default Featured
