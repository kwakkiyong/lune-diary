import {Calendar as CalendarIcon} from "lucide-react";

export default function CalendarTitle() {
    return (
        <div className="relative z-10">
            <h1 className="text-2xl sm:text-3xl font-bold flex items-center gap-2 text-foreground">
                <CalendarIcon className="h-6 w-6 sm:h-8 sm:w-8"/>
                달력
            </h1>
            <p className="text-sm sm:text-base text-foreground mt-1">날짜를 선택하여 해당 날짜의 일기를 확인하세요</p>
        </div>
    );
}