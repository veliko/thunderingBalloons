var PlaceList = ({places}) => (

  <div>
  {places.map((place) => 
    <PlaceListEntry place={place} key={place.id} />
    )}
  </div>
);

window.PlaceList = PlaceList;
