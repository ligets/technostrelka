'use client'

import Image from "next/image";
import {useState} from "react";


export default function Admin() {
    // const [status, setStatus] = useState("");
    // const statusTrue = () => {
    //     setStatus(true);
    // }
    // const statusFalse = () => {
    //     setStatus(false);
    // }

    return (
        <div className="flex flex-col w-[92%] h-[94%]">
            <h1 className="text-[#000] text-[25px] font-bold">Админ панель</h1>
            <div className="flex flex-row gap-[10%] py-8">
                <div className="flex flex-col gap-5">
                    <Image src="/admin-prof.png" alt="" width={207} height={207} className=""/>
                </div>
                <div className="flex flex-col gap-9 w-[50%]">
                    <div className="flex flex-col gap-7 w-[100%]">
                        <div className="flex flex-row justify-between">
                            <h1 className="text-[#000] text-[16px] font-bold">Кавказские горы - пешая тропа </h1>
                            <div className="flex flex-row gap-[1em]">
                                <a className="text-[#6874f9] font-light" href="">Редактировать</a>
                                <a className="text-[#6874f9] font-light"  href="">На карте</a>
                            </div>
                        </div>
                        <div className="flex flex-row justify-between items-center">
                            <div className="flex flex-row justify-between gap-[3em]">
                                <div className="flex flex-col gap-[0.5em] items-start">
                                    <p className="text-[#000] font-light text-[15px]">Расстояние</p>
                                    <h1 className="text-[#000] font-bold text-[17px]">10,72 км</h1>
                                </div>
                                <div className="flex flex-col gap-[0.5em] items-start">
                                    <p className="text-[#000] font-light text-[15px]">Высота</p>
                                    <h1 className="text-[#000] font-bold text-[17px]">300 м</h1>
                                </div>
                                <div className="flex flex-col gap-[0.5em] items-start">
                                    <p className="text-[#000] font-light text-[15px]">Рейтинг</p>
                                    <div className="flex justify-between flex-row items-center">
                                        <Image src="/Star.png" alt="" width={25} height={25}/>
                                        <h1 className="text-[#000] font-bold text-[17px]">4.5</h1>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className="flex flex-row gap-[0.5em] items-center">
                                    {/* {status 
                                    ?   <>
                                            <h1>Опубликован</h1>
                                            <button className="flex flex-row-reverse gap-[0.5em] items-center font-light text-[16px] text-[#000] border-[4px] px-3 py-1 rounded-[10px]">
                                                Отменить
                                            </button>
                                        </>
                                    :   <>
                                            <h1>Не опубликован</h1>
                                            <button className="flex flex-row-reverse gap-[0.5em] items-center font-light text-[16px] text-[#000] border-[4px] px-3 py-1 rounded-[10px]">
                                                Опубликовать
                                            </button>
                                        </>
                                    
                                    }
                                    {status === ""
                                    ?   <>  
                                            <button className="flex flex-row-reverse gap-[0.5em] items-center font-light text-[16px] text-[#000] border-[4px] px-3 py-1 rounded-[10px]">
                                                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M2 7L6.93103 12L13 2" stroke="#49D84E" stroke-width="3" stroke-linecap="round" />
                                                </svg>
                                                Разрешить
                                            </button>
                                            <button className="flex flex-row-reverse gap-[0.5em] items-center font-light text-[16px] text-[#000] border-[4px] px-3 py-1 rounded-[10px]">
                                                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M2 12L12 2M12 12L2 2" stroke="#E53B3B" stroke-width="3" stroke-linecap="round" />
                                                </svg>
                                                Запретить
                                            </button>
                                        </>

                                    :   status  <>
                                            <button className="flex flex-row-reverse gap-[0.5em] items-center font-light text-[16px] text-[#000] border-[4px] px-3 py-1 rounded-[10px]">
                                                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M2 7L6.93103 12L13 2" stroke="#49D84E" stroke-width="3" stroke-linecap="round" />
                                                </svg>
                                                Разрешить
                                            </button>
                                        </>
                                    } */}
                                   
                                </div>
                            </div>
                        </div>
                        <div className="w-[100%] h-[150px] relative">
                            <Image src ="/lk_path.png" alt="" layout="fill" objectFit="cover"/>
                        </div>
                        <div className="border-dashed border border-[#6874f9] w-[100%]"></div>
                    </div>
                </div>
            </div>
        </div>
    );
}