import React from 'react'
import { Link } from 'react-router-dom'
import  datas  from "../../MenuCategory"

function Header({handleClose}) {
  return (
    <div>
                  <div className="cate-header">
              <center><h4 style={{fontWeight:'bold',color:'#fff'}}>Select Category</h4></center>
            </div>
            <ul className="category-by-cat">
            {datas.map((data, index) => {
              return (
                <li>
                <Link to={`/category/${data.id}`} onClick={handleClose} className="single-cat-item">
                  <div style={{backgroundColor:'#e74c3c',padding:5,color:'#E8E8E8',borderRadius:10}} className="text">{data.name}</div>
                </Link>
              </li>
              )
            })}
            </ul>
 
    </div>
  )
}

export default Header