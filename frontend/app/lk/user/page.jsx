"use client"
import {useEffect, useState} from "react"
import Image from "next/image";

export default function LKUser(){
    const [isOpen, setIsOpen] = useState(1);
    const [step, setStep] = useState(1);
    const [routeData, setRouteData] = useState({
        startPoint: "",
        routeMap: null,
        name: "",
        description: "",
        access: "public",
        type: "hiking",
        media: [],
        landmarks: [],
    });

    const nextStep = () => setStep(prev => prev + 1);
    const prevStep = () => setStep(prev => prev - 1);
    console.log(step)
    useEffect(() => {
        console.log("Current step:", step);
    });

    return(
        <div className="flex flex-col w-[92%] h-[94%]">
            <h1 className="text-[#000] text-[25px] font-bold">Sergeuuuu</h1>
            <div className="flex flex-row gap-[10%] py-8">
                <div className="flex flex-col gap-5">
                    <div className="relative">
                        <img src="" alt="" className="w-[207px] h-[207px] rounded-[10px]"/>
                        <a className="absolute top-0 right-0 font-semibold text-[#000] text-[13px] p-2" href="" >Изменить</a>
                    </div>
                    <p className="text-[#000] text-[16px] font-semibold">2 маршрута</p>
                </div>
                <div className="flex flex-col gap-9">
                    <div >
                        <button
                        className={isOpen === 1
                            ? "bg-[#6874f9] text-white text-[16px] font-light rounded-tl-[14px] rounded-tr-[15px] px-8 py-2"
                            : "text-[16px] text-[#6874f9] rounded-tl-[14px] rounded-tr-[15px]  bg-[#d9d9d9] font-light px-8 py-2"}
                        onClick={() => setIsOpen(1)}
                        >Ваши маршруты</button>
                        <button
                        className={isOpen === 2
                            ? "bg-[#6874f9] text-white text-[16px] font-light rounded-tl-[14px] rounded-tr-[15px] px-8 py-2"
                            : "text-[16px] text-[#6874f9] rounded-tl-[14px] rounded-tr-[15px] px-8 py-2 bg-[#d9d9d9] font-light"}
                        onClick={() => setIsOpen(2)}
                        >Сохраненные маршруты</button>
                        <button
                        className={isOpen === 3
                            ? "bg-[#6874f9] text-white text-[16px] font-light rounded-tl-[14px] rounded-tr-[15px] px-8 py-2"
                            : "text-[16px] text-[#6874f9] rounded-tl-[14px] rounded-tr-[15px] px-8 py-2 bg-[#d9d9d9] font-light"}
                        onClick={() => setIsOpen(3)}
                        >Загрузить маршрут</button>
                    </div>
                    <div className={isOpen === 1 ? "flex flex-col  gap-7" : "hidden"} >

                        {/* если у  человека нет созданных им маршрутов */}
                        {/* <div className="flex flex-col items-start gap-4">
                            <span className="text-[#000] text-[16px] font-bold px-2">
                                У вас нет маршрутов,
                                <a className="text-[#6874f9] text-[16px] font-bold px-1" href="">создайте</a>
                                первый маршрут!
                            </span>
                            <div className="border-dashed border border-[#6874f9] w-[100%]"></div>
                        </div> */}

                        {/* <div className="flex flex-col gap-7">
                            <div className="flex flex-row justify-between">
                                <h1 className="text-[#000] text-[16px] font-bold">Кавказские горы - пешая тропа </h1>
                                <div className="flex flex-row gap-[1em]">
                                    <a className="text-[#6874f9] font-light" href="">Редактировать</a>
                                    <a className="text-[#6874f9] font-light"  href="">На карте</a>
                                </div>
                            </div>
                            <div className="flex flex-row justify-between">
                                <div className="flex flex-row justify-between gap-[3em]">
                                    <div className="flex flex-col gap-[0.5em] items-start">
                                        <p className="text-[#000] font-light text-[15px]">Расстояние</p>
                                        <h1 className="text-[#000] font-bold text-[17px]">10,72 км</h1>
                                    </div>
                                    <div className="flex flex-col gap-[0.5em] items-start">
                                        <p className="text-[#000] font-light text-[15px]">Высота</p>
                                        <h1 className="text-[#000] font-bold text-[17px]">300 м</h1>
                                    </div>
                                    <div className="flex flex-col gap-[0.5em] items-start">
                                        <p className="text-[#000] font-light text-[15px]">Рейтинг</p>
                                        <div className="flex justify-between flex-row items-center">
                                            <Image src="/Star.png" alt="" width={25} height={25}/>
                                            <h1 className="text-[#000] font-bold text-[17px]">4.5</h1>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <div className="flex flex-col gap-[0.5em] items-center">
                                        <h1 className="text-[#000] font-light text-[17px]">Публичный/Приватный</h1>
                                        <label className="inline-flex items-center cursor-pointer">
                                            <input type="checkbox" value="" className="sr-only peer outline-none"/>
                                            <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 dark:peer-checked:bg-blue-600"></div>
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div className="w-[100%] h-[150px] relative">
                                <Image src ="/lk_path.png" alt="" layout="fill" objectFit="cover"/>
                            </div>
                            <div className="border-dashed border border-[#6874f9] w-[100%]"></div>
                        </div>
                         */}

                        <div className="flex flex-col items-start gap-4">
                            <span className="text-[#000] text-[20px] font-semibold px-2">
                                Редактировать - Кавказские горы - пешая тропа
                            </span>
                            <div className="border-dashed border border-[#6874f9] w-[100%]"></div>
                            <form className="flex flex-col gap-4 w-[100%]" action="">
                                <div className="flex flex-row items-start justify-between">
                                    <label htmlFor="" className="text-[#8d8d8d] text-[16px] font-semibold">Название</label>
                                    <input type="text" placeholder="Кавказские горы - пешая тропа" className="w-[70%] border border-gray-400 rounded-lg  h-[36px] px-2 outline-none"/>
                                </div>
                                <div className="flex flex-row items-start justify-between">
                                    <label htmlFor="" className="text-[#8d8d8d] text-[16px] font-semibold">описание</label>
                                    <input type="text" placeholder="Кавказские горы - пешая тропа" className="w-[70%] border border-gray-400 rounded-lg  h-[36px] px-2 outline-none"/>
                                </div>

                            </form>
                        </div>

                    </div>
                    <div className={isOpen === 3 ? "flex flex-col  gap-7" : "hidden" } onClick={()=>setStep(2)}>

                        <div className="p-4 max-w-2xl mx-auto">
                            <div className={step === 1 ? "flex visible" : "hidden"}>
                                <h2>Шаг 1: Начальная точка маршрута</h2>
                                <input
                                    type="text"
                                    placeholder="Введите координаты или адрес"
                                    value={routeData.startPoint}
                                    onChange={(e) => setRouteData({ ...routeData, startPoint: e.target.value })}
                                    className="border p-2 w-full"
                                />
                                <button onClick={nextStep} className="mt-4 p-2 bg-blue-500 text-white">Вперёд</button>
                            </div>

                            {step === 2 && (
                                <div>
                                    <h2>Шаг 2: Карта</h2>
                                    <div id="mapContainer">
                                        {/* Здесь будет ваш код карты */}
                                    </div>
                                    <button onClick={prevStep} className="mr-2 p-2 bg-gray-500 text-white">Назад</button>
                                    <button onClick={nextStep} className="p-2 bg-blue-500 text-white">Вперёд</button>
                                </div>
                            )}

                            {step === 3 && (
                                <div>
                                    <h2>Шаг 3: Детали маршрута</h2>
                                    <input
                                        type="text"
                                        placeholder="Название"
                                        value={routeData.name}
                                        onChange={(e) => setRouteData({ ...routeData, name: e.target.value })}
                                        className="border p-2 w-full"
                                    />
                                    <textarea
                                        placeholder="Описание"
                                        value={routeData.description}
                                        onChange={(e) => setRouteData({ ...routeData, description: e.target.value })}
                                        className="border p-2 w-full mt-2"
                                    />
                                    <button onClick={prevStep} className="mr-2 p-2 bg-gray-500 text-white">Назад</button>
                                    <button onClick={nextStep} className="p-2 bg-blue-500 text-white">Вперёд</button>
                                </div>
                            )}

                            {step === 4 && (
                                <div>
                                    <h2>Шаг 4: Ориентиры</h2>
                                    {/* Здесь можно добавить логику ориентиров */}
                                    <button onClick={prevStep} className="mr-2 p-2 bg-gray-500 text-white">Назад</button>
                                    <button onClick={nextStep} className="p-2 bg-blue-500 text-white">Завершить</button>
                                </div>
                            )}

                            {step === 5 && (
                                <div>
                                    <h2>Маршрут создан!</h2>
                                    <pre>{JSON.stringify(routeData, null, 2)}</pre>
                                    <button onClick={() => setStep(1)} className="p-2 bg-green-500 text-white">Создать новый маршрут</button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}