import React from 'react'

export const DatePicker = ({ selectedDate, onChange }) => {
    const dates = Array.from({ length: 3 }, (_, i) => {
        const d = new Date();
        d.setDate(d.getDate() + i + 1);
        return {
            label: d.toLocaleDateString("en-GB", { day: "numeric", month: "short" }),
            value: d.toISOString().split("T")[0] // "YYYY-MM-DD"
        };
    });

    return (
        <div>
            <div className="join w-full md:ml-10 ml-5 mt-5 mr-10">
                {dates.map((date, index) => (
                    <input
                        key={index}
                        className="join-item btn btn-square md:w-32 w-20"
                        type="radio"
                        name="options"
                        aria-label={date.label}
                        value={date.value}
                        checked={selectedDate === date.value}
                        onChange={() => onChange(date.value)}
                    />
                ))}
            </div>
        </div>
    )
}