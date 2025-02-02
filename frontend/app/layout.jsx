"use client";
import { useState } from "react";
import { Geist_Mono, Montserrat } from "next/font/google";
import "./globals.css";
import { motion } from "framer-motion";
import Login from "@/app/authorization/login/page";
import Register from "@/app/authorization/register/page";
import Link from "next/link";
import VerifyCodeModal from "@/app/authorization/components/code/page";

const montserrat = Montserrat({
    variable: "--font-montserrat-sans",
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
});

export default function RootLayout({ children }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoginForm, setIsLoginForm] = useState(true); // Управляем текущей формой (вход/регистрация)

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <html lang="en" className={montserrat.variable} >
        <body className="antialiased font-montserrat ">
        <header className="flex items-center justify-between p-4 bg-[#fff]">
                    <Link className="text-[#6874f9] text-[32px] font-bold" 
                    href="/">
                        GeoTouristicService
                    </Link>

            <div className="flex items-center gap-2 w-[600px] relative">
                <div className="absolute left-3">
                    <svg width="21" height="22" viewBox="0 0 21 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20.6511 19.5123L15.5009 14.356C18.0904 10.9856 17.8314 6.11728 14.724 3.03498C13.0265 1.33539 10.8398 0.5 8.62439 0.5C6.40895 0.5 4.22228 1.33539 2.52474 3.03498C-0.841579 6.40535 -0.841579 11.8786 2.52474 15.249C4.22228 16.9486 6.40895 17.784 8.62439 17.784C10.4658 17.784 12.3072 17.2078 13.8321 16.0268L19.0111 21.1543C19.2412 21.3848 19.5289 21.5 19.8454 21.5C20.1332 21.5 20.4496 21.3848 20.6798 21.1543C21.1114 20.7222 21.1114 19.9733 20.6511 19.5123ZM8.65316 15.4506C6.95561 15.4506 5.40193 14.7881 4.19351 13.607C1.74789 11.1584 1.74789 7.15432 4.19351 4.67696C5.37316 3.49588 6.95561 2.83333 8.65316 2.83333C10.3507 2.83333 11.9044 3.49588 13.1128 4.67696C14.3212 5.85803 14.9542 7.44239 14.9542 9.14198C14.9542 10.8416 14.2925 12.3971 13.1128 13.607C11.9332 14.8169 10.3219 15.4506 8.65316 15.4506Z" fill="#8D8D8D" />
                    </svg>
                </div>
                <input
                    type="text"
                    placeholder="Искать маршруты"
                    className="border px-10 py-2  w-[100%] rounded-[25px] border-gray-400  p-2  shadow-md bg-white outline-none"
                />
            </div>

            <div className="flex gap-2">
                <button
                    onClick={() => { setIsLoginForm(true); openModal(); }}
                    className="rounded-[25px] py-[0.5em] px-[2em] bg-[#6874f9] text-white text-[15px] font-bold border-[1px] border-[#6874f9] hover:bg-transparent hover:text-blue-600 transition-all duration-300"
                >
                    Войти
                </button>
                <button
                    onClick={() => { setIsLoginForm(false); openModal(); }}
                    className="rounded-[25px] py-[0.5em] px-[2em] bg-[#6874f9] text-white text-[15px] font-bold border-[1px] border-[#6874f9] hover:bg-transparent hover:text-blue-600 transition-all duration-300"
                >
                    Регистрация
                </button>
            </div>
        </header>

        {isModalOpen && (
            <>
                {isLoginForm ? (
                    <Login closeModal={closeModal} setIsLoginForm={setIsLoginForm} />
                ) : (
                    <Register closeModal={closeModal} setIsLoginForm={setIsLoginForm} />
                )}
            </>
        )}
<<<<<<< HEAD
        <main className="p-7">{children}</main>
=======

        <main className="m-7 flex flex-col items-center justify-center rounded-[22px]  h-[913px] shadow-[0_0_5px_1px_rgba(0,0,0,0.25)] bg-white">{children}</main>
>>>>>>> 15da413e312a0cc0db19105d4577d62991d3858e
        </body>
        </html>
    );
}
