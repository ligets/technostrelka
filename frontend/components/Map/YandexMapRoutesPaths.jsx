'use client';
import { useEffect, useRef } from "react";
import process from "next/dist/build/webpack/loaders/resolve-url-loader/lib/postcss";

const YandexMap = ({ center = [55.751244, 37.618423], zoom = 10, routes }) => {
  const mapRef = useRef(null);
  const mapInstance = useRef(null);

  useEffect(() => {
    // Загружаем Яндекс.Карты только если они не были загружены ранее
    const loadYandexMaps = () => {
      if (!document.getElementById("yandex-maps-script")) {
        const script = document.createElement("script");
        script.src = 'https://api-maps.yandex.ru/2.1/?lang=ru_RU&apikey=' + process.env.NEXT_PUBLIC_YANDEX_API_KEY;
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
        try {
          console.log("ЕБЕН", routes);
        
          // Если routes — это массив объектов с точками, нам нужно их привести к нужному формату
          const formattedRoutes = routes.flatMap(route => 
            route.map(point => [point.coord_y, point.coord_x])  // Преобразуем каждую точку в [широта, долгота]
          );
        
          // Создаем MultiRoute с подготовленными данными
          const multiRoute = new window.ymaps.multiRouter.MultiRoute({
            referencePoints: routes,  // Передаем массив точек
            params: {
              routingMode: 'auto', // Выбираем автоматический режим маршрута
            }
          });
        
          console.log("ggggggggggggggg", formattedRoutes);
        
          // Обработка ошибок маршрута
          multiRoute.events.add("requestfail", function (event) {
            console.error("Ошибка при загрузке маршрута:", event);
          });
        
          // Добавляем маршрут на карту
          mapInstance.current.geoObjects.add(multiRoute);
        } catch (error) {
          console.error("Ошибка при обработке маршрута:", error);
        }
       
      }
    };

    loadYandexMaps();

    return () => {
      if (mapInstance.current) {
        mapInstance.current.destroy();
        mapInstance.current = null;
      }
    };
  }, [center, zoom, routes]); // Зависимости: центр, зум и маршруты

  return (
    <div className="w-[65%] h-[100%]">
      <div ref={mapRef} className="w-full h-full" />
    </div>
  );
};

export default YandexMap;
