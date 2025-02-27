import { useState } from "react";
import Image from "next/image";
import { useFormCreateRoutes } from "@/store/formCreateRoutes";

export default function ListAndModel() {
    const [editingPoint, setEditingPoint] = useState(null);
    const [error, setError] = useState(""); // Ошибка валидации
    const { points, removePoint, updatePoint, setStep } = useFormCreateRoutes();

    // Функция для конвертации файла в base64
    const convertToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });
    };

    // Функция загрузки фото
    const handleMediaUpload = async (e) => {
        if (!editingPoint) return;

        const file = e.target.files[0];
        if (!file) return;

        try {
            const base64 = await convertToBase64(file);
            setEditingPoint((prev) => ({
                ...prev,
                photo: base64, // Сохраняем ссылку в base64
            }));
        } catch (error) {
            console.error("Ошибка конвертации файла:", error);
        }
    };

    // Функция удаления фото
    const removeMediaFile = () => {
        if (!editingPoint) return;
        setEditingPoint((prev) => ({
            ...prev,
            photo: null,
        }));
    };

    // Проверка перед сохранением
    const handleSave = () => {
        if (!editingPoint.name.trim()) {
            setError("Название обязательно!");
            return;
        }
        if (!editingPoint.photo) {
            setError("Фото обязательно!");
            return;
        }

        updatePoint(editingPoint.id, editingPoint);
        setEditingPoint(null);
        setError("");
    };

    // Проверка, можно ли перейти на следующий шаг
    const canProceedToNextStep = points.every((point) => point.name?.trim() && point.photo);

    return (
        <div className="flex flex-col gap-[0.5em]">
            <h1 className="text-[#8D8D8D] font-semibold text-16px">Ориентиры</h1>

            {/* Перебираем поинты */}
            {points.map((point, index) => (
                <div key={point.id} className="flex flex-col w-[100%] gap-[1em]">
                    <div className="flex flex-row justify-between w-[100%]">
                        <div className="flex flex-row items-center gap-[2em]">
                            <h1 className="text-[#000] font-semibold text-16px">{index + 1}.</h1>
                            <h1 className="text-[#000] font-semibold text-16px">{point.name || "Без названия"}</h1>
                        </div>
                        <div className="flex flex-row gap-[1em] items-center">
                            <button onClick={() => setEditingPoint(point)}>
                                <Image src="/pen.svg" alt="Редактировать" width={17} height={16} />
                            </button>
                            <button onClick={() => removePoint(point.id)}>
                                <Image src="/otmena.svg" alt="Удалить" width={17} height={16} />
                            </button>
                        </div>
                    </div>
                </div>
            ))}

            {/* Кнопка перехода на следующий шаг */}
            <button
                className={`px-4 py-2 rounded-lg mt-[15px] ${canProceedToNextStep ? "bg-[#6874f9] text-white border-[1px] border-[#6874f9] hover:bg-transparent hover:text-blue-600 transition-all duration-300 " : "bg-gray-300 text-gray-500 cursor-not-allowed"}`}
                disabled={!canProceedToNextStep}
                onClick={() => setStep(5)}
            >
                Создать
            </button>

            {/* Модальное окно редактирования поинта */}
            {editingPoint && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-lg w-[30%]">
                        <h2 className="text-[#000] font-semibold mb-4">Редактирование точки</h2>

                        {/* Название */}
                        <label className="text-sm text-[#000] font-semibold">Название(Обязательно)</label>
                        <input
                            type="text"
                            value={editingPoint.name || ""}
                            onChange={(e) => {
                                setEditingPoint({ ...editingPoint, name: e.target.value });
                                setError(""); // Очистка ошибки при изменении
                            }}
                            className="w-full border-[#000] text-[#000] border rounded-lg p-2 mb-2"
                        />
                        {error && <p className="text-red-500 text-sm">{error}</p>}
                        

                        {/* Описание */}
                        <label className="text-sm text-[#000]  font-semibold">Описание(Необязательно)</label>
                        <textarea
                            value={editingPoint.description || ""}
                            onChange={(e) => setEditingPoint({ ...editingPoint, description: e.target.value })}
                            className="w-full border-[#000] text-[#000] border rounded-lg p-2 mb-4 h-[200px]  resize"
                        />


                        {/* Фото */}
                        <label className="text-sm text-[#000] font-semibold">Фото (Обязательно)</label>
                        <div className="w-[50%] p-4 bg-gray-100 rounded-lg shadow-md mb-4 ">
                            {editingPoint.photo ? (
                                <div className="relative ">
                                    <img
                                        src={editingPoint.photo}
                                        alt="Фото"
                                        className="w-full rounded-lg shadow-md"
                                    />
                                    <button
                                        className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full"
                                        onClick={removeMediaFile}
                                    >
                                        ✕
                                    </button>
                                </div>
                            ) : (
                                <label
                                    htmlFor="fileInput"
                                    className="flex items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 hover:border-blue-500 rounded-lg cursor-pointer"
                                >
                                    <span className="text-gray-500">Загрузите фото</span>
                                    <input
                                        type="file"
                                        id="fileInput"
                                        accept="image/*"
                                        className="hidden"
                                        onChange={handleMediaUpload}
                                    />
                                </label>
                            )}
                        </div>
                        {error && <p className="text-red-500 text-sm">{error}</p>}

                        {/* Кнопки */}
                        <div className="flex justify-end gap-4">
                            <button
                                className="px-4 py-2 bg-gray-400 text-white rounded-lg"
                                onClick={() => setEditingPoint(null)}
                            >
                                Отмена
                            </button>
                            <button
                                className={`px-4 py-2 rounded-lg ${editingPoint.name?.trim() && editingPoint.photo ? "bg-blue-500 text-white" : "bg-gray-300 text-gray-500 cursor-not-allowed"}`}
                                onClick={handleSave}
                                disabled={!editingPoint.name?.trim() || !editingPoint.photo}
                            >
                                Сохранить
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
