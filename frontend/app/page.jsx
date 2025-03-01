import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="flex items-center justify-between  w-[92%] ">
      <div className="flex flex-col justify-between w-[40%]">
        <div className="pb-[2em]">
          <div className="w-[90%] pb-[1em]">
            <h1 className=" text-[#000] text-[80px] font-bold whitespace-pre-wrap">Туристические 
            маршруты по 
            России с</h1>
            <h1 className="text-[#6874f9] text-[80px] font-bold">GeoTouristicService</h1>
          </div>
          <p className="text-[#000] text-[32px] font-light">Прокладывай маршрут, изменяй приватность, делись с друзьями!</p>
        </div>
        <div className="pt-[1em] pb-[1em] flex items-center gap-[1em]">
          <Link
          className="rounded-[25px] py-[1em] px-[4em] bg-[#6874f9] text-white text-[15px] font-bold border-[1px] border-[#6874f9] hover:bg-transparent hover:text-blue-600 transition-all duration-300" 
          href="routesPaths"
          >Маршруты</Link>
          <Link 
          className="rounded-[25px] py-[1em] px-[4em] bg-[#6874f9] text-white text-[15px] font-bold border-[1px] border-[#6874f9] hover:bg-transparent hover:text-blue-600 transition-all duration-300"
          href="routesNear"
          >Маршруты рядом</Link>
        </div>
      </div>

        <div className="flex flex-col gap-[6em] w-[40%]">
          <div className="flex gap-x-8 w-full">
            <div className="flex flex-col gap-y-8 w-[60%]">
              <Image
                  src="/man1.png"
                  alt="upper_man"
                  width={370}
                  height={220}
                  className="w-full h-auto object-cover"
              />
              <Image
                  src="/man1_down.png"
                  alt="down_man"
                  width={370}
                  height={200}
                  className="w-full h-auto object-cover"
              />
            </div>

            <div className="w-[47%]">
              <Image
                  src="/man_right.png"
                  alt="right_man"
                  width={292}
                  height={461}
                  className="w-full h-full object-cover"
              />
            </div>
          </div>

        <div className="flex items-center justify-between rounded-[15px] p-[20px_17px]  shadow-[3px_4px_4px_2px_rgba(0,0,0,0.25)] bg-white">
          <div className="flex flex-col items-start justify-center">
            <h1 className="text-[#6874f9] text-[48px] font-bold">98%</h1>
            <p className="text-[#000] text-[15px] font-medium">Довольных клиентов</p>
          </div>

          <div className="flex flex-col items-start justify-center">
            <h1 className="text-[#6874f9] text-[48px] font-bold">10000</h1>
            <p className="text-[#000] text-[15px] font-medium">Часов маршрутов</p>
          </div>

          <div className="flex flex-col items-start justify-center">
            <h1 className="text-[#6874f9] text-[48px] font-bold">20</h1>
            <p className="text-[#000] text-[15px] font-medium">Разновидностей</p>
          </div>
        </div>
      </div>

      </div>
    </>
  );
}
