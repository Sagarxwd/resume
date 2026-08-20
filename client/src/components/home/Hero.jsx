import React from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useTheme } from '../../hooks/useTheme';
import { Moon, Sun } from 'lucide-react';

const Hero = () => {

    const {user}=useSelector(state=>state.auth)

    const [menuOpen, setMenuOpen] = React.useState(false);
    const { theme, toggleTheme } = useTheme();


    return (
        <>
            <div className="min-h-screen flex flex-col bg-white dark:bg-slate-950 transition-colors duration-300">
                {/* Navbar */}
                <nav className="z-50 flex items-center justify-between w-full py-4 px-6 md:px-16 lg:px-24 xl:px-40 text-sm">
                    <a href="/" className="flex items-center gap-2">
                        <img src="/nova-logo.png" alt="NovaResume Logo" className='h-10 w-10 object-cover rounded shadow-md' />
                        <span className='font-bold text-2xl text-slate-800 dark:text-white tracking-tight'>NovaResume</span>
                    </a>

                    <div className="hidden md:flex items-center gap-8 transition duration-500 text-slate-800 dark:text-slate-300">
                        <a href="/" className="hover:text-red-600 dark:hover:text-red-400 transition">Home</a>
                        <a href="#features" className="hover:text-red-600 dark:hover:text-red-400 transition">Features</a>
                        <a href="#testimonials" className="hover:text-red-600 dark:hover:text-red-400 transition">Testimonials</a>
                        <a href="#cta" className="hover:text-red-600 dark:hover:text-red-400 transition">Contact</a>
                    </div>

                    <div className="flex gap-2 items-center">
                        <button onClick={toggleTheme} className='hidden md:block p-2 ml-2 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-full transition-colors'>
                            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                        </button>
                        <Link to='/app?state=register' className="hidden md:block px-6 py-2 bg-red-500 hover:bg-red-700 active:scale-95 transition-all rounded-full text-white" hidden={user}>
                            Get started
                        </Link>
                        <Link to='/app?state=login' className="hidden md:block px-6 py-2 border dark:border-slate-700 active:scale-95 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all rounded-full text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white" hidden={user} >
                            Login
                        </Link>
                         <Link to='/app' className="hidden md:block px-6 py-2 bg-red-500 hover:bg-red-700 active:scale-95 transition-all rounded-full text-white" hidden={!user}>
                            Dashboard
                        </Link>
                    </div>

                    <button onClick={() => setMenuOpen(true)} className="md:hidden active:scale-90 transition dark:text-white" >
                        <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="2" className="lucide lucide-menu" >
                            <path d="M4 5h16M4 12h16M4 19h16" />
                        </svg>
                    </button>
                </nav>

                {/* Mobile Menu */}
                <div className={`fixed inset-0 z-[100] bg-black/80 backdrop-blur-md flex flex-col items-center justify-center text-lg gap-8 md:hidden transition-transform duration-300 ${menuOpen ? "translate-x-0" : "-translate-x-full"}`} >
                    <button onClick={toggleTheme} className='absolute top-6 left-6 p-2 text-white bg-slate-800 rounded-full transition-colors'>
                            {theme === 'dark' ? <Sun size={24} /> : <Moon size={24} />}
                    </button>
                    <a href="/" onClick={() => setMenuOpen(false)} className="text-white hover:text-red-400">Home</a>
                    <a href="#features" onClick={() => setMenuOpen(false)} className="text-white hover:text-red-400">Features</a>
                    <a href="#testimonials" onClick={() => setMenuOpen(false)} className="text-white hover:text-red-400">Testimonials</a>
                    <a href="#cta" onClick={() => setMenuOpen(false)} className="text-white hover:text-red-400">Contact</a>
                    <button onClick={() => setMenuOpen(false)} className="absolute top-6 right-6 active:ring-3 active:ring-white aspect-square size-10 items-center justify-center bg-red-600 hover:bg-red-700 transition text-white rounded-md flex" >
                        X
                    </button>
                </div>

                {/* Hero Section */}
                <div className="relative flex-1 flex flex-col items-center justify-center text-sm px-4 md:px-16 lg:px-24 xl:px-40 text-black pb-16">
                    <div className="absolute top-28 xl:top-10 -z-10 left-1/4 size-72 sm:size-96 xl:size-120 2xl:size-132 bg-red-400 blur-[120px] opacity-20 animate-pulse duration-[3000ms]"></div>



                    {/* Headline + CTA */}
                    <h1 className="text-5xl md:text-6xl font-semibold max-w-5xl text-center mt-2 md:leading-[70px] dark:text-white">
                        Land your dream job with <span className=" bg-gradient-to-r from-red-700 to-red-600 dark:from-red-500 dark:to-red-400 bg-clip-text text-transparent text-nowrap">AI-powered </span> resumes.
                    </h1>

                    <p className="max-w-md text-center text-base my-3 text-slate-700 dark:text-slate-400">Create, edit and download professional resumes with AI-powered assistance.</p>

                    {/* CTA Buttons */}
                    <div className="flex items-center gap-4 mt-1">
                        <Link to='/app' className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-full px-9 h-12 shadow-lg shadow-red-500/25 hover:shadow-xl hover:shadow-red-500/40 hover:-translate-y-0.5 flex items-center transition-all duration-300 font-medium">
                            Get started
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-right ml-2 size-4" aria-hidden="true"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
                        </Link>
                        {/* Hidden temporarily until updates */}
                        <button className="hidden items-center gap-2 border border-slate-400 hover:bg-red-50 transition rounded-full px-7 h-12 text-slate-700">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-video size-5" aria-hidden="true"><path d="m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5"></path><rect x="2" y="6" width="14" height="12" rx="2"></rect></svg>
                            <span>Try demo</span>
                        </button>
                    </div>


                </div>
            </div>
            <style>
                {`
                    @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');

                    * {
                        font-family: 'Poppins', sans-serif;
                    }
                `}
            </style>
        </>

    )
}

export default Hero