import React, {Component} from 'react';
import CalendarDays from './calendar_days';
import './calendar.scss';


class Calendar extends Component{
    constructor(prop){
        super(prop);

        this.weeks = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        this.months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

        const date = new Date();
        /** set what month to show*/
        date.setMonth(prop.month);      
        // date.setFullYear(2019);
        this.state = {
            current_day: date
        }
    }

    render(){
        const { current_day } = this.state;
        return(
            <div className="calendar">
                <div className="calendar_header">
                    {/* display month and year */}
                    <h2>{this.months[current_day.getMonth()]} {current_day.getFullYear()}</h2>
                </div>
                <div className="calendar_body">
                    <div className="table_header">
                        { /** display week days (eg: Mon, Tue, etc) */
                            this.weeks.map((week, index) => (
                                <span key={index} className="weekday">{week}</span>
                            ))
                        }
                    </div>
                    {/* mismong dates na */}
                    <CalendarDays today={current_day} spreadEvent={this.props.spreadEvent} events={this.props.events}/>
                </div>
            </div>
        )
    }
}

export default Calendar;