import Image from "next/image";
import process from "next/dist/build/webpack/loaders/resolve-url-loader/lib/postcss";
import Link from "next/link";

export default function CartCopyRoutes({ data }) {
    return (
        <div className="flex flex-col gap-7">
            <div className="flex flex-row justify-between">
                <h1 className="text-[#000] text-[16px] font-bold">{ data.route.title }</h1>
                <div className="flex flex-row gap-[1em]">
                    <Link className="text-[#6874f9] font-light"  href={"/routesPaths/" + data.route.id}>Подробнее о маршруте</Link>
                </div>
            </div>
            <div className="flex flex-row justify-between">
                <div className="flex flex-row justify-between gap-[3em]">
                    <div className="flex flex-col gap-[0.5em] items-start">
                        <p className="text-[#000] font-light text-[15px]">Расстояние</p>
                        <h1 className="text-[#000] font-bold text-[17px]">{ data.route.distance } км.</h1>
                    </div>
                    <div className="flex flex-col gap-[0.5em] items-start">
                        <p className="text-[#000] font-light text-[15px]">Рейтинг</p>
                        <div className="flex justify-between flex-row items-center">
                            <Image src="/Star.png" alt="" width={25} height={25}/>
                            <h1 className="text-[#000] font-bold text-[17px]">{ data.rating ? data.rating : 0 }</h1>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-[100%] h-[150px] relative">
                <Image
                    src={`${process.env.NEXT_PUBLIC_BACKEND_HOST_ROUTES_MEDIA}${data.route.photos[0].photo_path}`}
                    alt="Route Image" layout="fill" objectFit="cover"/>
            </div>
            <div className="border-dashed border border-[#6874f9] w-[100%]"></div>
        </div> 
    );
}