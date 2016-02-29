var AddressList = ({users}) => (
  <div className='col-md-12'>
  {users.map((user, index) => 
    <AddressListEntry className='col-md-3' user={user} index={index} key={user.id} />
    )}
  </div>
);

window.AddressList = AddressList;
