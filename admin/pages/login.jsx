import Link from 'next/link'
import React from 'react'
import { useState } from 'react'
import { newAxios } from '@/lib/axios'
import { useRouter } from 'next/router'

const Login = () => {

const [email,setEmail] = useState('')
const [password,setPassword] = useState('')
const [loading,setLoading] = useState(false)
const [error,setError] = useState('')
const router = useRouter()

const handleSubmit = async(e)=>{
e.preventDefault()
    try {
        setError('')
        setLoading(true)
        const res = await newAxios.post('/auth/login',{email,password})
       router.push('/')
    } catch (error) {
        setError(error)
        console.log(error)
    }finally{
        setLoading(false)
        setEmail('')
        setPassword('')
    }

}

  return (
    <div className='h-screen bg-black flex items-center justify-center p-3'>
        <form onSubmit={handleSubmit} className='max-w-[400px] bg-white w-full p-4 flex flex-col gap-8 rounded-sm'>
            <h1 className='text-5xl text-orange-400 capitalize'>Login</h1>
            <input required onChange={e=>setEmail(e.target.value)} value={email} className='input' type='email'  placeholder='email'/>
            <input required min={6} onChange={e=>setPassword(e.target.value)} value={password} className='input' type='password' placeholder='password'/>
            <button disabled={!email || !password || loading} className='bg-orange-400 outline-none text-white py-3 rounded-sm disabled:bg-gray-400'>{loading ? 'Loading...':"Login"}</button>
            <p>Don{"'"}t have an account? <Link href={'/register'} className='hover:underline'>Register.</Link></p>
            {error&&<p className='py-2 uppercase text-red-500 text-xs'>{error.response.data}</p>}
        </form>
    </div>
  )
}

export default Login




Login.getLayout = (page) => page;