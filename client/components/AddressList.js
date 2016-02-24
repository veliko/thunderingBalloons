var AddressList = ({addresses, setState}) => (

  <div>
  {addresses.map((address) => 
    <AddressListEntry address={address} key={address.id} />
    )}
  </div>
);

window.AddressList = AddressList;
