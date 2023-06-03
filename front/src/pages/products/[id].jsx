import { useRouter } from "next/router"

const SingleProduct = () => {


    const {query:{id}} = useRouter()
  return (
    <div>{id}</div>
  )
}

export default SingleProduct