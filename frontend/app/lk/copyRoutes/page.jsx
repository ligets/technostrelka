"use client"
import NoneCopyRoutesLK from "@/components/copyRoutesLK/NoneCopyRoutes";
import CartCopyRoutes from "@/components/copyRoutesLK/CartCopyRoutes";
import {useEffect, useState} from "react";
import axios from "axios";

export default function CopyRoutes() {
    const [routes, setRoutes] = useState([]);
    const [loading, setLoading] = useState(true); // Для отображения состояния загрузки
    const [error, setError] = useState(null); // Для обработки ошибок
    const token = document.cookie
        .split('; ')
        .find(row => row.startsWith('access_token='))?.split('=')[1];

    useEffect(() => {
        // Создаем асинхронную функцию для получения маршрутов
        const fetchRoutes = async () => {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_HOST_ROUTES}user/saved`, {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                    },
                });
                console.log(response.data);  // Логируем данные, чтобы посмотреть, что пришло от сервера
                setRoutes(response.data);    // Сохраняем данные в состоянии routes
                setLoading(false);           // Устанавливаем флаг загрузки в false
            } catch (err) {
                console.error("Ошибка при получении маршрутов:", err);
                setError("Не удалось загрузить маршруты.");
                setLoading(false);
            }
        };

        fetchRoutes(); // Вызов асинхронной функции
    }, [token]); // Делаем запрос при изменении token

    if (loading) {
        return <h1 className="font-semibold text-black text-[18px]">Загрузка...</h1>; // Отображаем сообщение о загрузке, пока данные не получены
    }

    if (error) {
        return <h1 className="font-semibold text-black text-[18px]">{error}</h1>; // Если произошла ошибка, показываем сообщение об ошибке
    }

    return (
        <>
            {routes.length ? (
                routes.map(route => (
                    <CartCopyRoutes key={route.route.id} data={route}/>
                ))  // Если массив routes пустой, показываем компонент NoneCopyRoutesLK, который отображает текст "Нет сохраненных маршрутов"
            ) : (
                <NoneCopyRoutesLK/>
            )}
        </>
    );
}