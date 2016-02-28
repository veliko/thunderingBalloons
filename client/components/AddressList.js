var AddressList = ({users}) => (
  <div id="addresses" >
  {users.map((user, index) => 
    <AddressListEntry user={user} key={index} />
    )}
  </div>
);

window.AddressList = AddressList;
