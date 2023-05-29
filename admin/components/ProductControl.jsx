import { useReducer, useState } from "react";
import usePostFetch from "@/hooks/usePostFetch";
import { useRouter } from "next/router";
import mongoose from "mongoose";

const ProductControl = ({initial_state,put,id}) => {

    const {data,loading,error,addPost,putPost}= usePostFetch()
  const [feature, setFeature] = useState("");
  const addFeature = () => {
    let theFeatures
    if(feature.includes(',')){
      theFeatures = feature.split(',')
   
      dispatch({ type: "FEATURES_MANY", payload: theFeatures });
   
    }
    else{
      dispatch({ type: "FEATURES", payload: feature });
 
    }

    setFeature("");

  
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case "INFO":
        return { ...state, [action.payload.name]: action.payload.value };
      case "FEATURES_MANY":
        return { ...state, features: [...state.features, ...action.payload] };
      case "FEATURES":
        return { ...state, features: [...state.features, action.payload] };
      case "DELETE_F":
        return { ...state, features: action.payload };

        case "RESET" : return initial_state
        default : return state
    }
  };

  const [state, dispatch] = useReducer(reducer, initial_state);
  const router = useRouter()
  

  const handleSubmit = async(e)=>{
e.preventDefault()

if(put){

  try {
    await  putPost(`/products?id=${id}`,{...state})
    router.push('/products')
  } catch (error) {
    dispatch({type:"RESET"})

  }




}
else{
  try {
    await  addPost('/products',{...state})
    router.push('/products')
  } catch (error) {
    dispatch({type:"RESET"})

  }



}

  }



  return (
    <div>
    <h1 className="capitalize font-semibold text-4xl">{put? "edit product":'new product'}</h1>
    <form onSubmit={handleSubmit} className="mt-5 p-4 ">
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex flex-col gap-1 flex-1">
          <input
          autoComplete="off"
            value={state.name}
            className=" formInput w-full  "
            name="name"
            type="text"
            placeholder="Product name"
            onChange={(e) =>
              dispatch({
                type: "INFO",
                payload: { name: e.target.name, value: e.target.value },
              })
            }
          />
          <input
            className=" formInput w-full  "
            name="price"
            type="number"
            value={state.price}
            placeholder="Product price"
            onChange={(e) =>
              dispatch({
                type: "INFO",
                payload: { name: e.target.name, value: e.target.value },
              })
            }
          />
          <textarea
            className="resize-none formInput w-full  h-[200px]"
            name="desc"
            value={state.desc}
            type="text"
            placeholder="Product description"
            onChange={(e) =>
              dispatch({
                type: "INFO",
                payload: { name: e.target.name, value: e.target.value },
              })
            }
          />
        </div>
        <div className="flex flex-col gap-1 flex-1">
          <select
        
            name="cat"
            className="formInput w-full cursor-pointer capitalize"
            onChange={(e) =>
              dispatch({
                type: "INFO",
                payload: { name: e.target.name, value: e.target.value },
              })
            }
            value={state.cat}
          ><option value="" disabled  >Select Category</option>
            <option value="clothes">clothes</option>
            <option value="food">food</option>
            <option value="technology">technology</option>
            <option value="perfumes">perfumes</option>
          </select>

          <div className="formInput flex">
            <input
              value={feature}
              onChange={(e) => setFeature(e.target.value)}
              className="  outline-none flex-1"
              name="features"
              type="text"
              placeholder="Add features"
            />{" "}
            <button disabled={!feature.trim()} type="button" className="btn disabled:bg-gray-500" onClick={addFeature}>
              Add
            </button>
          </div>

          <div className="flex flex-wrap gap-3">
            {state.features.map((el,i) => (
              <div
                className="flex items-center gap-1 border border-black  min-w-[60px] justify-between px-2 cursor-default rounded-full"
                key={el + i}
              >
                {el}{" "}
                <span
                  onClick={() => dispatch({ type: "DELETE_F" ,payload:state.features.filter(feature=>feature !==el)})}
                  className="flex w-5 h-5 cursor-pointer items-center justify-center rounded-full bg-black text-white"
                >
                  X
                </span>
              </div>
            ))}
          </div>
        </div>{" "}
      </div>

      <button disabled={!state.name || !state.desc || !state.price || !state.cat || loading} type="submit" className=" disabled:bg-gray-500 btn mt-8 w-full lg:w-1/2">
       {loading ? 'Loading...' :put?"Edit Product": "Add Product"}
      </button>
      {error&&<p className="text-xs text-red-500 py-4">{error.response.data}</p>}
    </form>
  </div>
  )
}

export default ProductControl