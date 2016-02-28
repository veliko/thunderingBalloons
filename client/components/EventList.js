var EventList = ({events}) => (

  <div>
  {events.map((ev, index) => 
    <EventListEntry ev={ev} key={index+'-'+ev.event_name+'-'+ev.id}/>
    )}
  </div>
);

window.EventList = EventList;
