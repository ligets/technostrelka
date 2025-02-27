import YandexMap from "./YandexMapRedactor"
import { useFormCreateRoutes } from "@/store/formCreateRoutes"
import Image from "next/image";

export default function ListAndMap(){
    const  { step, 
        start,
        points,
        setStep,
        removePoint,
     } = useFormCreateRoutes();
    return(
        <>
            <YandexMap center={start} />

            {/* СПИСОК ТОЧЕК */}
            <div className="flex flex-col gap-[0.5em] mt-4">
            <h1 className="text-[#8D8D8D] font-semibold text-16px">Ориентиры</h1>
            <div className="flex flex-col w-[100%] gap-[1em]">
                {points.map((point, index) => (
                <div key={point.id} className="flex flex-row justify-between w-[100%]">
                    <div className="flex flex-row items-center gap-[2em]">
                    <h1 className="text-[#000] font-semibold text-16px">{index + 1}.</h1>
                    <h1 className="text-[#000] font-semibold text-16px">{point.name || `Точка ${index + 1}`}</h1>
                    </div>

                    {/* Убираем иконку редактирования */}
                    <button onClick={() => removePoint(point.id)}>
                    <Image src="/otmena.svg" alt="Удалить" width={17} height={16} />
                    </button>
                </div>
                ))}
            </div>
            </div>

            <button
            className={`rounded-[10px] mt-[10px] py-[0.5em] px-[2em] text-white text-[15px] font-light border-[1px] transition-all duration-300 
                        ${points.length >= 3 ? "bg-[#6874f9] border-[#6874f9] hover:bg-transparent hover:text-blue-600" : "bg-gray-400 border-gray-400 cursor-not-allowed"}`}
            onClick={() => setStep(step + 1)}
            disabled={points.length < 3} // Блокируем кнопку, если меньше 3 точек
            >
            Дальше
            </button>
                    
        </>
       
    )
}