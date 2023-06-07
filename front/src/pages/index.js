import axios from 'axios'
import Featured from '@/components/Featured'
import { Inter } from 'next/font/google'
import Head from 'next/head'
import NewProducts from '@/components/NewProducts'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export default function Home({featuredProduct,products}) {

  return (
   <div className=' bg-zinc-200'>
    <Head>
      <title>E-commerce</title>
    </Head>
    <Featured product={featuredProduct} />
    <NewProducts products={products} header={"Latest products"}/>
    <div className='text-center py-8 max-w-[1100px] mx-auto px-6 '><Link href={'/products'}><button className='underline'>See all products</button></Link></div>

    
    
    
    </div>
  )
}




export async function getServerSideProps(){

const product = await axios(`http://localhost:3000/api/products?id=647a2833af7e1975ccc72097`)
const products = await axios(`http://localhost:3000/api/products`)







return {
  props:{featuredProduct:product.data,products:products.data.reverse().slice(0,9)}
}

}