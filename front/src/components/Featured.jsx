import { ShoppingCartIcon } from "@heroicons/react/24/solid";

const Featured = ({product}) => {
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
            <button className="px-5 py-1 rounded-md text-white border border-white ">
              Read more
            </button>
            <button className="px-5 py-1 rounded-md text-white border border-indigo-500  bg-indigo-500 flex items-center gap-2">
              <ShoppingCartIcon className="h-6" />
              Add to cart
            </button>
          </div>
        </div>
        <img className="max-w-[300px] w-full" src={product.images[2].url} alt="" />
      </div>
    </div>
  );
};

export default Featured
