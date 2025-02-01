"use client";
import { useState } from "react";
import { Geist_Mono, Montserrat } from "next/font/google";
import "./globals.css";
import { motion } from "framer-motion";
import Login from "@/app/authorization/login/page";
import Register from "@/app/authorization/register/page";

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
        <html lang="en" className={montserrat.variable}>
        <body className="antialiased font-montserrat">
        <header className="flex items-center justify-between p-4">
                    <span className="text-[#4400BA] text-[32px] font-bold">
                        GeoTouristicService
                    </span>

            <div className="flex items-center gap-2 w-[600px]">
                <input
                    type="text"
                    placeholder="Искать маршруты"
                    className="border px-3 py-2 rounded-md w-[100%]"
                />
            </div>

            <div className="flex gap-2">
                <button
                    onClick={() => { setIsLoginForm(true); openModal(); }}
                    className="px-4 py-2 border border-[#4400BA] text-[#4400BA] font-bold rounded-md"
                >
                    Войти
                </button>
                <button
                    onClick={() => { setIsLoginForm(false); openModal(); }}
                    className="px-4 py-2 border border-[#4400BA] bg-[#4400BA] font-bold text-white rounded-md"
                >
                    Регистрация
                </button>
            </div>
        </header>

        {isModalOpen && (
            <>
                {isLoginForm ? (
                    <Login closeModal={closeModal} />
                ) : (
                    <Register closeModal={closeModal} />
                )}
            </>
        )}

        <main className="p-4">{children}</main>
        </body>
        </html>
    );
}
