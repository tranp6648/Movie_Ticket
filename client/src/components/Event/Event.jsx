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
function Event() {

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
    const [Event, setEvent] = useState([]);
    useEffect(() => {
        const fetchdata = async () => {
            try {
                const response = await axios.get("http://localhost:5231/api/Event/Show");
                setEvent(response.data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchdata();
    }, [])
    const closingAnimation = {
        animation: 'flipright 0.5s',
    };
    const [FormData, setFormdata] = useState({
        id:'',
        Tittle: '',
        Description: '',
        UpdateDescription:'',
        StartDate: null,
        Picture: null,
        UpdateStartDay:null,
        EndDate: null,
        UpdateTittle:'',
        updateEndDay:null
    })
    const handleEditClick = (MovieID) => {
        const selecEvent=Event.find(Event=>Event.id==MovieID);
        if(selecEvent){;
            FormData.id=MovieID;
            FormData.UpdateTittle=selecEvent.title;
            FormData.UpdateDescription=selecEvent.description;
            FormData.UpdateStartDay=selecEvent.startDate;
            FormData.updateEndDay=selecEvent.endDate;
        }
        setPopupVisibility(true)
    }
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if(file.type.startsWith("image/")){
                const reader = new FileReader();
                reader.onloadend = () => {
                    setFormdata({
                        ...FormData,
                        Picture: reader.result, // base64-encoded string
                    });
                };
                reader.readAsDataURL(file);
            }else{
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

    const handleStartDate = (date) => {
        const formattedDate = date.toISOString().split('T')[0];
        setFormdata({ ...FormData, StartDate: formattedDate });

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
            const response = await axios.post(`http://localhost:5231/api/Event/Delete/${CategoryID}`);
            if (response.status === 200) {
              Swal.fire({
                icon: 'success',
                title: 'Deletion successful',
                showConfirmButton: false,
                timer: 1500,
              });
              const response = await axios.get("http://localhost:5231/api/Event/Show");
              setEvent(response.data)
    
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
          console.log(error.message)
        }
      }
    const handleUpdateStartDate = (date) => {
        const formattedDate = date.toISOString().split('T')[0];
        setFormdata({ ...FormData, UpdateStartDay: formattedDate });

    }
    const handleUpdateEndDate=(date)=>{
        const formattedDate = date.toISOString().split('T')[0];
        setFormdata({ ...FormData, updateEndDay: formattedDate });

    }
    const handleEndDate = (date) => {
        const formattedDate1 = date.toISOString().split('T')[0];
        setFormdata({ ...FormData, EndDate: formattedDate1 });
    }

    const handleSubmit = async (event) => {
     
        event.preventDefault();
        try {
            const response = await fetch("http://localhost:5231/api/Event/Add", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ title: FormData.Tittle, description: FormData.Description, startDate: FormData.StartDate, endDate: FormData.EndDate, bannerUrl: FormData.Picture })
            })
            if (!response.ok) {
                const responseBody = await response.json();
                if (responseBody.message) {
                    Swal.fire({
                        icon: 'error',
                        title: responseBody.message || 'Failed to add Event',
                        showConfirmButton: false,
                        timer: 1500,
                    });
                }
            } else {
                Swal.fire({
                    icon: 'success',
                    title: 'Add Event success',
                    showConfirmButton: false,
                    timer: 1500,
                })
                FormData.StartDate = null;
                FormData.EndDate = null;
                document.getElementById('imageInput').value = '';
                setFormdata({
                    Description:'',
                    Tittle:''
                })
               
                
                
             
                const response = await axios.get("http://localhost:5231/api/Event/Show");
                setEvent(response.data)
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleDropdownToggle = () => {
        setShowDropdown(!showDropdown);
    };
    const handleDescriptionChange = (value) => {
        setFormdata({
            ...FormData,
            Description: value
        })
    }
    const handleUpdateChange = (value) => {
        setFormdata({
            ...FormData,
            UpdateDescription: value
        })
    }
    const handleClosepopup = () => {
        setIsClosingPopup(true);
        setTimeout(() => {
          
          setPopupVisibility(false)
          setIsClosingPopup(false)
        }, 500);
      }
      const handleUpdate = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch(`http://localhost:5231/api/Event/update/${FormData.id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    Title: FormData.UpdateTittle,
                  
                    StartDate: FormData.UpdateStartDay,
                    EndDate: FormData.updateEndDay,
                   
                }),
            });
    
            if (!response.ok) {
                const responseBody = await response.json();
                if (responseBody.message) {
                    Swal.fire({
                        icon: 'error',
                        title: responseBody.message || 'Failed to update Event',
                        showConfirmButton: false,
                        timer: 1500,
                    });
                }
            } else {
                Swal.fire({
                    icon: 'success',
                    title: "Update Event successfully",
                    showConfirmButton: false,
                    timer: 1500,
                });
                setPopupVisibility(false)
                // Reset form fields or handle success as needed
                FormData.UpdateTittle = "";
                FormData.UpdateStartDay = null;
                FormData.UpdateDescription = null;
    
                // Fetch and update event data after a successful update
                const response = await axios.get("http://localhost:5231/api/Event/Show");
                setEvent(response.data);
            }
        } catch (error) {
            console.log(error);
        }
    };
    
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
                            Event

                        </h1>
                        <ol className="breadcrumb">
                            <li><a href="#"><i className="fa fa-dashboard"></i> Home</a></li>
                            <li><a href="#">Event</a></li>
                        </ol>
                    </section>
                    <section className="content">
                        <div className="row">
                            <div className="box box-primary" style={{ maxHeight: 'auto' }}>
                                <div className="box-header">
                                    <h3 className="box-title">Event</h3>
                                </div>
                                <form role="form" onSubmit={handleSubmit}>
                                    <div className="box-body">
                                        {/* Form fields go here */}
                                        <div className="form-group">
                                            <label >Title</label>
                                            <input className="form-control" value={FormData.Tittle} onChange={(e) => setFormdata({ ...FormData, Tittle: e.target.value })} id="exampleInputEmail1" placeholder="Enter Name Genre" />

                                        </div>
                                        <div className="form-group">
                                            <label >Description</label>
                                            <ReactQuill
                                                theme="snow"
                                                value={FormData.Description}
                                                onChange={handleDescriptionChange}
                                                placeholder='Enter Description'
                                                modules={{
                                                    toolbar: [
                                                      [{ 'header': [1, 2, false] }],
                                                      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                                                      [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
                                                      ['link', 'image'],
                                                      ['clean']
                                                    ],
                                                  }}
                                                  formats={[
                                                    'header',
                                                    'bold', 'italic', 'underline', 'strike', 'blockquote',
                                                    'list', 'bullet', 'indent',
                                                    'link', 'image'
                                                  ]}

                                            />


                                        </div>
                                        <div className="form-group">
                                            <label >Start Date</label>
                                            <DatePicker name='Birthday' dateFormat="dd/MM/yyyy"
                                                value={FormData.StartDate}
                                                selected={FormData.StartDate ? new Date(FormData.StartDate) : null}
                                                onChange={handleStartDate}
                                                minDate={new Date()}
                                                className="form-control"
                                                placeholderText="Select Release Date"
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
                                        <div className='form-group'>
                                            <label htmlFor="">Banner </label>
                                            <input
                                                type="file"
                                                onChange={(e) => handleFileChange(e)}
                                                className="form-control"
                                                id='imageInput'
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
                                            {Event.map((event, index) => (
                                                <tr>
                                                    <td>{index+1}</td>
                                                    <td>{event.title}</td>
                                                    <td>{new Date(event.startDate).toLocaleString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</td>
                                                    <td>{new Date(event.endDate).toLocaleString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</td>
                                                    <td><img src={`http://localhost:5231/${event.bannerUrl}`} width="100" height="100" style={{ objectFit: 'cover' }} alt="" /></td>
                                                    <td><button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={()=>handleEditClick(event.id)}>Edit</button></td>
                                                    <td><button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={()=>deleteSubmit(event.id)}>Remove</button></td>
                                                </tr>
                                            ))}


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
                {isPopupVisible && (
                    <div className="popup-container">

                        <div className="popup-content" style={IsClosingPopup ? { ...popupContentStyle, ...closingAnimation } : popupContentStyle}>
                            <div className='flex justify-end'>
                                <button onClick={handleClosepopup} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded float-right "><i className="fas fa-times"></i></button>
                            </div>

                            <div >

                                <h3 className="box-title">Edit Product</h3>
                            </div>
                            <form role="form" onSubmit={handleUpdate}>
                                <div className="box-body">
                                    {/* Form fields go here */}
                                    <div className="form-group">
                                            <label >Title</label>
                                            <input className="form-control" value={FormData.UpdateTittle} onChange={(e) => setFormdata({ ...FormData, UpdateTittle: e.target.value })} id="exampleInputEmail1" placeholder="Enter Name Genre" />

                                        </div>
                                
                                        <div className="form-group">
                                            <label >Start Date</label>
                                            <DatePicker name='Birthday' dateFormat="dd/MM/yyyy"
                                                value={FormData.UpdateStartDay}
                                                selected={FormData.UpdateStartDay ? new Date(FormData.UpdateStartDay) : null}
                                                onChange={handleUpdateStartDate}
                                                minDate={new Date()}
                                                className="form-control"
                                                placeholderText="Select Release Date"
                                            // Cannot select a date before startDate
                                            />


                                        </div>
                                        <div className="form-group">
                                            <label >End Date</label>
                                            <DatePicker dateFormat="dd/MM/yyyy"
                                                name='Birthday'

                                                selected={FormData.updateEndDay ? new Date(FormData.updateEndDay) : null}
                                                onChange={handleUpdateEndDate}
                                                minDate={FormData.UpdateStartDay ? new Date(FormData.UpdateStartDay) : null}
                                                filterDate={(date) => date >= (FormData.UpdateStartDay ? new Date(FormData.UpdateStartDay) : null)}
                                                className="form-control"
                                                placeholderText="Select Release Date"
                                            // Cannot select a date before startDate
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
export default Event;