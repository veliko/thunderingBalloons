import AddressListEntry from './AddressListEntry'; 
import React from 'react';

var AddressList = ({users}) => (
  <div>
  {users.map((user, index) => 
    <AddressListEntry user={user} index={index} key={user.id} />
    )}
  </div>
);

export default AddressList;
