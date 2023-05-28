import Image from 'next/image'
import jwt from 'jsonwebtoken'


export default function Home({user}) {
  return (
<div>{JSON.stringify(user)}</div>
  )
}







export async function getServerSideProps({req,res}){

const user =jwt.verify(req.cookies.accessToken,process.env.JWT_SECRET,(error,token)=>{
  if(error) return null
    
  

 return req.user=token


})
console.log(user)

if(!user) return {redirect:{destination:'/register',   permanent: false,}}



  return {
    props:{user}
  }
}
