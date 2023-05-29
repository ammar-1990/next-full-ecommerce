import { newAxios } from "@/lib/axios";
import { useState, useEffect } from "react";


const usePostFetch = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");


  const addPost = async (url, values) => {
    try {
      setLoading(true);
      setError("");
      const res = await newAxios.post(url, values);
      console.log(res.data);
    } catch (error) {
      setError(error);
      setLoading(false);
    } finally {
    }
  };


  const putPost = async (url, values) => {
    try {
      setLoading(true);
      setError("");
      const res = await newAxios.put(url, values);
      console.log(res.data);
    } catch (error) {
      setError(error);
      setLoading(false);
    } finally {
    }
  };

  const deletePost = async (url) => {
    try {
      console.log("delete");
      setLoading(true);
      setError("");
      const res = await newAxios.delete(url);
      console.log(res.data);
    } catch (error) {
      setError(error);
      setLoading(false);
    } finally {
    }
  };

  return {
    data,
    loading,
    error,
    addPost,
    putPost,
    deletePost,
 
  };
};

export default usePostFetch;
