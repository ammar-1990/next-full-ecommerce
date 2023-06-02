

const NewProduct = ({name,desc,features,images,cat}) => {
  return (
    <div className="col-span-4 md:col-span-2 lg:col-span-1  mb-4 flex flex-col gap-3 bg-white  ">
        <img src={images[0].url} className="h-[150px] object-cover" />
        <div className="p-5 flex flex-col gap-2">
        <h1 className="text-2xl font-semibold line-clamp-1">{name}</h1>
        <p className="text-sm text-zinc-400 text-justify line-clamp-4">{desc}</p>
        </div>
   
    </div>
  )
}

export default NewProduct