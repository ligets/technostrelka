'use client';
import { useEffect, useRef, useCallback } from "react";
import { useFormCreateRoutes } from "@/store/formCreateRoutes";

const YandexMap = ({ center = [55.751244, 37.618423], zoom = 10 }) => {
  const mapRef = useRef(null);
  const mapInstance = useRef(null);
  const routeRef = useRef(null);

  const { points, setPoints, addPoint } = useFormCreateRoutes();

  useEffect(() => {
    const loadYandexMaps = () => {
      if (!document.getElementById("yandex-maps-script")) {
        const script = document.createElement("script");
        script.src = `https://api-maps.yandex.ru/2.1/?lang=ru_RU&apikey=${process.env.NEXT_PUBLIC_YANDEX_API_KEY}`;
        script.type = "text/javascript";
        script.id = "yandex-maps-script";
        script.onload = () => window.ymaps.ready(initMap);
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

  const addMarker = useCallback((coords) => {
    if (!mapInstance.current) return;

    const marker = new window.ymaps.Placemark(
        coords,
        { hintContent: "Метка", balloonContent: `Координаты: ${coords.join(", ")}` },
        { preset: "islands#redIcon" }
    );

    mapInstance.current.geoObjects.add(marker);
    addPoint({ coords, namePoints: "Метка" });

  }, [addPoint]);

  // Построение маршрута
  const updateRoute = useCallback(() => {
    if (!mapInstance.current || points.length < 2) return;

    if (routeRef.current) {
      mapInstance.current.geoObjects.remove(routeRef.current);
    }

    routeRef.current = new window.ymaps.multiRouter.MultiRoute(
        {
          referencePoints: [points[0].coords, ...points.slice(1).map(p => p.coords)],
          params: { routingMode: "auto" }, // Автомобильный маршрут
        },
        {
          wayPointVisible: true, // Показывать точки маршрута
          boundsAutoApply: true, // Авто-масштаб карты
          routeActiveStrokeColor: "#FF0000",
          routeActiveStrokeWidth: 6,
        }
    );

    mapInstance.current.geoObjects.add(routeRef.current);
  }, [points]);

  useEffect(() => {
    updateRoute();
  }, [points, updateRoute]);

  // Очистка маршрута и меток
  const clearMarkers = useCallback(() => {
    if (!mapInstance.current) return;

    mapInstance.current.geoObjects.removeAll();

    if (routeRef.current) {
      routeRef.current = null;
    }

    setPoints([]);
  }, [setPoints]);

  return (
      <div className="w-[100%] h-[100%] relative">
        <div ref={mapRef} className="w-full h-full" />
        {points.length > 0 && (
            <button
                onClick={clearMarkers}
                className="absolute top-2 right-2 bg-red-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-600"
            >
              Очистить метки
            </button>
        )}
      </div>
  );
};

export default YandexMap;
