import NewProduct from "./NewProduct"


const NewProducts = ({products}) => {
  return (
    <div className="max-w-[1100px] mx-auto px-5 grid grid-cols-4 mt-8 gap-7">

        {products.map(el=><NewProduct {...el} key={el._id} />)}
    </div>
  )
}

export default NewProducts