import Link from "next/link"

export default function NoneCopyRoutesLK() {
    return (
        <div className="flex flex-col items-start gap-4">
            <span className="text-[#000] text-[16px] font-bold px-2">
                У вас нет сохраненных маршрутов,
                <Link className="text-[#6874f9] text-[16px] font-bold px-1" href="/routesPaths">сохраните</Link>
                первый маршрут!
            </span>
            <div className="border-dashed border border-[#6874f9] w-[100%]"></div>
        </div>
    );
}