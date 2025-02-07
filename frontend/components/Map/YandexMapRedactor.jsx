'use client';
import { useEffect, useRef, useState, useCallback } from "react";
import { useFormCreateRoutes } from "@/store/formCreateRoutes";

const YandexMap = ({ center = [], zoom = 15 }) => {
  const mapRef = useRef(null);
  const mapInstance = useRef(null);
  const markersRef = useRef([]);
  const routeRef = useRef(null);

  const {
    points,
    setPoints,
    addPoint
  } = useFormCreateRoutes();








  
  useEffect(() => {
    const loadYandexMaps = () => {
      if (!document.getElementById("yandex-maps-script")) {
        const script = document.createElement("script");
        script.src = 'https://api-maps.yandex.ru/2.1/?lang=ru_RU&apikey=992fe970-e498-4df8-a05f-800422eb064d';
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
    markersRef.current.push(coords);

    updateRoute();

    addPoint(
      { coords, namePoints: "Метка" }
    );

  }, [setPoints]);

  // Отслеживание изменений в points
  useEffect(() => {
    console.log("points", points);
  }, [points]);

  const updateRoute = useCallback(() => {
    if (!mapInstance.current || markersRef.current.length < 2) return;

    if (routeRef.current) {
      mapInstance.current.geoObjects.remove(routeRef.current);
    }

    routeRef.current = new window.ymaps.multiRouter.MultiRoute(
      {
        referencePoints: markersRef.current,
        params: { routingMode: "auto" },
      },
      {
        wayPointVisible: false,
        boundsAutoApply: true,
        routeActiveStrokeColor: "#FF0000",
        routeActiveStrokeWidth: 6,
      }
    );

    mapInstance.current.geoObjects.add(routeRef.current);
  }, []);

  const clearMarkers = useCallback(() => {
    if (!mapInstance.current) return;

    mapInstance.current.geoObjects.removeAll();
    markersRef.current = [];

    if (routeRef.current) {
      routeRef.current = null;
    }
  }, []);

  return (
    <div className="w-[100%] h-[100%] relative">
      <div ref={mapRef} className="w-full h-full" />
      {markersRef.current.length > 0 && (
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
