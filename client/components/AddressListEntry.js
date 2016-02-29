var AddressListEntry = ({user, index}) => (
  
  <div className='col-md-4'>
    <input type="checkbox" value={index} name="usersAddresses"/> {user.username} <br/>
  </div>
);

window.AddressListEntry = AddressListEntry;