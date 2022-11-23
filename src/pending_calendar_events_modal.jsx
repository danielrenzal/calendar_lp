import React, { Component } from 'react';
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.min.css';
import './pending_calendar_events_modal.scss';
import moment from 'moment/moment';

class PendingCalendarEventsModal extends Component{
    render(){
        const {show, closeModal, pending_calendar_events} = this.props;
        console.log(pending_calendar_events)
        return(
            <Modal show={show} onHide={closeModal} id="pending_calendar_events_modal" centered scrollable>
                <Modal.Header closeButton closeVariant="white">
                    <span class="modal_title">Pending Calendar Updates</span>
                </Modal.Header>
                <Modal.Body>
                    <div className="pending_events_calendar_modal_subheader">
                    You have {pending_calendar_events.length} Pending Calendar Changes.
		            <button className="approve_all_pending_events_btn">Approve All</button>
                    </div>
                    <table className="pending_events_table">
                        <thead>
                            <tr>
                                <th>Program</th>
                                <th>Stack</th>
                                <th>Dates</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                pending_calendar_events.map(event => (
                                    <tr key={event.id}>
                                        <td className="program_cell">{event.program ? event.program:"N/A"}</td>
                                        <td className="stack_cell">{event.stack ? event.stack:"N/A"}</td>
                                        <td className="date_cell">{moment(event.start).format("ll")} - {moment(event.end).format("ll")}</td>
                                        <td className="actions_cell">
                                            <button className="view_in_calendar_btn">View in Calendar</button>
                                            <button className="reject_pending_btn">Reject</button>
                                            <button className="approve_pending_btn">Approve</button>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </Modal.Body>
            </Modal>
        )
    }
}

export default PendingCalendarEventsModal;