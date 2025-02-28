"use client"

import Image from "next/image";
import YandexMap from "@/components/Map/YandexMapRoutesPaths";
import { useEffect, useState } from "react";
import axios from "axios";
import process from "next/dist/build/webpack/loaders/resolve-url-loader/lib/postcss";


export default function RoutesPaths() {
    const [routeFull, setRouteFull] = useState([]);
    const [selectedRoute, setSelectedRoute] = useState([]);

    useEffect(() => {
        axios.get(`${process.env.NEXT_PUBLIC_BACKEND_HOST_ROUTES}`)
            .then((response) => {
                setRouteFull(response.data);
            })
            .catch(error => console.log(error));
    }, []);

    // Преобразуем selectedRoute в нужный формат
    const formattedRoute = selectedRoute
        ? {
            referencePoints: selectedRoute.points,
            params: {
                routingMode: selectedRoute.transportType, // "auto" или "pedestrian"
                avoidTrafficJams: true,
            },
          }
        : null;


    return (
        <div className="absolute top-[80px] left-0 flex w-[100%] h-[100%]">
            <div className="flex flex-col gap-[1em] w-[35%] h-[100%] bg-[#F4F4F4] p-6">
                <h1 className="text-[#000] text-[25px] font-bold">{routeFull.length} маршрутов</h1>
                <div className="bg-[#D9D9D9] w-[100%] h-[2px]"></div>

                {routeFull.length > 0 
                    ? routeFull.map((route) => (
                        <div key={route.id} className="w-[100%] bg-[#FFFFFF] rounded-[30px] flex flex-row">
                            <div className="flex flex-col gap-[1em] p-[2em]">
                                <div className="flex flex-col gap-[0.5em]">
                                    <div className="flex gap-[1em] items-center">
                                        <h1 className="text-[#000] text-[11px] font-light">{route.route.type} туризм</h1>
                                        <a className="text-[#000] text-[11px] font-light" href="#">Сохранить маршрут</a>
                                        <a className="text-[#000] text-[11px] font-light" href="#" onClick={(e) => {
                                            e.preventDefault();
                                            setSelectedRoute(route.route.points);
                                        }}>Показать на карте</a>
                                    </div>
                                    <h1 className="text-[#000] text-[16px] font-semibold">{route.title}</h1>
                                </div>
                                <div>
                                    <div className="flex flex-row justify-between gap-[3em]">
                                        <div className="flex flex-col gap-[0.5em] items-start">
                                            <p className="text-[#000] font-light text-[13px]">Расстояние</p>
                                            <h1 className="text-[#000] font-bold text-[14px]">{route.distance} км</h1>
                                        </div>
                                        <div className="flex flex-col gap-[0.5em] items-start">
                                            <p className="text-[#000] font-light text-[13px]">Высота</p>
                                            <h1 className="text-[#000] font-bold text-[14px]">{route.height} м</h1>
                                        </div>
                                        <div className="flex flex-col gap-[0.5em] items-start">
                                            <p className="text-[#000] font-light text-[13px]">Рейтинг</p>
                                            <div className="flex justify-between flex-row items-center">
                                                <Image src="/Star.png" alt="Рейтинг" width={13} height={13}/>
                                                <h1 className="text-[#000] font-bold text-[14px]">{route.route.rating || 0}</h1>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                    : <h1>Нет доступных маршрутов</h1>}
            </div>
            <YandexMap center={[55.751244, 37.618423]} zoom={10} routes={formattedRoute} />
        </div>
    );
}
