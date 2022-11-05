import React, { Component } from 'react';


class CalendarDays extends Component{

    render(){
        const { today, events } = this.props;

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
    
            let {number, month} = calendar_day;
    
            for(let i=0; i<events.length; i++){
                switch(events[i].calendar_display){
                    case "peek":
                        if(events[i].start === number && events[i].month === month){
                            calendar_day = {...calendar_day, label: "start_only", event_day: "cohort", index: i, is_clickable: true};
                        }
                        break;
                    case "full":
                        if(events[i].start === number && events[i].month === month){
                            calendar_day = {...calendar_day, label: "start"}
                        }else if(events[i].end === number && events[i].month === month){
                            calendar_day = {...calendar_day, label: "end"}
                        }else if(number > events[i].start && number < events[i].end && events[i].month === month){
                            calendar_day = {...calendar_day, label: "between"}
                        }
                        break;
                    default:
                        /** nothing */
                }
                
            }
    
            currentDays = [...currentDays, calendar_day];
        }
    
        return (
            <div className="table_content">
                {
                    currentDays.map((day, index) => (
                        <div key={index} 
                            className={`calendar_day
                                        ${day.current_month ? " current":""}
                                        ${day.label ? day.label:""}
                                        ${day.event_day ? day.event_day:""}`}
                            {...(day.is_clickable && {onClick: (e) => this.props.spreadEvent(day.index, e)})}
                                        >
                        <p>{day.number}</p>
                        </div>
                    ))
                }
            </div>
        )
    }
}

export default CalendarDays;