import { useRouter } from 'next/router'
import  jwt  from 'jsonwebtoken'
import { newAxios } from '@/lib/axios'
import Link from 'next/link'
import usePostFetch from '@/hooks/usePostFetch'

const DeleteProduct = ({user,theProduct}) => {
const {data,loading,error,deletePost} = usePostFetch()
    const router = useRouter()

    const {id} = router.query


    const handleDelete =async()=>{

      await deletePost(`/products?id=${id}`)
 router.push('/products',undefined,{replace:true})


    }
if(!theProduct) return <p>no such product</p>
  return (
    <div className='h-full flex items-center justify-center'>
<div>
    <p>
        Are you sure you want to delete <span className='font-semibold capitalize'>{theProduct.name} ?</span>
    </p>
    {error&&<p className='text-xs text-red-500'>{error?.response?.data|| 'something went wrong'}</p>}

    <div className='mt-4 text-center space-x-2'>
        <button onClick={handleDelete} className='px-12 py-2 text-white bg-red-500'>{loading ? 'Loading..' :"Yes"}</button>
       <Link href={'/products'} replace><button className='px-12 py-2 text-white bg-black' >No</button></Link> 
    </div>
</div>
    </div>
  )
}

export default DeleteProduct






export async function getServerSideProps({ req, res, params: { id } }) {
    const user = jwt.verify(
      req.cookies.accessToken,
      process.env.JWT_SECRET,
      (error, token) => {
        if (error) return null;
  
        return (req.user = token);
      }
    );
  
    if (!user)
      return { redirect: { destination: "/register", permanent: false } };

      try {
        const product = await newAxios(`/products?id=${id}`)
        return {
            props: { user,theProduct:product.data },
          };
      } catch (error) {
        return {
            props: { user,theProduct:null},
          };
      }


 
  }
