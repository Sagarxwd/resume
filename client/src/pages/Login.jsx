import { Lock, Mail, User2Icon } from "lucide-react";
import React, { useEffect, useState } from "react";
import api from "../configs/api";
import { useDispatch } from "react-redux";
import { login } from "../app/features/authSlice";
import toast from "react-hot-toast";

const Login = () => {
  const dispatch = useDispatch();

  const query = new URLSearchParams(window.location.search);
  const urlMode = query.get("state");

  const [mode, setMode] = useState(
    urlMode === "register" ? "register" : "login"
  );

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  /* ---------------- sync mode with URL ---------------- */
  useEffect(() => {
    const params = new URLSearchParams();
    params.set("state", mode);
    window.history.replaceState(null, "", `?${params.toString()}`);
  }, [mode]);

  /* ---------------- handle input ---------------- */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  /* ---------------- submit form ---------------- */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (mode === "register" && !formData.name.trim()) {
      return toast.error("Name is required");
    }

    try {
      const { data } = await api.post(`/api/users/${mode}`, formData);

      dispatch(login(data));
      localStorage.setItem("token", data.token);

      toast.success(data.message);
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300 overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-96 md:size-[600px] bg-red-300 blur-[120px] opacity-20 animate-pulse duration-[3000ms] -z-10"></div>

      <form
        onSubmit={handleSubmit}
        className="relative sm:w-[380px] w-[90%] text-center border border-slate-100 dark:border-slate-800 rounded-3xl px-8 py-4 bg-white dark:bg-slate-900 shadow-2xl shadow-slate-200/50 dark:shadow-slate-900/50 transition-colors duration-300"
      >
        <div className="mt-6 mb-4 flex justify-center">
            <img src="/nova-logo.png" alt="NovaResume Logo" className='h-12 w-12 object-cover rounded-xl shadow-sm' />
        </div>
        <h1 className="text-slate-900 dark:text-white text-2xl font-bold tracking-tight">
          {mode === "login" ? "Welcome back" : "Create an account"}
        </h1>

        <p className="text-gray-500 dark:text-slate-400 text-sm mt-2">
          Please {mode} to continue
        </p>

        {/* NAME (ONLY REGISTER) */}
        {mode === "register" && (
          <div className="flex items-center mt-6 w-full border border-slate-200 dark:border-slate-700 focus-within:border-red-400 dark:focus-within:border-red-500 focus-within:ring-4 focus-within:ring-red-100 dark:focus-within:ring-red-900/30 h-12 rounded-full pl-6 gap-2 transition-all duration-300 bg-slate-50 dark:bg-slate-800 focus-within:bg-white dark:focus-within:bg-slate-900 text-slate-600 dark:text-slate-300">
            <User2Icon size={18} />
            <input
              type="text"
              name="name"
              placeholder="Name"
              className="w-full outline-none border-none bg-transparent focus:ring-0"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
        )}

        {/* EMAIL */}
        <div className="flex items-center mt-4 w-full border border-slate-200 dark:border-slate-700 focus-within:border-red-400 dark:focus-within:border-red-500 focus-within:ring-4 focus-within:ring-red-100 dark:focus-within:ring-red-900/30 h-12 rounded-full pl-6 gap-2 transition-all duration-300 bg-slate-50 dark:bg-slate-800 focus-within:bg-white dark:focus-within:bg-slate-900 text-slate-600 dark:text-slate-300">
          <Mail size={18} />
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full outline-none border-none bg-transparent focus:ring-0"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        {/* PASSWORD */}
        <div className="flex items-center mt-4 w-full border border-slate-200 dark:border-slate-700 focus-within:border-red-400 dark:focus-within:border-red-500 focus-within:ring-4 focus-within:ring-red-100 dark:focus-within:ring-red-900/30 h-12 rounded-full pl-6 gap-2 transition-all duration-300 bg-slate-50 dark:bg-slate-800 focus-within:bg-white dark:focus-within:bg-slate-900 text-slate-600 dark:text-slate-300">
          <Lock size={18} />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full outline-none border-none bg-transparent focus:ring-0"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        {/* FORGOT PASSWORD */}
        <div className="mt-4 text-left">
          <button
            type="button"
            className="text-sm text-red-500 hover:underline"
            onClick={() => toast("Forgot password coming soon")}
          >
            Forget password?
          </button>
        </div>

        {/* SUBMIT */}
        <button
          type="submit"
          className="mt-6 w-full h-12 rounded-full text-white bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 shadow-lg shadow-red-500/25 hover:shadow-xl hover:shadow-red-500/40 hover:-translate-y-0.5 transition-all duration-300 font-semibold"
        >
          {mode === "login" ? "Login" : "Sign up"}
        </button>

        {/* TOGGLE LOGIN / REGISTER */}
        <p className="text-gray-500 dark:text-slate-400 text-sm mt-3 mb-11">
          {mode === "login"
            ? "Don't have an account?"
            : "Already have an account?"}{" "}
          <span
            onClick={() =>
              setMode((prev) => (prev === "login" ? "register" : "login"))
            }
            className="text-red-500 cursor-pointer hover:underline"
          >
            Click here
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;
