import NoneCopyRoutesLK from "@/components/copyRoutesLK/NoneCopyRoutes";
import CartCopyRoutes from "@/components/copyRoutesLK/CartCopyRoutes";

export default function CopyRoutes() {
    return (
        <>
            {/* Если нет сохраненных маршрутов */}
            <NoneCopyRoutesLK/>
            {/* усли есть сохраненные маршруты */}
            <CartCopyRoutes/>
        </>
    );
}