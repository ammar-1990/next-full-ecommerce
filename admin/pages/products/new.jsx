import ProductControl from "@/components/ProductControl";
import Head from "next/head";



const NewProduct = () => {

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
  <ProductControl initial_state={initial_state} />
  </>
  );
};

export default NewProduct;
