import React from 'react'
import {useState} from "react";
import {useStore} from "../store/useStore.jsx";
import {Link, useNavigate} from "react-router-dom";
import { ToastContainer, toast, Slide } from 'react-toastify';
import CART from '../assets/carrito2.png';
import PDM from '../assets/PDM.jpg';


const MoreInfo = ({item})=>{

   return( 
    <div className="max-w-xl border-2 border-gray-300 my-1">
        <div className="grid grid-cols-2 gap-4 p-2 bg-gray-300">
        <span className="font-bold text-lg">Información</span>
        <span className="break-words">{item.informacion ? item.informacion : "No info"}</span>
        </div>
        <div className="grid grid-cols-2 gap-4 p-2 ">
          <span className="font-bold text-lg">Links</span>
          <span className="break-words">{item.links ? <a target="_blank" className="text-blue-800" href={item.links}>{item.links}</a>  : "No info"}</span>
        </div>
        <div className="grid grid-cols-2 gap-4 p-2 bg-gray-300">
          <span className="font-bold text-lg">Imagenes</span>
          <span className="break-words">{item.imagenes ? <a target="_blank" className="text-blue-800" href={item.imagenes}>{item.imagenes}</a>  : "No info"}</span>
        </div>
        <div className="grid grid-cols-2 gap-4 p-2 ">
          <span className="font-bold text-lg">Audios</span>
          <span className="break-words">{item.audios ? <a target="_blank" className="text-blue-800" href={item.audios}>{item.audios}</a>  : "No info"}</span>
        </div>
        <div className="grid grid-cols-2 gap-4 p-2 bg-gray-300">
          <span className="font-bold text-lg">Videos</span>
          <span className="break-words">{item.videos ? <a target="_blank" className="text-blue-800" href={item.videos}>{item.videos}</a>  : "No info"}</span>
        </div> 
    </div>
   )
}

const CardProduct = () => {
  const [moreInfo, setMoreInfo] = useState(false);

  const navigate = useNavigate();
  const addProduct  = useStore( (state)=>state.addProduct);
  const globalSelect = useStore((state)=>state.globalSelect);
  const globalData = useStore((state)=>state.globalData);

  //This console.log shows the data of the selected product
  console.log("Selected Product --> ", globalData[globalSelect])

  const handleMoreInfo=()=>{
    setMoreInfo(!moreInfo)
  }
  const handleGoBack=()=>{
    navigate("/listNotFetch");
    setMoreInfo(false);
  }
  const handleAddProduct=()=>{
    addProduct(globalData[globalSelect], globalSelect)
    toast.info("Producto añadido a la cotización");
  }

  return (
    <div className="m-5 ">
      <section className="max-w-xl flex justify-between bg-indigo-300 p-2">
        <img  src={PDM} alt="logo" className="h-10"/>
        <Link to="/Cart">
          <img src={CART} alt="logo" className="h-10 hover:inset-shadow-sm hover:inset-shadow-black rounded-full "/>
        </Link>
      </section>
      <section className="max-w-xl flex justify-between">
        <button className="bg-indigo-800 hover:bg-indigo-900 text-white p-2 rounded-lg my-3 mx-1 cursor-pointer" onClick={handleGoBack}>Lista</button>
        <button className="bg-gray-500 hover:bg-gray-600 text-white p-2 rounded-lg my-3 mx-1 cursor-pointer" onClick={handleMoreInfo}>{moreInfo ? "Ocultar" : "Más Info"}</button>
        <button className="bg-amber-700 hover:bg-amber-800 text-white p-2 rounded-lg my-3 mx-1 cursor-pointer" onClick={handleAddProduct}>Añadir a Cotización</button>
      </section>
      <section className="max-w-xl border-2 border-slate-300 my-1">
        <div className="grid grid-cols-2 gap-4 p-2 bg-slate-300">
          <span className="font-bold text-lg">Producto</span>
          <span className="text-sm">{globalData[globalSelect].producto? globalData[globalSelect].producto : "No info"}</span>
        </div>
        <div className="grid grid-cols-2 gap-4 p-2">
          <span className="font-bold text-lg">Presentación</span>
          <span className="text-sm">{globalData[globalSelect].presentacion? globalData[globalSelect].presentacion : "No info"}</span>
        </div>
        <div className="grid grid-cols-2 gap-4 p-2 bg-slate-300">
          <span className="font-bold text-lg">Venta almacen iva incluido</span>
          <span>{globalData[globalSelect].venta_almacen_iva_incluido ? globalData[globalSelect].venta_almacen_iva_incluido : "Esta cantidad solo tiene Precio al Público"}</span>
        </div>
      </section>
      <section >
        {moreInfo?
        <MoreInfo item={globalData[globalSelect]} />
        :<></>}
      </section>
      <ToastContainer
        position="bottom-center"
        autoClose={2000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition={Slide}
        />
    </div>
  )
}

export default CardProduct;