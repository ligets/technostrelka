'use client';
import { useEffect, useRef, useCallback } from "react";
import { useFormCreateRoutes } from "@/store/formCreateRoutes";

const YandexMap = ({ center = [55.751244, 37.618423], zoom = 17 }) => {
  const mapRef = useRef(null);
  const mapInstance = useRef(null);
  const routeRef = useRef(null);
  const markersRef = useRef({});

  const { points, setPoints, addPoint, updatePoint, removePoint } = useFormCreateRoutes();

  // Функция для обновления маршрута
  const updateRoute = useCallback(() => {
    if (!mapInstance.current || points.length < 2) return;

    // Проверяем, что ymaps и multiRouter загружены
    if (!window.ymaps || !window.ymaps.multiRouter) {
      console.error("Yandex Maps multiRouter API не загружен.");
      return;
    }

    // Удаляем старый маршрут, если он существует
    if (routeRef.current) {
      mapInstance.current.geoObjects.remove(routeRef.current);
    }

    // Создаем новый маршрут
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

      // Обработка успешного построения маршрута
      routeRef.current.model.events.add("requestsuccess", () => {
        if (!routeRef.current || !routeRef.current.getRoutes) return;
        const routes = routeRef.current.getRoutes();
        if (Array.isArray(routes)) {
          routes.forEach((route) => {
            route.options.set({ balloonLayout: null });
          });
        }
      });

      // Добавляем маршрут на карту
      mapInstance.current.geoObjects.add(routeRef.current);
    } catch (error) {
      console.error("Ошибка при создании маршрута:", error);
    }
  }, [points]);

  // Обновляем маршрут при изменении точек
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

  const addMarker = useCallback(
    (coords) => {
      if (!mapInstance.current) return;

      const id = Date.now().toString();
      const placemark = new window.ymaps.Placemark(
        coords,
        {
          hintContent: "Новая точка",
          balloonContentHeader: "Введите название точки",
          balloonContentBody: `
            <input id="point-name-${id}" type="text" placeholder="Название" style="width: 100%; padding: 5px;"/>
            <button id="save-point-${id}" style="width: 100%; padding: 5px; background-color: blue; color: white; border: none; cursor: pointer; margin-top: 5px;">Сохранить</button>
            <button id="delete-point-${id}" style="width: 100%; padding: 5px; background-color: red; color: white; border: none; cursor: pointer; margin-top: 5px;">Удалить</button>
          `,
        },
        {
          draggable: true,
          preset: "islands#redDotIcon",
        }
      );

      placemark.events.add("dragend", (e) => {
        const newCoords = e.get("target").geometry.getCoordinates();
        updatePoint(id, { coords: newCoords });
      });

      placemark.events.add("balloonopen", () => {
        setTimeout(() => {
          const saveBtn = document.getElementById(`save-point-${id}`);
          const deleteBtn = document.getElementById(`delete-point-${id}`);

          if (saveBtn) {
            saveBtn.addEventListener("click", () => {
              const nameInput = document.getElementById(`point-name-${id}`);
              const name = nameInput ? nameInput.value : "Без названия";
              
              updatePoint(id, { name });
              
              placemark.properties.set({
                hintContent: name,
                balloonContentHeader: name,
              });
          
              placemark.balloon.close();
            });
          }

          if (deleteBtn) {
            deleteBtn.addEventListener("click", () => {
              removePoint(id);
              removePointFromMap(id);
            });
          }
        }, 500);
      });

      mapInstance.current.geoObjects.add(placemark);
      markersRef.current[id] = placemark;
      addPoint({ id, coords });
    },
    [addPoint, updatePoint, removePoint]
  );

  const removePointFromMap = (id) => {
    if (markersRef.current[id] && mapInstance.current) {
      mapInstance.current.geoObjects.remove(markersRef.current[id]);
      delete markersRef.current[id];
    }
  };

  useEffect(() => {
    Object.keys(markersRef.current).forEach((id) => {
      if (!points.find((point) => point.id === id)) {
        removePointFromMap(id);
      }
    });
  }, [points]);

  return (
    <div className="w-[100%] h-[100%] relative">
      <div ref={mapRef} className="w-full h-full" />
    </div>
  );
};

export default YandexMap;