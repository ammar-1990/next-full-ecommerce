import axios from 'axios'
import React from 'react'
import Head from 'next/head'

const categories = ({products}) => {
  return (
    <div>
<Head>
    <title>
        Categories
    </title>
</Head>

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