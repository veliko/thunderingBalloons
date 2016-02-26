var AddressList = ({addresses, onRemove}) => (
  <div>
  {addresses.map((address) => 
    <AddressListEntry address={address} key={address.id} onRemove = {onRemove.bind(this)}/>
    )}
  </div>
);

window.AddressList = AddressList;
