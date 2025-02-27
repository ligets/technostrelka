'use client';
import { useEffect, useRef, useCallback, useState } from "react";
import { useFormCreateRoutes } from "@/store/formCreateRoutes";

const YandexMap = ({ center = [55.751244, 37.618423], zoom = 17 }) => {
  const mapRef = useRef(null);
  const mapInstance = useRef(null);
  const routeRef = useRef(null);
  const markersRef = useRef({});
  const [routeDistance, setRouteDistance] = useState(null); // Храним расстояние маршрута

  const { points, setPoints, addPoint, updatePoint, removePoint } = useFormCreateRoutes();

  const updateRoute = useCallback(() => {
    if (!mapInstance.current || points.length < 2) return;

    if (!window.ymaps || !window.ymaps.multiRouter) {
      console.error("Yandex Maps multiRouter API не загружен.");
      return;
    }

    if (routeRef.current) {
      mapInstance.current.geoObjects.remove(routeRef.current);
    }

    try {
      routeRef.current = new window.ymaps.multiRouter.MultiRoute(
          {
            referencePoints: points.map((p) => p.coords),
            params: { routingMode: "auto" },
          },
          {
            wayPointVisible: false,
            boundsAutoApply: true,
            routeActiveStrokeColor: "#FF0000",
            routeActiveStrokeWidth: 6,
            routeStrokeStyle: "solid",
          }
      );

      routeRef.current.model.events.add("requestsuccess", () => {
        if (routeRef.current) {
          const activeRoute = routeRef.current.getActiveRoute();
          if (activeRoute) {
            const distance = activeRoute.properties.get("distance").value;
            setRouteDistance(distance); // Устанавливаем протяжённость маршрута
          }
        }
      });

      mapInstance.current.geoObjects.add(routeRef.current);
    } catch (error) {
      console.error("Ошибка при создании маршрута:", error);
    }
  }, [points]);

  useEffect(() => {
    updateRoute();
  }, [points, updateRoute]);

  useEffect(() => {
    const loadYandexMaps = () => {
      if (!document.getElementById("yandex-maps-script")) {
        const script = document.createElement("script");
        script.src = `https://api-maps.yandex.ru/2.1/?lang=ru_RU&apikey=${process.env.NEXT_PUBLIC_YANDEX_API_KEY}&load=package.full`;
        script.type = "text/javascript";
        script.id = "yandex-maps-script";
        script.onload = () => {
          if (window.ymaps) window.ymaps.ready(initMap);
        };
        script.onerror = () => {
          console.error("Ошибка загрузки Яндекс.Карт");
        };
        document.body.appendChild(script);
      } else if (window.ymaps) {
        window.ymaps.ready(initMap);
      }
    };

    const initMap = () => {
      if (mapRef.current && !mapInstance.current) {
        mapInstance.current = new window.ymaps.Map(mapRef.current, {
          center,
          zoom,
          controls: ["zoomControl", "fullscreenControl"],
        });

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
      }
    };
  }, [center, zoom]);

  return (
      <div className="w-[100%] h-[100%] relative">
        <div ref={mapRef} className="w-full h-full" />
        {routeDistance !== null && (
            <div className="absolute bottom-2 left-2 bg-white p-2 rounded shadow-md">
              Протяжённость маршрута: {(routeDistance / 1000).toFixed(2)} км
            </div>
        )}
      </div>
  );
};

export default YandexMap;
