import React, { useState } from 'react';
import styled from 'styled-components';
import Swal from 'sweetalert2';
import 'bootstrap/dist/css/bootstrap.min.css';
function AddPillDetail(){
  const [pillDetail, setPillDetail]=useState({
    Username:'',
    Password:'',
    Email:'',
    Phone:''
  })
    const StyledFormContainer = styled.div`
  max-width: 400px;
  margin: auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const StyledLabel = styled.label`
  display: block;
  margin-bottom: 8px;
`;

const StyledInput = styled.input`
  width: 100%;
  padding: 8px;
  margin-bottom: 16px;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-sizing: border-box;
`;

const StyledTextArea = styled.textarea`
  width: 100%;
  padding: 8px;
  margin-bottom: 16px;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-sizing: border-box;
`;

const StyledButton = styled.button`
  background-color: #4caf50;
  color: #fff;
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;
  const handleImageUpload = (event) => {
    event.preventDefault();
    fetch('http://localhost:5231/api/Account/Add', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(pillDetail)
  })
      .then(response => response.json())
      .then(data => {
        Swal.fire({
          icon: "success",
          title: "Add success",
          showConfirmButton: false,
          timer: 1500
      });
          // Cập nhật giao diện hoặc thực hiện các hành động khác sau khi thêm thành công
      })
      .catch(error => {
          console.error('Error:', error);
          // Xử lý lỗi nếu có
      });
    
  }
  const handleInputChange = (e) => {
    setPillDetail({ ...pillDetail, [e.target.name]: e.target.value });
  }
return(
<div class="container py-5">
    <div class="row">
        <div class="col-md-12">
            <h2 class="text-center mb-5">Bootstrap 4 Register Form</h2>
            <div class="row">
                <div class="col-md-6 mx-auto">
                    <div class="card border-secondary">
                        <div class="card-header">
                            <h3 class="mb-0 my-2">Sign Up</h3>
                        </div>
                        <div class="card-body">
                            <form class="form" role="form" autocomplete="off" onSubmit={handleImageUpload}>
                                <div class="form-group">
                                    <label for="inputName">Username</label>
                                    <input type="text" class="form-control" value={FormData.Username} onChange={handleInputChange} id="inputName" name='Username' placeholder="full name"/>
                                </div>
                                <div class="form-group">
                                    <label for="inputEmail3">Email</label>
                                    <input type="email" class="form-control" value={FormData.Email} onChange={handleInputChange} name='Email' id="inputEmail3" placeholder="email@gmail.com" required=""/>
                                </div>
                                <div class="form-group">
                                    <label for="inputPassword3">Password</label>
                                    <input type="password" class="form-control" value={FormData.Password} onChange={handleInputChange} name='Password' id="inputPassword3" placeholder="password" title="At least 6 characters with letters and numbers" required=""/>
                                </div>
                                <div class="form-group">
                                    <label for="inputPassword3">Phone</label>
                                    <input type="number" class="form-control" value={FormData.Phone} onChange={handleInputChange} name='Phone' id="inputPassword3" placeholder="password" title="At least 6 characters with letters and numbers" required=""/>
                                </div>
                              
                                <div class="form-group">
                                    <button type="submit" class="btn btn-success btn-lg float-right">Register</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
         

        </div>
   
    </div>
 
</div>

)
}
export default AddPillDetail;