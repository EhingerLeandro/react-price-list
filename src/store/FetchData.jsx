import React from 'react';
import {useState, useEffect} from "react";

function useFetchData(endPoint) {

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  

  useEffect(()=>{
    setLoading(true);
   const fetchData = async () => {
    try{
      const dat = await fetch(endPoint);
      const dataJson = await dat.json();
      await setData(dataJson.data);
    }catch (err) {
      console.log(err);
      setError(err);
    }finally{
      setLoading(false);
    }
   }
   fetchData()
   
  },[endPoint]);

  
  return {data, loading, error};
}

export default useFetchData;