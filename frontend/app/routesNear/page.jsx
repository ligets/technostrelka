"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "https://your-api-endpoint.com/routes"; // Замените на актуальный URL API

// Функция расчета расстояния между двумя точками
const getDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371;
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
};

const MapComponent = () => {
    const [userLocation, setUserLocation] = useState(null);
    const [routes, setRoutes] = useState([]);
    const [map, setMap] = useState(null);

    useEffect(() => {
        fetchRoutes();
        if (window.ymaps) {
            window.ymaps.ready(initMap);
        } else {
            const script = document.createElement("script");
            script.src = `https://api-maps.yandex.ru/2.1/?lang=ru_RU&apikey=${process.env.NEXT_PUBLIC_YANDEX_API_KEY}`;
            script.async = true;
            script.onload = () => window.ymaps.ready(initMap);
            document.body.appendChild(script);
        }
    }, []);

    const fetchRoutes = async () => {
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_HOST_ROUTES}`);
            const data = response.data;
            const formattedRoutes = data.map(route => ({
                id: route.id,
                name: route.title,
                distance: null,
                rating: route.rating || "Нет рейтинга",
                points: route.points.map(point => ({
                    coords: [point.coord_x, point.coord_y],
                    name: point.name
                }))
            }));
            setRoutes(formattedRoutes);
            console.log(response);
        } catch (error) {
            console.error("Ошибка загрузки маршрутов:", error);
        }

    };

    const initMap = () => {
        const newMap = new window.ymaps.Map("map", {
            center: [55.751244, 37.618423],
            zoom: 10,
        });
        setMap(newMap);

        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                setUserLocation([latitude, longitude]);
            },
            (error) => console.error("Ошибка геолокации:", error),
            { enableHighAccuracy: true }
        );
    };

    const showRoute = (route) => {
        if (!map || !userLocation) return;

        map.geoObjects.removeAll();
        const points = route.points.map((p) => p.coords);

        window.ymaps.route(points, { mapStateAutoApply: true }).then(
            (routeObj) => {
                routeObj.options.set("strokeColor", "#ff0000");
                routeObj.options.set("opacity", 0.8);
                map.geoObjects.add(routeObj);
            },
            (error) => console.error("Ошибка при построении маршрута:", error)
        );
    };

    return (
        <div className="flex h-screen w-full">
            <div className="w-1/3 overflow-y-auto p-4 bg-gray-100 border-r border-gray-300">
                <h2 className="text-xl font-bold mb-4 text-black">{routes.length} маршрутов</h2>
                {routes.map((route) => (
                    <div key={route.id} className="mb-3 bg-white shadow rounded-lg cursor-pointer hover:bg-gray-200">
                        <div className="p-4">
                            <h3 className="text-black text-lg font-semibold">{route.name}</h3>
                            <p className="text-black">Рейтинг: {route.rating}</p>
                            <button onClick={() => showRoute(route)}>Показать на карте</button>
                        </div>
                    </div>
                ))}
            </div>
            <div className="w-2/3">
                <div id="map" className="w-full h-full" />
            </div>
        </div>
    );
};

export default MapComponent;
