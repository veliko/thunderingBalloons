import React from 'react';

var PlaceListEntry = ({place, index}) => (
  
  <div className="col-md-3">
    <div className="thimbnail">
      <img src={place.image_url} alt="" />
    </div>
    <div className="caption">
      <h5>Name: {place.name}</h5>
      <p>Rating: {place.rating}</p>
	  
      <input type="radio" name="chosenPlace" value={index} />
    </div>
  </div>
);

export default PlaceListEntry;
