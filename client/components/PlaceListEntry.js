var PlaceListEntry = ({place, index}) => (
  
  <div>
    <div>
      <img src={place.image_url} alt="" />
    </div>
    <div>
      <div>Name: {place.name}</div>
      <div>Rating: {place.rating}</div>
	  
      <input type="radio" name="chosenPlace" value={index} />
    </div>
  </div>
);

window.PlaceListEntry = PlaceListEntry;
