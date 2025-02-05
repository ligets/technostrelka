'use client';
import { useEffect, useRef } from "react";

const YandexMap = ({ center = [55.751244, 37.618423], zoom = 10, routes = [] }) => {
  const mapRef = useRef(null);
  const mapInstance = useRef(null);

  useEffect(() => {
    const loadYandexMaps = () => {
      if (!document.getElementById("yandex-maps-script")) {
        const script = document.createElement("script");
        script.src = `https://api-maps.yandex.ru/2.1/?lang=ru_RU&apikey=fee3278a-7b07-4bf9-a6e3-dcf1b7c93bdb`;
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

        // Создание маршрута
        const multiRoute = new window.ymaps.multiRouter.MultiRoute(
          {
            referencePoints: [
              [55.751244, 37.618423], 
              [55.7485, 37.605],      
              [55.742, 37.590],       
            ],
            params: {
              routingMode: "auto",    // auto, pedestrian, masstransit
              avoidTrafficJams: true, 
            },
          },
          {
            boundsAutoApply: true,
            routeActiveStrokeColor: "#FF0000",
            routeActiveStrokeWidth: 6,
          }
        );

        // Обработка ошибок маршрута
        multiRoute.events.add("requestfail", function (event) {
          console.error("Ошибка при загрузке маршрута:", event);
        });

        mapInstance.current.geoObjects.add(multiRoute);
      }
    };

    loadYandexMaps();

    return () => {
      if (mapInstance.current) {
        mapInstance.current.destroy();
        mapInstance.current = null;
      }
    };
  }, [center, zoom, routes]);

  return (
    <div className="w-[65%] h-[100%]">
      <div ref={mapRef} className="w-full h-full" />
    </div>
  );
};

export default YandexMap;