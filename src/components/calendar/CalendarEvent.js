import React from 'react'

export const CalendarEvent = ({ event }) => {
  console.log("Event", event);
  const { title, user } = event
  return (
    <div>
      <strong>{title}</strong>
      <span> - {user?.name}</span>
    </div>
  )
}
