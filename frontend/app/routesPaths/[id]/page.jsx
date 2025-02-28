"use client";
import axios from "axios";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import JSZip from "jszip";

const generateGPX = (points, routeTitle) => {
    const xmlHeader = `<?xml version="1.0" encoding="UTF-8" standalone="no" ?>
<gpx version="1.1" creator="Next.js App" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.topografix.com/GPX/1/1 http://www.topografix.com/GPX/1/1/gpx.xsd">
<trk>
    <name>${routeTitle}</name>
    <trkseg>`;

    const trackPoints = points.map(point => `
        <trkpt lat="${point.coord_x}" lon="${point.coord_y}">
            <name>${point.name}</name>
            <desc>${point.description}</desc>
        </trkpt>
    `).join('');

    const xmlFooter = `
    </trkseg>
</trk>
</gpx>`;

    return `${xmlHeader}${trackPoints}${xmlFooter}`;
};

const generateKML = (points, routeTitle) => {
    const xmlHeader = `<?xml version="1.0" encoding="UTF-8"?>
<kml xmlns="http://www.opengis.net/kml/2.2">
<Document>
    <Placemark>
        <name>${routeTitle}</name>
        <LineString>
            <tessellate>1</tessellate>
            <coordinates>`;

    const coordinates = points.map(point => `${point.coord_y},${point.coord_x}`).join(' ');

    const xmlFooter = `
            </coordinates>
        </LineString>
    </Placemark>
</Document>
</kml>`;

    return `${xmlHeader}${coordinates}${xmlFooter}`;
};

const downloadFile = (content, filename, type) => {
    const blob = new Blob([content], { type });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    window.URL.revokeObjectURL(url);
};

const convertKMLToKMZ = async (kmlContent, filename) => {
    const zip = new JSZip();
    zip.file('doc.kml', kmlContent);

    const content = await zip.generateAsync({ type: 'blob' });
    const url = window.URL.createObjectURL(content);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    window.URL.revokeObjectURL(url);
};

