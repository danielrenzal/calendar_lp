import React, {Component} from 'react';
import CalendarDays from './calendar_days';
import './calendar.scss';


class MonthCalendar extends Component{
    constructor(prop){
        super(prop);
        this.weeks = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        this.months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    }

    render(){
        const { month, year, spreadEvent, hideEvent, events } = this.props;
        return(
            <div className="month_calendar">
                <div className="calendar_header">
                    {/** Display month name and year */}
                    <p className="calendar_header_title">{this.months[month]} {year}</p> 
                </div>
                <div className="calendar_body">
                    <div className="table_header">
                        { 
                            this.weeks.map((week, index) => (
                                /** Display week days (ex: Mon, Tue) */
                                <span key={index} className="weekday">{week}</span>
                            ))
                        }
                    </div>
                    {/* Display date blocks (in a calendar) */}
                    <CalendarDays 
                        whole_date={new Date(year, month, 1)} 
                        spreadEvent={spreadEvent} 
                        hideEvent={hideEvent} 
                        events={events}
                    />
                </div>
            </div>
        )
    }
}

export default MonthCalendar;