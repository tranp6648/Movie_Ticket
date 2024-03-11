import image from '../face11.jpg';
import { useEffect, useState } from 'react';
import { Form, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import ReactQuill from 'react-quill';
import '../Admin/admin.css';
import 'react-datepicker/dist/react-datepicker.css';
import Pagination from 'react-paginate';
import DatePicker from 'react-datepicker';
import 'react-paginate/theme/basic/react-paginate.css';
import Select from 'react-select';
import 'react-quill/dist/quill.snow.css';

function Category_Blog() {


    const location = useLocation();
    const username = location.state?.username || 'Default Username';
    const ID = location.state?.ID || '';

    const navigate = useNavigate();



    const [perPage, setperPage] = useState(5);
    const [searchTerm, setSearchtem] = useState('');
    const [currentPage, setCurrentPage] = useState(0);
    const [IsClosingPopup, setIsClosingPopup] = useState(false);

    const [isPopupVisible, setPopupVisibility] = useState(false);

    const [Actor, setActor] = useState([]);
    const closingAnimation = {
        animation: 'flipright 0.5s',
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
    const validateInput = (filename, value) => {
        const newErrors = { ...errors }
        if (filename == 'Name') {
            newErrors[filename] = value.trim() === '' ? 'Name is required' : '';
        } else if (filename == 'UpdateName') {
            newErrors[filename] = value.trim() === '' ? 'Name is required' : '';
        }


        setErrors(newErrors)
    }
    const [showDropdown, setShowDropdown] = useState(false);
    const [categoryBlog, setcategoryBlog] = useState([]);
    const handleDropdownToggle = () => {
        setShowDropdown(!showDropdown);
    };
    useEffect(() => {
        const fetchdata = async () => {
            try {
                const categoryBlog = await axios.get("http://localhost:5231/api/CategoryBlog/ShowCategoryBlog");
                setcategoryBlog(categoryBlog.data);
            } catch (error) {
                console.log(error)
            }
        }
        fetchdata();
    }, [])

    const [FormData, setFormData] = useState({
        Name: '',
        id: '',
        UpdateName: ''
    })
    const handleUpdateCategory = async (event) => {
        event.preventDefault();
        if (FormData.UpdateName == '') {
            Swal.fire({
                icon: 'error',
                title: 'Name is required',
                showConfirmButton: false,
                timer: 1500,
            });
        } else {
            try {
                const response = await fetch(`http://localhost:5231/api/CategoryBlog/UpdateCategoryBlog/${FormData.id}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ name: FormData.UpdateName })
                })
                if (response.ok) {
                    Swal.fire({
                        icon: 'success',
                        title: 'update Category Blog success',
                        showConfirmButton: false,
                        timer: 1500,
                    })
                    FormData.id = '';
                    FormData.UpdateName = '';
                    const categoryBlog = await axios.get("http://localhost:5231/api/CategoryBlog/ShowCategoryBlog");
                    setcategoryBlog(categoryBlog.data);
                    setPopupVisibility(false);
                    setErrors('')
                } else {
                    const responseBody = await response.json();
                    if (responseBody.message) {
                        Swal.fire({
                            icon: 'error',
                            title: responseBody.message,
                            showConfirmButton: false,
                            timer: 1500,
                        });
                    }
                }
            } catch (error) {
                console.log(error)
            }
        }

    }
    const handleEditClick = (MovieID) => {
        const selectedMovie = categoryBlog.find(Movie => Movie.id == MovieID)
        if (selectedMovie) {
            FormData.id = MovieID
            FormData.UpdateName = selectedMovie.name
            setErrors('')
        }

        setPopupVisibility(true)

    }
    const handleupdate = async (event) => {
        event.preventDefault();
        if (FormData.Name == '') {
            Swal.fire({
                icon: 'error',
                title: 'Name is required',
                showConfirmButton: false,
                timer: 1500,
            });
        } else {
            try {
                const response = await fetch("http://localhost:5231/api/CategoryBlog/Add", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ name: FormData.Name })
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
                        title: 'Add Genre success',
                        showConfirmButton: false,
                        timer: 1500,
                    })
                    FormData.Name = '';
                    const categoryBlog = await axios.get("http://localhost:5231/api/CategoryBlog/ShowCategoryBlog");
                    setcategoryBlog(categoryBlog.data);
                }

            } catch (error) {
                console.log(error);
            }
        }



    }


    const filterActor = categoryBlog.filter(gen =>

        gen.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
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
                const response = await axios.post(`http://localhost:5231/api/CategoryBlog/Delete/${CategoryID}`);
                if (response.status === 200) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Deletion successful',
                        showConfirmButton: false,
                        timer: 1500,
                    });
                    const categoryBlog = await axios.get("http://localhost:5231/api/CategoryBlog/ShowCategoryBlog");
                    setcategoryBlog(categoryBlog.data);
                } else {
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
                icon: 'error1',
                title: 'Deletion failed',
                showConfirmButton: false,
                timer: 1500,
            });
        }
    }
    const handleClosepopup = () => {
        setIsClosingPopup(true);
        setTimeout(() => {

            FormData.id = '';
            FormData.UpdateName = '';
            setPopupVisibility(false)
            setIsClosingPopup(false)
        }, 500);
    }

    const handlePageclick = (data) => {
        setCurrentPage(data.selected);
    };
    const indexOflastgen = (currentPage + 1) * perPage;
    const indexOfFirtgen = indexOflastgen - perPage;
    const currentGender = filterActor.slice(indexOfFirtgen, indexOflastgen)
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
                            Category Blog

                        </h1>
                        <ol className="breadcrumb">
                            <li><a href="#"><i className="fa fa-dashboard"></i> Home</a></li>
                            <li><a href="#">Category Blog</a></li>
                        </ol>
                    </section>
                    <section className="content">
                        <div className="row">
                            <div className="box box-primary" style={{ maxHeight: 'auto' }}>
                                <div className="box-header">
                                    <h3 className="box-title">Actor</h3>
                                </div>
                                <form role="form" onSubmit={handleupdate}>
                                    <div className="box-body">
                                        {/* Form fields go here */}
                                        <div className="form-group" >
                                            <label >Name</label>
                                            <input className="form-control" id="exampleInputEmail1" placeholder="Enter Name Blog" value={FormData.Name} onChange={(e) => setFormData({ ...FormData, Name: e.target.value })} onBlur={() => validateInput('Name', FormData.Name)} />
                                            {errors.Name && (
                                                <p className="text-red-500 text-sm italic">{errors.Name}</p>
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
                                    <h3 className="box-title">List Actor</h3>
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
                                                <th>Name</th>

                                                <th>Edit</th>
                                                <th>Remove</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {currentGender.map((categoryBlog, index) => (
                                                <tr>
                                                    <td>{index + 1}</td>
                                                    <td>{categoryBlog.name}</td>
                                                    <td><button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => handleEditClick(categoryBlog.id)}>Edit</button></td>
                                                    <td><button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={() => deleteSubmit(categoryBlog.id)}>Remove</button></td>
                                                </tr>
                                            ))}


                                        </tbody>

                                    </table>
                                    <Pagination
                                        previousLabel={'previous'}
                                        nextLabel={'next'}
                                        breakLabel={'...'}
                                        pageCount={Math.ceil(filterActor.length / perPage)}
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


                            </div>
                            <form role="form" onSubmit={handleUpdateCategory}>
                                <div className="box-body">
                                    {/* Form fields go here */}
                                    <div className="form-group">
                                        <label className='float-left'>Name</label>
                                        <input name='UpdateNameCategory' className="form-control" value={FormData.UpdateName} onChange={(e) => setFormData({ ...FormData, UpdateName: e.target.value })} onBlur={() => validateInput('UpdateName', FormData.UpdateName)} />
                                        {errors.UpdateName && (
                                            <p className="text-red-500 text-sm italic">{errors.UpdateName}</p>
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
export default Category_Blog;