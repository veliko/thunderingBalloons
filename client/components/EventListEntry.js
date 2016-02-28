var EventListEntry = ({ev}) => (
  <div>
    <div>Event Name: {ev.event_name}</div>
    {ev.attendees.map((attendee) => 
      <AttendeeListEntry attendee={attendee} key={attendee.id} />
    )}
  </div>
);

window.EventListEntry = EventListEntry;