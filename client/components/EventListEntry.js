var EventListEntry = ({ev}) => (
  <div>
    <div>Event Name: {ev.event_name}</div>
    {ev.attendees.map((attendee, index) => 
      <AttendeeListEntry attendee={attendee} key={index+'-'+attendee.id} />
    )}
  </div>
);

window.EventListEntry = EventListEntry;