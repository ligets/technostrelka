'use client'
import { useState } from "react";
import { useFormCreateRoutes } from "@/store/formCreateRoutes";

export default function RedactorRoutesLK() {
    const { routeInfo, updateRouteInfo, setStep,step } = useFormCreateRoutes();

    const [imageSrc, setImageSrc] = useState(null);//превью картинки в редактировании маршрута
    const [title, setTitle] = useState(routeInfo.title);
    const [description, setDescription] = useState(routeInfo.description);
    const [isPublic, setIsPublic] = useState(routeInfo.isPublic);
    const [type, setType] = useState(routeInfo.type);
    const [media, setMedia] = useState(routeInfo.media);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [errors, setErrors] = useState({});

    const listExpenditions = ["Пеший", "Автомобильный", "Спортивное ориентирование", "Альпинизм", "Велосипедный маршрут", "Кемпинг", "Лыжный маршрут", "Байдарки", "Сапсерфинг", "Дайвинг", "Рафтинг", "Верховая езда", "Снегоход", "Багги", "Эндуро", "Внедорожник", "Поезд"];

    const validateForm = () => {
        let newErrors = {};

        if (!title.trim()) newErrors.title = "Название маршрута обязательно";
        if (!description.trim()) newErrors.description = "Описание обязательно";
        if (!type) newErrors.type = "Выберите тип маршрута";
        if (media.length === 0) newErrors.media = "Добавьте хотя бы одно изображение";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setMedia([...media, e.target.result]);
                setErrors((prev) => ({ ...prev, media: null }));
                setImageSrc(e.target.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = () => {
        if (!validateForm()) return;

        updateRouteInfo("title", title);
        updateRouteInfo("description", description);
        updateRouteInfo("type", type);
        updateRouteInfo("media", media);
        updateRouteInfo("isPublic", isPublic);

        setStep(step+1);
    };

    return (
        <div className="flex flex-col items-start gap-4">
            <span className="text-[#000] text-[20px] font-semibold px-2">
                Редактировать - {title || "Кавказские горы - пешая тропа"}
            </span>
            <div className="border-dashed border border-[#6874f9] w-[100%]"></div>

            <form className="flex flex-col gap-10 w-[100%]">
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

                {/* Модальное окно выбора типа */}
                {isModalOpen && (
                    <div className="fixed top-0 left-0 w-full h-full bg-[rgba(29,29,29,0.53)] flex justify-center items-center">
                        <div className="relative w-[40%] h-[80%] bg-white rounded-lg p-10 flex flex-wrap gap-4">
                            <span className="absolute right-0 top-0 cursor-pointer p-3 text-2xl" onClick={() => setIsModalOpen(false)}>✕</span>
                            {listExpenditions.map((value) => (
                                <div 
                                    key={value}
                                    className="flex flex-col items-center justify-center w-[8em] h-[8em] bg-[#d9d9d9] rounded-[5px] cursor-pointer"
                                    onClick={() => { setType(value); setIsModalOpen(false); setErrors((prev) => ({ ...prev, type: null })); }}
                                >
                                    <h1 className="text-[#000] text-[12px]">{value}</h1>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Фото и видео */}
                <div className="flex flex-row items-start justify-between">
                    <label className="text-[#8d8d8d] text-[16px] font-semibold">Фото и видео</label>
                    <div className="w-[70%] p-4 bg-white rounded-lg shadow-md">
                        <label className="flex items-center justify-center w-full h-48 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500">
                            <span className="text-gray-500">Загрузите фото или видео</span>
                            <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                        </label>
                        {imageSrc && (
                            <div className="mt-4">
                                <img
                                    src={imageSrc}
                                    alt="Предпросмотр"
                                    className="w-full rounded-lg shadow-md"
                                />
                            </div>
                        )}
                        {errors.media && <p className="text-red-500 text-sm">{errors.media}</p>}
                    </div>
                </div>

                {/* Кнопки */}
                <div className="flex flex-row justify-between">
                    <button type="button" className="text-[#6874f9] font-semibold">Отменить</button>
                    <button 
                        type="button"
                        className="px-6 py-3 text-white bg-[#6874f9] rounded-lg font-semibold"
                        onClick={handleSubmit}
                    >
                        Принять
                    </button>
                </div>
            </form>
        </div>
    );
}
