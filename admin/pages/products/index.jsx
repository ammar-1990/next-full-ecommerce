import jwt from "jsonwebtoken";
import Link from "next/link";
import { newAxios } from "@/lib/axios";
import { useState } from "react";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import { TrashIcon } from "@heroicons/react/24/outline";
import Head from "next/head";

const Products = ({ user, products,categories }) => {
  const [theProducts, setTheProducts] = useState(products);
  const [_categories,setCategories] = useState(categories)
  const [category,setCategory] = useState('')

  return (
    <div>
      <Head>
        <title>Products</title>
      </Head>
    
      <Link className="btn border  border-zinc-800 hover:bg-transparent hover:text-black duration-300 " href={"/products/new"}>
        Add new product
      </Link>
      <div className="mt-8 flex items-center gap-4 px-5">
      <label>Category</label>
      <select className="formInput capitalize flex-1 cursor-pointer" onChange={e=>setCategory(e.target.value)}>
  <option className="p-1" value={""}>All</option>
  {_categories.map(el=><option key={el._id} value={el.name}>{el.name}</option>)}
</select>
      </div>

      <div className="mt-2 p-4 max-h-[500px] overflow-y-scroll myScroll ">
      
        <table className="w-full  capitalize border border-zinc-800 ">
          <thead className="bg-zinc-800 text-white ">
            <tr>
              <td className="p-4 border-r border-gray-300 text-sm md:text-base">Product name</td>
              <td className="p-4 border-r border-gray-300 text-sm md:text-base">image</td>
              <td className="p-4 text-sm md:text-base">actions</td>
            </tr>
          </thead>
          <tbody>
            {products.length === 0 && (
              <tr>
                <td>no products</td>
              </tr>
            )}
            {category==='' && theProducts.map((el) => (
              <tr className="even:bg-gray-200 bg-gray-100" key={el._id}>
                <td className="p-2 border border-gray-300  ">{el.name}  </td>
                <td className="p-2 border border-gray-300   "><img src={el.images[0].url} className="w-10 h-10 block mx-auto rounded-full object-cover"/></td>
                <td className="p-2 border border-gray-300 text-center ">
                  <Link href={`/products/edit/${el._id}`}>
                    <button className="px-3 py-1 text-white bg-zinc-800 inline-flex items-center w-full sm:w-auto group gap-1 sm:rounded-l-md text-xs sm:text-base border-zinc-800 hover:bg-transparent sm:border-r-0 hover:text-black  border duration-300">
                      <PencilSquareIcon className="h-4 text-white group-hover:text-black duration-300" />
                      Edit
                    </button>
                  </Link>
                  <Link href={`/products/delete/${el._id}`}>
                    <button className="px-3 py-1 text-white bg-red-500 inline-flex group items-center w-full sm:w-auto gap-1 sm:rounded-r-md border text-xs sm:text-base border-red-500 hover:bg-transparent hover:text-red-500 sm:border-l-0 duration-300 group ">
                      <TrashIcon className="h-4 text-white group-hover:text-red-500 duration-300" />
                      Delete
                    </button>
                  </Link>
                </td>
              </tr>
            ))}
            {
              theProducts.filter(el=>el.cat===category).map((el) => (
                <tr className="even:bg-gray-200 bg-gray-100" key={el._id}>
                  <td className="p-2 border border-gray-300 ">{el.name}</td>
                  <td className="p-2 border border-gray-300   "><img src={el.images[0].url} className="w-10 h-10 block mx-auto rounded-full object-cover"/></td>
                  <td className="p-2 border border-gray-300 text-center ">
                    <Link href={`/products/edit/${el._id}`}>
                      <button className="px-3 py-1 text-white bg-zinc-800 inline-flex items-center w-full sm:w-auto group gap-1 sm:rounded-l-md text-xs sm:text-base border-zinc-800 hover:bg-transparent sm:border-r-0 hover:text-black  border duration-300">
                        <PencilSquareIcon className="h-4 text-white group-hover:text-black duration-300" />
                        Edit
                      </button>
                    </Link>
                    <Link href={`/products/delete/${el._id}`}>
                      <button className="px-3 py-1 text-white bg-red-500 inline-flex group items-center w-full sm:w-auto gap-1 sm:rounded-r-md border text-xs sm:text-base border-red-500 hover:bg-transparent hover:text-red-500 sm:border-l-0 duration-300 group ">
                        <TrashIcon className="h-4 text-white group-hover:text-red-500 duration-300" />
                        Delete
                      </button>
                    </Link>
                  </td>
                </tr>
              )) 
              
            }
            {
            theProducts.filter(el=>el.cat===category).length===0 && category!=="" && <tr><td>no products</td></tr>
            }
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
  const categories = await newAxios('/categories')
  if (!user)
    return { redirect: { destination: "/register", permanent: false } };

  return {
    props: { user, products: theResult.data ,categories:categories.data},
  };
}
