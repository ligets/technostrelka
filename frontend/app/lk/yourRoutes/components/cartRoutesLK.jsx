import Image from "next/image";
import process from "next/dist/build/webpack/loaders/resolve-url-loader/lib/postcss";

export default function NoneRoutesLK({ routes, onEditRoute }) {
    return (
        <>
            {routes.map((route, index) => (
                <div key={index} className="flex flex-col gap-7">
                    <div className="flex flex-row justify-between">
                        <h1 className="text-[#000] text-[16px] font-bold">{route.route.title|| "Кавказские горы - пешая тропа"}</h1>
                        <div className="flex flex-row gap-[1em]">
                            <a className="text-[#6874f9] font-light" href="" onClick={(e) => {
                                e.preventDefault()
                                onEditRoute(route)
                            }
                            }>Редактировать</a>
                            <a className="text-[#6874f9] font-light" href="">На карте</a>
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
                                    <Image src="/Star.png" alt="Rating Star" width={25} height={25}/>
                                    <h1 className="text-[#000] font-bold text-[17px]">{route.rating || "4.5"}</h1>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="flex flex-col gap-[0.5em] items-center">
                                <h1 className="text-[#000] font-light text-[17px]">Публичный/Приватный</h1>
                                <label className="inline-flex items-center cursor-pointer">
                                    <input type="checkbox" value="" className="sr-only peer outline-none disabled"/>
                                    <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 dark:peer-checked:bg-blue-600"></div>
                                </label>
                            </div>
                        </div>
                    </div>
                    {/* <div className="w-[100%] h-[150px] relative">
                            <Image src={`${process.env.NEXT_PUBLIC_BACKEND_HOST_ROUTES_MEDIA}${route.route.photo[0].photo_path}`} alt="Route Image" layout="fill" objectFit="cover"/>
                        </div> */}
                    {route.route.photos.map((photo,index) => (
                        <div key={index} className="w-[100%] h-[150px] relative">
                            <Image src={`${process.env.NEXT_PUBLIC_BACKEND_HOST_ROUTES_MEDIA}${photo.photo_path}`} alt="Route Image" layout="fill" objectFit="cover"/>
                        </div>
                    )
                    )}
                    <div className="border-dashed border border-[#6874f9] w-[100%]"></div>
                </div>
            ))}
        </>
    );
}
