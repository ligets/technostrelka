'use client'
import {useState} from "react";

export default function RedactorRoutesLK() {

    const [isModalOpen, setIsModalOpen] = useState(false);//открытие закрытие окна редактирования маршрута
    const [isModalValue, setIsModalValue] = useState("Пеший");//выбранный тип маршрута
    const [imageSrc, setImageSrc] = useState(null);//превью картинки в редактировании маршрута

    var listExpenditions = ["Пеший", "Автомобильный", "Спортивное ориентирование", "Альпинизм", "Велосипедный маршрут", "Кемпинг", "Лыжный маршрут", "Байдарки", "Сапсерфинг", "Дайвинг", "Рафтинг", "Верховая езда", "Снегоход", "Багги", " Эндуро", "Внедорожник", "Поезд"];

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = (e) => setImageSrc(e.target.result);
            reader.readAsDataURL(file);
        }
    };
    return (
        <div className="flex flex-col items-start gap-4">
            <span className="text-[#000] text-[20px] font-semibold px-2">
                {/* Название */}
                Редактировать - Кавказские горы - пешая тропа
            </span>
            <div className="border-dashed border border-[#6874f9] w-[100%]"></div>
            <form className="flex flex-col gap-10 w-[100%] " action="">
                <div className="flex flex-row items-start justify-between">
                    <label htmlFor=""
                            className="text-[#8d8d8d] text-[16px] font-semibold">Название</label>
                    <input type="text" placeholder="Кавказские горы - пешая тропа"
                            className="w-[70%] border border-gray-400 rounded-lg  h-[36px] px-2 outline-none"/>
                </div>

                <div className="flex flex-row items-start justify-between">
                    <label htmlFor=""
                            className="text-[#8d8d8d] text-[16px] font-semibold">Описание</label>
                    <textarea name="" id=""
                                className="w-[70%] border border-gray-400 rounded-lg  h-[10em] px-2 outline-none resize-none "></textarea>
                </div>

                <div className="flex flex-row items-start justify-between w-[37%]">
                    <label htmlFor="" className="text-[#8d8d8d] text-[16px] font-semibold">Публичный/
                        Приватный</label>
                    <label className="inline-flex items-center cursor-pointer">
                        <input type="checkbox" value="" className="sr-only peer outline-none"/>
                        <div
                            className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 dark:peer-checked:bg-blue-600"></div>
                    </label>
                </div>

                <div className="flex flex-row items-start justify-between w-[37%]">
                    <label htmlFor="" className="text-[#8d8d8d] text-[16px] font-semibold">Поход</label>
                    <div
                        className="flex flex-col items-center justify-center w-20 h-20 bg-[#d9d9d9] rounded-[5px] cursor-pointer"
                        onClick={() => setIsModalOpen(true)}
                    >
                        <h1 className="text-[#000]  text-[10px] font-light">{isModalValue}</h1>
                    </div>
                </div>

                <div
                    className={isModalOpen ? "fixed top-0 left-0 w-[100%] h-[100%] bg-[rgba(29,29,29,0.53)] flex flex-col justify-center items-center " : "hidden"}>
                    <div
                        className="relative w-[40%] h-[80%] bg-[#fff] rounded-[5px] p-10 flex flex-row flex-wrap gap-[20px]">
                        <span
                            className="absolute right-0 top-0 cursor-pointer p-3 font-semibold text-[25px] text-[#000]"
                            onClick={() => setIsModalOpen(false)}>✕</span>
                        {listExpenditions.map((value) => (


                            <div key={value}
                                    className="flex flex-col items-center justify-center w-[8em] h-[8em]  bg-[#d9d9d9] rounded-[5px] cursor-pointer "
                                    onClick={() => (setIsModalValue(value) , setIsModalOpen(false))}>
                                <h1 className="text-[#000]  text-[12px] font-light">{value}</h1>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex flex-row items-start justify-between ">
                    <label htmlFor="" className="text-[#8d8d8d] text-[16px] font-semibold">Фото и
                        видео</label>
                    <div className="w-[70%] p-4 bg-white rounded-lg shadow-md">
                        <label
                            htmlFor="fileInput"
                            className="flex items-center justify-center w-full h-48 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500"
                        >
                            <span className="text-gray-500">Загрузите сюда ваши фото или видео</span>
                            <input
                                type="file"
                                id="fileInput"
                                accept="image/*"
                                className="hidden"
                                onChange={handleImageUpload}
                            />
                        </label>

                        {imageSrc && (
                            <div className="mt-4">
                                <img
                                    src={imageSrc}
                                    alt="Предпросмотр"
                                    className="w-full rounded-lg shadow-md"
                                />
                            </div>
                        )}
                    </div>
                </div>
                <div className="flex flex-row items-center justify-between ">
                    <div className="flex flex-row items-center gap-2">
                        <svg width="11" height="12" viewBox="0 0 11 12" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M3.4375 0V0.666667H0V2H0.6875V10.6667C0.6875 11.0203 0.832366 11.3594 1.09023 11.6095C1.34809 11.8595 1.69783 12 2.0625 12H8.9375C9.30217 12 9.65191 11.8595 9.90977 11.6095C10.1676 11.3594 10.3125 11.0203 10.3125 10.6667V2H11V0.666667H7.5625V0H3.4375ZM2.0625 2H8.9375V10.6667H2.0625V2ZM3.4375 3.33333V9.33333H4.8125V3.33333H3.4375ZM6.1875 3.33333V9.33333H7.5625V3.33333H6.1875Z"
                                fill="black"/>
                        </svg>
                        <h1>Удалить маршрут</h1>
                    </div>
                    <div className="flex flex-row items-center justify-between gap-5">
                        <a className="font-semibold text-[#6874f9] text-[14px] " href="">Отменить</a>
                        <a className="px-[3em] py-3 font-semibold text-[#fff] text-[14px] bg-[#6874f9] rounded-[10px]"
                            href="">Принять</a>
                    </div>
                </div>
            </form>
        </div>
    );
}