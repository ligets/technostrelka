"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function VerifyCodeModal({ closeModal }) {
    const [code, setCode] = useState(["", "", "", "", ""]);
    const [error, setError] = useState(false);
    const [isChecked, setIsChecked] = useState(false);
    const [timer, setTimer] = useState(60);

    // Таймер
    useEffect(() => {
        if (timer > 0) {
            const interval = setInterval(() => {
                setTimer((prev) => prev - 1);
            }, 1);
            return () => clearInterval(interval);
        }
    }, [timer]);

    // Обработчик ввода кода
    const handleChange = (index, value) => {
        if (/^\d?$/.test(value)) {
            const newCode = [...code];
            newCode[index] = value;
            setCode(newCode);

            // Автопереключение на следующий инпут
            if (value && index < 4) {
                document.getElementById(`code-${index + 1}`).focus();
            }
        }
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        if (code.join("") !== "12345") {
            setError(true);
        } else {
            setError(false);
            alert("Код верный!");
        }
    };

    return (
        <div
            className="fixed inset-0 flex justify-center items-center bg-black/50 z-50"
            onClick={(e) => e.target === e.currentTarget && closeModal()}
        >
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2 }}
                className="bg-white p-6 rounded-2xl shadow-lg w-[400px] relative"
            >
                {/* Закрытие */}
                <button
                    onClick={closeModal}
                    className="absolute top-3 right-3 text-gray-600 hover:text-black text-xl"
                >
                    ✕
                </button>

                {/* Заголовок */}
                <h2 className="text-xl font-bold">Введите код</h2>
                <p className="text-gray-600 text-sm">
                    Мы отправили код подтверждения на почту{" "}
                    <span className="font-semibold">test@test.ru</span>{" "}
                    <span className="text-blue-500 cursor-pointer">Изменить</span>
                </p>

                <form onSubmit={handleSubmit} className="mt-4">
                    <div className="flex gap-2 justify-center">
                        {code.map((value, index) => (
                            <input
                                key={index}
                                id={`code-${index}`}
                                type="text"
                                value={value}
                                onChange={(e) => handleChange(index, e.target.value)}
                                maxLength="1"
                                className={`w-12 h-12 border-2 rounded-md text-center text-xl font-bold ${
                                    error ? "border-red-500" : "border-gray-300"
                                } focus:border-blue-500 focus:outline-none`}
                            />
                        ))}
                    </div>

                    {error && <p className="text-red-500 text-sm text-center mt-2">Неверный код</p>}

                    <div className="flex items-center mt-4">
                        <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => setIsChecked(!isChecked)}
                            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                        <label className="ml-2 text-sm text-gray-600">
                            Принимаю Пользовательское соглашение и даю согласие на обработку персональных данных
                        </label>
                    </div>

                    <button
                        type="submit"
                        className={`w-full mt-4 py-2 rounded-md text-white font-semibold ${
                            timer > 0 ? "bg-gray-300 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
                        }`}
                        disabled={timer > 0}
                    >
                        {timer > 0 ? `Получить код повторно ${timer} сек` : "Получить код повторно"}
                    </button>
                </form>
            </motion.div>
        </div>
    );
}