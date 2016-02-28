var EventListEntry = ({ev}) => (
  <div>
    <div>Event Name: {ev.event_name}</div>
    {ev.attendees.map((attendee, index) => 
      <div key={attendee.id}>{attendee.username}</div>
    )}
  </div>
);

window.EventListEntry = EventListEntry;