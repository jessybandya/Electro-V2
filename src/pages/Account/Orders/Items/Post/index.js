import React, { useEffect, useState } from 'react'
import { auth, db } from '../../../../../firebase';
import EmailIcon from '@mui/icons-material/Email';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';


function Post({ amount, branchId, uid, menuId, name, price, received, restId, image, index, orderId,items }) {
    const [branch, setBranch] = useState()
    useEffect(() => {
        db.collection('branches').doc(`${branchId}`).onSnapshot((doc) => {
            setBranch(doc.data());
        });
    }, [])


    const update = () => {
      const firestore2 = db.collection("orders").doc(orderId)

      const followNextState = items.map((item, idx) => {
        if (index === idx) {
          return ({...item, received: true})
        } else return item
      })
      
      firestore2.update({items: followNextState})
    }

    function numberWithCommas(x) {
      var parts = x.toString().split(".");
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      return parts.join(".");
    }
  return (
    <div className="bg-white card mb-4 order-list shadow-sm">
                    <div className="gold-members p-4">
                      <center>Order Status...</center>
                      <div className="media">
                          <div className="media-body"><a href="#">
                            <span className="float-right text-info">
                            <img className="mr-4" src={image} alt="Generic placeholder image" />
                                </span>
                          </a>
                          <p className="text-dark">@ Ksh {numberWithCommas(parseFloat(price).toFixed(2))} || {name} x {amount}
                          </p>
                          <p className="mb-0 text-black text-primary pt-2"><span className="text-black font-weight-bold"> Total: </span>Ksh {numberWithCommas(parseFloat(amount * price).toFixed(2))}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div> 
  )
}

export default Post