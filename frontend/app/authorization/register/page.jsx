"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import process from "next/dist/build/webpack/loaders/resolve-url-loader/lib/postcss";

export default function Register({ closeModal, setIsLoginForm }) {
    const [formData, setFormData] = useState({
        first_name: "",
        email: "",
        password: "",
        confirm_password: "",
    });
    const [isChecked, setIsChecked] = useState(false);
    const [error, setError] = useState("");
    const [isRegisterForm, setIsRegisterForm] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleCheckboxChange = () => {
        setIsChecked((prev) => !prev);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (formData.password !== formData.confirm_password) {
            setError("Пароли не совпадают");
            return;
        }
        if (isChecked) {
            console.log(formData.first_name, formData.email, formData.password, formData.confirm_password, isChecked);
        }

        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_HOST_AUTH}/Authentication/SignUp`, {
                first_name: formData.first_name,
                email: formData.email,
                password: formData.password,
                confirm_password: formData.confirm_password,
            });
            console.log('Response:', response.data);

            document.cookie = `accessToken=${response.data.accessToken}; path=/; max-age=2592000`;
            document.cookie = `refresh_token=${response.data.refresh_token}; path=/; max-age=2592000`;
        } catch (err) {
            console.log(err.response);
            setError("Ошибка при регистрации. Пожалуйста, попробуйте снова.");
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
                    className="absolute top-4 right-4 text-black text-xl"
                >
                    ✕
                </button>

                <p className="mb-6 text-center text-[22px] text-black font-bold">Регистрация учетной записи</p>

                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                    <input
                        type="text"
                        name="first_name"
                        value={formData.first_name}
                        onChange={handleInputChange}
                        className="bg-transparent border-solid border-[2px] rounded-[5px] px-[16px] py-[8px] text-[18px] placeholder-[#D9D9D9] text-black focus:outline-none"
                        placeholder="Ваше имя"
                        required
                    />
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="bg-transparent border-solid border-[2px] rounded-[5px] px-[16px] py-[8px] text-[18px] placeholder-[#D9D9D9] text-black focus:outline-none"
                        placeholder="Ваш email"
                        required
                    />
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        className="bg-transparent border-solid border-[2px] rounded-[5px] px-[16px] py-[8px] text-[18px] placeholder-[#D9D9D9] text-black focus:outline-none"
                        placeholder="Пароль"
                        required
                    />
                    <input
                        type="password"
                        name="confirm_password"
                        value={formData.confirm_password}
                        onChange={handleInputChange}
                        className="bg-transparent border-solid border-[2px] rounded-[5px] px-[16px] py-[8px] text-[18px] placeholder-[#D9D9D9] text-black focus:outline-none"
                        placeholder="Подтвердите пароль"
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

                    {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

                    <button
                        type="submit"
                        className={`${
                            isChecked ? "bg-[#4400BA]" : "bg-gray-400 cursor-not-allowed"
                        } text-white py-2 rounded-lg text-lg font-semibold hover:bg-[#4400BA] transition`}
                        disabled={!isChecked}
                    >
                        Зарегистрироваться
                    </button>
                </form>

                <p className="mt-2 text-left text-sm text-black">
                    Есть аккаунт?{" "}
                    <button onClick={() => setIsLoginForm(true)} className="font-semibold text-[#6874F9] no-underline">
                        Войти
                    </button>
                </p>
            </motion.div>
        </div>
    );
}