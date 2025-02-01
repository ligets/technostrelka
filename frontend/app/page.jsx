import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center rounded-[22px]  h-[913px] shadow-[0_0_5px_1px_rgba(0,0,0,0.25)] bg-white">
      <div className="flex items-center justify-between  w-[92%] ">
      <div className="flex flex-col justify-between w-[40%]">
        <div className="pb-[2em]">
          <div className="w-[60%] pb-[1em]">
            <h1 className=" text-[#000] text-[42px] font-bold whitespace-pre-wrap">Туристические 
            маршруты по 
            России с</h1>
            <h1 className="text-[#4400BA] text-[45px] font-bold">GeoTouristicService</h1>
          </div>
          <p className="text-[#000] text-[18px] font-light">Прокладывай маршрут, изменяй приватность, делись с друзьями!</p>
        </div>
        <div className="pt-[1em] pb-[1em] flex items-center gap-[1em]">
          <a 
          className="rounded-[25px] py-[1em] px-[2em] bg-[#4400BA] text-white text-[15px] font-bold border-[1px] border-[#4400BA] hover:bg-transparent hover:text-indigo-800 transition-all duration-300" href=""
          >Маршруты</a>
          <a 
          className="rounded-[25px] py-[1em] px-[2em] bg-[#4400BA] text-white text-[15px] font-bold border-[1px] border-[#4400BA] hover:bg-transparent hover:text-indigo-800 transition-all duration-300" href=""
          >Маршруты рядом</a>
        </div>
      </div>

      <div className="flex flex-col gap-[6em] w-[40%]">
        <div className="flex justify-between">
          <div className="flex flex-col justify-between">
            <img src="" alt="" className=" w-[300px] h-[200px]"/>
            <img src="" alt="" className=" w-[300px] h-[200px]" />
          </div>
          <img src="" alt="" className="rounded-[36px] w-[242px] h-[461px]"/>
        </div>

        <div className="flex items-center justify-between rounded-[15px] p-[20px_17px] shadow-[0_4px_5px_2px_rgba(0,0,0,0.1)] bg-white">
          <div className="flex flex-col items-start justify-center">
            <h1 className="text-[#4400BA] text-[40px] font-bold">98%</h1>
            <p className="text-[#000] text-[15px] font-medium">Clients satisfied</p>
          </div>

          <div className="flex flex-col items-start justify-center">
            <h1 className="text-[#4400BA] text-[40px] font-bold">75</h1>
            <p className="text-[#000] text-[15px] font-medium">Clients satisfied</p>
          </div>

          <div className="flex flex-col items-start justify-center">
            <h1 className="text-[#4400BA] text-[40px] font-bold">104</h1>
            <p className="text-[#000] text-[15px] font-medium">Clients satisfied</p>
          </div>
        </div>
      </div>

      </div>
    </div>
  );
}
