var EventList = ({events}) => (

  <div>
  {events.map((ev) => 
    <EventListEntry ev={ev} />
    )}
  </div>
);

window.EventList = EventList;
