import {Calendar as CalendarIcon} from "lucide-react";

export default function CalendarTitle() {
    return (
        <div className="relative z-10">
            <h1 className="text-3xl font-bold flex items-center gap-2 text-foreground">
                <CalendarIcon className="h-8 w-8"/>
                달력
            </h1>
            <p className="text-foreground mt-1">날짜를 선택하여 해당 날짜의 일기를 확인하세요</p>
        </div>
    );
}