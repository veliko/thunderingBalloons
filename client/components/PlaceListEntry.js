var PlaceListEntry = ({place}) => (
  
  <div>
    <div>
      <img src={place.image_url} alt="" />
    </div>
    <div>
      <div>Name: {place.name}</div>
      <div>Rating: {place.rating}</div>
    </div>
  </div>
);

window.PlaceListEntry = PlaceListEntry;
