import { useRouter } from "next/router";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import { newAxios } from "@/lib/axios";
import ProductControl from "@/components/ProductControl";
import Head from "next/head";

const ProductId = ({ theProduct,cats }) => {
  const initial_state = {
    name: theProduct?.name,
    desc: theProduct?.desc,
    price: theProduct?.price,
    cat: theProduct?.cat,
    features: theProduct?.features || [],
    images:theProduct.images
  };

  console.log(initial_state);
  const router = useRouter();
  const { id } = router.query;

  if (!theProduct) return <p>no such product</p>;

  return <>
  <Head>
    <title>
      Edit Product
    </title>
  </Head>
  <ProductControl cats={cats} put={true} initial_state={initial_state} id={id}/></>;
};

export default ProductId;

export async function getServerSideProps({ req, res, params: { id } }) {
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

  try {
    const cats = await newAxios('/categories')
    const product = await newAxios(`/products?id=${id}`);
    return {
      props: { user, theProduct: product.data ,cats:cats.data},
    };
  } catch (error) {
    return {
      props: { user, theProduct: null ,cats:[]},
    };
  }
}
