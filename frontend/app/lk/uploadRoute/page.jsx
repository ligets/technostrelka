'use client'
import { useFormCreateRoutes  } from "@/store/formCreateRoutes";

import DescriptionRoute from "@/app/lk/uploadRoute/components/step3/main_descrition_route";
import ListAndModel from "./components/step4/listAndModel";
import ListAndMap from "./components/step2/listAndMap";
import SearchAdress from "./components/step1/searchAdress";
import StepNavigation from "./components/stepNavigation";

export default function uploadRoute() {

    const  { step } = useFormCreateRoutes();

    return (
        <>  
            <div className="flex flex-col items-start gap-4 w-[100%]">
                <span className="text-[#000] text-[20px] font-semibold px-2">
                    Свой маршрут
                </span>
                <div className="border-dashed border border-[#6874f9] w-[100%]"></div>
            </div>
                        <div className="flex flex-col gap-[1em] w-[100%]  border-[#8d8d8d] border-2 rounded-[10px] p-5">
                            <div className="flex flex-col items-start gap-4 w-[100%]">
                                <StepNavigation/>
                                <div className="border-dashed border border-[#6874f9] w-[100%]"></div>
                            </div>

                            {/* ШАГ 1 */}
                            {
                                step === 1 && (
                                    
                                    <div className="flex flex-col gap-[1em] w-[100%]">
                                        <SearchAdress/>
                                    </div>
                                )
                            }                
                            {/* ШАГ 2 */}
                            {
                                step === 2 && (
                                    <div className="flex w-[100%] h-96 flex-col relative">
                                        <ListAndMap/>
                                    </div>
                                )
                            }                                                       
                            {/* ШАГ 3 */}
                            {
                                step === 3 && (
                                    <div className="flex w-[100%]">
                                        <DescriptionRoute/>
                                    </div>
                                )
                            }
                            {/* ШАГ 4 */}                           
                            {
                                step === 4 && (
                                    <div className="w-100%">
                                        <ListAndModel/>
                                    </div>
                                )
                            }
                            
            </div>
        </>
    );
}