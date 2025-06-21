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
       //If the product is already in the cart (different from -1), we add one unit to the quantity
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
    //Here we remove one product
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
            //In this part we need to change the format of the number, because google sheet sends the price as a string with a dot.
            let numSinPunto = item.venta_almacen.split(".").join("")
            let numberPrice = Number(numSinPunto);
            let subtotal = numberPrice * item.cantidad;
            return acc + subtotal;
        }, 0);
        set({total:acum})
    },
    //This takes the data that has been fetched and stores it in the globalData state
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