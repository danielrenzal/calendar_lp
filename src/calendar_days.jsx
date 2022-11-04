const CalendarDays = ({today, changeCurrentDay}) => {
    let firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1); // Nov 1, 2022
    let weekdayOfFirstDay = firstDayOfMonth.getDay(); // 2 (Tue)
    let currentDays = [];

    for (let day=0; day<42; day++){
        if(day === 0 && weekdayOfFirstDay === 0){
            firstDayOfMonth.setDate(1); //first block if day 1 is on sunday
        }
        else if(day === 0){
            firstDayOfMonth.setDate(firstDayOfMonth.getDate() - weekdayOfFirstDay); //first blocks of the past month
        }
        else{
            firstDayOfMonth.setDate(firstDayOfMonth.getDate() + 1); //succeeding block
        }

        let calendar_day = {
            current_month: (firstDayOfMonth.getMonth() === today.getMonth()),
            date: (new Date(firstDayOfMonth)),
            month: firstDayOfMonth.getMonth(),
            number: firstDayOfMonth.getDate(),
            selected: (firstDayOfMonth.toDateString() === today.toDateString()),
            year: firstDayOfMonth.getFullYear()
        }

        currentDays = [...currentDays, calendar_day];
    }

    return (
        <div className="table_content">
            {
                currentDays.map((day, index) => (
                    <div key={index} className={`calendar_day${day.current_month ? " current":""}${day.selected ? " selected":""}`}
                        onClick={() => changeCurrentDay(day)}>
                    <p>{day.number}</p>
                    </div>
                ))
            }
        </div>
    )
}

export default CalendarDays;