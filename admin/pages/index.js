import Head from "next/head";
import jwt from "jsonwebtoken";
import axios from "axios";
import { useRouter } from "next/router";
export default function Home({ user, products, categories, orders }) {


const router = useRouter()

  return (
    <div className="">
      <Head>
        <title>{`Admin | ${user.username}`}</title>
      </Head>

      <p>
        Hello,{" "}
        <span className="capitalize font-semibold">{user.username}!</span>
      </p>
      {user.email === "ammar1@ammar.com" ? (
        <p className="py-1">
          You are fully authorized!
          <br />
          You can add, edit, and delete products and categories.
        </p>
      ) : (
        <p className="py-1">
          You are partially authorized!
          <br />
          You can add products and categories, but you can't edit or delete.
        </p>
      )}

      <div className="mt-20 grid grid-cols-3 gap-5 lg:gap-20 text-xs md:text-lg">
        <p className="aspect-square  md:col-span-1 bg-zinc-800 text-white rounded-md flex items-center justify-center p-4 text-center flex-col gap-1 border border-zinc-800 duration-300 hover:bg-white hover:text-zinc-800 cursor-pointer font-semibold"  onClick={()=>router.push('/orders')}>
          <span>Total orders</span> <span>{orders.length}</span>{" "}
        </p>
        <p className="aspect-square  md:col-span-1 bg-zinc-800 text-white rounded-md flex items-center justify-center p-4 text-center flex-col gap-1 border border-zinc-800 duration-300 hover:bg-white hover:text-zinc-800 cursor-pointer font-semibold"  onClick={()=>router.push('/products')}>
          <span>Total products</span> <span>{products.length}</span>{" "}
        </p>
        <p  onClick={()=>router.push('/categories')} className="aspect-square  md:col-span-1 bg-zinc-800 text-white rounded-md flex items-center justify-center p-4 text-center flex-col gap-1 border border-zinc-800 duration-300 hover:bg-white hover:text-zinc-800 cursor-pointer font-semibold">
          <span>Total categories</span> <span>{categories.length}</span>{" "}
        </p >
      </div>
    </div>
  );
}

export async function getServerSideProps({ req, res }) {
  const user = jwt.verify(
    req.cookies.accessToken,
    process.env.JWT_SECRET,
    (error, token) => {
      if (error) return null;

      return (req.user = token);
    }
  );

  if (!user)
    return { redirect: { destination: "/register", permanent: false } };

  const products = await axios("https://next-full-ecommerce.vercel.app/api/products");
  const categories = await axios("https://next-full-ecommerce.vercel.app/api/categories");
  const orders = await axios("https://next-full-ecommerce-fkss.vercel.app/api/orders");

  return {
    props: {
      user,
      products: products.data,
      categories: categories.data,
      orders: orders.data,
    },
  };
}
