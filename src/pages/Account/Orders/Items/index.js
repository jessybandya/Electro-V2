import React, { useEffect, useState } from 'react'
import DeliveryDiningIcon from '@mui/icons-material/DeliveryDining';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { Modal,Button } from 'react-bootstrap';
import Post from './Post';
import { toast } from 'react-toastify';
import { db } from '../../../../firebase';

function numberWithCommas(x) {
  var parts = x.toString().split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return parts.join(".");
}


function Items({ deliveryAddress, items, paymentType, total, uid, updatedBy, updatedOn, orderId }) {
    const [show, setShow] = useState(false);
    const [count, setCount] = useState(0)
    console.log("console log: ", items.received)

    useEffect(() => {
      db.collection('orders').where("uid","==",uid).where('items', 'array-contains', {received: false})
       .onSnapshot(snapshot => (
        setCount(snapshot.docs.length)
       ))
    }, []);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const deleteOrder = () =>{
        if(window.confirm("Are you sure you want to delete this order?")){
            db.collection("orders").doc(orderId).delete().then(function() {
            }).catch(function(error) {
                toast.error("Error removing order: ", error);
            }); 
            toast.success("Your order has been deleted from your history!")   
          }
    }
  return (
    <div className="col-md-6">
    <div className="bg-white card addresses-item mb-4 border border-primary shadow">
      <div className="gold-members p-4">
        <div className="media">
          <div className="mr-3"><DeliveryDiningIcon style={{fontSize:30}}/></div>
          <div className="media-body">
            {/* <h1>{count}</h1> */}
              {!deliveryAddress ?(
                              <>
                              <h6 className="mb-1 text-secondary">On Pick Up</h6>
                              <p>{updatedOn?.toDate().toString()}</p>
                                </>
              ):(
                  <>
                <h6 className="mb-1 text-secondary">On Dellivery</h6>
                <p className="text-black">{deliveryAddress}
                </p>
                <p>{updatedOn?.toDate().toString()}</p>
                  </>

              )}

            <p className="mb-0 text-black font-weight-bold"><span style={{marginRight:20}}>Total: Ksh {numberWithCommas(parseFloat(total).toFixed(2))} ({items.length} item(s))</span><a onClick={handleShow} className="text-primary mr-3" ><RemoveRedEyeIcon className="icofont-ui-edit" /></a> <a onClick={deleteOrder} className="text-danger" ><i className="icofont-ui-delete" /></a></p>
          </div>
        </div>
      </div>
    </div>
    <Modal show={show} onHide={handleClose}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
    >
        <Modal.Body style={{
      maxHeight: 'calc(100vh - 210px)',
      overflowY: 'auto'
     }}>
         {
                 items.map(function(d, idx){
                  return(
                    <Post 
                    amount={d.amount}
                    branchId={d.branchId}
                    mealId={d.id}
                    image={d.image}
                    menuId={d.menuId}
                    name={d.name}
                    price={d.price}
                    received={d.received}
                    restId={d.restId}
                    index={idx}
                    obj={d}
                    items={items}
                    orderId={orderId}
                    uid={uid}
                    />
                  )
                })
            //  items.map(item => (
                //  <Post 
                //  amount={item.amount}
                //  branchId={item.branchId}
                //  mealId={item.id}
                //  image={item.image}
                //  menuId={item.menuId}
                //  name={item.name}
                //  price={item.price}
                //  received={item.received}
                //  restId={item.restId}
                //  />
            //  ))
         }
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
  </div>
  )
}

export default Items