import React from 'react'

const NavLinkAside = ({name,Icon,active}) => {
    console.log(active)
  return (
    <div className={`flex items-center text-white gap-3 w-full p-3 ${active && 'bg-white text-slate-800 rounded-l-xl'}`}>
        <Icon className=' h-6' />
        <span className='capitalize'>{name}</span>
    </div>
  )
}

export default NavLinkAside