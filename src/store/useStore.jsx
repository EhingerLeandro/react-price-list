import {create} from "zustand";

export const useStore = create((set, get) => ({
    //state
    cart:[],
    total:0,
    globalData:[],
    globalLoading:false,
    globalSelect:null,

    //actions
    addProduct:(item, prodSelect)=>{
        //This first part evaluates if the product is already in the cart
       const {cart} = get();
       let newCart = [...cart];
       const index = newCart.findIndex(prod =>  prod.id === prodSelect);
       if(index!==-1){
           newCart[index].cantidad += 1;
           set({cart:newCart})
       }else{
        set((state)=>(
            {cart:[...state.cart, {
                id:prodSelect,
                producto:item.producto,
                presentacion:item.presentacion,
                venta_almacen:item.venta_almacen_iva_incluido,
                cantidad: 1
            }] }
        ))
       }
    },
    removeProduct:(ind)=>{
        const {cart} = get();
        let newCart = [...cart];
        let cartFiltered = newCart.filter(prod => prod.id !== ind);
        set({cart:cartFiltered})
    },
    removeAll:()=>{
        set({cart:[]})
    },
    totalPrice:()=>{
        const {cart} = get();
        let acum = cart.reduce((acc, item)=>{
            let numSinPunto = item.venta_almacen.split(".").join("")
            let numberPrice = Number(numSinPunto);
            let subtotal = numberPrice * item.cantidad;
            return acc + subtotal;
        }, 0);
        set({total:acum})
    },
    setGlobalData:(data)=>{
        set({globalData:data})
    },
    setGlobalLoading:(loading)=>{
        set({globalLoading:loading})
    },
    setGlobalSelect:(prodSelect)=>{
        set({globalSelect:prodSelect})
    }

    
}));