'use client'
import {useEffect, useState} from "react"
import axios from "axios";
import { useFormCreateRoutes  } from "@/store/formCreateRoutes";

import YandexMap from "@/components/Map/YandexMapRedactor";
import DescriptionRoute from "@/components/Map/main_descrition_route";
import process from "next/dist/build/webpack/loaders/resolve-url-loader/lib/postcss";
import Image from "next/image"; 


export default function uploadRoute() {

    const [query, setQuery] = useState("");//для поиска
    const [suggestions, setSuggestions] = useState([]);//для поиска
    const [selectedAddress, setSelectedAddress] = useState(""); // Состояние для выбранного адреса
    const [isAddressSelected, setIsAddressSelected] = useState(false); // Флаг, чтобы избежать лишних запросов

    const [editingPoint, setEditingPoint] = useState(null);


    const  { step, 
            start,
            points,
            setStep,
            setStart,
            setPoints,
            removePoint,
            routeInfo,
            updatePoint
         } = useFormCreateRoutes();
    
    // Функция для загрузки фото
    const handleMediaUpload = (e) => {
        if (!editingPoint) return;

        const files = Array.from(e.target.files);
        if (files.length + (editingPoint.photos?.length || 0) > 3) {
            alert("Можно загрузить максимум 3 фотографии!");
            return;
        }

        const newFiles = files.map((file) => URL.createObjectURL(file));
        setEditingPoint({ ...editingPoint, photos: [...(editingPoint.photos || []), ...newFiles] });
    };

    // Функция удаления фото
    const removeMediaFile = (index) => {
        if (!editingPoint) return;
        const updatedPhotos = [...editingPoint.photos];
        updatedPhotos.splice(index, 1);
        setEditingPoint({ ...editingPoint, photos: updatedPhotos });
    };


    const handleInputChange = (e) => {
        setQuery(e.target.value);
        setIsAddressSelected(false); // Разрешаем новые запросы при ручном вводе
    };
    const handleAddressClick = (selectedItem) => {
        setSelectedAddress({ lat: selectedItem.lat, lon: selectedItem.lon });
        setQuery(selectedItem.fullAddress);
        setSuggestions([]);
        setIsAddressSelected(true);

        console.log(`Выбранные координаты: широта ${selectedItem.lat}, долгота ${selectedItem.lon}`);
    };

    useEffect(() => {
        fetchSuggestions();
    }, [query]); // Запрашиваем данные при изменении query

    useEffect(() => {    //Это апи яндекс я всё шатал
        // Проверяем, если такого мета-тега еще нет
        const metaTag = document.querySelector('meta[name="referrer"]');
        if (!metaTag) {
            const newMetaTag = document.createElement("meta");
            newMetaTag.name = "referrer";
            newMetaTag.content = "no-referrer";
            document.head.appendChild(newMetaTag);
        }
    }, []);
    useEffect(() => {
        if (!query.trim() || isAddressSelected) return; // Если адрес выбран, не делать запрос
        fetchSuggestions();
    }, [query, isAddressSelected]); // Зависимости теперь включают isAddressSelected

    const fetchSuggestions = () => {
        setIsAddressSelected(false);
        if (!query.trim()) return;

        axios
            .get(`https://geocode-maps.yandex.ru/1.x/?apikey=913bd6fa-b6c5-4101-b248-38f0f10e7f1b&geocode=Россия+${encodeURIComponent(query)}&format=json`)
            .then((response) => {
                const items = response.data?.response?.GeoObjectCollection?.featureMember || [];

                const addresses = items.map((item) => {
                    const geoObject = item.GeoObject;
                    const addressComponents = geoObject?.metaDataProperty?.GeocoderMetaData?.Address?.Components ?? [];

                    const country = addressComponents.find(component => component.kind === "country")?.name || "";
                    const province = addressComponents.find(component => component.kind === "province")?.name || "";
                    const locality = addressComponents.find(component => component.kind === "locality")?.name || "";
                    const street = addressComponents.find(component => component.kind === "street")?.name || "";
                    const house = addressComponents.find(component => component.kind === "house")?.name || "";

                    const fullAddress = [country, province, locality, street, house].filter(Boolean).join(", ");

                    // Получаем координаты (широту и долготу)
                    const [lon, lat] = geoObject?.Point?.pos.split(" ") || [];

                    return { fullAddress, lat, lon };
                });

                setSuggestions(addresses);
                console.log("Список адресов:", addresses);
            })
            .catch((error) => {
                console.error('Ошибка при получении данных:', error);
            });
    };

    const filterInvalidAddresses = (address) => {
        console.log("filterInvalidAddresses", address)
        return address && !/^, ?$/.test(address);// Проверяем, что строка не пустая и не состоит только из запятой
    };

    

    return (
        <>  
            <div className="flex flex-col items-start gap-4 w-[100%]">
                            <span className="text-[#000] text-[20px] font-semibold px-2">
                                Свой маршрут
                            </span>
                            <div className="border-dashed border border-[#6874f9] w-[100%]"></div>
                        </div>
                        <div className="flex flex-col gap-[1em] w-[100%]  border-[#8d8d8d] border-2 rounded-[10px] p-5">
                            <div className="flex flex-col items-start gap-4 w-[100%]">
                                <span className="text-[#000] text-[20px] font-semibold px-2">
                                    Шаг {step}/4 - Нанесение маршрута
                                </span>
                                <div className="border-dashed border border-[#6874f9] w-[100%]"></div>
                            </div>

                            {/* ШАГ 1 */}
                            {
                                step === 1 && (
                                    <div className="flex flex-col gap-[1em] w-[100%]">
                                    <div>
                                        <h1 className="text-[15px] font-light text-black">
                                            Место начала маршрута (Город, река, гора...)
                                        </h1>
                                        <div className="flex flex-row w-[100%] justify-between">
                                            <input
                                                className="font-light text-[15px] border-[#8d8d8d] border-2 rounded-[10px] outline-none w-[70%] text-black"
                                                type="text"
                                                value={query}
                                                onChange={(e) => {
                                                    setQuery(e.target.value); // Обновляем query
                                                    setIsAddressSelected(false); // Разрешаем новые запросы
                                                }}
                                            />
                                        </div>
    
                                        {suggestions.length > 0 && (
                                            <ul className="bg-white shadow-md rounded mt-2 text-black">
                                                {suggestions.map((item, index) => (
                                                    <li
                                                        key={index}
                                                        className="p-2 border-b cursor-pointer hover:bg-gray-200 text-black"
                                                        onClick={() => handleAddressClick(item)} // Передаем объект item
                                                    >
                                                        {item.fullAddress} <br />
                                                        <span className="text-gray-500 text-sm">(Ш: {item.lat}, Д: {item.lon})</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </div>
                                    <button
                                        className={`rounded-[10px] py-[0.5em] px-[2em] text-white text-[15px] font-light border-[1px] transition-all duration-300 
                                        ${selectedAddress ? "bg-[#6874f9] border-[#6874f9] hover:bg-transparent hover:text-blue-600" : "bg-gray-400 border-gray-400 cursor-not-allowed"}`}
                                        onClick={() => {
                                            setStep(step+1)
                                            setStart([selectedAddress.lat , selectedAddress.lon])
                                        }}
                                        disabled={!selectedAddress} // Блокируем кнопку, если адрес не выбран
                                    >
                                        Дальше
                                    </button>
                                </div>
                                )
                            }
                           



                            {/* ШАГ 2 */}
                            {step === 2 && (
                            <div className="flex w-[100%] h-96 flex-col relative">
                                <YandexMap center={start} />

                                {/* СПИСОК ТОЧЕК */}
                                <div className="flex flex-col gap-[0.5em] mt-4">
                                <h1 className="text-[#8D8D8D] font-semibold text-16px">Ориентиры</h1>
                                <div className="flex flex-col w-[100%] gap-[1em]">
                                    {points.map((point, index) => (
                                    <div key={point.id} className="flex flex-row justify-between w-[100%]">
                                        <div className="flex flex-row items-center gap-[2em]">
                                        <h1 className="text-[#000] font-semibold text-16px">{index + 1}.</h1>
                                        <h1 className="text-[#000] font-semibold text-16px">{point.name || `Точка ${index + 1}`}</h1>
                                        </div>

                                        {/* Убираем иконку редактирования */}
                                        <button onClick={() => removePoint(point.id)}>
                                        <Image src="/otmena.svg" alt="Удалить" width={17} height={16} />
                                        </button>
                                    </div>
                                    ))}
                                </div>
                                </div>

                                <button
                                className={`rounded-[10px] py-[0.5em] px-[2em] text-white text-[15px] font-light border-[1px] transition-all duration-300 
                                            ${points.length >= 3 ? "bg-[#6874f9] border-[#6874f9] hover:bg-transparent hover:text-blue-600" : "bg-gray-400 border-gray-400 cursor-not-allowed"}`}
                                onClick={() => setStep(step + 1)}
                                disabled={points.length < 3} // Блокируем кнопку, если меньше 3 точек
                                >
                                Дальше
                                </button>
                            </div>
                            )}
                                                        
                            


                            {/* ШАГ 3 */}
                            {
                                step === 3 && (
                                    <div className="flex w-[100%]">
                                    {/* СОздание  МАРШУРТа */}
                                    <DescriptionRoute/>
                                </div>
                                )

                            }


                            {/* ШАГ 4 */}
                            {step === 4 && (
                                <div className="flex flex-col gap-[0.5em]">
                                    <h1 className="text-[#8D8D8D] font-semibold text-16px">Ориентиры</h1>

                                    {/* Перебираем поинты */}
                                    {points.map((point, index) => (
                                        <div key={point.id} className="flex flex-col w-[100%] gap-[1em]">
                                            <div className="flex flex-row justify-between w-[100%]">
                                                <div className="flex flex-row items-center gap-[2em]">
                                                    <h1 className="text-[#000] font-semibold text-16px">{index + 1}.</h1>
                                                    <h1 className="text-[#000] font-semibold text-16px">{point.name || "Без названия"}</h1>
                                                </div>
                                                <div className="flex flex-row gap-[1em] items-center">
                                                    <button onClick={() => setEditingPoint(point)}>
                                                        <Image src="/pen.svg" alt="Редактировать" width={17} height={16} />
                                                    </button>
                                                    <button onClick={() => removePoint(point.id)}>
                                                        <Image src="/otmena.svg" alt="Удалить" width={17} height={16} />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}

                                    {/* Модальное окно редактирования поинта */}
                                    {editingPoint && (
                                        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                                            <div className="bg-white p-6 rounded-lg w-[50%]">
                                                <h2 className="text-lg font-semibold mb-4">Редактирование точки</h2>

                                                {/* Название */}
                                                <label className="text-sm font-semibold">Название</label>
                                                <input
                                                    type="text"
                                                    value={editingPoint.name || ""}
                                                    onChange={(e) => setEditingPoint({ ...editingPoint, name: e.target.value })}
                                                    className="w-full border rounded-lg p-2 mb-4"
                                                />

                                                {/* Описание */}
                                                <label className="text-sm font-semibold">Описание</label>
                                                <textarea
                                                    value={editingPoint.description || ""}
                                                    onChange={(e) => setEditingPoint({ ...editingPoint, description: e.target.value })}
                                                    className="w-full border rounded-lg p-2 mb-4"
                                                />

                                                {/* Фото */}
                                                <label className="text-sm font-semibold">Фото (макс. 3)</label>
                                                <div className="w-full p-4 bg-gray-100 rounded-lg shadow-md mb-4">
                                                    <label
                                                        htmlFor="fileInput"
                                                        className={`flex items-center justify-center w-full h-32 border-2 border-dashed ${
                                                            (editingPoint.photos?.length || 0) < 3 ? "border-gray-300 hover:border-blue-500" : "border-red-500"
                                                        } rounded-lg cursor-pointer`}
                                                    >
                                                        <span className="text-gray-500">Загрузите фото</span>
                                                        <input
                                                            type="file"
                                                            id="fileInput"
                                                            accept="image/*"
                                                            multiple
                                                            className="hidden"
                                                            onChange={handleMediaUpload}
                                                            disabled={(editingPoint.photos?.length || 0) >= 3}
                                                        />
                                                    </label>

                                                    {/* Превью загруженных фото */}
                                                    {editingPoint.photos?.length > 0 && (
                                                        <div className="mt-4 grid grid-cols-3 gap-4">
                                                            {editingPoint.photos.map((file, index) => (
                                                                <div key={index} className="relative">
                                                                    <img src={file} alt="Фото" className="w-full rounded-lg shadow-md" />
                                                                    <button
                                                                        className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full"
                                                                        onClick={() => removeMediaFile(index)}
                                                                    >
                                                                        ✕
                                                                    </button>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    )}
                                                </div>

                                                {/* Кнопки */}
                                                <div className="flex justify-end gap-4">
                                                    <button
                                                        className="px-4 py-2 bg-gray-400 text-white rounded-lg"
                                                        onClick={() => setEditingPoint(null)}
                                                    >
                                                        Отмена
                                                    </button>
                                                    <button
                                                        className="px-4 py-2 bg-blue-500 text-white rounded-lg"
                                                        onClick={() => {
                                                            updatePoint(editingPoint.id, editingPoint);
                                                            setEditingPoint(null);
                                                        }}
                                                    >
                                                        Сохранить
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
        
        
                                    )}
                                </div>
                            )}
                            
                    </div>
        </>
    );
}