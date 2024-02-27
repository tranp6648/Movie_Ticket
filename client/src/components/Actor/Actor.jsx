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

function Actor() {


    const location = useLocation();
    const username = location.state?.username || 'Default Username';
    const ID = location.state?.ID || '';

    const navigate = useNavigate();

    const today = new Date();
    const maxBirthdate = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());

    const [perPage, setperPage] = useState(5);
    const [searchTerm, setSearchtem] = useState('');
    const [currentPage, setCurrentPage] = useState(0);
    const [IsClosingPopup, setIsClosingPopup] = useState(false);
    const [updatenationally, setisupdatenationally] = useState(null);
    const [isPopupVisible, setPopupVisibility] = useState(false);
    const [IsClosingEdit, setIsClosingEdit] = useState(false);
    const [isPopupVisibleEdit, setisPopupVisibleEdit] = useState(false);
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
        } else if (filename == 'Nationally') {
            newErrors[filename] = value == null ? 'Nationally is required' : '';
        } else if (filename == 'Picture') {
            newErrors[filename] = value == null ? 'Picture is required' : '';
        } else if (filename == 'Birthday') {
            newErrors[filename] = value == null ? 'Birthday is required' : '';
        } else if (filename == 'Pio') {
            newErrors[filename] = value.trim() === '' ? 'Pio is required' : '';
        } else if (filename == 'updateName') {
            newErrors[filename] = value.trim() === '' ? 'Name is required' : '';
        } else if (filename == 'updateNationally') {
            newErrors[filename] = value == null ? 'Nationally is required' : '';
        }
        setErrors(newErrors)
    }
    const [showDropdown, setShowDropdown] = useState(false);
    const handleDropdownToggle = () => {
        setShowDropdown(!showDropdown);
    };
    useEffect(() => {
        const fetchGenres = async () => {
            try {
                const response = await axios.get("http://localhost:5231/api/Actor/ShowActor")
                setActor(response.data);

            } catch (error) {
                console.log(error);
            }
        }
        fetchGenres();
    }, [])
    const [selectedNation, setSelectedNation] = useState(null);
    const handleupdateNation = (selectedNation) => {
        setSelectedNation(selectedNation);
    }
    const [Movies, setMovies] = useState([]);
    useEffect(() => {
        const fetchGenres = async () => {
            try {
                const response = await axios.get("http://localhost:5231/api/Actor/GetMovie")
                setMovies(response.data);

            } catch (error) {
                console.log(error);
            }
        }
        fetchGenres();
    }, [])
    const [FormData, setFormData] = useState({
        Name: '',
        id: '',
        Picture: null,
        Birthday: null,
        Bio: '',
        NameAdd: '',
        Role: '',

        updateBirthday: null,
        updateName: ''

    })
    const [selectedMovie, setselectedMovie] = useState(null);
    const handleupdateNationally = (seletedNation) => {
        setisupdatenationally(seletedNation)
    }
    const handleupdate = async (event) => {
        event.preventDefault();
        if (FormData.updateName == '') {
            Swal.fire({
                icon: 'error',
                title: 'Name is required',
                showConfirmButton: false,
                timer: 1500,
            });
        } else {
            try {
                const response = await fetch(`http://localhost:5231/api/Actor/update/${FormData.id}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ name: FormData.updateName, nationality: updatenationally, birthday: FormData.updateBirthday })
                })
                if (response.ok) {
                    Swal.fire({
                        icon: 'success',
                        title: 'update Actor success',
                        showConfirmButton: false,
                        timer: 1500,
                    })
                    setselectedMovie(null);
                    FormData.id = '';
                    FormData.updateBirthday = null;
                    FormData.updateName = '';
                    FormData.updatenationally = '';

                    const response = await axios.get("http://localhost:5231/api/Actor/ShowActor")
                    setActor(response.data);
                    setisPopupVisibleEdit(false);
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
                console.log(error);
            }
        }

    }
    const handleupdateMovie = (selectedNation) => {
        setselectedMovie(selectedNation);
    }
    const handleEditupdate = (MovieID) => {
        const selectedMovie = Actor.find(Movie => Movie.id == MovieID)
        if (selectedMovie) {
            setisupdatenationally(selectedMovie.nationally)

            FormData.id = selectedMovie.id;
            FormData.updateBirthday = selectedMovie.birthday;
            FormData.updateName = selectedMovie.name;
        }
        setisPopupVisibleEdit(true);
    }
    const handleEditClick = (MovieID) => {
        const selectedMovie = Actor.find(Movie => Movie.id == MovieID)
        if (selectedMovie) {
            FormData.id = MovieID
            FormData.NameAdd = selectedMovie.name

        }

        setPopupVisibility(true)

    }
    const handleCloseUpdate = () => {
        setIsClosingEdit(true);
        setTimeout(() => {

            setisupdatenationally(null);
            FormData.id = "";
            FormData.updateName = '';
            FormData.UpdateBio = "";
            FormData.updatenationally = '';
            FormData.updateBirthday = null;
            setisPopupVisibleEdit(false)
            setIsClosingEdit(false)
        }, 500);
    }
    const filterActor = Actor.filter(gen =>

        gen.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const handleClosepopup = () => {
        setIsClosingPopup(true);
        setTimeout(() => {
            setselectedMovie(null);
            FormData.id = '';
            FormData.Role = '';
            setPopupVisibility(false)
            setIsClosingPopup(false)
        }, 500);
    }
    const handleupdatedate = (date) => {
        const formattedDate = date.toISOString().split('T')[0];
        setFormData({ ...FormData, updateBirthday: formattedDate });
    }
    const handleDateChange = (date) => {

        const formattedDate = date.toISOString().split('T')[0];
        setFormData({ ...FormData, Birthday: formattedDate });
    }
    const handleFileChange = (e) => {
        const file = e.target.files[0];

        if (file) {
            if (file.type.startsWith('image/')) {
                const reader = new FileReader();
                reader.onloadend = () => {
                    setFormData({
                        ...FormData,
                        Picture: reader.result, // base64-encoded string
                    });
                };
                reader.readAsDataURL(file);
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Please select a valid image file',
                    showConfirmButton: false,
                    timer: 1500,
                })
                document.getElementById('imageInput').value = '';
            }

        }
    };
    const nationalityOptions = [
        { value: 'United States', label: 'United States' },
        { value: 'canada', label: 'Canada' },
        { value: 'United Kingdom', label: 'United Kingdom' },
        { value: 'france', label: 'France' },
        { value: 'germany', label: 'Germany' },
        { value: 'australia', label: 'Australia' },
        { value: 'japan', label: 'Japan' },
        { value: 'brazil', label: 'Brazil' },
        { value: 'india', label: 'India' },
        { value: 'china', label: 'China' },
        { value: 'russia', label: 'Russia' },
        { value: 'south-korea', label: 'South Korea' },
        { value: 'mexico', label: 'Mexico' },
        { value: 'south-africa', label: 'South Africa' },
        { value: 'Afghanistan', label: 'Afghanistan' },
        { value: 'Armenia', label: 'Armenia' },
        { value: 'Azerbaijan', label: 'Azerbaijan' },
        { value: 'Bahrain', label: 'Bahrain' },
        { value: 'Bangladesh', label: 'Bangladesh' },
        { value: 'Bhutan', label: 'Bhutan' },
        { value: 'Brunei', label: 'Brunei' },
        { value: 'Cambodia', label: 'Cambodia' },
        { value: 'China', label: 'China' },
        { value: 'Cyprus', label: 'Cyprus' },
        { value: 'Georgia', label: 'Georgia' },
        { value: 'India', label: 'India' },
        { value: 'Indonesia', label: 'Indonesia' },
        { value: 'Iran', label: 'Iran' },
        { value: 'Iraq', label: 'Iraq' },
        { value: 'Israel', label: 'Israel' },
        { value: 'Japan', label: 'Japan' },
        { value: 'Jordan', label: 'Jordan' },
        { value: 'Kazakhstan', label: 'Kazakhstan' },
        { value: 'Kuwait', label: 'Kuwait' },
        { value: 'Kyrgyzstan', label: 'Kyrgyzstan' },
        { value: 'Laos', label: 'Laos' },
        { value: 'Lebanon', label: 'Lebanon' },
        { value: 'Malaysia', label: 'Malaysia' },
        { value: 'Maldives', label: 'Maldives' },
        { value: 'Mongolia', label: 'Mongolia' },
        { value: 'Myanmar (Burma)', label: 'Myanmar (Burma)' },
        { value: 'Nepal', label: 'Nepal' },
        { value: 'North Korea', label: 'North Korea' },
        { value: 'Oman', label: 'Oman' },
        { value: 'Pakistan', label: 'Pakistan' },
        { value: 'Palestine', label: 'Palestine' },
        { value: 'Philippines', label: 'Philippines' },
        { value: 'Qatar', label: 'Qatar' },
        { value: 'Saudi Arabia', label: 'Saudi Arabia' },
        { value: 'Singapore', label: 'Singapore' },
        { value: 'South Korea', label: 'South Korea' },
        { value: 'Sri Lanka', label: 'Sri Lanka' },
        { value: 'Syria', label: 'Syria' },
        { value: 'Taiwan', label: 'Taiwan' },
        { value: 'Tajikistan', label: 'Tajikistan' },
        { value: 'Thailand', label: 'Thailand' },
        { value: 'Turkey', label: 'Turkey' },
        { value: 'Turkmenistan', label: 'Turkmenistan' },
        { value: 'United Arab Emirates', label: 'United Arab Emirates' },
        { value: 'Uzbekistan', label: 'Uzbekistan' },
        { value: 'Vietnam', label: 'Vietnam' },
        { value: 'Yemen', label: 'Yemen' },
        { value: 'Albania', label: 'Albania' },
        { value: 'Andorra', label: 'Andorra' },
        { value: 'Austria', label: 'Austria' },
        { value: 'Belarus', label: 'Belarus' },
        { value: 'Belgium', label: 'Belgium' },
        { value: 'Bosnia and Herzegovina', label: 'Bosnia and Herzegovina' },
        { value: 'Bulgaria', label: 'Bulgaria' },
        { value: 'Croatia', label: 'Croatia' },
        { value: 'Cyprus', label: 'Cyprus' },
        { value: 'Czech Republic', label: 'Czech Republic' },
        { value: 'Denmark', label: 'Denmark' },
        { value: 'Estonia', label: 'Estonia' },
        { value: 'Finland', label: 'Finland' },
        { value: 'France', label: 'France' },
        { value: 'Germany', label: 'Germany' },
        { value: 'Greece', label: 'Greece' },
        { value: 'Hungary', label: 'Hungary' },
        { value: 'Iceland', label: 'Iceland' },
        { value: 'Ireland', label: 'Ireland' },
        { value: 'Italy', label: 'Italy' },
        { value: 'Kosovo', label: 'Kosovo' },
        { value: 'Latvia', label: 'Latvia' },
        { value: 'Liechtenstein', label: 'Liechtenstein' },
        { value: 'Lithuania', label: 'Lithuania' },
        { value: 'Luxembourg', label: 'Luxembourg' },
        { value: 'Malta', label: 'Malta' },
        { value: 'Moldova', label: 'Moldova' },
        { value: 'Monaco', label: 'Monaco' },
        { value: 'Montenegro', label: 'Montenegro' },
        { value: 'Netherlands', label: 'Netherlands' },
        { value: 'North Macedonia', label: 'North Macedonia' },
        { value: 'Norway', label: 'Norway' },
        { value: 'Poland', label: 'Poland' },
        { value: 'Portugal', label: 'Portugal' },
        { value: 'Romania', label: 'Romania' },
        { value: 'Russia', label: 'Russia' },
        { value: 'San Marino', label: 'San Marino' },
        { value: 'Serbia', label: 'Serbia' },
        { value: 'Slovakia', label: 'Slovakia' },
        { value: 'Slovenia', label: 'Slovenia' },
        { value: 'Spain', label: 'Spain' },
        { value: 'Sweden', label: 'Sweden' },
        { value: 'Switzerland', label: 'Switzerland' },
        { value: 'Ukraine', label: 'Ukraine' },
        { value: 'United Kingdom', label: 'United Kingdom' },
        { value: 'Vatican City', label: 'Vatican City' },
        // Add more countries as needed
    ];
    const handleDescriptionChange = (value) => {

        setFormData({
            ...FormData,
            Bio: value
        })


    };

    const deleteSubmit = async (CategoryID) => {
        try {
            const confirmation = await Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!',
            });

            if (confirmation.isConfirmed) {
                const response = await axios.post(`http://localhost:5231/api/Actor/delete/${CategoryID}`);

                if (response.status === 200) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Deletion successful',
                        showConfirmButton: false,
                        timer: 1500,
                    });
                    const response = await axios.get("http://localhost:5231/api/Actor/ShowActor")
                    setActor(response.data);
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
            }
        } catch (error) {
            console.log(error.message);
            Swal.fire({
                icon: 'error',
                title: 'Failed to delete actor',
                showConfirmButton: false,
                timer: 1500,
            });
        }
    };

    const handleAddMovie = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch("http://localhost:5231/api/Actor/AddMovie", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ idMovie: selectedMovie.value, idActor: FormData.id, role: FormData.Role })
            })
            if (response.ok) {
                Swal.fire({
                    icon: 'success',
                    title: 'Add Genre success',
                    showConfirmButton: false,
                    timer: 1500,
                })
                setselectedMovie(null);
                FormData.id = '';
                FormData.Role = '';
                const response = await axios.get("http://localhost:5231/api/Actor/ShowActor")
                setActor(response.data);
                setPopupVisibility(false);
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
            console.log(error);
        }
    }
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch("http://localhost:5231/api/Actor/Add", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name: FormData.Name, nationality: selectedNation?.value || (selectedNation.hasOwnProperty('value') ? selectedNation.value : selectedNation), image: FormData.Picture, birthday: FormData.Birthday, bio: FormData.Bio })
            })
            if (response.ok) {
                Swal.fire({
                    icon: 'success',
                    title: 'Add Genre success',
                    showConfirmButton: false,
                    timer: 1500,
                })
                FormData.Name = '';
                FormData.Birthday = null;
                FormData.Picture = null;
                FormData.Actor = '';
                FormData.Bio = '';
                setSelectedNation(null);
                const response = await axios.get("http://localhost:5231/api/Actor/ShowActor")
                setActor(response.data);
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
            console.log(error);
        }
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
                            Actor

                        </h1>
                        <ol className="breadcrumb">
                            <li><a href="#"><i className="fa fa-dashboard"></i> Home</a></li>
                            <li><a href="#">Actor</a></li>
                        </ol>
                    </section>
                    <section className="content">
                        <div className="row">
                            <div className="box box-primary" style={{ maxHeight: 'auto' }}>
                                <div className="box-header">
                                    <h3 className="box-title">Actor</h3>
                                </div>
                                <form role="form" onSubmit={handleSubmit}>
                                    <div className="box-body">
                                        {/* Form fields go here */}
                                        <div className="form-group">
                                            <label >Name</label>
                                            <input className="form-control" value={FormData.Name} onChange={(e) => setFormData({ ...FormData, Name: e.target.value })} id="exampleInputEmail1" placeholder="Enter Name Actor" onBlur={() => validateInput('Name', FormData.Name)} />
                                            {errors.Name && (
                                                <p className="text-red-500 text-sm italic">{errors.Name}</p>
                                            )}
                                        </div>
                                        <div className="form-group">
                                            <label >Nationally</label>
                                            <Select options={nationalityOptions.map(nation => ({ value: nation.value, label: nation.label }))}
                                                value={selectedNation} onChange={(selectedoption) => handleupdateNation(selectedoption)}
                                                onBlur={() => validateInput('Nationally', selectedNation)}
                                            />
                                            {errors.Nationally && (
                                                <p className="text-red-500 text-sm italic">{errors.Nationally}</p>
                                            )}
                                        </div>
                                        <div className='form-group'>
                                            <label htmlFor="">Picture</label>
                                            <input
                                                type="file"

                                                onChange={(e) => handleFileChange(e)}
                                                className="form-control"
                                                id='imageInput'
                                                onBlur={() => validateInput('Picture', FormData.Picture)}
                                            />
                                            {errors.Picture && (
                                                <p className="text-red-500 text-sm italic">{errors.Picture}</p>
                                            )}
                                        </div>
                                        <div className="form-group">
                                            <label >Birthday</label>
                                            <br />
                                            <DatePicker name='Birthday' selected={FormData.Birthday ? new Date(FormData.Birthday) : null} onChange={handleDateChange} dateFormat="dd/MM/yyyy"
                                                className="form-control"
                                                onBlur={() => validateInput('Birthday', FormData.Birthday)}
                                                placeholderText="Enter Birthday"
                                                minDate={maxBirthdate}
                                                showYearDropdown
                                            // Cannot select a date before startDate
                                            />
                                            {errors.Birthday && (
                                                <p className="text-red-500 text-sm italic">{errors.Birthday}</p>
                                            )}
                                        </div>
                                        <div className="form-group">
                                            <label >Bio</label>
                                            <br />
                                            <ReactQuill
                                                theme="snow"
                                                value={FormData.Bio} onChange={handleDescriptionChange}
                                                placeholder='Enter Bio'
                                                onBlur={() => validateInput('Pio', FormData.Bio)}

                                            />
                                            {errors.Pio && (
                                                <p className="text-red-500 text-sm italic">{errors.Pio}</p>
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
                                                <th>Nationally</th>
                                                <th>Avatar</th>
                                                <th>Birthday</th>
                                                <th>Movie</th>
                                                <th>Add Movie</th>
                                                <th>Edit</th>
                                                <th>Remove</th>
                                            </tr>
                                        </thead>
                                        <tbody>

                                            {currentGender.map((actor, index) => (
                                                <tr key={actor.id}>
                                                    <td>{index + 1}</td>
                                                    <td>{actor.name}</td>
                                                    <td>{actor.nationally}</td>

                                                    <td><img src={`http://localhost:5231/${actor.image}`} width="100" height="100" style={{ objectFit: 'cover' }} alt="" /></td>

                                                    <td>{new Date(actor.birthday).toLocaleString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</td>
                                                    <td>  {actor.detailActorMovie.length > 0
                                                        ? actor.detailActorMovie.map(movie => movie.idMovieNavigation.name).join(', ')
                                                        : 'No Category'}</td>
                                                    <td><button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => handleEditClick(actor.id)}>Add Movie Actor</button></td>
                                                    <td><button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => handleEditupdate(actor.id)}>Edit</button></td>
                                                    <td><button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={() => deleteSubmit(actor.id)}>Remove</button></td>
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

                                <h3 className="box-title font-bold">{FormData.NameAdd}</h3>
                            </div>
                            <form role="form" onSubmit={handleAddMovie} >
                                <div className="box-body">
                                    {/* Form fields go here */}
                                    <div className="form-group">
                                        <label className='float-left'>Role</label>
                                        <input name='UpdateNameCategory' value={FormData.Role} onChange={(e) => setFormData({ ...FormData, Role: e.target.value })} className="form-control" />

                                    </div>
                                    <div className="form-group">
                                        <label className='float-left '>Movie</label>
                                        <br />
                                        <Select options={Movies.map(nation => ({ value: nation.id, label: nation.name }))} value={selectedMovie}
                                            onChange={selectedOption => handleupdateMovie(selectedOption)}

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
                {isPopupVisibleEdit && (
                    <div className="popup-container">

                        <div className="popup-content" style={IsClosingEdit ? { ...popupContentStyle, ...closingAnimation } : popupContentStyle}>
                            <div className='flex justify-end'>
                                <button onClick={handleCloseUpdate} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded float-right "><i className="fas fa-times"></i></button>
                            </div>

                            <div >

                                <h3 className="box-title font-bold">Edit Actor</h3>
                            </div>
                            <form role="form" onSubmit={handleupdate} >
                                <div className="box-body">
                                    {/* Form fields go here */}
                                    <div className="form-group">
                                        <label className='float-left'>Name</label>
                                        <input name='UpdateNameCategory' className="form-control" onBlur={() => validateInput('updateName', FormData.updateName)} value={FormData.updateName} onChange={(e) => setFormData({ ...FormData, updateName: e.target.value })} />
                                        {errors.updateName && (
                                            <p className="text-red-500 text-sm italic">{errors.updateName}</p>
                                        )}
                                    </div>
                                    <div className="form-group">
                                        <label className='float-left '>Nationally</label>
                                        <br />
                                        <Select options={nationalityOptions.map(nation => ({ value: nation.value, label: nation.label }))}
                                            onChange={selectedOption => handleupdateNationally(selectedOption)}
                                            value={updatenationally}
                                            onBlur={() => validateInput('updateNationally', updatenationally)}
                                            isOptionSelected={(option) => option.label === updatenationally}
                                        />
                                        {errors.updateNationally && (
                                            <p className="text-red-500 text-sm italic">{errors.updateNationally}</p>
                                        )}
                                    </div>
                                    <div className="form-group">
                                        <label className='float-left'>Birthday</label>

                                        <DatePicker name='Birthday' selected={FormData.updateBirthday ? new Date(FormData.updateBirthday) : null} onChange={handleupdatedate} dateFormat="dd/MM/yyyy"
                                            className="form-control"
                                            placeholderText="Enter Birthday"
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
export default Actor;