import EventListEntry from './EventListEntry'; 
import React from 'react';
 
var EventList = ({events}) => (

  <div>
  {events.map((ev, index) => 
    <EventListEntry ev={ev} key={ev.id}/>
    )}
  </div>
);

export default EventList;