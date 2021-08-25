import React, { useState } from 'react';
import moment from 'moment';
import {
  Calendar,
  momentLocalizer
} from 'react-big-calendar';
import { useDispatch, useSelector } from 'react-redux';
import { Navbar } from '../ui/Navbar';
import { messages } from '../../helpers/calendar-messages';
import { CalendarEvent } from './CalendarEvent';
import { CalendarModal } from './CalendarModal';
import { uiOpenModal } from '../../actions/ui';

import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'moment/locale/es';
import { eventClearActiveEvent, eventSetActive } from '../../actions/events';
import { AddNewFab } from '../ui/AddNewFab';
import { DeleteEventFab } from '../ui/DeleteEventFab';
moment.locale('es');
const localizer = momentLocalizer(moment) // or globalizeLocalizer
// const events = [
//   {
//     title: 'Birth Day',
//     start: moment().toDate(),
//     end: moment().add(2, 'hours').toDate(),
//     allDay: true,
//     notes: 'Felicitar',
//     user: {
//       _id: 123,
//       name: 'Daniel',
//     }
//     //resource?: any,
//   }
// ]
export const CalendarScreen = () => {
  const dispatch = useDispatch();
  const { events, activeEvent } = useSelector(state => state.calendar);
  const [lastView, setLastView] = useState(localStorage.getItem('lastView'));

  const eventStyleGetter = (event, start, end, isSelected) => {
    const style = {
      backgroundColor: '#367CF7',
      borderRadius: '0px',
      opacity: '0.8',
      display: 'block',
      color: 'white'
    }
    return {
      style
    }
  }

  const onDoubleClick = (e) => {
    dispatch(uiOpenModal());
  }

  const onSelectEvent = (e) => {
    dispatch(eventSetActive(e));
  }

  const onViewChange = (e) => {
    setLastView(e);
    localStorage.setItem('lastView', e);
  }

  const onSelectSlot = (e) => {
    dispatch(eventClearActiveEvent());
  }

  return (
    <div>
      <Navbar />
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        messages={messages}
        eventPropGetter={eventStyleGetter}
        onDoubleClickEvent={onDoubleClick}
        onSelectEvent={onSelectEvent}
        onView={onViewChange}
        view={lastView}
        onSelectSlot={onSelectSlot}
        selectable={true}
        components={{
          event: CalendarEvent
        }}
      />
      {activeEvent && (<DeleteEventFab />)}
      <AddNewFab />
      <CalendarModal />
    </div>
  )
}
