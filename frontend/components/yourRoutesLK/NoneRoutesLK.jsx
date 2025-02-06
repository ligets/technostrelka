export default function NoneRoutesLK() {
    return (
        <div className="flex flex-col items-start gap-4">
            <span className="text-[#000] text-[16px] font-bold px-2">
                У вас нет маршрутов,
                <a className="text-[#6874f9] text-[16px] font-bold px-1" href="">создайте</a>
                первый маршрут!
            </span>
            <div className="border-dashed border border-[#6874f9] w-[100%]"></div>
        </div> 
    );
}