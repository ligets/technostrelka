"use client";

import axios from "axios";
import { useFormCreateRoutes } from "@/store/formCreateRoutes";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // Хук для навигации


export default function CompliteStep() {
    const { points, routeInfo,clearAllData } = useFormCreateRoutes();
    const router = useRouter();  // Хук для навигации

    const [isRequestSent, setIsRequestSent] = useState(false); // Флаг для отслеживания отправки запроса

    console.log('points', points);
    console.log('routeInfo', routeInfo);

    // Проверка: все поля в routeInfo должны быть заполнены
    const isRouteInfoComplete =
        routeInfo.title.trim() !== "" &&
        routeInfo.description.trim() !== "" &&
        routeInfo.type.trim() !== "" &&
        routeInfo.media.length > 0;

    // Проверка: у всех точек должно быть название и фото
    const arePointsComplete = points.every((point) => 
        point.name?.trim() !== "" && point.photo // Проверяем, что у точки есть фото
    );

    // Если данные не заполнены, не рендерим компонент
    if (!isRouteInfoComplete || !arePointsComplete || points.length === 0) {
        console.log("Не хватает данных для рендера CompliteStep", { isRouteInfoComplete, arePointsComplete, points });
        return (
            <h1 className="text-black font-semibold text-[18px]">Извините, что-то пошло не так</h1>
        );
    }

    // Извлекаем токен из cookies
    const token = document.cookie
        .split('; ')
        .find(row => row.startsWith('access_token='))?.split('=')[1];

    // Формирование JSON
    const form = {
        title: routeInfo.title,
        description: routeInfo.description,
        type: routeInfo.type,
        photos: routeInfo.media, // Массив ссылок на фото маршрута
        is_public: !routeInfo.isPublic,
        points: points.map((point) => {
            const pointData = {
                name: point.name,
                coord_x: point.coords[0], // Берем X из массива coords
                coord_y: point.coords[1], // Берем Y из массива coords
                photo: point.photo, // Фото из точки
            };

            // Добавляем description, если он есть
            if (point.description) {
                pointData.description = point.description;
            }

            return pointData;
        }),
    };

    console.log("form", form);

    // Функция отправки данных на сервер
    const handleSubmit = async () => {
        if (isRequestSent) return; // Если запрос уже был отправлен, не отправляем его повторно
        setIsRequestSent(true); // Устанавливаем флаг, что запрос отправлен

        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_HOST_ROUTES}`, form, {
                headers: {
                    "Authorization": `Bearer ${token}`,
                }
            });
            console.log("Маршрут успешно создан:", response.data);
            alert("Маршрут успешно создан!");
            clearAllData()
            // Редирект на страницу личного кабинета после успешного создания маршрута
            router.push("/lk"); // Замените на актуальный путь личного кабинета
        } catch (error) {
            console.error("Ошибка при создании маршрута:", error);
            alert("Ошибка при отправке данных!");
        }
    };

    // Используем useEffect для автоматической отправки данных при монтировании компонента
    useEffect(() => {
        handleSubmit();
    }, []); // Пустой массив зависимостей — запрос будет выполнен только один раз при монтировании компонента

    return (
        <div className="flex justify-center">
            <button 
                onClick={() => router.push("/lk")} // Переход в личный кабинет
                className="bg-gray-500 text-white px-4 py-2 rounded-lg">
                Вернуться в личный кабинет
            </button>
        </div>
    );
}
