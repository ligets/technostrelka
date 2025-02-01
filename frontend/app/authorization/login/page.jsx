"use client";
import { useState } from "react";
import { motion } from "framer-motion";

export default function Login({ closeModal }) {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [isChecked, setIsChecked] = useState(false);

    const handleCheckboxChange = () => {
        setIsChecked((prev) => !prev);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Логика отправки формы

        if (isChecked) {
            console.log(login, password, isChecked);
            closeModal();
        } else {
            console.log("Галочка не выбрана");
        }
    };
    return (
        <div
            className="fixed inset-0 bg-[#4A4949]/40 flex justify-center items-center z-50"
            onClick={(e) => e.target === e.currentTarget && closeModal()}
        >
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2 }}
                className="w-[405px] h-[373px] rounded-[8px] flex bg-white flex-col p-6 relative"
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
                        onChange={(e) => setLogin(e.target.value)}
                        className="bg-transparent border-solid border-[2px] rounded-[5px] px-[16px] py-[8px] text-[18px] placeholder-[#D9D9D9] text-black focus:outline-none"
                        placeholder="Ваш логин"
                        required
                    />
                    <input
                        type="password"
                        value={password}
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

                {/*<p className="mt-3 text-center text-sm">*/}
                {/*    <a href="/forgot-password" className="text-white hover:underline">*/}
                {/*        Забыли пароль?*/}
                {/*    </a>*/}
                {/*</p>*/}

                {/*<p className="mt-2 text-center text-sm text-white">*/}
                {/*    Еще не зарегистрированы?{" "}*/}
                {/*    <button onClick={() => { setIsLoginForm(false); }} className="underline font-semibold">*/}
                {/*        Регистрация*/}
                {/*    </button>*/}
                {/*</p>*/}
            </motion.div>
        </div>
    );
}
