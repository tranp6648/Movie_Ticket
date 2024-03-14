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

function Blog() {


    const location = useLocation();
    const username = location.state?.username || 'Default Username';
    const ID = location.state?.ID || '';

    const navigate = useNavigate();


    const [ViewBlog, setViewBlog] = useState([]);
    useEffect(() => {
        const fetchdata = async () => {
            try {
                const categoryBlog = await axios.get("http://localhost:5231/api/Blog/ShowBlog");
                setViewBlog(categoryBlog.data);
            } catch (error) {
                console.log(error)
            }
        }
        fetchdata();
    }, [])

    const [perPage, setperPage] = useState(5);
    const [searchTerm, setSearchtem] = useState('');
    const [currentPage, setCurrentPage] = useState(0);
    const [IsClosingPopup, setIsClosingPopup] = useState(false);

    const [isPopupVisible, setPopupVisibility] = useState(false);


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
        if (filename === 'Title') {
            newErrors[filename] = value.trim() === '' ? 'Title is required' : '';
        } else if (filename === 'Content') {
            newErrors[filename] = value.trim() === '' ? 'Content is required' : '';
        } else if (filename === 'Category') {
            newErrors[filename] = value == null ? 'Category is required' : '';
        } else if (filename === 'picture') {
            newErrors[filename] = value == null ? 'Picture is required' : '';
        }
        setErrors(newErrors)
    }
    const [showDropdown, setShowDropdown] = useState(false);

    const handleDropdownToggle = () => {
        setShowDropdown(!showDropdown);
    };


    const [FormData, setFormData] = useState({
        Picture: null,
        Description: '',
        Name: '',
        id: '',
        updateName: '',
    

    })

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (FormData.Name == '' || FormData.Description == '' || selectedcategory == null || FormData.Picture == null) {
            Swal.fire({
                icon: 'error',
                title: "Please complete all information",
                showConfirmButton: false,
                timer: 1500,
            });
        } else {
            try {
                const response = await fetch("http://localhost:5231/api/Blog/AddBlog", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ title: FormData.Name, contentBlog: FormData.Description, idCategory: selectedcategory.value, idAccount: ID, imageUrl: FormData.Picture })

                })
                if (!response.ok) {
                    const responseBody = await response.json();
                    if (responseBody.message) {
                        Swal.fire({
                            icon: 'error',
                            title: responseBody.message || 'Failed to add Blog',
                            showConfirmButton: false,
                            timer: 1500,
                        });
                    }
                } else {
                    Swal.fire({
                        icon: 'success',
                        title: 'Add Blog success',
                        showConfirmButton: false,
                        timer: 1500,
                    })
                    setFormData({
                        Picture: null,
                        Description: '',
                        Name: ''
                    })
                    FormData.Name = ''
                    setSelectedcategory(null);
                    document.getElementById('imageInput').value = '';
                    const categoryBlog = await axios.get("http://localhost:5231/api/Blog/ShowBlog");
                    setViewBlog(categoryBlog.data);
                }
            } catch (error) {
                console.log(error)
            }
        }

    }

    const handleDescriptionChange = (value) => {
        setFormData({
            ...FormData,
            Description: value
        })
    }
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.type.startsWith("image/")) {
                const reader = new FileReader();
                reader.onloadend = () => {
                    setFormData({
                        ...FormData,
                        Picture: reader.result, // base64-encoded string
                    });
                };
                reader.readAsDataURL(file);
            } else {
                document.getElementById('imageInput').value = '';
                Swal.fire({
                    icon: 'error',
                    title: "Please select a valid image file",
                    showConfirmButton: false,
                    timer: 1500,
                });
            }

        }
    }
    const [Blog, setBlog] = useState([]);
    useEffect(() => {
        const fetchdata = async () => {
            try {
                const categoryBlog = await axios.get("http://localhost:5231/api/Blog/ShowCategory");
                setBlog(categoryBlog.data);
            } catch (error) {
                console.log(error)
            }
        }
        fetchdata();
    }, [])
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
                const selectedMovie = ViewBlog.find(Movie => Movie.id == CategoryID)
                if (selectedMovie && selectedMovie.idAccount == ID) {
                    const response = await axios.post(`http://localhost:5231/api/Blog/Delete/${CategoryID}`);
                    if (response.status === 200) {
                        Swal.fire({
                            icon: 'success',
                            title: 'Deletion successful',
                            showConfirmButton: false,
                            timer: 1500,
                        });
                        const categoryBlog = await axios.get("http://localhost:5231/api/Blog/ShowBlog");
                        setViewBlog(categoryBlog.data);
                    } else {
                        const responseBody = await response.json();
                        Swal.fire({
                            icon: 'error',
                            title: 'Deletion failed',
                            showConfirmButton: false,
                            timer: 1500,
                        });
                    }
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'You do not have permission to edit this Blog',
                        showConfirmButton: false,
                        timer: 1500,
                    });
                }
            }
        } catch (error) {
            console.log(error)
        }
    }
    const handleUpdate = async (event) => {

        event.preventDefault();
        if (FormData.updateName == '' ) {
            Swal.fire({
                icon: 'error',
                title: "Please complete all information",
                showConfirmButton: false,
                timer: 1500,
            });
        } else {
            try {
                const response = await fetch(`http://localhost:5231/api/Blog/UpdateBlog/${FormData.id}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ title: FormData.updateName, idCategory: updateselectedcategory.value || (updateselectedcategory.hasOwnProperty('value') ? updateselectedcategory.value : updateselectedcategory) })
                })
                if (response.ok) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Update Blog success',
                        showConfirmButton: false,
                        timer: 1500,
                    })
                    FormData.updateName = '';
       
                    setupdateselectedcategory(null);
                    setPopupVisibility(false);
                    const categoryBlog = await axios.get("http://localhost:5231/api/Blog/ShowBlog");
                    setViewBlog(categoryBlog.data);
                } else {
                    const responseBody = await response.json();
                    if (responseBody.message) {
                        Swal.fire({
                            icon: 'error',
                            title: responseBody.message || 'Failed to add Blog',
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
        const selectedMovie = ViewBlog.find(Movie => Movie.id == MovieID)
        if (selectedMovie && selectedMovie.idAccount == ID) {
            FormData.id = MovieID
            FormData.updateName = selectedMovie.title;
            FormData.UpdateContent = selectedMovie.content_Blog;

            setupdateselectedcategory(selectedMovie.idCategory);
            setPopupVisibility(true)

        } else {
            Swal.fire({
                icon: 'error',
                title: "It's not the person who created this blog who can't edit it",
                showConfirmButton: false,
                timer: 1500,
            });
        }



    }


    const filterActor = ViewBlog.filter(gen =>

        gen.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleClosepopup = () => {
        setIsClosingPopup(true);
        setTimeout(() => {

            FormData.id = '';
            FormData.updateName = '';
            setPopupVisibility(false)
            setIsClosingPopup(false)
        }, 500);
    }
    const handleupdatecategory = (selectedgenre) => {
        setupdateselectedcategory(selectedgenre);
    }
    const handlePageclick = (data) => {
        setCurrentPage(data.selected);
    };
    const [selectedcategory, setSelectedcategory] = useState(null);
    const [updateselectedcategory, setupdateselectedcategory] = useState(null);
    const handleCategoryChange = (selectedCategory) => {
        setSelectedcategory(selectedCategory);
    }
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
                            Blog

                        </h1>
                        <ol className="breadcrumb">
                            <li><a href="#"><i className="fa fa-dashboard"></i> Home</a></li>
                            <li><a href="#">Blog</a></li>
                        </ol>
                    </section>
                    <section className="content">
                        <div className="row">
                            <div className="box box-primary" style={{ maxHeight: 'auto' }}>
                                <div className="box-header">
                                    <h3 className="box-title">Blog</h3>
                                </div>
                                <form role="form" onSubmit={handleSubmit}>
                                    <div className="box-body">
                                        {/* Form fields go here */}
                                        <div className="form-group" >
                                            <label >title</label>
                                            <input className="form-control" id="exampleInputEmail1" placeholder="Enter Name Blog" value={FormData.Name} onChange={(e) => setFormData({ ...FormData, Name: e.target.value })} onBlur={() => validateInput('Title', FormData.Name)} />
                                            {errors.Title && (
                                                <p className="text-red-500 text-sm italic">{errors.Title}</p>
                                            )}
                                        </div>
                                        <div className="form-group">
                                            <label >Content</label>
                                            <ReactQuill
                                                theme="snow"
                                                onBlur={() => validateInput('Content', FormData.Description)}
                                                placeholder='Enter Description'
                                                onChange={handleDescriptionChange}
                                                value={FormData.Description}


                                            />

                                            {errors.Content && (
                                                <p className="text-red-500 text-sm italic">{errors.Content}</p>
                                            )}
                                        </div>
                                        <div className="form-group">
                                            <label >Category Blog</label>
                                            <Select options={Blog.map(genres => ({ value: genres.id, label: genres.name }))}
                                                onChange={(selectedoption) => handleCategoryChange(selectedoption)}
                                                value={selectedcategory}
                                                onBlur={() => validateInput('Category', selectedcategory)}
                                            />
                                            {errors.Category && (
                                                <p className="text-red-500 text-sm italic">{errors.Category}</p>
                                            )}

                                        </div>
                                        <div className='form-group'>
                                            <label htmlFor="">Image  </label>
                                            <input
                                                type="file"
                                                onChange={(e) => handleFileChange(e)}
                                                className="form-control"
                                                id='imageInput'
                                                onBlur={() => validateInput('picture', FormData.Picture)}
                                            />

                                        </div>
                                        {errors.picture && (
                                            <p className="text-red-500 text-sm italic">{errors.picture}</p>
                                        )}
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
                                                <th>Category</th>
                                                <th>Created</th>
                                                <th>Image</th>
                                                <th>Edit</th>
                                                <th>Remove</th>
                                            </tr>
                                            {currentGender.map((ViewBlog, index) => (
                                                <tr>
                                                    <td>{index + 1}</td>
                                                    <td>{ViewBlog.title}</td>
                                                    <td>{ViewBlog.category}</td>
                                                    <td>{ViewBlog.createdAt}</td>
                                                    <td><img src={`http://localhost:5231/${ViewBlog.image}`}
                                                        width="100" height="100" style={{ objectFit: 'cover' }} alt="" /></td>
                                                    <td><button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => handleEditClick(ViewBlog.id)}>Edit</button></td>
                                                    <td><button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={() => deleteSubmit(ViewBlog.id)}>Remove</button></td>
                                                </tr>
                                            ))}
                                        </thead>
                                        <tbody>



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
                            <form role="form" onSubmit={handleUpdate}>
                                <div className="box-body">
                                    {/* Form fields go here */}
                                    <div className="form-group">
                                        <label className='float-left'>title</label>
                                        <input name='UpdateNameCategory' className="form-control" value={FormData.updateName} onChange={(e) => setFormData({ ...FormData, updateName: e.target.value })} />

                                    </div>

                                

                                    <div className="form-group">
                                        <label className='float-left'>Category</label>
                                        <br />
                                        <Select options={Blog.map(genres => ({ value: genres.id, label: genres.name }))}
                                            onChange={selectedOption => handleupdatecategory(selectedOption)}
                                            value={updateselectedcategory}
                                            isOptionSelected={(option) => option.value === updateselectedcategory}
                                        />

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
export default Blog;