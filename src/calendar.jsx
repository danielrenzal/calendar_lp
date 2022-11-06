import React, {Component} from 'react';
import CalendarDays from './calendar_days';
import './calendar.scss';


class Calendar extends Component{
    constructor(prop){
        super(prop);

        this.weeks = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        this.months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

        this.date = new Date();
        /** set what month to show*/
        this.date.setMonth(prop.month);
    }

    render(){
        return(
            <div className="calendar">
                <div className="calendar_header">
                    {/* display month and year */}
                    <h2>{this.months[this.date.getMonth()]} {this.date.getFullYear()}</h2>
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
                    <CalendarDays today={this.date} spreadEvent={this.props.spreadEvent} events={this.props.events}/>
                </div>
            </div>
        )
    }
}

export default Calendar;