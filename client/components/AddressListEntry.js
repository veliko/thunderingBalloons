var AddressListEntry = ({user, index}) => (
  
  <div>
    <input type="checkbox" value={index} name="usersAddresses"/> {user.username} <br/>
  </div>
);

window.AddressListEntry = AddressListEntry;