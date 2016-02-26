var EventList = ({events}) => (

  <div>
  {events.map((ev) => 
    <EventListEntry ev={ev} key={ev.id} />
    )}
  </div>
);

window.EventList = EventList;
