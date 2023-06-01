import Head from "next/head";
import jwt from "jsonwebtoken";
import { useRef, useState } from "react";
import usePostFetch from "@/hooks/usePostFetch";
import { useRouter } from "next/router";
import { newAxios } from "@/lib/axios";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import { TrashIcon } from "@heroicons/react/24/outline";

const categories = ({ user, cats }) => {
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState(cats || []);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [parentCat, setParentCat] = useState("");
  const [edit, setEdit] = useState(null);
  const [toDelete, setToDelete] = useState(null);
  const [deletLoading, setDeleteLoading] = useState(false);

  const router = useRouter();

  const handlePost = async (e) => {
    e.preventDefault();
    if (edit) {
      try {
        setLoading(true);

        setError("");
        const res = await newAxios.put("/categories", {
          name: category,
          parentCategory: parentCat,
          id: edit._id,
        });
        console.log(res.data);
        let duplicate = categories;
        const index = duplicate.findIndex((el) => el._id === edit._id);
        duplicate[index] = res.data;
        setCategories(duplicate);
        setEdit(null);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
        setCategory("");
        setParentCat("");
      }
    } else {
      try {
        setLoading(true);

        setError("");
        const res = await newAxios.post("/categories", {
          name: category,
          parentCategory: parentCat,
        });
        console.log(res.data);
        setCategories((prev) => [...prev, res.data]);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
        setCategory("");
        setParentCat("");
      }
    }
  };

  const catRef = useRef();

  const handleEdit = (category) => {
    setEdit(category);
    setCategory(category.name);
    setParentCat(category.parentCategory);
    catRef.current.focus();
    console.log(category);
  };

  const cancelEdit = () => {
    console.log("hi");
    setEdit(null);
    setCategory("");
    setParentCat("");
  };

  const handleDelete = async () => {
    try {
      setDeleteLoading(true);
      console.log(toDelete._id);
      setError("");
      const res = await newAxios.delete(`/categories?id=${toDelete._id}`);
      console.log(res.data);

      setCategories((prev) => prev.filter((el) => el._id !== res.data._id));
      setToDelete(false);
    } catch (error) {
      console.log(error);
    } finally {
      setDeleteLoading(false);
    }
  };

  return (
    <div>
      <Head>
        <title>Categories</title>
      </Head>

      <h1 className="capitalize font-semibold text-4xl">Categories</h1>

      <form onSubmit={handlePost} className=" mt-2 flex flex-col gap-4 p-4">
        <div className="w-full flex lg:items-center flex-col lg:flex-row gap-1">
          <div className="flex-1 flex flex-col gap-1">
            <label className="label">
              {edit ? "Edit Category*" : "Add Category*"}
            </label>

            <input
              ref={catRef}
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              type="text"
              className="formInput w-full "
              placeholder="Add category"
            />
          </div>
          <div className="flex-1 flex flex-col gap-1">
            <label className="label">Parent Category</label>

            <select
              onChange={(e) => setParentCat(e.target.value)}
              value={parentCat}
              className="formInput w-full cursor-pointer capitalize "
            >
              <option value={""} className="capitalize">
                {"no parent category"}
              </option>
              {categories.map((el) => (
                <option key={el._id} value={el.name} className="capitalize">
                  {el.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex items-center w-full gap-3">
          <button
            disabled={
              !category.trim() ||
              loading ||
              (edit?.name === category.trim() &&
                edit.parentCategory === parentCat)
            }
            className={`py-2 rounded-md text-white bg-black disabled:bg-gray-500 w-full ${
              edit && "bg-orange-400"
            }`}
          >
            {loading ? "Loading..." : edit ? "Edit" : "Add"}
          </button>
          {edit && (
            <button
              type="button"
              onClick={cancelEdit}
              className="btn border-black hover:bg-transparent hover: hover:text-black  border duration-300 "
            >
              Cancel
            </button>
          )}
        </div>
        {toDelete && (
          <div className="flex items-center gap-1 flex-col lg:flex-row">
            <p>
              Are you sure you want to delete{" "}
              <span className="capitalize font-bold">{toDelete.name}</span>{" "}
              category?
            </p>

            <div className="flex gap-2">
              <button
                disabled={deletLoading}
                type="button"
                className="px-3 py-1 disabled:bg-red-300 text-white bg-red-500 rounded-md  hover:bg-transparent hover:text-red-500 duration-300 border border-red-500"
                onClick={handleDelete}
              >
                {deletLoading ? "Deleting..." : "Yes"}
              </button>
              <button
                type="button"
                className="px-3 py-1 text-white bg-black rounded-md border-black hover:bg-transparent hover: hover:text-black  border duration-300"
                onClick={() => setToDelete(null)}
              >
                No
              </button>
            </div>
          </div>
        )}
      </form>

      {error && (
        <p className="text-red-500 py-4 text-xs">{error.response.data}</p>
      )}

      <div className="mt-2 p-1 sm:p-4 pt-0 max-h-[500px] overflow-y-scroll myScroll  ">
        <table className="w-full border border-black  ">
          <thead className="bg-black text-white capitalize ">
            <tr>
              <td className="sm:p-3 p-1 text-xs sm:text-base  border-r border-gray-300">category name</td>
              <td className="sm:p-3 p-1 text-xs sm:text-base  border-r border-gray-300">Parent Category</td>
              <td className="sm:p-3 p-1 text-xs sm:text-base">Actions</td>
            </tr>
          </thead>
          <tbody className="">
            {categories.length === 0 && (
              <tr className="border border-gray-300">
                <td className="uppercase p-2 ">no categories available</td>
              </tr>
            )}
            {categories.map((el) => (
              <tr key={el._id} className="even:bg-zinc-200 bg-zinc-100">
                <td className=" p-1 sm:p-2 border border-gray-300 capitalize font-semibold text-xs sm:text-base">
                  {el.name}
                </td>

                <td className=" p-1 sm:p-2 border border-gray-300 capitalize font-semibold text-xs sm:text-base">
                  {el.parentCategory}
                </td>
                <td className="text-white text-center border border-gray-300  p-1 sm:p-3 text-xs sm:text-base">
                  <button
                    onClick={() => handleEdit(el)}
                    className="px-3 py-1 bg-black inline-flex items-center group gap-2 sm:rounded-l-md border w-full sm:w-auto border-black hover:bg-transparent hover: hover:text-black sm:border-r-0 duration-300"
                  >
                    <PencilSquareIcon className="h-4 text-white group-hover:text-black duration-300" />
                    Edit
                  </button>
                  <button
                    onClick={() => setToDelete(el)}
                    className="px-3 py-1 bg-red-500 w-full sm:w-auto sm:rounded-r-md border inline-flex items-center gap-2 border-red-500 hover:bg-transparent hover:text-red-500 sm:border-l-0 duration-300 group"
                  >
                    <TrashIcon className="h-4 text-white group-hover:text-red-500 duration-300" />
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default categories;

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
