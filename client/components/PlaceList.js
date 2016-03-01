import PlaceListEntry from './PlaceListEntry'; 
import React from 'react';

var PlaceList = ({places}) => (

  <div className="col-md-12">
  {places.map((place, index) => 
    <PlaceListEntry place={place} key={place.id} index={index}/>
    )}
  </div>
);

export default PlaceList;
