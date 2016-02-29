import EventListEntry from './EventListEntry'; 
 
var EventList = ({events}) => (

  <div>
  {events.map((ev, index) => 
    <EventListEntry ev={ev} key={ev.id}/>
    )}
  </div>
);

export default EventList;