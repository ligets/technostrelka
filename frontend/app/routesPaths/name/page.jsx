import Image from "next/image";

export default function routePath() {
    return (
        <div className="flex flex-row gap-[2em] w-[100%] justify-between ">
            <div className="flex flex-col gap-[2em] w-[65%]">
                <div className="flex flex-col gap-[1em] w">
                    <div className="flex flex-row items-center gap-[4em]">
                        <h1 className="text-[#000] text-[25px] font-semibold">Кавказские горы - пешая тропа </h1>
                        <a className="text-[#6874f9] text-[16px] font-semibold" href="">2 комментария</a>
                        <div className="flex justify-between flex-row items-center">
                            <Image src="/Star.png" alt="" width={17} height={16}/>
                            <h1 className="text-[#000] font-bold text-[17px]">4.5</h1>
                        </div>
                    </div>
                    <div className="flex flex-row gap-[1em]">
                        <button className="text-[#000] text-[16px] font-light border-[1px] border-[#6874f9] px-[1.5em] py-[0.5em] rounded-[5px]" >Отзыв</button>
                        <button className="text-[#000] text-[16px] font-light border-[1px] border-[#6874f9] px-[1.5em] py-[0.5em] rounded-[5px]">Поделиться</button>
                        <button className="text-[#000] text-[16px] font-light border-[1px] border-[#6874f9] px-[1.5em] py-[0.5em] rounded-[5px]">Сохранить</button>
                    </div>
                </div>

                {/* ЗДЕСЬ ДОЛЖНА БЫТЬ КАРТА */}
                <img src="" alt="" className="w-[100%] h-[500px]"/>

                <div className="flex flex-col gap-[1em]">
                    <h1 className="text-[#4e4e4e] text-[25px] font-semibold">Фото маршрута</h1>
                    <div className="flex flex-row justify-between w-[100%]" >
                        <img src="" alt="" className="w-[50%] h-[500px]"/>
                        <div className="flex flex-col justify-between w-[45%]" >
                            <img src="" alt="" className="w-[100%] h-[240px]"/>
                            <img src="" alt="" className="w-[100%] h-[240px]"/>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-[1em]">
                    <h1 className="text-[#4e4e4e] text-[25px] font-semibold">Описание маршрута</h1>
                    <p className="text-[25px] text-[#000] font-light">
                    Маршрут из города Пермь в горы. Маршрут не сложный, идёт по приятной лесной тропе, иногда выходит на скалы. Есть развилка, одна часть пути идёт по огородам 
                    (которая на карте записана), вторая по низу вдоль моря. Вторая дольше а два раза но живописней. А в общем хороший маршрут.
                    </p>
                </div>

                <div className="flex flex-col gap-[1em]">
                    <h1 className="text-[#4e4e4e] text-[25px] font-semibold">Описание маршрута</h1>
                    <div>
                        <div className="w-[100%] border-[1px] border-[#8d8d8d]  rounded-[10px]">
                            <div className="flex flex-row justify-between items-center p-[1em]">
                                <h1 className="text-[18px] font-extrabold text-[#000]">Маршрутная точка</h1>
                                <h1 className="text-[25px] font-extrabold text-[#000]">Название</h1>
                            </div>
                            <img src="" alt="" className="w-[100%] h-[200px] rounded-b-lg "/>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex flex-col gap-[1em]">
                <button className="rounded-[10px] py-[0.5em] px-[2em] bg-[#6874f9] text-white text-[18px] font-semibold border-[1px] border-[#6874f9] hover:bg-transparent hover:text-blue-600 transition-all duration-300">Отправить маршрут</button>
                <div className="w-[100%] border-[#6874f9] border-[2px] rounded-[10px] flex flex-col items-center gap-[1em] p-[1em]">
                    <h1 className="text-[#6874f9] text-[18px] font-semibold">Экспорт маршрута</h1>
                    <span className="text-[#8d8d8d] text-[18px] font-light">В формате: <a href="" className="text-[#6874f9] text-[25px] font-semibold">gpx</a></span>
                    <span className="text-[#8d8d8d] text-[18px] font-light">В формате: <a href="" className="text-[#6874f9] text-[25px] font-semibold">kml</a></span>
                    <span className="text-[#8d8d8d] text-[18px] font-light">В формате: <a href="" className="text-[#6874f9] text-[25px] font-semibold">kmz</a></span>
                </div>
                <div className="flex flex-col gap-[1em]">
                    <h1 className="text-[#000] text-[18px] font-semibold">Автор маршрута</h1>
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
                        <div className="border-[1px] border-[#d9d9d9] w-[100%]"></div>
                        <a className="text-[#8d8d8d] text-[14px] font-light" href="">Другие маршруты этого автора</a>
                    </div>  
                    <div>
                        <h1 className="text-[#000] text-[18px] font-semibold">Статистика маршрута</h1>
                        <div>
                            <div>
                                <h1 className="">Расстояние</h1>
                                <p>10.72 км</p>
                            </div>
                            <div>
                                <h1>Высота</h1>
                                <p>10.72 км</p>
                            </div>
                            <div>
                                <h1>Тип маршрута</h1>
                                <p>10.72 км</p>
                            </div>
                            <div>
                                <h1>Время в пути</h1>
                                <p>10.72 км</p>
                            </div>
                            <div>
                                <h1>Загруженно</h1>
                                <p>10.72 км</p>
                            </div>
                           
                        </div>
                    </div>
                    <div className="border-[2px] border-[#8d8d8d] "></div>
                    <div>
                        <h1 className="text-[#000] text-[18px] font-semibold">Рейтинг и комментарии</h1>
                        <div>
                            <div className="flex justify-between flex-row items-center">
                                <Image src="/Star.png" alt="" width={17} height={16}/>
                                <h1 className="text-[#000] font-bold text-[17px]">4.5</h1>
                            </div>
                            <div className="border-[2px] border-[#000] "></div>
                            <h1>2 комментария</h1>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}