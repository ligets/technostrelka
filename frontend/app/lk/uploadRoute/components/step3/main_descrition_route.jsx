'use client'
import { useState } from "react";
import { useFormCreateRoutes } from "@/store/formCreateRoutes";

export default function DescriptionRoute() {
    const { routeInfo, updateRouteInfo, setStep, step } = useFormCreateRoutes();
    const [title, setTitle] = useState(routeInfo.title);
    const [description, setDescription] = useState(routeInfo.description);
    const [isPublic, setIsPublic] = useState(routeInfo.isPublic);
    const [type, setType] = useState(routeInfo.type);
    const [media, setMedia] = useState(routeInfo.media || []);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [errors, setErrors] = useState({});

    const listExpenditions = [
        "Пеший", "Автомобильный", "Спортивное ориентирование", "Альпинизм", 
        "Велосипедный маршрут", "Кемпинг", "Лыжный маршрут", "Байдарки", 
        "Сапсерфинг", "Дайвинг", "Рафтинг", "Верховая езда", "Снегоход", 
        "Багги", "Эндуро", "Внедорожник", "Поезд"
    ];

    const validateForm = () => {
        let newErrors = {};

        if (!title.trim()) newErrors.title = "Название маршрута обязательно";
        if (!description.trim()) newErrors.description = "Описание обязательно";
        if (!type) newErrors.type = "Выберите тип маршрута";
        if (media.length === 0) newErrors.media = "Добавьте хотя бы одно изображение";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Функция конвертации файла в Base64
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
        const files = Array.from(e.target.files);
        if (files.length + media.length > 3) {
            alert("Можно загрузить максимум 3 фотографии!");
            return;
        }

        const base64Files = await Promise.all(files.map(file => convertToBase64(file)));
        setMedia([...media, ...base64Files]);
    };

    // Функция удаления фото
    const removeMediaFile = (event, index) => {
        event.preventDefault(); // Предотвращаем обновление страницы
        setMedia(media.filter((_, i) => i !== index));
    };

    const handleSubmit = () => {
        if (!validateForm()) return;

        updateRouteInfo("title", title);
        updateRouteInfo("description", description);
        updateRouteInfo("type", type);
        updateRouteInfo("media", media); // Сохраняем в Zustand Base64
        updateRouteInfo("isPublic", isPublic);

        setStep(step + 1);
    };

    return (
        <div className="flex flex-col w-full items-start gap-4">
            <form className="flex flex-col gap-10 w-full">
                {/* Название маршрута */}
                <div className="flex flex-row items-start justify-between">
                    <label className="text-[#8d8d8d] text-[16px] font-semibold">Название</label>
                    <div className="w-[70%]">
                        <input 
                            type="text" 
                            placeholder="Введите название маршрута"
                            value={title} 
                            onChange={(e) => setTitle(e.target.value)} 
                            className="w-full border border-gray-400 rounded-lg h-[36px] px-2 outline-none"
                        />
                        {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
                    </div>
                </div>

                {/* Описание маршрута */}
                <div className="flex flex-row items-start justify-between">
                    <label className="text-[#8d8d8d] text-[16px] font-semibold">Описание</label>
                    <div className="w-[70%]">
                        <textarea 
                            className="w-full border border-gray-400 rounded-lg h-[10em] px-2 outline-none resize-none"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                        {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
                    </div>
                </div>

                {/* Публичный / Приватный */}
                <div className="flex flex-row items-start justify-between w-[37%]">
                    <label className="text-[#8d8d8d] text-[16px] font-semibold">Публичный/Приватный</label>
                    <label className="inline-flex items-center cursor-pointer">
                        <input 
                            type="checkbox" 
                            className="sr-only peer outline-none"
                            checked={isPublic} 
                            onChange={() => setIsPublic(!isPublic)}
                        />
                        <div className="relative w-11 h-6 bg-gray-200 peer-checked:bg-blue-600 rounded-full after:absolute after:top-[2px] after:start-[2px] after:bg-white after:w-5 after:h-5 after:rounded-full after:transition-all peer-checked:after:translate-x-full"></div>
                    </label>
                </div>

                {/* Тип маршрута */}
                <div className="flex flex-row items-start justify-between w-[37%]">
                    <label className="text-[#8d8d8d] text-[16px] font-semibold">Тип маршрута</label>
                    <div 
                        className="flex flex-col items-center justify-center w-20 h-20 bg-[#d9d9d9] rounded-[5px] cursor-pointer"
                        onClick={() => setIsModalOpen(true)}
                    >
                        <h1 className="text-[#000] text-[10px] font-light">{type}</h1>
                    </div>
                </div>

                {/* Фото */}
                <label className="text-sm font-semibold">Фото (макс. 3)</label>
                <div className="w-full p-4 bg-gray-100 rounded-lg shadow-md mb-4">
                    <label
                        htmlFor="fileInput"
                        className={`flex items-center justify-center w-full h-32 border-2 border-dashed ${media.length < 3 ? "border-gray-300 hover:border-blue-500" : "border-red-500"} rounded-lg cursor-pointer`}
                    >
                        <span className="text-gray-500">Загрузите фото</span>
                        <input
                            type="file"
                            id="fileInput"
                            accept="image/*"
                            multiple
                            className="hidden"
                            onChange={handleMediaUpload}
                            disabled={media.length >= 3}
                        />
                    </label>

                    {/* Превью загруженных фото */}
                    {media.length > 0 && (
                        <div className="mt-4 grid grid-cols-3 gap-4">
                            {media.map((base64, index) => (
                                <div key={index} className="relative">
                                    <img src={base64} alt="Фото" className="w-full rounded-lg shadow-md" />
                                    <button className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full" onClick={(e) => removeMediaFile(e, index)}>✕</button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Кнопка принятия */}
                <button type="button" className="px-6 py-3 text-white bg-[#6874f9] rounded-lg font-semibold" onClick={handleSubmit}>Принять</button>
            </form>
        </div>
    );
}