var AddressListEntry = ({user, key}) => (
  
  <div>
    <input type="checkbox" value={key} /> {user.username} <br/>
  </div>
);

window.AddressListEntry = AddressListEntry;