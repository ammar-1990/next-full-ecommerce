import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import { CheckBadgeIcon } from "@heroicons/react/24/outline";

const SingleProduct = ({ product }) => {
  const [index, setIndex] = useState(0);

  return (
    <div className="bg-zinc-200 min-h-screen">
      <div className="flex flex-col lg:flex-row max-w-[1100px] mx-auto p-5 gap-12">
        <div className="flex-1 p-4 bg-white rounded-sm flex flex-col  ">
          <img
            className="w-full aspect-square object-contain"
            src={product.images[index].url}
          />
          <div className="flex flex-wrap  gap-1  mt-8">
            {product.images.map((el, i) => (
              <img
                onClick={() => setIndex(i)}
                key={i}
                src={el.url}
                className={`cursor-pointer w-1/6 aspect-square object-contain border ${
                  index === i && "border-zinc-600"
                }`}
              />
            ))}
          </div>
        </div>
        <div className="flex-[2] p-4">
          <h1 className="text-2xl capitalize font-bold text-zinc-800">
            {product.name}
          </h1>
          <p className="text-justify text-zinc-600">{product.desc}</p>
          <p className="py-3 font-bold">${product.price.toFixed()}</p>
          <div className="flex flex-col gap-2  text-zinc-600">
            {product.features.map((el, i) => (
              <div className="text-xs flex items-start gap-1" key={i}>
                  <CheckBadgeIcon className="h-6 flex-shrink-0" />
                <span className="flex items-center gap-1 self-center flex-wrap">
                
                  <span className="capitalize flex-shrink-0">
                    {el.name.replace("_", " ")}:
                  </span>{" "}
                  {Array.isArray(el.value)
                    ? el.value.map((ele, i) => (
                        <span key={i} className="px-2 py-1 bg-white rounded-full border">
                          {ele}
                         
                        </span>
                      ))
                    : el.value}{" "}
                </span>
              </div>
            ))}
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
