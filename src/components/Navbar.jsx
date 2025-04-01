import React from 'react'

const Navbar = () => {
  return (
    <nav className='bg-slate-800'>
      <div className='flex justify-between items-center px-4 py-5 h-14 mycontainer text-white'>
      <div className='logo font-bold text-2xl'>
        <span className='text-green-700'> &lt;</span>Pass<span className='text-green-700'>PRO/&gt;</span>
        </div>
      <ul>
        <li className='flex gap-4'>
            <a className='hover:font-bold' href="/">Home</a>
            <a className='hover:font-bold' href="/">About</a>
            
        </li>
        
      </ul>
        </div> 
    
    </nav>
  )
}

export default Navbar
