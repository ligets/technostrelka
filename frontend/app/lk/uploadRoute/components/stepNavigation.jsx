import { useFormCreateRoutes } from "@/store/formCreateRoutes";

export default function StepNavigation() {
    const { step, setStep, start, points, descriptions, routeInfo } = useFormCreateRoutes();
    const maxSteps = 4;

    // Проверка перед переходом на следующий шаг
    const canGoNext = () => {
        if (step === 1) return start.length > 0; // Шаг 1: Должна быть начальная точка
        if (step === 2) return points.length >= 3; // Шаг 2: Должно быть минимум 3 точки
        if (step === 3) {
            // Шаг 3: Все поля в routeInfo должны быть заполнены
            return (
                routeInfo.title.trim() !== "" &&
                routeInfo.description.trim() !== "" &&
                routeInfo.isPublic !== null &&
                routeInfo.type.trim() !== "" &&
                routeInfo.media.length > 0
            );
        }
        if (step === 4) return points.every(p => descriptions[p.id]?.name.trim() !== "" && descriptions[p.id]?.photo); // Шаг 4: У всех точек должно быть имя и фото
        return true;
    };

    // Проверка перед возвратом на предыдущий шаг
    const canGoBack = () => {
        if (step === 2) return start.length > 0; // Можно вернуться на 1 шаг, если есть старт
        if (step === 3) return points.length >= 3; // Можно вернуться на 2 шаг, если есть 3 точки
        if (step === 4) return routeInfo.title.trim() !== "" && routeInfo.description.trim() !== ""; // Можно вернуться на 3 шаг, если заполнен routeInfo
        return true;
    };

    return (
        <>
            {
                step == 5 

                    ?   <div className="flex flex-col items-start gap-4 w-full">
                            <h1 className="font-semibold text-[20px] text-black">Маршрут успешно создан!</h1>
                        </div>
                        
                    :   <div className="flex flex-col items-center gap-4 w-full">
                            <span className="text-[#000] text-[20px] font-semibold px-2">
                                Шаг {step}/{maxSteps} - Нанесение маршрута
                            </span>

                            <div className="flex gap-4 w-[100%] justify-center">
                                {/* Кнопка "Назад" */}
                                <button
                                    className={`px-4 py-2 rounded-lg transition duration-200 ${
                                        canGoBack()
                                            ? "bg-[#6874f9] text-white border-[1px] border-[#6874f9] hover:bg-transparent hover:text-blue-600 transition-all duration-300"
                                            : "bg-gray-200 text-gray-400 cursor-not-allowed"
                                    }`}
                                    onClick={() => setStep(step - 1)}
                                    disabled={!canGoBack() || step === 1}
                                >
                                    Назад
                                </button>

                                {/* Прогресс-бар */}
                                <div className="relative w-full max-w-md flex items-center">
                                    <div className="w-full h-2 bg-gray-300 rounded-full relative overflow-hidden">
                                        <div
                                            className="absolute top-0 left-0 h-full bg-[#6874f9] transition-all duration-500"
                                            style={{ width: `${(step - 1) / (maxSteps - 1) * 100}%` }}
                                        />
                                    </div>

                                    {/* Метки шагов */}
                                    <div className="absolute top-1/2 left-0 w-full flex justify-between transform -translate-y-1/2">
                                        {Array.from({ length: maxSteps }).map((_, index) => (
                                            <div
                                                key={index}
                                                className={`w-4 h-4 rounded-full transition-all duration-300 ${
                                                    step > index ? "bg-[#6874f9] scale-110 shadow-md" : "bg-gray-300"
                                                }`}
                                            />
                                        ))}
                                    </div>

                                    {/* Невидимый range для доступности */}
                                    <input
                                        type="range"
                                        min="1"
                                        max={maxSteps}
                                        value={step}
                                        className="absolute w-full opacity-0 cursor-pointer"
                                        readOnly
                                    />
                                </div>

                                {/* Кнопка "Далее" */}
                                <button
                                    className={`px-4 py-2 rounded-lg transition duration-200 ${
                                        canGoNext()
                                            ? "bg-[#6874f9] text-white border-[1px] border-[#6874f9] hover:bg-transparent hover:text-blue-600 transition-all duration-300"
                                            : "bg-gray-200 text-gray-400 cursor-not-allowed"
                                    }`}
                                    onClick={() => setStep(step + 1)}
                                    disabled={!canGoNext() || step === maxSteps}
                                >
                                    Далее
                                </button>
                            </div>
                        </div>
            }
            
        </>
    );
}
