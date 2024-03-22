import React, { useState } from 'react'
import Geocode from "react-geocode";
import { useSelector, useDispatch } from 'react-redux'
import { updateLatitude, updateLongitude, updateAddress } from '../../../redux/dataSlice';

function Location({latitude, longitude}) {
  const [address, setAddress] = useState('')
  const dispatch = useDispatch();

    // Get address from latitude & longitude.
Geocode.fromLatLng(latitude, longitude).then(
  (response) => {
    const address1 = response.results[0].formatted_address;
    setAddress(address1)
    dispatch(updateAddress(address1))
    console.log(`Address: ${address1}`);
  },
  (error) => {
    console.error(error);
  }
);

  return (
    <div>
      {!address ?(
  <>Locate me...</>
):(
  <>{address}</>
)}
    </div>
  )
}

export default Location


