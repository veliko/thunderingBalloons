var PlaceList = ({places}) => (

  <div>
  {places.map((place, index) => 
    <PlaceListEntry place={place} key={place.id} index={index}/>
    )}
  </div>
);

window.PlaceList = PlaceList;
