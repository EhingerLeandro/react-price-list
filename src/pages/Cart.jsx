import {Link} from "react-router-dom";
import {useStore} from "../store/useStore";
import bin from "../assets/papelera.png";


const Cart = () => {
  const cart = useStore(state=> state.cart);
  const removeAll = useStore(state=> state.removeAll);
  const total = useStore(state=> state.total);
  const totalPrice = useStore(state=> state.totalPrice);
  const removeProduct = useStore(state=> state.removeProduct);
  totalPrice();

  const handleRemoveProd = (id)=>{
    removeProduct(id);
  }

  return (
    <div className="max-w-3xl m-5">
      <section>
        <div className="flex justify-between">
        <Link to="/listNotFetch"><button className="bg-indigo-800 hover:bg-indigo-900 text-white p-2 rounded-lg my-3 mx-1 cursor-pointer">Lista de precios</button></Link>
        <button className="bg-gray-600 hover:bg-gray-700 text-white p-2 rounded-lg my-3 mx-1 cursor-pointer" onClick={removeAll}>Limpiar Cotización</button>
        <Link to="/CardProd"><button className="bg-amber-700 hover:bg-amber-800 text-white p-2 rounded-lg my-3 mx-1 cursor-pointer">Volver al producto</button></Link>
        </div>
        <h1 className="font-bold text-2xl text-white bg-indigo-500 p-2 rounded-lg text-center">Cotización Precios Almacén</h1>
      </section>
      <section >
        <div className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr] gap-2 p-1 bg-slate-400 my-2">
          <span className="font-bold text-lg text-center">Item</span>
          <span className="font-bold text-lg text-center">Valor</span>
          <span className="font-bold text-lg text-center">Cant</span>
          <span className="font-bold text-lg text-center">Parcial</span>
        </div>

        {cart.map((item, index)=>{
            let numSinPunto = item.venta_almacen.split(".").join("")
            let numberPrice = Number(numSinPunto);
            
            return(
              <div className={`grid grid-cols-[2fr_1fr_1fr_1fr_1fr] gap-2 p-1 ${index%2===0? "bg-gray-300 my-2" : "bg-slate-300 my-1"}`} key={item.id}>
                <span className="font-bold text-xs ">{`${item.producto} ${item.presentacion}`}</span>
                <span className="text-center">{item.venta_almacen}</span>
                <span className="text-center">{item.cantidad}</span>
                <span className="text-center">{(Number(item.cantidad) * numberPrice).toLocaleString()} </span>
                <div className="flex justify-center align-center">
                  <img src={bin} alt="logo-bin" className="ml-2 mr-4 mt-2 w-5 h-5" onClick={()=>handleRemoveProd(item.id)}/>
                </div>
              </div>
            )
        })}
        <div className="max-w3xl text-center bg-slate-500 p-2 my-2 text-xl text-white font-bold">Valor Total ${total.toLocaleString()}</div>

      </section>
    </div>

  )
}

export default Cart