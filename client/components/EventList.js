var EventList = ({events}) => (

  <div>
  {events.map((ev) => 
    <EventListEntry ev={ev} key={ev.name} />
    )}
  </div>
);

window.EventList = EventList;
