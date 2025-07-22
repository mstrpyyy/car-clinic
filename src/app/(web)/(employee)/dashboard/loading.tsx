import { LoaderCircle } from "lucide-react";

export default function Loading() {
    return (
        <div className="fixed inset-0 z-50">
            <div className="w-full h-dvh grid place-content-center">
                <LoaderCircle className="h-12 w-12 animate-spin text-primary" />
            </div>
        </div>
    )
}