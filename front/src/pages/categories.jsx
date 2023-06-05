import axios from 'axios'
import React from 'react'

const categories = ({products}) => {
  return (
    <div>

        
    </div>
  )
}

export default categories





export async function getServerSideProps(context){
const type=context.query.type
if(type)
{

    const products = await axios(`http://localhost:3000/api/products?category=${type}`)

    return {
        props:{
            products:products.data
        }
    }
}
    return {
        props:{}
    }
}