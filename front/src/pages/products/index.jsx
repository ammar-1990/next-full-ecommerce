import NewProducts from '@/components/NewProducts'
import axios from 'axios'
import React from 'react'
import Head from 'next/head'

const allproducts = ({products}) => {
  return (
    <div className='bg-zinc-200'>
      <Head>
        <title>
          All Products
        </title>
      </Head>
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