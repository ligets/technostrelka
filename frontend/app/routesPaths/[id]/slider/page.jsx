'use client';

import React, {useEffect, useState} from 'react';
import {ChevronLeft, ChevronRight} from 'lucide-react';
import Image from 'next/image';
import {useParams} from "next/navigation";
import axios from "axios";

export default function ImageSlider() {
    const {id: routeId} = useParams()
    const [route, setRoute] = useState(null);

    useEffect(() => {
        if (routeId) {
            axios.get(`${process.env.NEXT_PUBLIC_BACKEND_HOST_ROUTES}${routeId}`)
                .then((response) => {
                    setRoute(response.data);
                    console.log("Данные маршрута:", response.data);
                })
                .catch(error => console.error("Ошибка загрузки маршрута:", error));
        }
    }, [routeId]); // Добавляем зависимость, чтобы запрос отправлялся при изменении routeId

    const [currentIndex, setCurrentIndex] = useState(0);

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev === 0 ? route.photos.length - 1 : prev - 1));
    };

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev === route.photos.length - 1 ? 0 : prev + 1));
    };

    const goToSlide = (index) => {
        setCurrentIndex(index);
    };
    console.log(route)

    if (!route) {
        return (
            <div className="flex items-center justify-center h-96 bg-gray-100 text-gray-500">
                Нет доступных изображений
            </div>
        );
    }

    return (
        <div className="w-full h-full flex flex-col gap-[1em] ">
            {/* Основной слайд */}
            <div
                className="relative flex items-center justify-center bg-black rounded-lg overflow-hidden w-full h-[780px] ">
                <button
                    onClick={prevSlide}
                    className="absolute left-2 p-2 bg-black bg-opacity-50 text-white rounded-full hover:bg-opacity-75 transition"
                >
                    <ChevronLeft size={32}/>
                </button>

                <img
                    src={process.env.NEXT_PUBLIC_BACKEND_HOST_ROUTES_MEDIA + route.photos[currentIndex].photo_path}
                    className="object-fill"
                />

                <button
                    onClick={nextSlide}
                    className="absolute right-2 p-2 bg-black bg-opacity-50 text-white rounded-full hover:bg-opacity-75 transition"
                >
                    <ChevronRight size={32}/>
                </button>
            </div>

            {/* Миниатюры */}
            <div className='flex flex-row'>
                <div className="shadow-md bg-[#f1efef] rounded-[10px] flex flex-col items-start gap-[1em] p-[1em]">
                    <div className="flex flex-row items-center gap-[1em]">
                        <div className="rounded-full fill-current bg-[#000] h-[60px] w-[60px]"></div>
                        <h1 className="text-[#000] text-[16px] font-semibold">User</h1>
                    </div>
                    <div className="flex flex-row gap-[1em]">
                        <div className="flex justify-between flex-row items-center">
                            <Image src="/Star.png" alt="" width={17} height={16}/>
                            <h1 className="text-[#000] font-bold text-[16px]">4.5</h1>
                        </div>
                        <h1 className="text-[#000] text-[16px] font-semibold">15 маршрутов</h1>
                        <h1 className="text-[#000] text-[16px] font-semibold">1000 км</h1>
                    </div>
                </div>

                <div className="flex items-center p-4 gap-2 overflow-x-auto">

                    {route.photos.map((image, index) => (
                        <img
                            key={index}
                            src={process.env.NEXT_PUBLIC_BACKEND_HOST_ROUTES_MEDIA + image.photo_path}
                            onClick={() => goToSlide(index)}
                            className={`w-[20em] h-[10em] object-cover cursor-pointer border-2 ${
                                currentIndex === index
                                    ? 'border-blue-500'
                                    : 'border-transparent'
                            } rounded-md transition duration-300 hover:opacity-80`}
                        />
                    ))}
                </div>
            </div>
        </div>

    );
}
