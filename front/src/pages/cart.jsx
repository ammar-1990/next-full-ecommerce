import { addToCart, getCart, getTotal, removeFromCart } from "@/slices/cartSlice"
import { useEffect } from "react"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { getAll } from "@/slices/cartSlice"


const cart = () => {



  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(getAll())
    
    },[])
    
    
    const {cart,loading} = useSelector(getCart)
const total = useSelector(getTotal)






if(loading) return 'Loading...'
  return (

    <div className="bg-zinc-200 min-h-screen">
    <div className="max-w-[1100px] mx-auto px-5 pt-8 ">
        <div className="grid grid-cols-5 gap-5">
          <div className="lg:col-span-3 col-span-5 p-10 px-6 rounded-lg bg-white">
<h1 className="text-2xl font-bold">
  Cart
</h1>

<table className="w-full mt-8 border-separate border-spacing-4">
  <thead className="text-gray-500 capitalize font-semibold text-lg   ">
    <tr >
      <td>
        product
      </td>
      <td>
        quantity
      </td>
      <td>
        price
      </td>
    </tr>
  </thead>
  <tbody className="">
    {cart.length===0 &&<tr><td>No products in your cart</td></tr>}
    {cart.map(el=><tr className="" key={el._id}>
      <td> <div className="flex flex-col"><img className="w-28 h-28 object-contain" src={el.images[0].url} /><p className="text-lg py-2 text-gray-800 w-fit">{el.name}</p></div></td>
      <td>
        <div className="flex items-center gap-1">
        <span className="flex items-center justify-center w-8 h-8 bg-zinc-300 rounded-md cursor-pointer text-zinc-600" onClick={()=>dispatch(addToCart(el))}>+</span>
        <span>{el.amount}</span>
        <span className="flex items-center justify-center w-8 h-8 bg-zinc-300 rounded-md cursor-pointer text-zinc-600" onClick={()=>dispatch(removeFromCart(el))}>-</span>
        
        </div>
        </td>
      <td className="font-semibold ">${el.price*el.amount}</td>
    </tr>)}
  </tbody>
</table>
<div className="p-4 border-t mt-4 text-right border-zinc-400">
  Total: ${total}
</div>
          </div>
          <div className="lg:col-span-2 col-span-5 p-10 rounded-lg bg-white">


          </div>
        
        </div>
    </div>
    </div>
  )
}

export default cart  

