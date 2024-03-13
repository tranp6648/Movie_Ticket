import image from '../face11.jpg';
import { useEffect, useState } from 'react';
import { Form, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import axios from 'axios';
import { format, addMinutes } from 'date-fns-tz'; // Incorrect import
import { addMinutes as addMinutesOriginal } from 'date-fns'; // Correct import for addMinutes

import { useLocation } from 'react-router-dom';
import ReactQuill from 'react-quill';
import '../Admin/admin.css';

import 'react-quill/dist/quill.snow.css';
import Select from 'react-select';
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';
import Genre from '../Genre/Genre';
import Pagination from 'react-paginate';
import 'react-paginate/theme/basic/react-paginate.css';
function ShowTimesMovie() {

  const [IsClosingPopup, setIsClosingPopup] = useState(false);
  const location = useLocation();
  const username = location.state?.username || 'Default Username';
  const ID = location.state?.ID || '';
  const [searchTerm, setSearchtem] = useState('');
  const navigate = useNavigate();
  const [nameMovie, setNameMovie] = useState(null);
  const [Movie, setMovie] = useState([]);
  const [selectedcity, setselectedcity] = useState(null);
  const [selectedAuth, setselectedAuth] = useState(null);
  const [Auth, setAuth] = useState([]);
  const [Bracnher, setBrancher] = useState([]);
  const [Isselect, setIsselect] = useState([]);
  const [IsMovie, setIsMovie] = useState(null);
  const handleMovie = (selectedMovie) => {
    setIsMovie(selectedMovie);
  }
  const closingAnimation = {
    animation: 'flipright 0.5s',
  };
  const handleClosepopup = () => {
    setIsClosingPopup(true);
    setTimeout(() => {
      FormData.id = '';
      setUpdatedate(null)
      FormData.duration = ''
      setPopupVisibility(false)
      setIsClosingPopup(false)
    }, 500);
  }
  const [isPopupVisible, setPopupVisibility] = useState(false);
  const [UpdateDate, setUpdatedate] = useState(null);
  const handleEditClick = (MovieID) => {
    const selectedMovie = showTime.find(Movie => Movie.id == MovieID)
    if (selectedMovie) {
      FormData.id = selectedMovie.id;
      FormData.duration = selectedMovie.duration;

      setUpdatedate(new Date(selectedMovie.time))
    }
    setPopupVisibility(true)

  }
  const handleAuth = (selectedAuth) => {
    setselectedAuth(selectedAuth);
  }
  const handleCity = (seletedcity) => {
    setselectedcity(seletedcity)
  }
  const handleselect = (seletedistrict) => {
    setIsselect(seletedistrict)
  }
  const [showTime, setShowTime] = useState([]);
  useEffect(() => {
    const fetchdata = async () => {
      try {
        const response = await axios.get(`http://localhost:5231/api/ShowTime/ShowShowtime/${ID}`);
        setShowTime(response.data)
       
      } catch (error) {
        console.log(error);
      }
    }
    fetchdata()
  }, [])
  useEffect(() => {
    const fetchdata = async () => {
      try {
        const response = await axios.get(`http://localhost:5231/api/ShowTime/getBrance/${ID}`);

        const filter = response.data.filter(district => district.iDcity === selectedcity.value);
        setBrancher(filter);
    
        setIsselect(null);
        setselectedAuth(null)
      } catch (error) {
        console.log(error);
      }
    }
    if (selectedcity) {
      fetchdata();
    }

  }, [selectedcity])
  useEffect(() => {
    const fetchdata = async () => {
      try {
        const response = await axios.get("http://localhost:5231/api/ShowTime/getAudi");

        const filter = response.data.filter(district => district.iD_Cinema === Isselect.value);
        setAuth(filter);
        setselectedAuth(null)
      } catch (error) {
        console.log(error);
      }
    }
    if (Isselect) {
      fetchdata();
    }
  }, [Isselect])
  useEffect(() => {
    const fetchdata = async () => {
      try {
        const response = await axios.get("http://localhost:5231/api/ShowTime/getMovie");
        setMovie(response.data);
      } catch (error) {
        console.log(error)
      }
    }
    fetchdata();
  }, [])
  const popupContentStyle = {
    background: 'white',
    padding: '20px',
    maxWidth: '400px',
    textAlign: 'center',
    borderRadius: '8px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    animation: 'flipleft 0.5s', // Default animation
  };

  const [city, setcity] = useState([]);
  useEffect(() => {
    const fetchdata = async () => {
      try {
        const response = await axios.get(`http://localhost:5231/api/ShowTime/getcity/${ID}`);
        setcity(response.data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchdata();
  }, [])
  const [FormData, setFormData] = useState({
    id: '',
    duration: ''
  })
  const handleDropdownToggle = () => {
    setShowDropdown(!showDropdown);
  };
  const [perPage, setperPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(0);
  const [showDropdown, setShowDropdown] = useState(false);
  const filteredGender = showTime.filter(gen =>

    gen.nameMovie.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const indexOflastgen = (currentPage + 1) * perPage;
  const indexOfFirtgen = indexOflastgen - perPage;
  const currentGender = filteredGender.slice(indexOfFirtgen, indexOflastgen)
  const handlePageclick = (data) => {
    setCurrentPage(data.selected);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const newDate = addMinutesOriginal(selectedDate, IsMovie.duration);
    const formattedDate = format(selectedDate, 'yyyy-MM-dd HH:mm:ss', { timeZone: 'Asia/Ho_Chi_Minh' });

    const formattedDate1 = format(newDate, 'yyyy-MM-dd HH:mm:ss', { timeZone: 'Asia/Ho_Chi_Minh' });

    try {
      const response = await fetch('http://localhost:5231/api/ShowTime/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ time: new Date(formattedDate), idAuditoriums: selectedAuth.value, idCinema: Isselect.value, idMovie: IsMovie.value, endtime: new Date(formattedDate1) }),
      })
      if (!response.ok) {
        const responseBody = await response.json();
        if (responseBody.message) {
          Swal.fire({
            icon: 'error',
            title: responseBody.message || 'Failed to add Showtime',
            showConfirmButton: false,
            timer: 1500,
          });
        }
      } else {
        Swal.fire({
          icon: 'success',
          title: 'Add Showtime success',
          showConfirmButton: false,
          timer: 1500,
        })
        setIsMovie(null)
        setSelectedDate(null);
        setselectedcity(null);
        setIsselect(null);
        setselectedAuth(null);
        FormData.duration = '';
        FormData.id = ''
        const response = await axios.get(`http://localhost:5231/api/ShowTime/ShowShowtime/${ID}`);
        setShowTime(response.data)
      }

    } catch (error) {
      console.log(error)
    }
  }
  const handleUpdate = async (event) => {
    event.preventDefault();

    const formattedDate = format(UpdateDate, 'yyyy-MM-dd HH:mm:ss', { timeZone: 'Asia/Ho_Chi_Minh' });
    const newDate = addMinutesOriginal(UpdateDate, FormData.duration);
    const formattedDate1 = format(newDate, 'yyyy-MM-dd HH:mm:ss', { timeZone: 'Asia/Ho_Chi_Minh' });

    try {
      const response = await fetch(`http://localhost:5231/api/ShowTime/Update/${FormData.id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ time: new Date(formattedDate), endtime: new Date(formattedDate1) })
      })
      if (!response.ok) {
        const responseBody = await response.json();
        if (responseBody.message) {
          Swal.fire({
            icon: 'error',
            title: responseBody.message || 'Failed to add Showtime',
            showConfirmButton: false,
            timer: 1500,
          });
        }
      } else {
        Swal.fire({
          icon: 'success',
          title: 'Add Showtime success',
          showConfirmButton: false,
          timer: 1500,
        })
        setPopupVisibility(false)
        FormData.id = '';
        setUpdatedate(null)
        const response = await axios.get(`http://localhost:5231/api/ShowTime/ShowShowtime/${ID}`);
        setShowTime(response.data)
      }

    } catch (error) {
      console.log(error)
    }
  }
  const [selectedDate, setSelectedDate] = useState(null);

  return (
    <div>


      <div className="wrapper">



        <header className="main-header" style={{ zIndex: '20' }}>

          <a href="index2.html" className="logo"><b>Admin</b>LTE</a>

          <nav className="navbar navbar-static-top" role="navigation" >
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
              <a href="#"  onClick={() => navigate('/Edit', { state: { username: username, ID: ID } })}>
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
              Showtime

            </h1>
            <ol className="breadcrumb">
              <li><a href="#"><i className="fa fa-dashboard"></i> Home</a></li>
              <li><a href="#">Showtime</a></li>
            </ol>
          </section>
          <section className="content">
            <div className="row">
              <div className="box box-primary" style={{ Height: 'auto' }}>
                <div className="box-header">
                  <h3 className="box-title">Showtime</h3>
                </div>
                <form role="form" onSubmit={handleSubmit}>
                  <div className="box-body">
                    {/* Form fields go here */}
                    <div className="form-group">
                      <label >Movie</label>
                      <Select options={Movie.map(movie => ({ value: movie.id, label: movie.name, duration: movie.duration }))} onChange={(selectedOption) => handleMovie(selectedOption)}
                        value={IsMovie} />

                    </div>
                    <div className="form-group">
                      <label >Time</label>
                      <br />
                      <DatePicker
                        selected={selectedDate}
                        minDate={new Date()}
                        onChange={(date) => setSelectedDate(date)}
                        showTimeSelect
                        timeFormat="HH:mm"
                        timeIntervals={15}
                        dateFormat="yyyy-MM-dd HH:mm"
                        className="form-control"
                        placeholderText="Select Release Date and Time"
                      />

                    </div>
                    <div className="form-group">
                      <label >City</label>
                      <Select options={city.map(movie => ({ value: movie.id, label: movie.city }))}
                        onChange={(selectedOption) => handleCity(selectedOption)}
                        value={selectedcity}
                      />

                    </div>
                    <div className="form-group">
                      <label >Cinema</label>
                      <Select options={Bracnher.map(movie => ({ value: movie.id, label: movie.name + " " + movie.district }))}
                        onChange={(selectedOption) => handleselect(selectedOption)}
                        value={Isselect}
                      />

                    </div>
                    <div className="form-group">
                      <label >Auditoriums</label>
                      <Select options={Auth.map(movie => ({ value: movie.id, label: movie.name }))}
                        onChange={(selectedOption) => handleAuth(selectedOption)}
                        value={selectedAuth}
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
                  <h3 className="box-title">List Category</h3>
                </div>
                <div className="flex items-center space-x-4 float-left flex-1 mb-2 ml-2">
                  <label for="search" className="text-gray-600">Search</label>
                  <input type="text" id="search" name="search" placeholder="Enter your search term" value={searchTerm} onChange={(e) => setSearchtem(e.target.value)} className="border border-gray-300 px-3 py-1 rounded-md focus:outline-none focus:border-blue-500" />

                </div>


                <div className="box-body">
                  <table id="example1" className="table table-bordered table-striped">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Time</th>
                        <th>Auditoriums</th>
                        <th>Movie</th>
                        <th>Cinema</th>

                        <th>Update</th>

                      </tr>
                    </thead>
                    <tbody>
                      {currentGender.map((show, index) => (
                        <tr>
                          <td>{index + 1}</td>
                          <td>{new Date(show.time).toLocaleString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', hour: 'numeric', minute: 'numeric' })}</td>
                          <td>{show.nameAuthor}</td>
                          <td>{show.nameMovie}</td>
                          <td>{show.cinema + " " + show.district}</td>
                          <td><button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => handleEditClick(show.id)}>Edit</button></td>

                        </tr>
                      ))}
                      <tr>

                      </tr>
                    </tbody>

                  </table>
                  <Pagination
                    previousLabel={'previous'}
                    nextLabel={'next'}
                    breakLabel={'...'}
                    pageCount={Math.ceil(filteredGender.length / perPage)}
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

                <h3 className="box-title text-black">Edit Movie</h3>
              </div>
              <form role="form" onSubmit={handleUpdate}>
                <div className="box-body">
                  {/* Form fields go here */}

                  <div className="form-group">
                    <label >Time</label>

                    <DatePicker
                      selected={new Date(UpdateDate)}
                      onChange={(date) => setUpdatedate(date)}
                      showTimeSelect
                      timeFormat="HH:mm"
                      timeIntervals={15}
                      dateFormat="yyyy-MM-dd HH:mm"
                      className="form-control"
                      placeholderText="Select Release Date and Time"
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
export default ShowTimesMovie;