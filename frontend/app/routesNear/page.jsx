"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import YandexMap from "@/components/Map/YandexMapRoutesPaths";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";
import process from "next/dist/build/webpack/loaders/resolve-url-loader/lib/postcss";

const getUserLocation = () => {
    return new Promise((resolve, reject) => {
        if (!navigator.geolocation) {
            reject(new Error("Геолокация недоступна"));
        } else {
            navigator.geolocation.getCurrentPosition(
                position => resolve(position.coords),
                error => reject(error)
            );
        }
    });
};

const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371;
    const dLat = toRadians(lat2 - lat1);
    const dLon = toRadians(lon2 - lon1);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
};

const toRadians = (degrees) => degrees * (Math.PI / 180);

const sortRoutesByDistance = (routes, userCoords) => {
    return routes.map(route => {
        const startCoord = route.route.points[0];
        const distance = calculateDistance(userCoords.latitude, userCoords.longitude, startCoord.coord_y, startCoord.coord_x);
        return { ...route, distanceToUser: distance };
    }).sort((a, b) => a.distanceToUser - b.distanceToUser);
};

export default function RoutesPaths() {
    const router = useRouter();
    const [routeFull, setRouteFull] = useState([]);
    const [sortedRoutes, setSortedRoutes] = useState([]);
    const [selectedRoute, setSelectedRoute] = useState([]);
    const [userLocation, setUserLocation] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [mapCenter, setMapCenter] = useState([55.751244, 37.618423]); // Начальный центр карты
    const [mapZoom, setMapZoom] = useState(10); // Начальный зум

    useEffect(() => {
        axios.get(`${process.env.NEXT_PUBLIC_BACKEND_HOST_ROUTES}`)
            .then((response) => {
                setRouteFull(response.data);
                console.log("Полученные данные:", response.data);
            })
            .catch(error => {
                console.log("Ошибка при получении данных:", error);
                setError("Ошибка при получении данных");
            })
            .finally(() => setLoading(false));
    }, []);

    useEffect(() => {
        if (routeFull.length > 0 && userLocation) {
            const sorted = sortRoutesByDistance(routeFull, userLocation);
            setSortedRoutes(sorted);
            console.log("Отсортированные маршруты:", sorted);
        }
    }, [routeFull, userLocation]);

    useEffect(() => {
        getUserLocation()
            .then(coords => {
                setUserLocation(coords);
                console.log("Текущие координаты пользователя:", coords);
            })
            .catch(error => {
                console.log("Ошибка при получении местоположения пользователя:", error);
                setUserLocation({ latitude: 55.751244, longitude: 37.618423 });
                setError("Не удалось получить местоположение. Используются дефолтные координаты.");
            })
            .finally(() => setLoading(false));
    }, []);

    function formattedRoute(points) {
        return points.map(point => ([point.coord_x, point.coord_y]));
    }

    function calculateBounds(points) {
        let minLat = Infinity;
        let maxLat = -Infinity;
        let minLon = Infinity;
        let maxLon = -Infinity;

        points.forEach(([lat, lon]) => {
            if (lat < minLat) minLat = lat;
            if (lat > maxLat) maxLat = lat;
            if (lon < minLon) minLon = lon;
            if (lon > maxLon) maxLon = lon;
        });

        return { minLat, maxLat, minLon, maxLon };
    }

    function calculateOptimalZoom(bounds) {
        const latRange = bounds.maxLat - bounds.minLat;
        const lonRange = bounds.maxLon - bounds.minLon;

        let zoom = 10;
        if (latRange > 0 || lonRange > 0) {
            zoom = Math.max(
                10 - Math.floor(latRange * 2),
                10 - Math.floor(lonRange * 2)
            );
        }
        return Math.min(Math.max(zoom, 5), 18);
    }

    if (loading) {
        return <div>Загрузка...</div>;
    }

    if (error) {
        return <div className="text-red-500">{error}</div>;
    }

    return (
        <div className="absolute top-[80px] left-0 flex w-[100%] h-[100%]">
            <div className="flex flex-col gap-[1em] w-[35%] h-[100%] bg-[#F4F4F4] p-6">
                <h1 className="text-[#000] text-[25px] font-bold">{sortedRoutes.length} маршрутов</h1>
                <div className="bg-[#D9D9D9] w-[100%] h-[2px]"></div>
                {sortedRoutes.length > 0
                    ? sortedRoutes.map((route) => (
                        <div key={route.route.id} className="w-[100%] bg-[#FFFFFF] rounded-[30px] flex flex-row items-center">
                            <div className="flex flex-1 flex-col gap-[1em] p-[2em]">
                                <div className="flex flex-col gap-[0.5em]">
                                    <div className="flex gap-[1em] items-center justify-between">
                                        <h1 className="text-[#000] text-[11px] font-light">{route.route.type} туризм</h1>
                                        <div className="flex gap-5">
                                            <Link className="text-[11px] text-[#6874f9] font-light" href={"/routesPaths/" + route.route.id}>Подробнее<br/>о маршруте</Link>
                                            <button
                                                className="text-[#6874f9] text-[11px] font-light"
                                                onClick={() => {
                                                    const formattedPoints = formattedRoute(route.route.points);

                                                    if (formattedPoints.length > 0) {
                                                        const firstPoint = formattedPoints[0];
                                                        const bounds = calculateBounds(formattedPoints);
                                                        const newZoom = calculateOptimalZoom(bounds);

                                                        setMapCenter(firstPoint);
                                                        setMapZoom(newZoom);
                                                    }

                                                    setSelectedRoute(formattedPoints);
                                                    console.log("Выбранный маршрут:", formattedPoints);
                                                }}
                                            >
                                                Показать на карте
                                            </button>
                                        </div>
                                    </div>
                                    <h1 className="text-[#000] text-[16px] font-semibold">{route.route.title}</h1>
                                </div>
                                <div>
                                    <div className="flex flex-row justify-between gap-[3em]">
                                        <div className="flex flex-col gap-[0.5em] items-start">
                                            <p className="text-[#000] font-light text-[13px]">Расстояние</p>
                                            <h1 className="text-[#000] font-bold text-[14px]">{route.route.distance} км</h1>
                                        </div>
                                        <div className="flex flex-col gap-[0.5em] items-start">
                                            <p className="text-[#000] font-light text-[13px]">Высота</p>
                                            <h1 className="text-[#000] font-bold text-[14px]">{route.route.height || 0} м</h1>
                                        </div>
                                        <div className="flex flex-col gap-[0.5em] items-start">
                                            <p className="text-[#000] font-light text-[13px]">Рейтинг</p>
                                            <div className="flex justify-between flex-row items-center">
                                                <Image src="/Star.png" alt="Рейтинг" width={13} height={13} />
                                                <h1 className="text-[#000] font-bold text-[14px]">{route.route.rating || 0}</h1>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="w-[25%] h-[150px] me-4 relative">
                                <Image
                                    src={`${process.env.NEXT_PUBLIC_BACKEND_HOST_ROUTES_MEDIA}${route.route.photos[0].photo_path}`}
                                    alt="Route Image" layout="fill" objectFit="cover"
                                    className="rounded-2xl"
                                />
                            </div>
                        </div>
                    ))
                    : <h1>Нет доступных маршрутов</h1>}
            </div>
            <YandexMap center={mapCenter} zoom={mapZoom} routes={selectedRoute} />
        </div>
    );
}