var EventListEntry = ({ev}) => (
  <div>
    <div>Event Name: {ev.event_name}</div>
    {ev.attendees.map((attendee, index) => 
      <div>{attendee.username}</div>
    )}
  </div>
);

window.EventListEntry = EventListEntry;