import ProductControl from "@/components/ProductControl";
import Head from "next/head";
import jwt from "jsonwebtoken";
import { newAxios } from "@/lib/axios";



const NewProduct = ({cats}) => {

  const initial_state = {
    name: "",
    desc: "",
    price: "",
    cat: "",
    features: [],
    images:[],
  };

  

  

  
  return (
    <>
    <Head>
      <title>
New Product
      </title>
    </Head>
  <ProductControl initial_state={initial_state} cats={cats} />
  </>
  );
};

export default NewProduct;






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

  const categories = await newAxios("/categories");

  return {
    props: { user, cats: categories.data },
  };
}