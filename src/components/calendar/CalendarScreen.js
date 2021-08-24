import React, { useState } from 'react';
import moment from 'moment';
import {
  Calendar,
  momentLocalizer
} from 'react-big-calendar';
import { useDispatch } from 'react-redux';
import { Navbar } from '../ui/Navbar';
import { messages } from '../../helpers/calendar-messages';
import { CalendarEvent } from './CalendarEvent';
import { CalendarModal } from './CalendarModal';
import { uiOpenModal } from '../../actions/ui';

import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'moment/locale/es';
import { eventSetActive } from '../../actions/events';
import { AddNewFab } from '../ui/AddNewFab';
moment.locale('es');
const localizer = momentLocalizer(moment) // or globalizeLocalizer
const events = [
  {
    title: 'Birth Day',
    start: moment().toDate(),
    end: moment().add(2, 'hours').toDate(),
    allDay: true,
    notes: 'Felicitar',
    user: {
      _id: 123,
      name: 'Daniel',
    }
    //resource?: any,
  }
]
export const CalendarScreen = () => {
  const [lastView, setLastView] = useState(localStorage.getItem('lastView'));
  const dispatch = useDispatch();

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
    dispatch(uiOpenModal());
  }

  const onViewChange = (e) => {
    setLastView(e);
    localStorage.setItem('lastView', e);
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
        components={{
          event: CalendarEvent
        }}
      />
      <AddNewFab />
      <CalendarModal />
    </div>
  )
}
