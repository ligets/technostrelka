import { useState,useEffect } from "react";
import { useFormCreateRoutes } from "@/store/formCreateRoutes";
import axios from "axios";
import process from "next/dist/build/webpack/loaders/resolve-url-loader/lib/postcss";

export default function SearchAdress(){
    const [query, setQuery] = useState("");//для поиска
    const [suggestions, setSuggestions] = useState([]);//для поиска
    const [selectedAddress, setSelectedAddress] = useState(""); // Состояние для выбранного адреса
    const [isAddressSelected, setIsAddressSelected] = useState(false); // Флаг, чтобы избежать лишних запросов

    const { 
        step, 
        setStep,
        setStart,
    } = useFormCreateRoutes();

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
            .get(`https://geocode-maps.yandex.ru/1.x/?apikey=${process.env.NEXT_PUBLIC_YANDEX_API_KEY}&geocode=Россия+${encodeURIComponent(query)}&format=json`)
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


    return(
        <>
            <div>
                <h1 className="text-[17px] font-light text-black">
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
        </>
    )
}