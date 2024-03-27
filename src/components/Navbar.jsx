import React from 'react'

const Navbar = () => {
    return (
        <nav className='flex justify-between bg-slate-800 text-white py-2'>
            <div className='logo'>
                <span className='font-bold text-xl mx-9'>iNote</span>
            </div>
            <ul className='flex gap-8 mx-9'>
                <li className='cursor-pointer hover:font-bold transition-all'>Home</li>
                <li className='cursor-pointer hover:font-bold transition-all'>About</li>
            </ul>
        </nav>
    )
}

export default Navbar
