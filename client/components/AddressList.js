var AddressList = ({addresses}) => (

  <div>
  {addresses.map((addresses) => 
    <AddressListEntry addresses={addresses} key={addresses.id} />
    )}
  </div>
);

window.AddressList = AddressList;
