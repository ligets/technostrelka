import Image from "next/image";

export default function CartCopyRoutes() {
    return (
        <div className="flex flex-col gap-7">
            <div className="flex flex-row justify-between">
                <h1 className="text-[#000] text-[16px] font-bold">Кавказские горы - пешая тропа </h1>
                <div className="flex flex-row gap-[1em]">
                    <a className="text-[#6874f9] font-light"  href="">На карте</a>
                </div>
            </div>
            <div className="flex flex-row justify-between">
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

            </div>
            <div className="border-dashed border border-[#6874f9] w-[100%]"></div>
        </div> 
    );
}