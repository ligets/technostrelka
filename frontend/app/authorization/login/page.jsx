"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import process from "next/dist/build/webpack/loaders/resolve-url-loader/lib/postcss";

export default function Login({ closeModal, setIsLoginForm }) {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [isChecked, setIsChecked] = useState(false);

    const handleCheckboxChange = () => {
        setIsChecked((prev) => !prev);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!isChecked) {
            console.log("Галочка не выбрана");
            return;
        }

        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_HOST}/accounts/auth/signin`, {
                login: login,
                password: password,
            });

            console.log('Response:', response.data);

            // Устанавливаем cookie
            document.cookie = `accessToken=${response.data.accessToken}; path=/; max-age=2592000`;
            document.cookie = `refreshTokenId=${response.data.refreshTokenId}; path=/; max-age=2592000`;

            // Закрываем модальное окно после успешного входа
            closeModal();
            window.location.reload();
        } catch (err) {
            console.error("Ошибка при авторизации:", err.response);
        }
    };
    return (
        <div
            className="fixed inset-0 bg-[#4A4949]/40 flex justify-center items-center z-50 p-[30px]"
            onClick={(e) => e.target === e.currentTarget && closeModal()}
        >
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2 }}
                className="w-[405px] rounded-[8px] flex bg-white flex-col p-6 relative"
            >
                <button
                    onClick={closeModal}
                    className="absolute top-4 right-4 text-white text-xl"
                >
                    ✕
                </button>

                <p className="mb-6 text-center text-[22px] text-black font-bold">Укажите ваш логин и пароль</p>

                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                    <input
                        type="text"
                        value={login}
                        name="login"
                        onChange={(e) => setLogin(e.target.value)}
                        className="bg-transparent border-solid border-[2px] rounded-[5px] px-[16px] py-[8px] text-[18px] placeholder-[#D9D9D9] text-black focus:outline-none"
                        placeholder="Ваш логин"
                        required
                    />
                    <input
                        type="password"
                        value={password}
                        name="password"
                        onChange={(e) => setPassword(e.target.value)}
                        className="bg-transparent border-solid border-[2px] rounded-[5px] px-[16px] py-[8px] text-[18px] placeholder-[#D9D9D9] text-black focus:outline-none"
                        placeholder="Ваш пароль"
                        required
                    />

                    <div className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={handleCheckboxChange}
                            className="w-4 h-4"
                        />
                        <label className="text-sm text-black">
                            Принимаю Пользовательское соглашение и даю согласие на обработку персональных данных
                        </label>
                    </div>

                    <button
                        type="submit"
                        className={`${
                            isChecked ? "bg-[#4400BA]" : "bg-gray-400 cursor-not-allowed"
                        } text-white py-2 rounded-lg text-lg font-semibold hover:bg-[#4400BA] transition`}
                        disabled={!isChecked}
                    >
                        Войти
                    </button>
                </form>

                <p className="mt-2 text-left text-sm text-black">
                    Нет аккаунта?{" "}
                    <button onClick={() => { setIsLoginForm(false); }} className="font-semibold text-[#6874F9] no-underline">
                        Зарегистрироваться
                    </button>
                </p>
            </motion.div>
        </div>
    );
}
