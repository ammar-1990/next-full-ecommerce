import jwt from 'jsonwebtoken'

const Settings = ({user}) => {
  return (
    <div>{user.username}</div>
  )
}

export default Settings




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