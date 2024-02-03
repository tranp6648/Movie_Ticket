import image from '../face11.jpg';
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import DatePicker from 'react-datepicker';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import ReactQuill from 'react-quill';
import '../Admin/admin.css';
import Pagination from 'react-paginate';
import 'react-paginate/theme/basic/react-paginate.css';
function Voucher() {

    const [showDropdown, setShowDropdown] = useState(false);
    const location = useLocation();
    const username = location.state?.username || 'Default Username';
    const ID = location.state?.ID || '';

    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [updatename, setupdatename] = useState('');
    const [id, setid] = useState('');
    const [Gen, setGen] = useState([]);
    const [perPage, setperPage] = useState(5);
    const [searchTerm, setSearchtem] = useState('');
    const [currentPage, setCurrentPage] = useState(0);
    const [IsClosingPopup, setIsClosingPopup] = useState(false);
    const [isPopupVisible, setPopupVisibility] = useState(false);
    const handlePageclick = (data) => {
        setCurrentPage(data.selected);
    };
    const handleDropdownToggle = () => {
        setShowDropdown(!showDropdown);
    };
    const popupContentStyle = {
        background: 'white',
        padding: '20px',
        maxWidth: '400px',
        textAlign: 'center',
        borderRadius: '8px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        animation: 'flipleft 0.5s', // Default animation
    };
    const [errors, setErrors] = useState({});

    const closingAnimation = {
        animation: 'flipright 0.5s',
    };
    const [FormData, setFormdata] = useState({
        DicountPercent: '',
        ExpireDate: null,
        Minprice: '',
        Quatity: '',
        StartDate: null
    })
    const handleStartDate = (date) => {
        const formattedDate = date.toISOString().split('T')[0];
        setFormdata({ ...FormData, StartDate: formattedDate });

    }

    const handleEndDate = (date) => {
        const formattedDate1 = date.toISOString().split('T')[0];
        setFormdata({ ...FormData, EndDate: formattedDate1 });
    }
    const handleSubmit=async (event)=>{
        event.preventDefault();
        try{
            const response=await fetch("http://localhost:5231/api/Voucher/Add",{
                method:'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body:JSON.stringify({discountPercent:FormData.DicountPercent,expireDate:FormData.EndDate,minPrice:FormData.Minprice,quatity:FormData.Quatity,startDate:FormData.StartDate})
            })
            if(response.ok){
                Swal.fire({
                    icon: 'success',
                    title: 'Add Voucher success',
                    showConfirmButton: false,
                    timer: 1500,
                })
             setFormdata({
                DicountPercent: '',
                ExpireDate: null,
                Minprice: '',
                Quatity: '',
                StartDate: null
             })
            }
        }catch(error){
            console.log(error);
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
                            <li className="treeview text-white">
                                <a className='cursor-pointer' onClick={() => navigate('/admin', { state: { username: username, ID: ID } })}>
                                    <i className="fa fa-dashboard" ></i> <span>Dashboard</span>
                                </a>
                                <a className='cursor-pointer' onClick={() => navigate('/Genre', { state: { username: username, ID: ID } })}>
                                    <i class="fas fa-film"></i> <span>Genre</span>
                                </a>
                                <a className='cursor-pointer' onClick={() => navigate('/Category_Movie', { state: { username: username, ID: ID } })}>
                                    <i class="fa fa-list-alt" aria-hidden="true"></i> <span>Category Movie</span>
                                </a>
                            </li>

                        </ul>
                    </section>

                </aside>


                <div className="content-wrapper">
                    <section className="content-header">
                        <h1>
                            Voucher

                        </h1>
                        <ol className="breadcrumb">
                            <li><a href="#"><i className="fa fa-dashboard"></i> Home</a></li>
                            <li><a href="#">Voucher</a></li>
                        </ol>
                    </section>
                    <section className="content">
                        <div className="row">
                            <div className="box box-primary" style={{ maxHeight: 'auto' }}>
                                <div className="box-header">
                                    <h3 className="box-title">Voucher</h3>
                                </div>
                                <form role="form" onSubmit={handleSubmit} >
                                    <div className="box-body">
                                        {/* Form fields go here */}
                                        <div className="form-group">
                                            <label >Discount Percent</label>
                                            <input type='number' className="form-control" value={FormData.DicountPercent} onChange={(e) => setFormdata({ ...FormData, DicountPercent: e.target.value })} id="exampleInputEmail1" placeholder="Enter Discount Percent" />

                                        </div>

                                        <div className="form-group">
                                            <label >Start Date</label>
                                            <DatePicker name='Birthday' dateFormat="dd/MM/yyyy"
                                                value={FormData.StartDate}

                                                selected={FormData.StartDate ? new Date(FormData.StartDate) : null}
                                                onChange={handleStartDate}
                                                minDate={new Date()} className="form-control"
                                                placeholderText="Select Start Date"

                                            // Cannot select a date before startDate
                                            />


                                        </div>
                                        <div className="form-group">
                                            <label >End Date</label>
                                            <DatePicker dateFormat="dd/MM/yyyy"
                                                name='Birthday'

                                                selected={FormData.EndDate ? new Date(FormData.EndDate) : null}
                                                onChange={handleEndDate}
                                                minDate={FormData.StartDate ? new Date(FormData.StartDate) : null}
                                                filterDate={(date) => date >= (FormData.StartDate ? new Date(FormData.StartDate) : null)}
                                                className="form-control"
                                                placeholderText="Select Release Date"

                                            // Cannot select a date before startDate
                                            />


                                        </div>
                                        <div className="form-group">
                                            <label >Min price</label>
                                            <input type='number' value={FormData.Minprice} onChange={(e) => setFormdata({ ...FormData, Minprice: e.target.value })} className="form-control" id="exampleInputEmail1" placeholder="Enter Min Price" />


                                        </div>
                                        <div className="form-group">
                                            <label >Quantity</label>
                                            <input type='number' value={FormData.Quatity} onChange={(e) => setFormdata({ ...FormData, Quatity: e.target.value })}  className="form-control" id="exampleInputEmail1" placeholder="Enter Quantity" />


                                        </div>


                                    </div>

                                    <div className="box-footer">
                                        <button type="submit" className="btn btn-primary">
                                            Submit
                                        </button>
                                    </div>
                                </form>
                            </div>
                            <div className="box">
                                <div className="box-header">
                                    <h3 className="box-title">List Genre</h3>
                                </div>
                                <div className="flex items-center space-x-4 float-left flex-1 mb-2 ml-2">
                                    <label for="search" className="text-gray-600">Search</label>
                                    <input type="text" id="search" name="search" value={searchTerm} onChange={(e) => setSearchtem(e.target.value)} placeholder="Enter your search term" className="border border-gray-300 px-3 py-1 rounded-md focus:outline-none focus:border-blue-500" />
                                </div>


                                <div className="box-body">
                                    <table id="example1" className="table table-bordered table-striped">
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>Tittle</th>
                                                <th>StartDate</th>
                                                <th>EndDate</th>
                                                <th>Banner</th>
                                                <th>Update</th>
                                                <th>Delete</th>
                                            </tr>
                                        </thead>
                                        <tbody>


                                        </tbody>

                                    </table>


                                </div>
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
export default Voucher;