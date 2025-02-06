import NoneRoutesLK from "@/components/yourRoutesLK/NoneRoutesLK";
import CartRoutesLK from "@/components/yourRoutesLK/CartRoutesLK";
import RedactorRoutesLK from "@/components/yourRoutesLK/RedactorRoutesLK";

export default function YourRoutes() {
    return (
        <>  
            {/* Если нет  маршрутов */}
            <NoneRoutesLK />
            {/* усли есть маршруты */}
            <CartRoutesLK />
            {/* редактирование маршрута */}
            <RedactorRoutesLK />
        </>
    );
}