import { useEffect, useReducer, useState } from "react";
import usePostFetch from "@/hooks/usePostFetch";
import { useRouter } from "next/router";
import mongoose from "mongoose";
import axios from "axios";

const ProductControl = ({ initial_state, put, id }) => {
  const { loading, error, addPost, putPost } = usePostFetch();
  const [feature, setFeature] = useState("");
  const [loadingImages, setLoadingImages] = useState(false);
  const [errorImages, setErrorImages] = useState("");

  const upload = async (file) => {
    if (!file) {
      return "";
    }
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "next-ecommerce");

    try {
      setErrorImages("");

      const res = await axios.post(
        "https://api.cloudinary.com/v1_1/drhzjli1l/image/upload",
        data
      );
      const url = res.data;
      return url;
    } catch (error) {
      setErrorImages(error);
      console.log(error);
      return null;
    } finally {
      console.log(loadingImages);
    }
  };

  useEffect(() => {
    console.log(loadingImages);
  }, [loadingImages]);

  const addFeature = () => {
    let theFeatures;
    if (feature.includes(",")) {
      theFeatures = feature.split(",");

      dispatch({ type: "FEATURES_MANY", payload: theFeatures });
    } else {
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
      case "ADD_IMAGES":
        return { ...state, images: [...state.images, ...action.payload] };
      case "DELETE_I":
        return { ...state, images: action.payload };

      case "RESET":
        return initial_state;
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, initial_state);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (put) {
      try {
        await putPost(`/products?id=${id}`, { ...state });
        router.push("/products");
      } catch (error) {
        dispatch({ type: "RESET" });
      }
    } else {
      try {
        await addPost("/products", { ...state });
        router.push("/products");
      } catch (error) {
        dispatch({ type: "RESET" });
      }
    }
  };

  const imagesUpload = async (e) => {
    setLoadingImages(true);
    const files = e.target.files;
    console.log(files);
    const images = await Promise.all(
      [...files].map(async (file) => {
        const url = await upload(file);
        console.log(url.url);
        return url.url;
      })
    );
    dispatch({ type: "ADD_IMAGES", payload: images });

    setLoadingImages(false);
  };

  return (
    <div>
      <h1 className="capitalize font-semibold text-4xl">
        {put ? "edit product" : "new product"}
      </h1>
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
              onChange={(e) => {
                dispatch({
                  type: "INFO",
                  payload: { name: e.target.name, value: e.target.value },
                });
                console.log(state);
              }}
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
            >
              <option value="" disabled>
                Select Category
              </option>
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
              <button
                disabled={!feature.trim()}
                type="button"
                className="btn disabled:bg-gray-500"
                onClick={addFeature}
              >
                Add
              </button>
            </div>

            <div className="flex flex-wrap gap-3">
              {state.features.map((el, i) => (
                <div
                  className="flex items-center gap-1 border border-black  min-w-[60px] justify-between px-2 cursor-default rounded-full"
                  key={el + i}
                >
                  {el}{" "}
                  <span
                    onClick={() =>
                      dispatch({
                        type: "DELETE_F",
                        payload: state.features.filter(
                          (feature) => feature !== el
                        ),
                      })
                    }
                    className="flex w-5 h-5 cursor-pointer items-center justify-center rounded-full bg-black text-white"
                  >
                    X
                  </span>
                </div>
              ))}
            </div>

            <div className="p-4 border rounded-xl">
              <div className="flex items-center">
                <p className="text-lg capitalize text-zinc-400 font-bold flex-1 ">
                  Images
                </p>
                <label
                  className={`px-3 py-2 text-white bg-black rounded-lg cursor-pointer ${
                    loadingImages && "bg-gray-500 cursor-auto pointer-events-none"
                  }`}
                  htmlFor="images"
                >
                  {loadingImages ? "Uploading..." : "Upload Images"}
                </label>
                {errorImages && (
                  <p className="py-3 text-xs text-red-500">error</p>
                )}
                <input
                  type="file"
                  hidden
                  id="images"
                  multiple
                  onChange={imagesUpload}
                />
              </div>
              <div className="flex flex-wrap gap-2 mt-3">
                {state.images.length > 0 &&
                  state.images?.map((el, i) => (
                    <div className="relative w-[70px] h-[70px]  ">
                      <span
                        onClick={() =>
                          dispatch({
                            type: "DELETE_I",
                            payload: state.images.filter(
                              (image) => image !== el
                            ),
                          })
                        }
                        className="absolute -top-1 -right-1 w-4 h-4 rounded-md bg-red-600 p-2 text-xs cursor-pointer rounded-full flex items-center justify-center text-white "
                      >
                        X
                      </span>
                      <img
                        src={el}
                        key={el + i}
                        alt="product-images"
                        className=" object-cover w-full h-full"
                      />
                    </div>
                  ))}
              </div>
            </div>
          </div>{" "}
        </div>

        <button
          disabled={
            !state.name ||
            !state.desc ||
            !state.price ||
            !state.cat ||
            loading ||
            state.images.length === 0
          }
          type="submit"
          className=" disabled:bg-gray-500 btn mt-8 w-full lg:w-1/2"
        >
          {loading ? "Loading..." : put ? "Edit Product" : "Add Product"}
        </button>
        {error && (
          <p className="text-xs text-red-500 py-4">{error.response.data}</p>
        )}
      </form>
    </div>
  );
};

export default ProductControl;
