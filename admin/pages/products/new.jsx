import ProductControl from "@/components/ProductControl";



const NewProduct = () => {

  const initial_state = {
    name: "",
    desc: "",
    price: "",
    cat: "",
    features: [],
  };

  

  

  
  return (
  <ProductControl initial_state={initial_state} />
  );
};

export default NewProduct;
