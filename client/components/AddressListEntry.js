import React from 'react';

var AddressListEntry = ({user, index}) => (
  
  <div>
    <input type="checkbox" value={index} name="usersAddresses"/> {user.username} <br/>
  </div>
);

export default AddressListEntry;