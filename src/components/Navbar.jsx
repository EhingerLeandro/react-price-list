import React from 'react';
import { useStore} from "../store/useStore.jsx";
import { useNavigate } from 'react-router-dom';
import { Link} from "react-router-dom";
import Select from 'react-select';
import PDM from '../assets/PDM.jpg';
import Cart from "../assets/carrito2.png"

/* THIS COMPONENT IS A NAVBAR, AND ALSO HAS THE FUNCTIONALITY OF SEARCHING A PRODUCT */

const Navbar = ({data}) => {
  let options =[];
  if(data!==null){
    options = data.map((item, index)=>{
      return {value:index, label:`${item.producto} ${item.presentacion}`}
    })
  }
  const setGlobalData= useStore(state=>state.setGlobalData);
  const setGlobalSelect = useStore(state=>state.setGlobalSelect);
  const globalSelect = useStore((state)=>state.globalSelect);
  const navigate = useNavigate();

  const handleSelect=(e)=>{
    setGlobalData(data);
    setGlobalSelect(e.value);
    navigate("/CardProd");
  }
  const handleToCart=()=>{
    setGlobalData(data);
    setGlobalSelect(0);
    navigate("/Cart");
  }

  return (
    <div className="fixed top-0 w-full pb-2 pt-3 flex justify-between align-center bg-indigo-800" >
        <Link to="/"><img src={PDM} alt="logo" className="h-10 mx-1"/></Link>
        <div className="flex mx-1">
          <Select className="bg-white w-64" 
            placeholder="Busca un producto..."
            options={options} 
            onChange={handleSelect}
            value={globalSelect}
            />
            <img onClick={handleToCart} src={Cart} alt="logo" className="h-10 ml-1 mr-2 hover:border-2 border-slate-300 rounded-full"/>
        </div>
    </div>
  )
}

export default Navbar;