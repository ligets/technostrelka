'use client'
import { useState, useEffect } from "react";
import process from "next/dist/build/webpack/loaders/resolve-url-loader/lib/postcss";

export default function RedactorRoutesLK({ route }) {

    // Данные с сервера (фото хранятся как ссылки)
    const [existingMedia, setExistingMedia] = useState([]);
    const [newMedia, setNewMedia] = useState([]);
    
    // Основные данные маршрута
    const [title, setTitle] = useState(route.route.title);
    const [description, setDescription] = useState(route.route.description);
    const [type, setType] = useState(route.route.type);
    const [isPublic, setIsPublic] = useState(route.route.is_pablic);
    const [errors, setErrors] = useState({});

    // Загружаем фото с сервера
    useEffect(() => {
        if (route.route.photos) {
            const formattedMedia = route.route.photos.map(img => ({
                id: img.id,
                url: `${process.env.NEXT_PUBLIC_BACKEND_HOST_ROUTES_MEDIA}${img.photo_path}`
            }));
            setExistingMedia(formattedMedia);
        }
    }, [route]);

    // Валидация формы
    const validateForm = () => {
        let newErrors = {};
        if (!title.trim()) newErrors.title = "Название маршрута обязательно";
        if (!description.trim()) newErrors.description = "Описание обязательно";
        if (!type) newErrors.type = "Выберите тип маршрута";
        if (existingMedia.length + newMedia.length === 0) newErrors.media = "Добавьте хотя бы одно изображение";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Конвертируем файл в Base64
    const convertToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });
    };

    // Загрузка фото
    const handleMediaUpload = async (e) => {
        const files = Array.from(e.target.files);
        if (files.length + existingMedia.length + newMedia.length > 3) {
            alert("Можно загрузить максимум 3 фотографии!");
            return;
        }

        const base64Files = await Promise.all(files.map(file => convertToBase64(file)));
        setNewMedia([...newMedia, ...base64Files]);
    };

    // Удаление фото
    const removeMediaFile = (index, isExisting) => {
        if (isExisting) {
            setExistingMedia(existingMedia.filter((_, i) => i !== index));
        } else {
            setNewMedia(newMedia.filter((_, i) => i !== index));
        }
    };

    // Отправка формы
    const handleSubmit = () => {
        if (!validateForm()) return;

        // Преобразуем все изображения в base64 (старые и новые)
        const allMedia = [
            ...existingMedia.map(img => img.url), // Старые фото (ссылки)
            ...newMedia // Новые фото (base64)
        ];

        console.log({
            title,
            description,
            type,
            isPublic,
            media: allMedia
        });

        // Здесь будет отправка данных на сервер
    };

    return (
        <div className="flex flex-col w-full items-start gap-4">
            <form className="flex flex-col gap-10 w-full">
                <div className="flex flex-col items-start gap-4 w-[100%]">
                    <span className="text-[#000] text-[20px] font-semibold px-2">
                        Редактирование
                    </span>
                    <div className="border-dashed border border-[#6874f9] w-[100%]"></div>
                </div>

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

                {/* Фото */}
                <label className="text-sm font-semibold">Фото (макс. 3)</label>
                <div className="w-full p-4 bg-gray-100 rounded-lg shadow-md mb-4">
                    <label
                        htmlFor="fileInput"
                        className={`flex items-center justify-center w-full h-32 border-2 border-dashed ${existingMedia.length + newMedia.length < 3 ? "border-gray-300 hover:border-blue-500" : "border-red-500"} rounded-lg cursor-pointer`}
                    >
                        <span className="text-gray-500">Загрузите фото</span>
                        <input
                            type="file"
                            id="fileInput"
                            accept="image/*"
                            multiple
                            className="hidden"
                            onChange={handleMediaUpload}
                            disabled={existingMedia.length + newMedia.length >= 3}
                        />
                    </label>

                    {/* Превью загруженных фото */}
                    <div className="mt-4 grid grid-cols-3 gap-4">
                        {/* Старые фото (с сервера) */}
                        {existingMedia.map((img, index) => (
                            <div key={img.id} className="relative">
                                <img src={img.url} alt="Фото" className="w-full rounded-lg shadow-md" />
                                <button 
                                    className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full"
                                    onClick={() => removeMediaFile(index, true)}
                                >
                                    ✕
                                </button>
                            </div>
                        ))}

                        {/* Новые загруженные фото */}
                        {newMedia.map((base64, index) => (
                            <div key={index} className="relative">
                                <img src={base64} alt="Фото" className="w-full rounded-lg shadow-md" />
                                <button 
                                    className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full"
                                    onClick={() => removeMediaFile(index, false)}
                                >
                                    ✕
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Кнопка отправки */}
                <button type="button" className="px-6 py-3 text-white bg-[#6874f9] rounded-lg font-semibold" onClick={handleSubmit}>
                    Принять
                </button>
            </form>
        </div>
    );
}