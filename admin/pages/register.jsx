import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/router"
import { newAxios } from '@/lib/axios'

const Register = () => {


    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [username,setUsername] = useState('')
    const [loading,setLoading] = useState(false)
    const [error,setError] = useState('')
const router = useRouter()

    const handleSubmit = async(e)=>{
        e.preventDefault()
            try {
                setError('')
                setLoading(true)
                const res = await newAxios.post('/auth/register',{email,password,username})
                router.push('/')
               
            } catch (error) {
                setError(error)
                console.log(error)
            }finally{
                setLoading(false)
                setEmail('')
                setPassword('')
                setUsername('')
            }
        
        }
    return (
        <div className='h-screen bg-slate-800 flex items-center justify-center p-3'>
            <form onSubmit={handleSubmit} className='max-w-[400px] bg-white w-full p-4 flex flex-col gap-8 rounded-sm'>
                <h1 className='text-5xl text-gray-500 capitalize'>Register</h1>
                <input required onChange={e=>setUsername(e.target.value)} value={username} className='input' type='text'  placeholder='username'/>
                <input required onChange={e=>setEmail(e.target.value)} value={email} className='input' type='email'  placeholder='email'/>
                <input required min={6} onChange={e=>setPassword(e.target.value)} value={password} className='input' type='password' placeholder='password'/>
                <button disabled={!email || !password || !username || loading} className='bg-slate-800 outline-none text-white py-3 rounded-sm disabled:bg-gray-400'>{loading ? 'Loading...':"Register"}</button>
                <p>Already have an account? <Link href={'/login'} className='hover:underline'>Login.</Link></p>
                {error&&<p className='py-2 uppercase text-red-500 text-xs'>{error.response.data}</p>}
            </form>
        </div>
      )
}

export default Register





Register.getLayout = (page) => page;