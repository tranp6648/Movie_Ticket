import React from 'react';
import './HomePill.css';
import Swal from 'sweetalert2';
import axios from 'axios';
import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
function HomePillDetail(){
  const[Bill,setBill]=useState([]);
  useEffect(()=>{
    const fetchdata=async ()=>{
      try{
        const response=await axios.get("http://localhost:5231/api/BillDeatail");
        setBill(response.data);
      
      }catch(error){
        console.error("error fetching Bill", error)
      }
    }
    fetchdata();
  },[])
  const deletepill=async (id)=>{
    const confirmation = await Swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
  });
  if (confirmation.isConfirmed) {
    const response = await axios.post(`http://localhost:5231/api/BillDeatail/${id}`, {

  });
  if (response.status===200) {
    Swal.fire({
      icon: 'success',
      title: 'Deletion successful',
      showConfirmButton: false,
      timer: 1500,
  });
  const response=await axios.get("http://localhost:5231/api/BillDeatail");
  setBill(response.data);
  }
  }
  }
  return(
<div className="home-pill-table">
      <h2>Home Pill Table</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Customer Name</th>
            <th>Mobile Number</th>
            <th>Address</th>
            <th>TotalAmount</th>
            <th>Delete</th>
            {/* Add more headers based on your data structure */}
          </tr>
        </thead>
        <tbody>
        {Bill.map((product, index) => (
          <tr>
         
            <td>{product.id}</td>
            <td>{product.customerName}</td>
            <td>{product.mobileNumber}</td>
            <td>{product.address}</td>
            <td>{product.totalAmount}</td>
            <td><button className='btn btn-danger' onClick={() =>deletepill(product.id)}>Delete</button></td>
          </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
    
}
export default HomePillDetail;