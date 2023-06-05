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
          const exist = state.cart.find(el=>el._id===action.payload._id)
          if(exist){
            state.cart=state.cart.map(el=>{
                if(el._id===action.payload._id) return ({...el,amount:el.amount+1})
                else {
                    return el
                }
            })
          }

          else {
            state.cart.push({...action.payload,amount:1})
          }
            localStorage.setItem('cart',JSON.stringify(state.cart))
        },





        removeFromCart:(state,action)=>{
            const element = state.cart.find(el=>el._id===action.payload._id)
            if(element.amount===1){
                state.cart=state.cart.filter(el=>el._id!==action.payload._id)
            }

            else{
                state.cart=state.cart.map(el=>{
                    if(el._id===action.payload._id) return ({...el,amount:el.amount-1})
                    else{
                        return el
                    }
                })
            }

localStorage.setItem('cart',JSON.stringify(state.cart))
        },

        removeAll:(state)=>{
state.cart=[]
localStorage.removeItem('cart')
        }
    }
})




export const {addToCart,removeFromCart ,getAll,removeAll} = cartSlice.actions

export const getCart = (state)=>state.cart
export const getTotal = (state)=>state.cart.cart.reduce((total,el)=>total+el.price*el.amount,0)
export const getAmount = (state)=>state.cart.cart.reduce((total,el)=>total + el.amount,0)

export default cartSlice.reducer