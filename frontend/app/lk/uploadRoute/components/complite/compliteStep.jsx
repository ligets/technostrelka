
import axios from "axios";
import { useFormCreateRoutes } from "@/store/formCreateRoutes";
import process from "next/dist/build/webpack/loaders/resolve-url-loader/lib/postcss";

export default function CompliteStep() {
    const { points, routeInfo } = useFormCreateRoutes();

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

    // Если данные не заполнены, не рендерим кнопку
    if (!isRouteInfoComplete || !arePointsComplete || points.length === 0) {
        console.log("Не хватает данных для рендера CompliteStep", { isRouteInfoComplete, arePointsComplete, points });
        return null;
    }

    const token = document.cookie
    .split('; ')
    .find(row => row.startsWith('access_token='))
    ?.split('=')[1];

    // Формирование JSON
    const form = {
        title: routeInfo.title,
        description: routeInfo.description,
        type: routeInfo.type,
        photos: routeInfo.media, // Массив ссылок на фото маршрута
        is_public: routeInfo.isPublic,
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
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_HOST_ROUTES}`,form,{
                headers: {
                    "Authorization": `Bearer ${token}`,
                }
            });
            console.log("Маршрут успешно создан:", response.data);
            alert("Маршрут успешно создан!");
        } catch (error) {
            console.error("Ошибка при создании маршрута:", error);
            alert("Ошибка при отправке данных!");
        }
    };

    return (
        <button onClick={handleSubmit} className="bg-blue-500 text-white px-4 py-2 rounded-lg">
            Создать маршрут
        </button>
    );
}