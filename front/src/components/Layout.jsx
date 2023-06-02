import Link from "next/link"


const Layout = ({children}) => {

const navLinks = [

    {
        name:'home',
        to:'/',
    },
    {
        name:'all products',
        to:'/products',
    },

    {
        name:'categories',
        to:'/categories',
    },
    {
        name:'account',
        to:'account'
    },
    {
        name:'cart',
        to:'cart'
    },
]

  return (
    <div>
<header className=" bg-zinc-800   sticky top-0">
<div className="flex justify-between max-w-[1100px] mx-auto p-6 px-5">
<div className="font-bold capitalize text-white">
    <Link href={'/'}>ecommerce</Link>    
    </div>

    <nav className="flex items-center gap-8 capitalize text-zinc-300 font-semibold text-sm">
{navLinks.map((el,i)=><Link key={i} href={el.to}>{el.name}</Link>)}
    </nav>


</div>
 

</header>



<main>{children}</main>


    </div>
  )
}

export default Layout