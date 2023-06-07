import axios from "axios";
import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import NewProducts from "@/components/NewProducts";
import Link from "next/link";

const categories = ({ products, categories }) => {

  const router = useRouter();
  const { type } = router.query;


  if (type)
    return (
      <div className="max-w-[1100px] mx-auto pt-8">
        <Head>
          <title>Categories</title>
        </Head>
        <div className="text-right">
          <button
            onClick={() => router.back()}
            className="bg-zinc-800 text-white py-1 px-4 border border-zinc-800 rounded-sm hover:bg-white hover:text-zinc-800 duration-300 my-3"
          >
            Back
          </button>
        </div>
        <NewProducts category={true} products={products} header={type} />
      </div>
    );
  return (
    <div className="min-h-screen bg-zinc-300">
      <Head>
        <title>Categories</title>
      </Head>

      <div className="max-w-[1100px] mx-auto p-4 py-20">
        <h1 className="text-zinc-800 text-4xl">Categories</h1>
        <div className="grid grid-cols-4 gap-4 mt-12">
          {categories.map((el) => (
            <Link className="col-span-2 md:col-span-1 " href={`/categories?type=${el.name}`} key={el._id}>
              <div className=" aspect-square p-4 rounded-md flex  items-center bg-white duration-300 active:scale-95 active:bg-black hover:bg-zinc-800 hover:text-white cursor-pointer justify-center capitalize text-zinc-700 text-lg lg:text-3xl font-semibold">
                {el.name}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default categories;

export async function getServerSideProps(context) {
  const type = context.query.type;
  if (type) {
    const products = await axios(
      `https://next-full-ecommerce.vercel.app/api/products?category=${type}`
    );

    return {
      props: {
        products: products.data,
      },
    };
  } else {
    const res = await axios("https://next-full-ecommerce.vercel.app/api/categories");
   

    return {
      props: { categories: res.data },
    };
  }
}
