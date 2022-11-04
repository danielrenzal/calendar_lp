import React, {Component} from 'react';
import CalendarDays from './calendar_days';
import './calendar.scss';


class Calendar extends Component{
    constructor(){
        super();

        this.weeks = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        this.months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

        this.state = {
            current_day: new Date()
        }
    }

    changeCurrentDay = (day) => {
        this.setState({current_day: new Date(day.year, day.month, day.number)});
    }

    render(){
        const { current_day } = this.state;
        return(
            <div className="calendar">
                <div className="calendar_header">
                    <h2>{this.months[current_day.getMonth()]} {current_day.getFullYear()}</h2>
                </div>
                <div className="calendar_body">
                    <div className="table_header">
                        {
                            this.weeks.map((week, index) => (
                                <span key={index} className="weekday">{week}</span>
                            ))
                        }
                    </div>
                    <CalendarDays today={current_day} changeCurrentDay={this.changeCurrentDay} />
                </div>
            </div>
        )
    }
}

export default Calendar;