import axios from 'axios'
import Featured from '@/components/Featured'
import { Inter } from 'next/font/google'
import Head from 'next/head'
import NewProducts from '@/components/NewProducts'

const inter = Inter({ subsets: ['latin'] })

export default function Home({featuredProduct,products}) {
  console.log(products)
  return (
   <div className=' bg-zinc-100'>
    <Head>
      <title>E-commerce</title>
    </Head>
    <Featured product={featuredProduct} />
    <NewProducts products={products} />

    
    
    
    </div>
  )
}




export async function getServerSideProps(){

const product = await axios(`http://localhost:3000/api/products?id=647a2833af7e1975ccc72097`)
const products = await axios(`http://localhost:3000/api/products`)

console.log(product,products)





return {
  props:{featuredProduct:product.data,products:products.data}
}

}