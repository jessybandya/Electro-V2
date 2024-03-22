import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { auth, db } from '../../../firebase';
import Items from './Items';

function Orders({  }) {
    const [posts, setPosts] = useState([])
    const authId = useSelector((state) => state.authId)
 
    useEffect(() => {
      db.collection('users').doc(`${authId}`).collection('orders').onSnapshot(snapshot => {
        setPosts(snapshot.docs.map(doc => ({
              id: doc.id,
              post: doc.data(),
          })));
      })
  }, []);


  return (
    <div>

                                    <div className="row">
                                    {
                              posts.map(({id, post}) => (
                                 <Items
                                 key={id} 
                                 deliveryAddress={post.deliveryAddress}
                                 items={post.items}
                                 paymentType={post.paymentType}
                                 total={post.total}
                                 uid={post.uid}
                                 updatedBy={post.updatedBy}
                                 updatedOn={post.updatedOn}
                                 orderId={id}
                                 />
                               ))
               }
                  </div>
    </div>
  )
}

export default Orders