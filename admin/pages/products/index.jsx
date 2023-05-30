import jwt from "jsonwebtoken";
import Link from "next/link";
import { newAxios } from "@/lib/axios";
import { useState } from "react";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import { TrashIcon } from "@heroicons/react/24/outline";
import Head from "next/head";

const Products = ({ user, products }) => {
  const [theProducts, setTheProducts] = useState(products);

  return (
    <div>
      <Head>
        <title>
          Products
        </title>
      </Head>
      <div></div>
      <Link className="btn" href={"/products/new"}>
        Add new product
      </Link>

      <div className="mt-8 p-4 max-h-[500px] overflow-y-scroll myScroll ">
        <table className="w-full  capitalize border border-black ">
          <thead className="bg-black text-white ">
            <tr>
              <td className="p-4 border-r border-gray-300">Product name</td>
              <td className="p-4">actions</td>
            </tr>
          </thead>
          <tbody>
            {products.length === 0 && (
              <tr>
                <td>no products</td>
              </tr>
            )}
            {theProducts.map((el) => (
              <tr className="even:bg-gray-200 bg-gray-100" key={el._id}>
                <td className="p-2 border border-gray-300 ">{el.name}</td>
                <td className="p-2 border border-gray-300 text-center">
                  <Link href={`/products/edit/${el._id}`}>
                    <button className="px-3 py-1 text-white bg-black inline-flex items-center gap-1 rounded-l-md">
                      <PencilSquareIcon className="h-4 text-white" />
                      Edit
                    </button>
                  </Link>
                 <Link href={`/products/delete/${el._id}`}><button className="px-3 py-1 text-white bg-red-500 inline-flex items-center gap-1 rounded-r-md">
                    <TrashIcon className="h-4 text-white" />
                    Delete
                  </button></Link> 
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Products;

export async function getServerSideProps({ req, res }) {
  const user = jwt.verify(
    req.cookies.accessToken,
    process.env.JWT_SECRET,
    (error, token) => {
      if (error) return null;

      return (req.user = token);
    }
  );
  const theResult = await newAxios("/products");
  if (!user)
    return { redirect: { destination: "/register", permanent: false } };

  return {
    props: { user, products: theResult.data },
  };
}
