'use client';
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function LkLayout({ children }) {
    const pathname = usePathname();

    const tabs = [
        { name: "Ваши маршруты", href: "/lk/yourRoutes" },
        { name: "Сохраненные маршруты", href: "/lk/copyRoutes" },
        { name: "Загрузить маршрут", href: "/lk/uploadRoute" },
    ]

    return (
        <div className="flex flex-col w-[92%] h-[94%]">
            <h1 className="text-[#000] text-[25px] font-bold">Sergeuuuu</h1>
            <div className="flex flex-row gap-[10%] py-8">
                <div className="flex flex-col gap-5">
                    <div className="relative">
                        <img src="" alt="" className="w-[207px] h-[207px] rounded-[10px]"/>
                        <a className="absolute top-0 right-0 font-semibold text-[#000] text-[13px] p-2"
                        href="">Изменить</a>
                    </div>
                    <p className="text-[#000] text-[16px] font-semibold">2 маршрута</p>
                </div>
                <div className="flex flex-col gap-9">
                    <div>
                        {tabs.map((tab) => (
                            <Link
                            key={tab.href}
                            href={tab.href}
                            className={pathname === tab.href
                                ? "bg-[#6874f9] text-white text-[16px] font-light rounded-tl-[14px] rounded-tr-[15px] px-8 py-2"
                                : "text-[16px] text-[#6874f9] rounded-tl-[14px] rounded-tr-[15px]  bg-[#d9d9d9] font-light px-8 py-2"}
                            >{tab.name}
                            </Link>
                        ))}
                    </div>
                    <div className="flex flex-col  gap-7">{children}</div>
                </div>
            </div>
        </div>
    );
  }