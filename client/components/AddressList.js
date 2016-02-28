var AddressList = ({users}) => (
  <div>
  {users.map((user, index) => 
    <AddressListEntry user={user} index={index} key={user.id} />
    )}
  </div>
);

window.AddressList = AddressList;
