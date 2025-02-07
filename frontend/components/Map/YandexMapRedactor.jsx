'use client';
import { useEffect, useRef, useState } from "react";

const YandexMap = ({ center = [55.751244, 37.618423], zoom = 10 }) => {
  const mapRef = useRef(null);
  const mapInstance = useRef(null);
  const markersRef = useRef([]); // Храним массив маркеров
  const [markers, setMarkers] = useState([]); // Для кнопки "Очистить маркеры"

  useEffect(() => {
    const loadYandexMaps = () => {
      if (!document.getElementById("yandex-maps-script")) {
        const script = document.createElement("script");
        script.src = `https://api-maps.yandex.ru/2.1/?lang=ru_RU&apikey=YOUR_API_KEY`;
        script.type = "text/javascript";
        script.id = "yandex-maps-script";
        script.onload = () => window.ymaps.ready(initMap);
        document.body.appendChild(script);
      } else if (window.ymaps) {
        window.ymaps.ready(initMap);
      }
    };

    const initMap = () => {
      if (mapRef.current) {
        if (mapInstance.current) {
          mapInstance.current.destroy();
        }

        mapInstance.current = new window.ymaps.Map(mapRef.current, {
          center,
          zoom,
          controls: ["zoomControl", "fullscreenControl"],
        });

        // Добавляем обработчик кликов по карте
        mapInstance.current.events.add("click", (e) => {
          const coords = e.get("coords");
          addMarker(coords);
        });
      }
    };

    loadYandexMaps();

    return () => {
      if (mapInstance.current) {
        mapInstance.current.destroy();
        mapInstance.current = null;
        markersRef.current = [];
        setMarkers([]);
      }
    };
  }, [center, zoom]);

  // Функция для добавления маркера
  const addMarker = (coords) => {
    if (!mapInstance.current) return;

    const marker = new window.ymaps.Placemark(
      coords,
      { hintContent: "Метка", balloonContent: `Координаты: ${coords.join(", ")}` },
      { preset: "islands#redIcon" }
    );

    mapInstance.current.geoObjects.add(marker);
    markersRef.current.push(marker);
    setMarkers([...markersRef.current]); // Обновляем состояние
  };

  // Очистка всех маркеров
  const clearMarkers = () => {
    markersRef.current.forEach((marker) => {
      mapInstance.current.geoObjects.remove(marker);
    });
    markersRef.current = [];
    setMarkers([]);
  };

  return (
    <div className="w-[65%] h-[100%] relative">
      <div ref={mapRef} className="w-full h-full" />
      {markers.length > 0 && (
        <button
          onClick={clearMarkers}
          className="absolute top-2 right-2 bg-red-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-600"
        >
          Очистить маркеры
        </button>
      )}
    </div>
  );
};

export default YandexMap;
