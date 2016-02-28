var EventListEntry = ({ev}) => (
  <div>
    <div>Event Name: {ev.event_name}</div>
    {ev.attendees.map((attendee, index) => 
      <div key={attendee.username}>{attendee.username}</div>
    )}
  </div>
);

window.EventListEntry = EventListEntry;
