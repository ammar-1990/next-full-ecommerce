import NewProducts from '@/components/NewProducts'
import axios from 'axios'
import React from 'react'

const allproducts = ({products}) => {
  return (
    <div className='bg-zinc-200'>
    <NewProducts products={products} header={"all products"} />
    </div>
  )
}

export default allproducts










export async function getServerSideProps(){

const res = await axios('http://localhost:3000/api/products')
return {
    props:{
        products:res.data
    }
}

}