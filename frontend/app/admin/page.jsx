'use client';

import Image from "next/image";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Admin() {
    const [routes, setRoutes] = useState([]);

    const token = typeof document !== "undefined" ? document.cookie
        .split('; ')
        .find(row => row.startsWith('access_token='))?.split('=')[1] : null;

    useEffect(() => {
        if (!token) return;
        axios.get(`${process.env.NEXT_PUBLIC_BACKEND_HOST_ROUTES}moderation`, {
            headers: {
                "Authorization": `Bearer ${token}`,
            }
        })
        .then(response => {setRoutes(response.data)
            console.log(response.data)
        })
        .catch(error => console.error(error));
    }, [token]);

    const handlePublish = (id) => {
        axios.post(`${process.env.NEXT_PUBLIC_BACKEND_HOST_ROUTES}${id}/approve`,{},{
            headers: {
                "Authorization": `Bearer ${token}`,
            }
        }).catch(error => console.log(error))
    }
    const handleReject = (id) => {
        console.log(id)
        axios.post(`${process.env.NEXT_PUBLIC_BACKEND_HOST_ROUTES}${id}/reject`,{}, {
            headers: {
                "Authorization": `Bearer ${token}`,
            }
        }).catch(error => console.log(error))
    }
    
    return (
        <div className="flex flex-col w-[92%] h-[94%]">
            <h1 className="text-[#000] text-[25px] font-bold">Админ панель</h1>
            <div className="flex flex-row gap-[10%] py-8">
                <div className="flex flex-col gap-5">
                    <Image src="/admin-prof.png" alt="" width={207} height={207} />
                </div>
                <div className="flex flex-col gap-9 w-[50%]">
                    {routes.length > 0 ? (
                        routes.map((route) => (
                            <div key={route.id} className="flex flex-col gap-7 w-[100%]">
                                <div className="flex flex-row justify-between">
                                    <h1 className="text-[#000] text-[16px] font-bold">{route.route.title}</h1>
                                    <div className="flex flex-row gap-[1em]">
                                        <a className="text-[#6874f9] font-light" href="#">На карте</a>
                                    </div>
                                </div>
                                <div className="flex flex-row justify-between items-center">
                                    <div className="flex flex-row justify-between gap-[3em]">
                                        <div className="flex flex-col gap-[0.5em] items-start">
                                            <p className="text-[#000] font-light text-[15px]">Расстояние</p>
                                            <h1 className="text-[#000] font-bold text-[17px]">{route.distance} км</h1>
                                        </div>
                                        <div className="flex flex-col gap-[0.5em] items-start">
                                            <p className="text-[#000] font-light text-[15px]">Высота</p>
                                            <h1 className="text-[#000] font-bold text-[17px]">{route.height} м</h1>
                                        </div>
                                        <div className="flex flex-col gap-[0.5em] items-start">
                                            <p className="text-[#000] font-light text-[15px]">Рейтинг</p>
                                            <div className="flex justify-between flex-row items-center">
                                                <Image src="/Star.png" alt="" width={16} height={17} />
                                                <h1 className="text-[#000] font-bold text-[17px]">{route.rating || 0}</h1>
                                            </div>
                                        </div>
                                        
                                    
                                        {route.route.status === "На модерации" ? (
                                                <>
                                                    <button 
                                                        onClick={() => handlePublish(route.route.id)}
                                                        className="flex flex-row-reverse gap-[0.5em] items-center font-light text-[14px] text-[#000] border-[2px] px-1 py-1 rounded-[10px]"
                                                    >
                                                        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M2 7L6.93103 12L13 2" stroke="#49D84E" strokeWidth="3" strokeLinecap="round" />
                                                        </svg>
                                                        Разрешить
                                                    </button>
                                                    <button 
                                                        onClick={() => handleReject(route.route.id)} 
                                                        className="flex flex-row-reverse gap-[0.5em] items-center font-light text-[14px] text-[#000] border-[2px] px-1 py-1 rounded-[10px]"
                                                    >
                                                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M2 12L12 2M12 12L2 2" stroke="#E53B3B" strokeWidth="3" strokeLinecap="round" />
                                                        </svg>
                                                        Запретить
                                                    </button>
                                                </>
                                            ) : route.route.status === "Одобрено" ? (
                                                <>
                                                    <h1>Опубликован</h1>
                                                    <button 
                                                        onClick={() => handleReject(route.route.id)}
                                                        className="flex flex-row-reverse gap-[0.5em] items-center font-light text-[16px] text-[#000] border-[2px] px-3 py-1 rounded-[10px]"
                                                    >
                                                        Отменить
                                                    </button>
                                                </>
                                            ) : route.route.status === "Отклонено" ? (
                                                <>
                                                    <h1>Не опубликован</h1>
                                                    <button 
                                                        onClick={() => handlePublish(route.route.id)}
                                                        className="flex flex-row-reverse gap-[0.5em] items-center font-light text-[16px] text-[#000] border-[2px] px-3 py-1 rounded-[10px]"
                                                    >
                                                        Опубликовать
                                                    </button>
                                                </>
                                            ) : null}
                                    
                                    </div>
                                </div>
                                <div className="w-[100%] h-[150px] relative">
                                    <Image src="/lk_path.png" alt="" layout="fill" style={{ objectFit: "cover" }} />
                                </div>
                                <div className="border-dashed border border-[#6874f9] w-[100%]"></div>
                            </div>
                        ))
                    ) : (
                        <h1>Нет доступных маршрутов</h1>
                    )}
                </div>
            </div>
        </div>
    );
}
