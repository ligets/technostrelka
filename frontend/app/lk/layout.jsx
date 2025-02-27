'use client';
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

export default function LkLayout({ children }) {
    const pathname = usePathname();

    const tabs = [
        { name: "Ваши маршруты", href: "/lk/yourRoutes" },
        { name: "Сохраненные маршруты", href: "/lk/copyRoutes" },
        { name: "Загрузить маршрут", href: "/lk/uploadRoute" },
    ]

    return (
        <div className="flex flex-col w-[92%] h-[94%]">
            <h1 className="text-[#000] text-[25px] font-bold">Личный кабинет</h1>
            <div className="flex flex-row gap-[10%] py-8">
                <div className="flex flex-col gap-5">
                    <div className="relative">
                        <Image src="/admin-prof.png" alt="" width={207} height={207} />
                    </div>
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