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
    const [Voucher, setVoucher] = useState([]);
    useEffect(() => {
        const fetchdata = async () => {
            try {
                const response = await axios.get("http://localhost:5231/api/Voucher/ShowVoucher");
                setVoucher(response.data);
            } catch (error) {
                console.log(error)
            }
        }
        fetchdata();
    }, [])
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
    const validateInput = (fieldname, value) => {
        const newErrors = { ...errors }
        if (fieldname === 'DiscountPercent') {
            newErrors[fieldname] = value.trim() === '' ? 'DiscountPercent is required' : '';
        } else if (fieldname === 'StartDate') {
            newErrors[fieldname] = value === null ? 'Start Date is required' : '';
        } else if (fieldname == 'EndDate') {
            newErrors[fieldname] = value == null ? 'EndDate is required' : '';
        } else if (fieldname == 'MinPrice') {
            newErrors[fieldname] = value.trim() === '' ? 'Min Price is required' : '';
        } else if (fieldname == 'Quantity') {
            newErrors[fieldname] = value.trim() === '' ? 'Quantity is required' : '';
        } else if (fieldname == 'UpdateDiscountPercent') {
            newErrors[fieldname] = value.trim() === '' ? 'DiscountPercent is required' : '';
        } else if (fieldname == 'UpdateMinPrice') {
            newErrors[fieldname] = value.trim() === '' ? 'Min Price is required' : '';
        } else if (fieldname == 'UpdateQuantity') {
            newErrors[fieldname] = value.trim() === '' ? 'Quantity is required' : '';
        }
        setErrors(newErrors)
    }
    const closingAnimation = {
        animation: 'flipright 0.5s',
    };
    const [FormData, setFormdata] = useState({
        DicountPercent: '',
        ExpireDate: null,
        Minprice: '',
        Quatity: '',
        StartDate: null,
        UpdateDicountPercent: '',
        updateStartDate: null,
        updateEndDate: null,
        updateMinPrice: '',
        UpdateQuatity: '',
        id: ''
    })
    const handleEditClick = (VoucherID) => {
        const selectedVoucher = Voucher.find(Voucher => Voucher.id == VoucherID);
        if (selectedVoucher) {
            FormData.id = VoucherID;
            FormData.UpdateDicountPercent = selectedVoucher.discountPercent;
            FormData.updateStartDate = selectedVoucher.startDate;
            FormData.updateEndDate = selectedVoucher.expireDate;
            FormData.updateMinPrice = selectedVoucher.minPrice;
            FormData.UpdateQuatity = selectedVoucher.quatity;
        }
        setPopupVisibility(true)
    }
    const deleteSubmit = async (CategoryID) => {
        try {
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
                const response = await axios.post(`http://localhost:5231/api/Voucher/delete/${CategoryID}`);
                if (response.status === 200) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Deletion successful',
                        showConfirmButton: false,
                        timer: 1500,
                    });
                    const response = await axios.get("http://localhost:5231/api/Voucher/ShowVoucher");
                    setVoucher(response.data);

                } else {
                    const responseBody = await response.json();
                    Swal.fire({
                        icon: 'error',
                        title: 'Deletion failed',
                        showConfirmButton: false,
                        timer: 1500,
                    });
                }
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Deletion failed',
                showConfirmButton: false,
                timer: 1500,
            });
        }
    }
    const handleStartDate = (date) => {
        const formattedDate = date.toISOString().split('T')[0];
        setFormdata({ ...FormData, StartDate: formattedDate });

    }
    const handleUpdateStartDate = (date) => {
        const formattedDate = date.toISOString().split('T')[0];
        setFormdata({ ...FormData, updateStartDate: formattedDate });

    }

    const handleUpdate = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch(`http://localhost:5231/api/Voucher/update/${FormData.id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    discountPercent: FormData.UpdateDicountPercent,
                    expireDate: FormData.updateEndDate,
                    minPrice: FormData.updateMinPrice,
                    quatity: FormData.UpdateQuatity,
                    startDate: FormData.updateStartDate
                })
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
            } else {
                Swal.fire({
                    icon: 'success',
                    title: 'Update Successfully',
                    showConfirmButton: false,
                    timer: 1500,
                });
                FormData.id = '';
                FormData.UpdateDicountPercent = '';
                FormData.updateStartDate = '';
                FormData.updateEndDate = '';
                FormData.updateMinPrice = '';
                FormData.UpdateQuatity = '';
                const response = await axios.get("http://localhost:5231/api/Voucher/ShowVoucher");
                setVoucher(response.data);
                setPopupVisibility(false)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const handleEndDate = (date) => {
        const formattedDate1 = date.toISOString().split('T')[0];
        setFormdata({ ...FormData, EndDate: formattedDate1 });
    }
    const handleUpdateEndDate = (date) => {
        const formattedDate1 = date.toISOString().split('T')[0];
        setFormdata({ ...FormData, updateEndDate: formattedDate1 });
    }
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (FormData.DicountPercent == '' || FormData.EndDate === null || FormData.StartDate === null || FormData.Minprice == '' && FormData.Quatity == '') {
            Swal.fire({
                icon: 'error',
                title: 'Please complete all information',
                showConfirmButton: false,
                timer: 1500,
            });
        } else {
            try {
                const response = await fetch("http://localhost:5231/api/Voucher/Add", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ discountPercent: FormData.DicountPercent, expireDate: FormData.EndDate, minPrice: FormData.Minprice, quatity: FormData.Quatity, startDate: FormData.StartDate })
                })
                if (response.ok) {
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
                    const response = await axios.get("http://localhost:5231/api/Voucher/ShowVoucher");
                    setVoucher(response.data);
                }
            } catch (error) {
                console.log(error);
            }
        }

    }
    const handleClosepopup = () => {
        setIsClosingPopup(true);
        setTimeout(() => {
            FormData.id = '';
            FormData.UpdateDicountPercent = '';
            FormData.updateStartDate = '';
            FormData.updateEndDate = '';
            FormData.updateMinPrice = '';
            FormData.UpdateQuatity = '';

            setPopupVisibility(false)
            setIsClosingPopup(false)
        }, 500);
    }
    const filterVoucher = Voucher.filter(voucher => (
        voucher.voucherCode.toLowerCase().includes(searchTerm.toLowerCase())
    ))
    const indexOflastgen = (currentPage + 1) * perPage;
    const indexOfFirtgen = indexOflastgen - perPage;
    const currentGender = filterVoucher.slice(indexOfFirtgen, indexOflastgen)
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
                                <p className='text-white'>{username}</p>

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
                            <li className="active treeview">
                                <a className='cursor-pointer' onClick={() => navigate('/Category_Blog', { state: { username: username, ID: ID } })}>
                                    <i class="fa fa-list-alt" aria-hidden="true"></i> <span>Category Blog</span>
                                </a>

                            </li>
                            <li className="active treeview">
                                <a className='cursor-pointer' onClick={() => navigate('/Blog', { state: { username: username, ID: ID } })}>
                                    <i class="fa fa-list-alt" aria-hidden="true"></i> <span> Blog</span>
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
                                            <input type='number' min={1} onBlur={() => validateInput('DiscountPercent', FormData.DicountPercent)} className="form-control" value={FormData.DicountPercent} onChange={(e) => setFormdata({ ...FormData, DicountPercent: e.target.value })} id="exampleInputEmail1" placeholder="Enter Discount Percent" />
                                            {errors.DiscountPercent && (
                                                <p className="text-red-500 text-sm italic">{errors.DiscountPercent}</p>
                                            )}
                                        </div>

                                        <div className="form-group">
                                            <label >Start Date</label>
                                            <DatePicker name='Birthday' dateFormat="dd/MM/yyyy" onBlur={() => validateInput('StartDate', FormData.StartDate)}
                                                value={FormData.StartDate}

                                                selected={FormData.StartDate ? new Date(FormData.StartDate) : null}
                                                onChange={handleStartDate}
                                                minDate={new Date()} className="form-control"
                                                placeholderText="Select Start Date"

                                            // Cannot select a date before startDate
                                            />

                                            {errors.StartDate && (
                                                <p className="text-red-500 text-sm italic">{errors.StartDate}</p>
                                            )}
                                        </div>
                                        <div className="form-group">
                                            <label >End Date</label>
                                            <DatePicker dateFormat="dd/MM/yyyy"
                                                name='Birthday'
                                                onBlur={() => validateInput('EndDate', FormData.EndDate)}
                                                selected={FormData.EndDate ? new Date(FormData.EndDate) : null}
                                                onChange={handleEndDate}
                                                minDate={FormData.StartDate ? new Date(FormData.StartDate) : null}
                                                filterDate={(date) => date >= (FormData.StartDate ? new Date(FormData.StartDate) : null)}
                                                className="form-control"
                                                placeholderText="Select Release Date"

                                            // Cannot select a date before startDate
                                            />

                                            {errors.EndDate && (
                                                <p className="text-red-500 text-sm italic">{errors.EndDate}</p>
                                            )}
                                        </div>
                                        <div className="form-group">
                                            <label >Min price</label>
                                            <input type='number' onBlur={() => validateInput('MinPrice', FormData.Minprice)} min={1} value={FormData.Minprice} onChange={(e) => setFormdata({ ...FormData, Minprice: e.target.value })} className="form-control" id="exampleInputEmail1" placeholder="Enter Min Price" />
                                            {errors.MinPrice && (
                                                <p className="text-red-500 text-sm italic">{errors.MinPrice}</p>
                                            )}

                                        </div>
                                        <div className="form-group">
                                            <label >Quantity</label>
                                            <input type='number' onBlur={() => validateInput('Quantity', FormData.Quatity)} min={1} value={FormData.Quatity} onChange={(e) => setFormdata({ ...FormData, Quatity: e.target.value })} className="form-control" id="exampleInputEmail1" placeholder="Enter Quantity" />
                                            {errors.Quantity && (
                                                <p className="text-red-500 text-sm italic">{errors.Quantity}</p>
                                            )}

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
                                                <th>Code</th>
                                                <th>Discount Percent</th>
                                                <th>Start Date</th>
                                                <th>Expire Date</th>
                                                <th>Min Price</th>
                                                <th>Quatity</th>
                                                <th>Update</th>
                                                <th>Delete</th>
                                            </tr>
                                        </thead>
                                        <tbody>

                                            {filterVoucher.map((voucher, index) => (
                                                <tr key={voucher.id}>
                                                    <td>{index + 1}</td>
                                                    <td>{voucher.voucherCode}</td>
                                                    <td>{voucher.discountPercent}</td>
                                                    <td>{new Date(voucher.startDate).toLocaleString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</td>
                                                    <td>{new Date(voucher.expireDate).toLocaleString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</td>
                                                    <td>{voucher.minPrice}$</td>
                                                    <td>{voucher.quatity}</td>
                                                    <td><button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => handleEditClick(voucher.id)}>Edit</button></td>
                                                    <td><button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={() => deleteSubmit(voucher.id)}>Remove</button></td>
                                                </tr>
                                            ))}
                                        </tbody>

                                    </table>
                                    <Pagination
                                        previousLabel={'previous'}
                                        nextLabel={'next'}
                                        breakLabel={'...'}
                                        pageCount={Math.ceil(filterVoucher.length / perPage)}
                                        marginPagesDisplayed={2}
                                        pageRangeDisplayed={5}
                                        onPageChange={handlePageclick}
                                        containerClassName={'pagination'}
                                        activeClassName={'active'}
                                        previousClassName={'page-item'}
                                        previousLinkClassName={'page-link'}
                                        nextClassName={'page-item'}
                                        nextLinkClassName={'page-link'}
                                        breakClassName={'page-item'}
                                        breakLinkClassName={'page-link'}
                                        pageClassName={'page-item'}
                                        pageLinkClassName={'page-link'}

                                    />

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
                {isPopupVisible && (
                    <div className="popup-container">

                        <div className="popup-content" style={IsClosingPopup ? { ...popupContentStyle, ...closingAnimation } : popupContentStyle}>
                            <div className='flex justify-end'>
                                <button onClick={handleClosepopup} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded float-right "><i className="fas fa-times"></i></button>
                            </div>

                            <div >

                                <h3 className="box-title">Edit Movie</h3>
                            </div>
                            <form role="form" onSubmit={handleUpdate} >
                                <div className="box-body">
                                    {/* Form fields go here */}
                                    <div className="form-group">
                                        <label className='float-left'>Discount Percent</label>
                                        <input name='UpdateNameCategory' onBlur={() => validateInput('UpdateDiscountPercent', FormData.UpdateDicountPercent)} value={FormData.UpdateDicountPercent} onChange={(e) => setFormdata({ ...FormData, UpdateDicountPercent: e.target.value })} className="form-control" />
                                        {errors.UpdateDiscountPercent && (
                                            <p className="text-red-500 text-sm italic">{errors.UpdateDiscountPercent}</p>
                                        )}
                                    </div>
                                    <div className="form-group">
                                        <label >Start Date</label>
                                        <DatePicker name='Birthday' dateFormat="dd/MM/yyyy"
                                            value={FormData.updateStartDate}

                                            selected={FormData.updateStartDate ? new Date(FormData.updateStartDate) : null}
                                            onChange={handleUpdateStartDate}
                                            minDate={new Date()} className="form-control"
                                            placeholderText="Select Start Date"

                                        // Cannot select a date before startDate
                                        />


                                    </div>
                                    <div className="form-group">
                                        <label >End Date</label>
                                        <DatePicker dateFormat="dd/MM/yyyy"
                                            name='Birthday'

                                            selected={FormData.updateEndDate ? new Date(FormData.updateEndDate) : null}
                                            onChange={handleUpdateEndDate}
                                            minDate={FormData.updateStartDate ? new Date(FormData.updateStartDate) : null}
                                            filterDate={(date) => date >= (FormData.updateStartDate ? new Date(FormData.updateStartDate) : null)}
                                            className="form-control"
                                            placeholderText="Select Release Date"

                                        // Cannot select a date before startDate
                                        />


                                    </div>
                                    <div className="form-group">
                                        <label className='float-left'>Min price</label>
                                        <input type='number' value={FormData.updateMinPrice} onBlur={() => validateInput('UpdateMinPrice', FormData.updateMinPrice)} onChange={(e) => setFormdata({ ...FormData, updateMinPrice: e.target.value })} className="form-control" id="exampleInputEmail1" placeholder="Enter Min Price" />

                                        {errors.UpdateMinPrice && (
                                            <p className="text-red-500 text-sm italic">{errors.UpdateMinPrice}</p>
                                        )}
                                    </div>
                                    <div className="form-group">
                                        <label >Quantity</label>
                                        <input type='number' value={FormData.UpdateQuatity} onBlur={() => validateInput('UpdateQuantity', FormData.UpdateQuatity)} onChange={(e) => setFormdata({ ...FormData, UpdateQuatity: e.target.value })} className="form-control" id="exampleInputEmail1" placeholder="Enter Quantity" />
                                        {errors.UpdateQuantity && (
                                            <p className="text-red-500 text-sm italic">{errors.UpdateQuantity}</p>
                                        )}

                                    </div>
                                </div>

                                <div className="box-footer">
                                    <button type="submit" className="btn btn-primary">
                                        Update
                                    </button>
                                </div>
                            </form>


                        </div>
                    </div>
                )}
            </div>
        </div>


    )
}
export default Voucher;