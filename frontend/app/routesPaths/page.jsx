import YandexMap from "@/components/Map/YandexMapRoutesPaths";
import { DnaIcon } from "lucide-react";
import Image from "next/image";

export default function RoutesPaths() {
    // просто некий набор точек хз как с бека будут приходить пути,потом переделаем если что 
    const routes = [
        {
          points: [
            [55.751244, 37.618423], // Москва
            [55.7601, 37.6188],     // Привал
            [55.7702, 37.6204],     // Конечная точка
          ],
          transportType: "auto",
        },
        {
          points: [
            [55.751244, 37.618423], // Москва
            [55.7485, 37.605],      // Пешком до точки
            [55.742, 37.590],       // Конечная точка
          ],
          transportType: "pedestrian",
        },
      ];
      
      
    return (
        <div className="absolute top-[80px] left-0 flex w-[100%]  h-[100%]">
            <div className="flex flex-col gap-[1em] w-[35%] h-[100%] bg-[#F4F4F4] p-6 ">


                <h1 className="text-[#000] text-[25px] font-bold">64634 маршрутов</h1>
                <div className="bg-[#D9D9D9] w-[100%] h-[2px] " ></div>

                
                {/* Кастомные селекты */}
                <div className="flex gap-[1em] ">
                    <div className="flex items-center border-[#8D8D8D] border-[1px] p-[0.6em] gap-[0.5em] rounded-[10px]" >
                        <h1 className="text-[#8D8D8D] text-[14px] font-light">Походы</h1>
                        <div className="border-b-2 border-[#8D8D8D] border-l-2 w-[6px] h-[6px] transform rotate-[-45deg]"></div>
                    </div>
                    <div className="flex items-center border-[#8D8D8D] border-[1px] p-[0.6em] gap-[0.5em] rounded-[10px]" >
                        <h1 className="text-[#8D8D8D] text-[14px] font-light">Расстояние</h1>
                        <div className="border-b-2 border-[#8D8D8D] border-l-2 w-[6px] h-[6px] transform rotate-[-45deg]"></div>
                    </div>
                    <div className="flex items-center border-[#8D8D8D] border-[1px] p-[0.6em] gap-[0.5em] rounded-[10px]" >
                        <h1 className="text-[#8D8D8D] text-[14px] font-light">Походы</h1>
                        <div className="border-b-2 border-[#8D8D8D] border-l-2 w-[6px] h-[6px] transform rotate-[-45deg]"></div>
                    </div>
                </div>

                {/* Маршруты карточки */}
                <div className="w-[100%] bg-[#FFFFFF]  rounded-[30px] flex flex-row ">
                    <div className="flex flex-col gap-[1em] p-[2em]">
                        <div className="flex flex-col gap-[0.5em]">
                            <div className="flex gap-[1em] items-center">
                                <h1 className="text-[#000] text-[11px] font-Light">Пеший туризм</h1>
                                <a className="text-[#000] text-[11px] font-Light" href="">Сохранить маршрут</a>
                                <a className="text-[#000] text-[11px] font-Light" href="">Показать на карте</a>
                            </div>
                            <h1 className="text-[#000] text-[16px] font-semibold">Кавказские горы - пешая тропа </h1>
                        </div>
                        <div>
                            <div className="flex flex-row justify-between gap-[3em]">
                                <div className="flex flex-col gap-[0.5em] items-start">
                                    <p className="text-[#000] font-light text-[13px]">Расстояние</p>
                                    <h1 className="text-[#000] font-bold text-[14px]">10,72 км</h1>
                                </div>
                                <div className="flex flex-col gap-[0.5em] items-start">
                                    <p className="text-[#000] font-light text-[13px]">Высота</p>
                                    <h1 className="text-[#000] font-bold text-[14px]">300 м</h1>
                                </div>
                                <div className="flex flex-col gap-[0.5em] items-start">
                                    <p className="text-[#000] font-light text-[13px]">Рейтинг</p>
                                    <div className="flex justify-between flex-row items-center">
                                        <Image src="/Star.png" alt="" width={13} height={13}/>
                                        <h1 className="text-[#000] font-bold text-[14px]">4.5</h1>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <img src="/lk_path.png" alt="" className="w-[30%] h-[100%] rounded-r-[30px] rounded-l-none"/>
                </div>

                </div>

            {/* Карта -2 часа моей жизни ((( */}
            <YandexMap center={[55.751244, 37.618423]} zoom={10} routes={routes} />
        </div>
            
    );
}