export default function routePath() {
    const [route, setRoute] = useState(null);
    const pathname = usePathname();
    const segments = pathname.split("/"); // Разбиваем URL по "/"
    const routeId = segments[segments.length - 1]; // Берем последний элемент

    useEffect(() => {
        if (routeId) {
            axios.get(`${process.env.NEXT_PUBLIC_BACKEND_HOST_ROUTES}${routeId}`)
                .then((response) => {
                    setRoute(response.data);
                    console.log("Данные маршрута:", response.data);
                })
                .catch(error => console.error("Ошибка загрузки маршрута:", error));
        }
    }, [routeId]); // Добавляем зависимость, чтобы запрос отправлялся при изменении routeId

    if (!route) return <div>Загрузка...</div>;

    const exportRoute = (format) => {
        if (!route || !route.points) {
            alert("Маршрут не выбран");
            return;
        }

        const points = route.points;

        let content = "";

        switch (format) {
            case 'gpx':
                content = generateGPX(points, route.title);
                downloadFile(content, `${route.title}.gpx`, 'application/gpx+xml');
                break;
            case 'kml':
                content = generateKML(points, route.title);
                downloadFile(content, `${route.title}.kml`, 'application/vnd.google-earth.kml+xml');
                break;
            case 'kmz':
                content = generateKML(points, route.title);
                convertKMLToKMZ(content, `${route.title}.kmz`);
                break;
            default:
                alert("Неизвестный формат");
        }
    };

    return (
        <div className="flex flex-row gap-[2em] w-[100%] justify-between">
            <div className="flex flex-col gap-[2em] w-[65%]">
                <div className="flex flex-col gap-[1em] w">
                    <div className="flex flex-row items-center gap-[4em]">
                        <h1 className="text-[#000] text-[25px] font-semibold"></h1>
                        <a className="text-[#6874f9] text-[16px] font-semibold" href="">{route.title}</a>
                        <div className="flex justify-between flex-row items-center">
                            <Image src="/Star.png" alt="" width={17} height={16} />
                            <h1 className="text-[#000] font-bold text-[17px]">{route.rating || 0}</h1>
                        </div>
                    </div>
                    <div className="flex flex-row gap-[1em]">
                        <button className="text-[#000] text-[16px] font-light border-[1px] border-[#6874f9] px-[1.5em] py-[0.5em] rounded-[5px]">Отзыв</button>
                        <button className="text-[#000] text-[16px] font-light border-[1px] border-[#6874f9] px-[1.5em] py-[0.5em] rounded-[5px]">Поделиться</button>
                        <button className="text-[#000] text-[16px] font-light border-[1px] border-[#6874f9] px-[1.5em] py-[0.5em] rounded-[5px]">Сохранить</button>
                    </div>
                </div>
                {/* ЗДЕСЬ ДОЛЖНА БЫТЬ КАРТА */}
                <img src="" alt="" className="w-[100%] h-[500px]" />
                <div className="flex flex-col gap-[1em]">
                    <h1 className="text-[#4e4e4e] text-[25px] font-semibold">Фото маршрута</h1>
                    <div className="relative flex flex-row justify-between w-[100%]" >
                        <div className="relative w-[50%] h-[500px]">
                            <Image 
                                src={`${process.env.NEXT_PUBLIC_BACKEND_HOST_ROUTES_MEDIA}${route.photos[0].photo_path}`} 
                                layout="fill" 
                                objectFit="cover" 
                                alt="Маршрутное фото"
                            />
                        </div>
                        <div className="flex flex-col justify-between w-[45%]" >
                            <div className="relative w-[100%] h-[240px]">
                                <Image 
                                    src={`${process.env.NEXT_PUBLIC_BACKEND_HOST_ROUTES_MEDIA}${route.photos[1].photo_path}`} 
                                    layout="fill" 
                                    objectFit="cover" 
                                    alt="Маршрутное фото"
                                />
                            </div>
                            <div className="relative w-[100%] h-[240px]">
                                <Image 
                                    src={`${process.env.NEXT_PUBLIC_BACKEND_HOST_ROUTES_MEDIA}${route.photos[2].photo_path}`} 
                                    layout="fill" 
                                    objectFit="cover" 
                                    alt="Маршрутное фото"
                                />
                            </div>
                        </div>
                        <a href="" onClick={(e) => {
                            e.preventDefault()
                            router.push(`${pathname}/slider`)

                        }} className="absolute bottom-5 right-5 border-2 border-white rounded-[10px] py-[1em] px-[1em]  bg-[rgba(217,217,217,0.5)]">Показать больше фото</a>
                    </div>
                </div>
                <div className="flex flex-col gap-[1em]">
                    <h1 className="text-[#4e4e4e] text-[25px] font-semibold">Описание маршрута</h1>
                    <p className="text-[25px] text-[#000] font-light">
                        {route.description}
                    </p>
                </div>
                <div className="flex flex-col gap-[1em]">
                    <h1 className="text-[#4e4e4e] text-[25px] font-semibold">Описание маршрута</h1>
                    <div className="flex flex-col items-center gap-[1em]">
                        {route.points.map((point,index) => (
                        <div key={index} className="w-[100%] border-[1px] border-[#8d8d8d]  rounded-[10px] ">
                            <div className="flex flex-row justify-between items-center p-[1em]">
                                <h1 className="text-[18px] font-extrabold text-[#000]">Маршрутная точка</h1>
                                <h1 className="text-[25px] font-extrabold text-[#000]">{point.name}</h1>
                            </div>
                            <div className="relative w-full h-[400px] rounded-b-[9px] overflow-hidden">
                                <Image 
                                    src={`${process.env.NEXT_PUBLIC_BACKEND_HOST_ROUTES_MEDIA}${point.photo}`} 
                                    layout="fill" 
                                    objectFit="cover" 
                                    alt="Маршрутное фото"
                                />
                            </div>
                        </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="flex flex-col gap-[1em]">
                <button className="rounded-[10px] py-[0.5em] px-[2em] bg-[#6874f9] text-white text-[18px] font-semibold border-[1px] border-[#6874f9] hover:bg-transparent hover:text-blue-600 transition-all duration-300">Отправить маршрут</button>
                <div className="w-[100%] border-[#6874f9] border-[2px] rounded-[10px] flex flex-col items-center gap-[1em] p-[1em]">
                    <h1 className="text-[#6874f9] text-[18px] font-semibold">Экспорт маршрута</h1>
                    <button
                        className="text-[#8d8d8d] text-[18px] font-light"
                        onClick={() => exportRoute('gpx')}
                    >
                        Экспорт в GPX
                    </button>
                    <button
                        className="text-[#8d8d8d] text-[18px] font-light"
                        onClick={() => exportRoute('kml')}
                    >
                        Экспорт в KML
                    </button>
                    <button
                        className="text-[#8d8d8d] text-[18px] font-light"
                        onClick={() => exportRoute('kmz')}
                    >
                        Экспорт в KMZ
                    </button>
                </div>
                <div className="flex flex-col gap-[1em]">
                    <h1 className="text-[#000] text-[18px] font-semibold">Автор маршрута</h1>
                    <div className="shadow-md bg-[#f1efef] rounded-[10px] flex flex-col items-start gap-[1em] p-[1em]">
                        <div className="flex flex-row items-center gap-[1em]">
                            <div className="rounded-full fill-current bg-[#000] h-[60px] w-[60px]"></div>
                            <h1 className="text-[#000] text-[16px] font-semibold">User</h1>
                        </div>
                        <div className="flex flex-row gap-[1em]">
                            <div className="flex justify-between flex-row items-center">
                                <Image src="/Star.png" alt="" width={17} height={16} />
                                <h1 className="text-[#000] font-bold text-[16px]">4.5</h1>
                            </div>
                            <h1 className="text-[#000] text-[16px] font-semibold">15 маршрутов</h1>
                        </div>
                        <div className="border-[1px] border-[#d9d9d9] w-[100%]"></div>
                        <a className="text-[#8d8d8d] text-[14px] font-light" href="">Другие маршруты этого автора</a>
                    </div>
                    <div className="flex flex-col items-start gap-[1em]">
                        <h1 className="text-[#000] text-[18px] font-semibold">Статистика маршрута</h1>
                        <div className="flex flex-col items-start gap-[1em]">
                            <div className="flex flex-col items-start gap-[0.1em]">
                                <h1 className="text-[#696868] text-[14px] font-light">Расстояние</h1>
                                <p className="text-[#000] text-[14px] font-light">{route.distance} км</p>
                            </div>
                            <div className="flex flex-col items-start gap-[0.1em]">
                                <h1 className="text-[#696868] text-[14px] font-light">Тип маршрута</h1>
                                <p className="text-[#000] text-[14px] font-light">{route.type}</p>
                            </div>
                            <div className="flex flex-col items-start gap-[0.1em]">
                                <h1 className="text-[#696868] text-[14px] font-light">Загруженно</h1>
                                <p className="text-[#000] text-[14px] font-light">10.72 км</p>
                            </div>
                        </div>
                    </div>
                    <div className="border-[1px] border-[#d9d9d9]"></div>
                    <div className="flex flex-col gap-[1em]">
                        <h1 className="text-[#000] text-[18px] font-semibold">Рейтинг и комментарии</h1>
                        <div className="flex flex-row gap-[1em]">
                            <div className="flex justify-between flex-row items-center">
                                <Image src="/Star.png" alt="" width={17} height={16} />
                                <h1 className="text-[#000] font-bold text-[17px]">4.5</h1>
                            </div>
                            <div className="w-[1px] bg-[#000]"></div>
                            <h1 className="text-[#000] font-light text-[14px]">2 комментария</h1>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}