import React from 'react'
import { Link } from 'react-router-dom'

const CallToAction = () => {
    return (
        <div id='cta' className='border-y border-dashed border-slate-200 dark:border-slate-800 w-full max-w-5xl mx-auto px-10 sm:px-16 mt-28'>
            <div className="flex flex-col md:flex-row text-center md:text-left items-center justify-between gap-8 px-3 md:px-10 border-x border-dashed border-slate-200 dark:border-slate-800 py-16 sm:py-20 -mt-10 -mb-10 w-full">
                <p className="text-xl font-medium max-w-md text-slate-800 dark:text-slate-100">Build a Professional Resume That Helps You Stand Out and Get Hired</p>
                <Link to="/app" className="shrink-0 flex items-center gap-2 rounded-full py-3 px-9 bg-gradient-to-r from-red-500 to-red-600 dark:from-red-600 dark:to-red-700 hover:from-red-600 hover:to-red-700 transition-all duration-300 text-white shadow-lg shadow-red-500/25 dark:shadow-red-900/40 hover:shadow-xl hover:shadow-red-500/40 hover:-translate-y-0.5">
                    <span>Get Started</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-4.5"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
                </Link>
            </div>
        </div>
    )
}

export default CallToAction