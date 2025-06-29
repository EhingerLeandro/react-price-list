import Navbar from "../components/Navbar";
import { useStore} from "../store/useStore.jsx";
import { useNavigate } from 'react-router-dom';
import { FadeLoader } from 'react-spinners';

/* THIS IS A CLONE OF THE HOME COMPONENT, BUT IT'S USED TO DISPLAY THE INFORMATION 
WITHOUT FETCHING THE DATA AGAIN, BECAUSE IT BRINGS THE INFORMATION FROM THE USESTORE,
INSTEAD OF FETCHING IT FROM THE ENDPOINT. OF COURSE WE REPEAT SOME CODE, BUT IT'S BETTER 
THAN FETCHING THE DATA SEVERAL TIMES, AND SPENDING MORE TIME LOADING. */

//Note: react doesn't allow me to use if conditional with a custom hook like useFetchData, 
//that's why I have to use this component and method.

const HomeNoFetch = () => {
   
    let navigate = useNavigate();
    const globalData = useStore(state=>state.globalData);
    const globalLoading = useStore(state=>state.globalLoading);
    const setGlobalSelect = useStore(state=>state.setGlobalSelect);
    
    const handleSelect=(ind)=>{
    //This selected part is used to send the selected ID producto to the CardProduct component.
      setGlobalSelect(ind);
      navigate("/CardProd")
    }
   
    return (
        <section className="App flex justify-center items-center">
        <Navbar data={globalData} />
        {globalLoading?
        <div className="mt-35 flex flex-col align-center justify-center text-indigo-800 text-lg font-bold"> 
            <h3 className="text-center">Cargando Lista de Precios... </h3> 
            <div className="mt-10 flex justify-center">
            <FadeLoader color="slateBlue" height={20} margin={5} radius={10} width={8}/>
            </div>
        </div>:
        <div>
        <h1 className='mt-18  text-center text-3xl font-bold text-slate-200 py-3 bg-indigo-400'>Precios para Almacén PDM</h1>
            <div className="max-w-xl" >{globalData.map((item, index)=>(
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

export default HomeNoFetch