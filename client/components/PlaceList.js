import PlaceListEntry from './PlaceListEntry'; 
import React from 'react';

var PlaceList = ({places}) => (

  <div>
  {places.map((place, index) => 
    <PlaceListEntry place={place} key={place.id} index={index}/>
    )}
  </div>
);

export default PlaceList;
