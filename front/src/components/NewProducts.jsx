import NewProduct from "./NewProduct"


const NewProducts = ({products}) => {
  return (
    <div className="max-w-[1100px] px-5 mt-8 pb-10 mx-auto font-bold text-zinc-800">
<h1 className="text-4xl ">New products</h1>

<div className="   grid grid-cols-6  gap-7 mt-8 ">

{products.map(el=><NewProduct {...el} key={el._id} />)}
</div>
    </div>
   
  )
}

export default NewProducts