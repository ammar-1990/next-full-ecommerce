import NewProduct from "./NewProduct"


const NewProducts = ({products,header}) => {
  return (
    <div className="max-w-[1100px] px-5  pb-10 mx-auto font-bold text-zinc-800 pt-20">
<h1 className="text-4xl capitalize ">{header}</h1>

<div className="   flex flex-wrap justify-center  gap-7 mt-12 ">

{products.map(el=><NewProduct {...el} key={el._id} />)}
</div>
    </div>
   
  )
}

export default NewProducts