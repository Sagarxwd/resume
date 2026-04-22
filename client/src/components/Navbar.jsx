import React, { use } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import { logout } from '../app/features/authSlice';
import { useTheme } from '../hooks/useTheme';
import { Moon, Sun } from 'lucide-react';

const Navbar = () => {
   const {user}=useSelector(state=>state.auth)
   const dispatch=useDispatch()
    const naviagte=useNavigate();
    const { theme, toggleTheme } = useTheme();
    const logoutUser=()=>{
        //logout logic
        naviagte('/');
        dispatch(logout())
    }
  return (
    <div className='sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md shadow-sm border-b border-gray-100 dark:border-slate-800 transition-all'>
        <nav className='flex items-center justify-between max-w-7xl mx-auto px-4 py-3 text-slate-800 dark:text-white transition-all'>
            <Link to='/' className="flex items-center gap-2 group">
            <img src="/nova-logo.png" alt="NovaResume Logo" className='h-9 w-9 object-cover rounded-md shadow-sm group-hover:scale-105 transition-transform' />
            <span className='font-bold text-xl tracking-tight'>NovaResume</span>
            </Link>
            <div className='flex items-center gap-4 text-sm '>
                <button onClick={toggleTheme} className='p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors'>
                    {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
                </button>
                <p className='max-sm:hidden'>Hi, {user?.name}</p>
                <button onClick={logoutUser} className='bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 border border-gray-200 dark:border-slate-700 px-7 py-1.5 rounded-full hover:shadow-md hover:-translate-y-0.5 active:scale-95 transition-all text-gray-700 dark:text-slate-200 font-medium'>Logout</button>
            </div>
        </nav>


    </div>
  )
}

export default Navbar