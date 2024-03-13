import React from "react";
import image from '../face11.jpg';
import { useEffect, useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import Swal from 'sweetalert2';
import DatePicker from 'react-datepicker';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from "axios";
function Edit() {
    const location = useLocation();
    const navigate = useNavigate();
    const ID = location.state?.ID || '';
    const [username, setUsername] = useState(location.state?.username || 'Default Username');
    const [showDropdown, setShowDropdown] = useState(false);
    const handleDropdownToggle = () => {
        setShowDropdown(!showDropdown);
    };
   const [userData,setUserData]=useState({
    Username:'',
    FullName:'',
    Email:'',
    Phone:'',
    Birthday:null
   });
   useEffect(()=>{
    const fetchdata=async()=>{
        try{
            const response=await axios.get(`http://localhost:5231/api/Account/getAccount/${ID}`)
          setUserData({
            Username:response.data.username,
            FullName:response.data.fullName,
            Email:response.data.email,
            Phone:response.data.phone,
            Birthday:response.data.birthday,
          })
          
        
          
        }catch(error){

        }
    }
    fetchdata();
   },[])
   const handleDateChange=(date)=>{
    const formattedDate = date.toISOString().split('T')[0];
    setUserData({ ...userData, Birthday: formattedDate });
   }
   const handleUpdateSubmit=async (e)=>{
    e.preventDefault();
   
    try{
        const response=await fetch(`http://localhost:5231/api/Account/updateAccount/${ID}`,{
            method:'POST',
            headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({username:userData.Username,email:userData.Email,phone:userData.Phone,birthday:userData.Birthday,fullName:userData.FullName})
        })
        if (!response.ok) {
            const responseBody = await response.json();
            if (responseBody.message) {
              Swal.fire({
                icon: 'error',
                title: responseBody.message || 'Failed to add genre',
                showConfirmButton: false,
                timer: 1500,
              });
            }
        }else{
            Swal.fire({
                icon: 'success',
                title: 'update success',
                showConfirmButton: false,
                timer: 1500,
              })
              const accountResponse = await axios.get(`http://localhost:5231/api/Account/getAccount/${ID}`);
              const updatedUsername = accountResponse.data.username;
  
              // Update the 'username' variable
              setUsername(updatedUsername);
              setUserData({
                  Username: updatedUsername,
                  FullName: accountResponse.data.fullName,
                  Email: accountResponse.data.email,
                  Phone: accountResponse.data.phone,
                  Birthday: accountResponse.data.birthday,
              });
        }
      
    }catch(error){
        console.log(error)
    }
   }
    return (
        <div>


            <div className="wrapper">



                <header className="main-header" style={{ zIndex: '20' }}>

                    <a href="index2.html" className="logo"><b>Admin</b>LTE</a>

                    <nav className="navbar navbar-static-top" role="navigation">
                        <a href="#" className="sidebar-toggle" data-toggle="offcanvas" role="button">
                            <span className="sr-only">Toggle navigation</span>
                        </a>

                        {/* Logo */}
                        <a className="navbar-brand cursor-pointer" onClick={handleDropdownToggle}>
                            <img src={image} className="user-image" alt="Logo" />
                            {/* You can also add text or other elements alongside the logo */}
                            {username}
                            &nbsp;
                            <i className="fa fa-chevron-circle-down"></i>
                        </a>
                        {showDropdown && (
                            <div className="dropdown">
                                <a href="#" onClick={() => navigate('/Account')}>
                                    <i className="fa fa-sign-out" aria-hidden="true"></i> Logout
                                </a>
                                <a href="/account">
                                    <i className="fa fa-user" aria-hidden="true"></i> Account
                                </a>

                                {/* Các mục khác của dropdown có thể được thêm vào đây */}
                            </div>
                        )}
                    </nav>
                </header>

                <aside className="main-sidebar " style={{ zIndex: '10' }}>

                    <section className="sidebar h-auto">

                        <div className="user-panel">
                            <div className="pull-left image">
                                <img src={image} className="img-circle" alt="User Image" />
                            </div>
                            <div className="pull-left info">
                                <p className='text-white'>Alexander Pierce</p>

                                <a href="#" className='text-white'><i className="fa fa-circle text-green-500"></i> Online</a>
                            </div>
                        </div>



                        <ul className="sidebar-menu">
            <li className="header">MAIN NAVIGATION</li>
            <li className="active treeview">
              <a href="" onClick={() => navigate('/admin', { state: { username: username, ID: ID } })}>
                <i className="fa fa-dashboard" ></i> <span>Dashboard</span>
              </a>

            </li>
            <li className="active treeview">
              <a href="" onClick={() => navigate('/Genre', { state: { username: username, ID: ID } })}>
                <i class="fas fa-film"></i> <span>Genre</span>
              </a>

            </li>
            <li className="active treeview">
              <a className='cursor-pointer' onClick={() => navigate('/Category_Movie', { state: { username: username, ID: ID } })}>
                <i class="fa fa-list-alt" aria-hidden="true"></i> <span>Category Movie</span>
              </a>

            </li>
            <li className="active treeview">
              <a className='cursor-pointer' onClick={() => navigate('/Movie', { state: { username: username, ID: ID } })}>
                <i class="fa fa-list-alt" aria-hidden="true"></i> <span>Movie</span>
              </a>

            </li>
            <li className="active treeview">
              <a className='cursor-pointer' onClick={() => navigate('/actor', { state: { username: username, ID: ID } })}>
                <i class="fa fa-list-alt" aria-hidden="true"></i> <span>Actor</span>
              </a>

            </li>
            <li className="active treeview">
              <a className='cursor-pointer' onClick={() => navigate('/Showtimes', { state: { username: username, ID: ID } })}>
                <i class="fa fa-list-alt" aria-hidden="true"></i> <span>Showtimes</span>
              </a>

            </li>
            <li className="active treeview">
              <a className='cursor-pointer' onClick={() => navigate('/Event', { state: { username: username, ID: ID } })}>
                <i class="fa fa-list-alt" aria-hidden="true"></i> <span>Event</span>
              </a>

            </li>
            <li className="active treeview">
              <a className='cursor-pointer' onClick={() => navigate('/Voucher', { state: { username: username, ID: ID } })}>
                <i class="fa fa-list-alt" aria-hidden="true"></i> <span>Voucher</span>
              </a>

            </li>
            <li className="active treeview">
              <a className='cursor-pointer' onClick={() => navigate('/Order', { state: { username: username, ID: ID } })}>
                <i class="fa fa-list-alt" aria-hidden="true"></i> <span>Order</span>
              </a>

            </li>



          </ul>
                    </section>

                </aside>


                <div className="content-wrapper">
                    <section className="content-header">
                        <h1>
                            Account

                        </h1>
                        <ol className="breadcrumb">
                            <li><a href="#"><i className="fa fa-dashboard"></i> Home</a></li>
                            <li><a href="#">Account</a></li>
                        </ol>
                    </section>
                    <section className="content">
                        <div className="row">
                            <div className="box box-primary" style={{ maxHeight: '542px' }}>
                                <div className="box-header">
                                    <h3 className="box-title">Account</h3>
                                </div>
                                <form role="form" onSubmit={handleUpdateSubmit} >
                                    <div className="box-body">
                                        {/* Form fields go here */}
                                        <div className="form-group">
                                            <label >Full Name</label>
                                            <input className="form-control" value={userData.FullName} onChange={(e)=>setUserData({...userData,FullName:e.target.value})} id="exampleInputEmail1" placeholder="Enter Full Name" />

                                        </div>
                                        <div className="form-group">
                                            <label >UserName</label>
                                            <input className="form-control" value={userData.Username} onChange={(e)=>setUserData({...userData,Username:e.target.value})} id="exampleInputEmail1" placeholder="Enter Username" />

                                        </div>
                                        <div className="form-group">
                                            <label >Email</label>
                                            <input value={userData.Email} onChange={(e)=>setUserData({...userData,Email:e.target.value})} className="form-control" id="exampleInputEmail1" placeholder="Enter Email" />

                                        </div>
                                        <div className="form-group">
                                            <label >Phone</label>
                                            <input value={userData.Phone} onChange={(e)=>setUserData({...userData,Phone:e.target.value})} className="form-control" id="exampleInputEmail1" placeholder="Enter Phone" />

                                        </div>
                                        <div className="form-group">
                                            <label >Birthday</label>
                                            <br />
                                            <DatePicker selected={userData.Birthday ? new Date(userData.Birthday) : null} onChange={handleDateChange}  name='Birthday' dateFormat="dd/MM/yyyy"

                                                className="form-control"
                                                placeholderText="Enter Birthday"
                                            // Cannot select a date before startDate
                                            />

                                        </div>


                                    </div>

                                    <div className="box-footer">
                                        <button type="submit" className="btn btn-primary">
                                            Submit
                                        </button>
                                    </div>
                                </form>
                            </div>

                            {/* Additional boxes go here */}
                        </div>
                    </section>
                </div>

                <footer className="main-footer">
                    <div className="pull-right hidden-xs">
                        <b>Version</b> 2.0
                    </div>
                    <strong>Copyright &copy; 2014-2015 <a href="http://almsaeedstudio.com">Almsaeed Studio</a>.</strong> All rights reserved.
                </footer>

            </div>
        </div>
    )

}
export default Edit;