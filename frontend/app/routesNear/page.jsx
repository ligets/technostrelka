"use client";
import React, { useEffect, useState } from "react";

const routes = [
    {
        id: 1,
        name: "Маршрут 1",
        distance: 10.2,
        rating: 4.5,
        points: [
            { coords: [55.751244, 37.618423], name: "Старт" },
            { coords: [55.761244, 37.628423], name: "Остановка 1" },
            { coords: [55.771244, 37.638423], name: "Финиш" },
        ],
    },
    {
        id: 2,
        name: "Маршрут 2",
        distance: 5.4,
        rating: 4.8,
        points: [
            { coords: [56.845766, 53.229699], name: "Старт" },
            { coords: [56.849950, 53.253294], name: "Остановка 1" },
            { coords: [56.862219, 53.257715], name: "Финиш" },
        ],
    },
    {
        id: 3,
        name: "Маршрут 3",
        distance: 5.3,
        rating: 4.3,
        points: [
            { coords: [55.751244, 37.628423], name: "Старт" },
            { coords: [55.761244, 37.638423], name: "Остановка 1" },
            { coords: [55.771244, 37.648423], name: "Финиш" },
        ],
    },
];

// Функция расчета расстояния между двумя точками
const getDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371;
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
};

const MapComponent = () => {
    const [userLocation, setUserLocation] = useState(null);
    const [sortedRoutes, setSortedRoutes] = useState(routes);
    const [map, setMap] = useState(null);

    useEffect(() => {
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

    const initMap = () => {
        const newMap = new window.ymaps.Map("map", {
            center: [55.751244, 37.618423],
            zoom: 10,
        });

        setMap(newMap);

        // Получаем геолокацию пользователя
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                setUserLocation([latitude, longitude]);

                // Сортируем маршруты по ближайшему к пользователю
                const sorted = [...routes].sort((a, b) => {
                    const distA = getDistance(latitude, longitude, a.points[0].coords[0], a.points[0].coords[1]);
                    const distB = getDistance(latitude, longitude, b.points[0].coords[0], b.points[0].coords[1]);
                    return distA - distB;
                });

                setSortedRoutes(sorted);
            },
            (error) => console.error("Ошибка геолокации:", error),
            { enableHighAccuracy: true }
        );
    };

    const showRoute = (route) => {
        if (!map || !userLocation) return;

        map.geoObjects.removeAll(); // Очищаем карту перед добавлением нового маршрута

        const points = route.points.map((p) => p.coords);
        const startCoords = route.points[0].coords;

        window.ymaps.route(points, { mapStateAutoApply: true }).then(
            (routeObj) => {
                routeObj.options.set("strokeColor", "#ff0000");
                routeObj.options.set("opacity", 0.8);

                // Вычисляем расстояние от пользователя до маршрута
                const distanceToRoute = getDistance(
                    userLocation[0],
                    userLocation[1],
                    startCoords[0],
                    startCoords[1]
                );
                console.log(`📏 Расстояние от вас до маршрута: ${distanceToRoute.toFixed(2)} км`);

                routeObj.getPaths().each((path) => {
                    path.events.add("click", () => {
                        console.log(`📏 Расстояние от вас до маршрута: ${distanceToRoute.toFixed(2)} км`);
                    });
                });

                map.geoObjects.add(routeObj);

                // Добавляем точки маршрута с названиями
                route.points.forEach((point) => {
                    const placemark = new window.ymaps.Placemark(
                        point.coords,
                        { balloonContent: point.name },
                        { preset: "islands#greenDotIcon" }
                    );

                    placemark.events.add("click", (e) => {
                        e.get("target").balloon.open();
                    });

                    map.geoObjects.add(placemark);
                });

                map.setBounds(routeObj.getBounds(), { checkZoomRange: true });
            },
            (error) => console.error("Ошибка при построении маршрута:", error)
        );
    };

    return (
        <div className="flex h-screen w-full">
            <div className="w-1/3 overflow-y-auto p-4 bg-gray-100 border-r border-gray-300">
                <h2 className="text-xl font-bold mb-4 text-black">{sortedRoutes.length} маршрутов</h2>

                {sortedRoutes.map((route) => (
                    <div className="mb-3 bg-white shadow rounded-lg cursor-pointer transition hover:bg-gray-200 flex justify-between rounded-r-[30px]">
                        <div
                            key={route.id}
                            className="mt-4 ml-4"
                        >
                            <div className="text-black text-[12px] gap-x-[28px] flex">
                                <p>Пеший туризм</p>
                                <button
                                >Сохранить маршрут</button>
                                <button onClick={() => showRoute(route)}
                                >Показать на карте</button>
                            </div>
                            <h3 className="text-[#000] text-[18px] font-semibold mt-[10px]">{route.name}</h3>
                            <div className="flex gap-x-[50px] mt-[10px]">
                                <div className="">
                                    <p className="text-[#000] font-light text-[16px]">Расстояние</p>
                                    <p className="text-[#000] font-bold text-[14px]">{route.distance} км</p>
                                </div>
                                <div className="">
                                    <p className="text-[#000] font-light text-[16px]">Рейтинг</p>
                                    <p className="text-[#000] font-bold text-[14px]">⭐{route.rating}</p>
                                </div>
                            </div>
                        </div>
                        <img src="/image%20(1).png" alt="" className="w-[23%] h-[80%] rounded-r-[30px] rounded-l-none"/>
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
