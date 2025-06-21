import React from 'react'
import Navbar from "../components/Navbar";
import useFetchData from '../store/FetchData.jsx';
import { useStore} from "../store/useStore.jsx";
import { useNavigate } from 'react-router-dom';
import { FadeLoader } from 'react-spinners';

/* THIS IS THE HOME COMPONENT, IT IS THE FIRST ONE THAT IS DISPLAYED WHEN THE APP IS OPENED,
AND EVERY TIME IT APPEARS IT FETCHES THE DATA FROM THE ENDPOINT. */

const Home = () => {
    //This part is used to get the data from the google sheet
    const {data, loading} = useFetchData(import.meta.env.VITE_ENDPOINT)
    let navigate = useNavigate();

    const setGlobalSelect = useStore(state=>state.setGlobalSelect);
    const setGlobalData = useStore(state=>state.setGlobalData);
    const setGlobalLoading = useStore(state=>state.setGlobalLoading);
    
    const handleSelect=(ind)=>{
    //This selected part is used to send the selected ID producto to the CardProduct component.
      setGlobalSelect(ind);
      setGlobalData(data);
      setGlobalLoading(loading);
      navigate("/CardProd")
    }
   
    return (
        <section className="App flex justify-center items-center">
        <Navbar data={data} />
        {loading?
        <div className="mt-35 flex flex-col align-center justify-center text-indigo-800 text-lg font-bold"> 
            <h3 className="text-center">Cargando Lista de Precios... </h3> 
            <div className="mt-10 flex justify-center">
            <FadeLoader color="slateBlue" height={20} margin={5} radius={10} width={8}/>
            </div>
        </div>:
        <div>
        <h1 className='mt-18  text-center text-3xl font-bold text-slate-200 py-3 bg-indigo-400'>Precios para Almacén PDM</h1>
            <div className="max-w-xl" >{data.map((item, index)=>(
            <div key={index} className="bg-slate-300 p-2 my-2 rounded-lg cursor-pointer hover:bg-slate-400 transition-all duration-200 ease-in-out"
            onClick={()=>{handleSelect(index)}}>
                <span className="font-bold ml-2 text-sm">{item.producto}</span>
                <span className="ml-2 text-sm">{item.presentacion}</span>
            </div>
            ))}</div>
        </div>}
        </section>
    )
}

export default Home