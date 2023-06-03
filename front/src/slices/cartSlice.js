import { createSlice } from "@reduxjs/toolkit";



const initialState = {
    cart:[],
    loading:true
}



const cartSlice = createSlice({


    name:'cart',
    initialState,
    reducers:{


        getAll:(state)=>{
            if(localStorage.getItem('cart'))
state.cart =JSON.parse(localStorage.getItem('cart'))

else{
    state.cart=[]
}
state.loading=false

        },

        addToCart :(state,action)=>{
            state.cart.push(action.payload)
            localStorage.setItem('cart',JSON.stringify(state.cart))
        },





        removeFromCart:(state,action)=>{
const index = state.cart.findIndex(el=>el._id===action.payload._id)
const copy = [...state.cart]
copy.splice(index,1)

state.cart = [...copy]
localStorage.setItem('cart',JSON.stringify(state.cart))
        }
    }
})




export const {addToCart,removeFromCart ,getAll} = cartSlice.actions

export const getCart = (state)=>state.cart
export const getTotal = (state)=>state.cart.cart.reduce((total,el)=>total+el.price,0)

export default cartSlice.reducer