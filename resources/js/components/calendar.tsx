import { cn } from '@/lib/utils';
import { Link, usePage } from '@inertiajs/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription } from './ui/card';
import { Separator } from './ui/separator';

const parseDate = (value: string) => {
    const [year, month, day] = value.split('-').map(Number);
    const parsedDate = new Date(year, (month ?? 1) - 1, day ?? 1);

    return Number.isNaN(parsedDate.getTime()) ? null : parsedDate;
};

const formatDate = (value: Date) => {
    const year = value.getFullYear();
    const month = String(value.getMonth() + 1).padStart(2, '0');
    const day = String(value.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
};

const clampToMinimumDate = (value: Date, minimumDate: Date) => {
    return value < minimumDate ? new Date(minimumDate) : value;
};

const Calendar = () => {
    const { props } = usePage<{ date: string; minimumDate?: string; edit_mode?: boolean; edit_reservation_id?: string }>();
    const editMode = Boolean(props.edit_mode && props.edit_reservation_id);
    const editId = props.edit_reservation_id;

    const fallbackMinimumDate = new Date();
    fallbackMinimumDate.setHours(0, 0, 0, 0);
    fallbackMinimumDate.setDate(fallbackMinimumDate.getDate() + 1);

    const minimumDate = parseDate(props.minimumDate ?? '') ?? fallbackMinimumDate;
    const currentQueryDate = clampToMinimumDate(parseDate(props.date) ?? minimumDate, minimumDate);

    const [selectedDate, setSelectedDate] = useState<Date>(currentQueryDate);

    const rangeStart = new Date(selectedDate);
    rangeStart.setDate(selectedDate.getDate() - 4);

    const visibleRangeStart = clampToMinimumDate(rangeStart, minimumDate);

    const calendarDays = [...Array(9)].map((_, i) => {
        const day = new Date(visibleRangeStart);
        day.setDate(visibleRangeStart.getDate() + i);
        return day;
    });

    const minimumDateHref = editMode
        ? `/reservations/${editId}/edit/step/1?date=${formatDate(minimumDate)}`
        : `/reservations/create/step/1?date=${formatDate(minimumDate)}`;

    const moveWindow = (days: number) => {
        setSelectedDate((currentDate) => {
            const nextDate = new Date(currentDate);
            nextDate.setDate(currentDate.getDate() + days);

            return clampToMinimumDate(nextDate, minimumDate);
        });
    };

    return (
        <Card className="mb-4 p-2">
            <CardContent className="px-2">
                <CardDescription className="flex items-center justify-between gap-10">
                    <div>
                        <span>
                            {selectedDate.toLocaleString('default', { month: 'long' })} {selectedDate.getFullYear()}
                        </span>
                    </div>

                    <div className="flex flex-1">
                        {calendarDays.map((day, i) => {
                            const formattedDate = formatDate(day);
                            const href = editMode
                                ? `/reservations/${editId}/edit/step/1?date=${formattedDate}`
                                : `/reservations/create/step/1?date=${formattedDate}`;

                            return (
                                <Link href={href} key={i} className="mx-auto flex w-full">
                                    <div
                                        className={cn('w-full rounded p-1 text-center', {
                                            'bg-secondary font-medium text-black':
                                                day.getFullYear() == currentQueryDate.getFullYear() &&
                                                day.getMonth() == currentQueryDate.getMonth() &&
                                                day.getDate() == currentQueryDate.getDate(),
                                        })}
                                    >
                                        {day.getDate()} <br />
                                        <span className="text-xs">{day.toLocaleString('en-US', { weekday: 'short' })}</span>
                                    </div>
                                    <Separator orientation="vertical" className="mx-1" />
                                </Link>
                            );
                        })}
                    </div>

                    <div className="flex items-center gap-3">
                        <Button variant="outline" size="icon" onClick={() => moveWindow(-9)}>
                            <ChevronLeft />
                        </Button>
                        <Link href={minimumDateHref}>TOMORROW</Link>
                        <Button variant="outline" size="icon" onClick={() => moveWindow(9)}>
                            <ChevronRight />
                        </Button>
                    </div>
                </CardDescription>
            </CardContent>
        </Card>
    );
};

export default Calendar;
