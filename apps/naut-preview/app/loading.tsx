import { Loader2 } from "lucide-react"

export default function Loading() {
    return (
    <div className="flex fixed inset-0 items-center justify-center">
        <Loader2 className="animate-spin text-neutral-400" />
    </div>)
}