import Head from 'next/head'
import jwt from 'jsonwebtoken'


export default function Home({user}) {
  return (
<div className=''>
  <Head>
    <title>{`Admin | ${user.username}`}</title>
  </Head>
  
  {user.username}</div>
  )
}







export async function getServerSideProps({req,res}){

const user =jwt.verify(req.cookies.accessToken,process.env.JWT_SECRET,(error,token)=>{
  if(error) return null
    
  

 return req.user=token


})

if(!user) return {redirect:{destination:'/register',   permanent: false,}}



  return {
    props:{user}
  }
}
