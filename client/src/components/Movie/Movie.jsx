import image from '../face11.jpg';
import { useEffect, useState } from 'react';
import { Form, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import axios from 'axios';

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
function Movie() {

  const [IsClosingPopup, setIsClosingPopup] = useState(false);
  const location = useLocation();
  const username = location.state?.username || 'Default Username';
  const ID = location.state?.ID || '';

  const navigate = useNavigate();

  const [FormData, setFormData] = useState({
    ReleaseDate: null,
    Title: '',
    DescriptionL: '',
    duration: '',
    Picture: null,
    trailer: null,
    updateTittle: '',
    updateDesction: '',
    updateReleaseDate: null,
    updateduration: '',
    id: '',
    Director:'',
    updateDirector:''
    
  })
  const [isPopupVisible, setPopupVisibility] = useState(false);
  const MAX_DESCRIPTION_LENGTH = 300;
  const [genres, setGenres] = useState([]);
  const [category, setcategory] = useState([]);
  const [Movie, setMovie] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const handleEditClick = (MovieID) => {
    const selectedMovie = Movie.find(Movie => Movie.id == MovieID)
    if (selectedMovie) {
      FormData.updateDesction = selectedMovie.description;
      FormData.updateTittle = selectedMovie.title;
      FormData.updateDirector=selectedMovie.director
      FormData.id = selectedMovie.id;
      FormData.updateReleaseDate = selectedMovie.releaseDate;
      FormData.updateduration = selectedMovie.duration;
     
      setupdategenre(selectedMovie.idgenre);

    }

    setPopupVisibility(true)
    console.log(updategenre)
  }
  const [updategenre, setupdategenre] = useState(null);
  const [perPage, setperPage] = useState(5);
  const handleupdategenre = (selectedgenre) => {
    setupdategenre(selectedgenre);
  }
  useEffect(() => {
    const fetchdata = async () => {
      try {
        const response = await axios.get('http://localhost:5231/api/Movie/getMovie');
        setMovie(response.data);

      } catch (error) {
        console.log(error)
      }
    }
    fetchdata();
  }, [])
  useEffect(() => {
    const fetchdata = async () => {
      try {
        const response = await axios.get('http://localhost:5231/api/Movie/getCategory');
        setcategory(response.data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchdata();
  }, [])
  const handleClosepopup = () => {
    setIsClosingPopup(true);
    setTimeout(() => {
      FormData.updateDesction = '';
      FormData.updateTittle = ''
      FormData.id = '';
      FormData.updateReleaseDate = null;
      FormData.updateduration = '';

      setupdategenre(null);
      setPopupVisibility(false)
      setIsClosingPopup(false)
    }, 500);
  }
  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await axios.get("http://localhost:5231/api/Movie/GetGender")
        setGenres(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchGenres();
  }, [])
  const handleDateChange = (date) => {

    const formattedDate = date.toISOString().split('T')[0];
    setFormData({ ...FormData, ReleaseDate: formattedDate });
  }
  const handleupdateDate = (date) => {
    const formattedDate = date.toISOString().split('T')[0];
    setFormData({ ...FormData, updateReleaseDate: formattedDate });
  }
  const handleDescriptionChange = (value) => {
    if (value.length <= MAX_DESCRIPTION_LENGTH) {
      setFormData({
        ...FormData,
        DescriptionL: value
      })
    } else {
      setFormData({
        ...FormData,
        DescriptionL: value.substring(0, MAX_DESCRIPTION_LENGTH),
      })
    }

  };
  const handlepudateDescriptionChange = (value) => {
    if (value.length <= MAX_DESCRIPTION_LENGTH) {
      setFormData({
        ...FormData,
        updateDesction: value
      })
    } else {
      setFormData({
        ...FormData,
        updateDesction: value.substring(0, MAX_DESCRIPTION_LENGTH),
      })
    }

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

  const closingAnimation = {
    animation: 'flipright 0.5s',
  };
  const formatDuration = (duration) => {
    if (duration === 60) {
      return '1 hour';
    }
    const hour = Math.floor(duration / 60);
    const minutes = duration % 60;
    if (hour > 0 && minutes > 0) {
      return `${hour} hour ${minutes} minute`
    } else if (hour > 0) {
      return `${hour} hour`;
    } else {
      return `${minutes} minute`
    }
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
        const response = await axios.post(`http://localhost:5231/api/Movie/delete/${CategoryID}`);
        if (response.status === 200) {
          Swal.fire({
            icon: 'success',
            title: 'Deletion successful',
            showConfirmButton: false,
            timer: 1500,
          });
          const response = await axios.get('http://localhost:5231/api/Movie/getMovie');
          setMovie(response.data);

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
  const [searchTerm, setSearchtem] = useState('');
  const [selectedgenre, setSelectedgenre] = useState(null);
  const handleGenreChange = (selectedgenre) => {
    setSelectedgenre(selectedgenre);
  }
  const [selectedcategory, setSelectedcategory] = useState(null);
  const handleCategoryChange = (selectedCategory) => {
    setSelectedcategory(selectedCategory);
  }
  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({
          ...FormData,
          Picture: reader.result, // base64-encoded string
        });
      };
      reader.readAsDataURL(file);
    }
  };
  const handletrailer = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({
          ...FormData,
          trailer: reader.result, // base64-encoded string
        });
      };
      reader.readAsDataURL(file);
    }
  };
  const handleUpdateSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(`http://localhost:5231/api/Movie/update/${FormData.id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title: FormData.updateTittle, description: FormData.updateDesction, releaseDate: FormData.updateReleaseDate, duration: FormData.updateduration, idGenre: updategenre,director:FormData.updateDirector }),
      })
      if (response.ok) {
        Swal.fire({
          icon: 'success',
          title: 'Add Genre success',
          showConfirmButton: false,
          timer: 1500,
        })
        FormData.updateDesction = '';
        FormData.updateTittle = ''
        FormData.id = '';
        FormData.updateReleaseDate = null;
        FormData.updateduration = '';
        FormData.updateDirector=''
        setupdategenre(null);
        setPopupVisibility(false);
        const response = await axios.get('http://localhost:5231/api/Movie/getMovie');
          setMovie(response.data);
      }
    } catch (error) {
      console.log(error.message)

    }
  }
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {


      const response = await fetch('http://localhost:5231/api/Movie/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title: FormData.Title, description: FormData.DescriptionL, releaseDate: FormData.ReleaseDate, duration: FormData.duration, idGenre: selectedgenre.value, idcategory: selectedcategory.value, Picture: FormData.Picture, trailer: FormData.trailer,director:FormData.Director }),
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
        setFormData({
          ReleaseDate: null,
          Title: '',
          DescriptionL: '',
          duration: '',
          Picture: null,
          trailer: ''
        })
        FormData.trailer='';
        FormData.ReleaseDate=null;
        FormData.Title='';
        FormData.duration='';
        FormData.Director=''
      setSelectedgenre(null);
        setSelectedcategory(null);
       
        document.getElementById('imageInput').value = '';
        document.getElementById('trailer').value = '';
        const response = await axios.get('http://localhost:5231/api/Movie/getMovie');
        setMovie(response.data);

      }

    } catch (error) {
      console.log(error.message)


    }


  }
  const filteredGender = Movie.filter(gen =>

    gen.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOflastgen = (currentPage + 1) * perPage;
  const indexOfFirtgen = indexOflastgen - perPage;
  const currentGender = filteredGender.slice(indexOfFirtgen, indexOflastgen)
  const handlePageclick = (data) => {
    setCurrentPage(data.selected);
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
            <a className="navbar-brand">
              <img src={image} className="user-image" alt="Logo" />
              {/* You can also add text or other elements alongside the logo */}
              {username}
            </a>

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

              </li>

            </ul>
          </section>

        </aside>


        <div className="content-wrapper">
          <section className="content-header">
            <h1>
              Category

            </h1>
            <ol className="breadcrumb">
              <li><a href="#"><i className="fa fa-dashboard"></i> Home</a></li>
              <li><a href="#">Movie</a></li>
            </ol>
          </section>
          <section className="content">
            <div className="row">
              <div className="box box-primary" style={{ Height: 'auto' }}>
                <div className="box-header">
                  <h3 className="box-title">Movie</h3>
                </div>
                <form role="form" onSubmit={handleSubmit}>
                  <div className="box-body">
                    {/* Form fields go here */}
                    <div className="form-group">
                      <label >Title</label>
                      <input name='NameCategory' value={FormData.Title} onChange={(e) => setFormData({ ...FormData, Title: e.target.value })} className="form-control" id="exampleInputEmail1" placeholder="Enter Name Category" />

                    </div>
                    <div className="form-group">
                      <label >Description</label>
                      <ReactQuill
                        theme="snow"
                        value={FormData.DescriptionL}
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
                      <label >Director</label>
                      <input name='NameCategory' value={FormData.Director} onChange={(e) => setFormData({ ...FormData, Director: e.target.value })} className="form-control" id="exampleInputEmail1" placeholder="Enter Name Category" />

                    </div>
                    <div className="form-group">
                      <label >ReleaseDate</label>
                      <br />
                      <DatePicker name='Birthday' selected={FormData.ReleaseDate ? new Date(FormData.ReleaseDate) : null} onChange={handleDateChange} dateFormat="dd/MM/yyyy"

                        className="form-control"
                        placeholderText="Select Release Date"
                      // Cannot select a date before startDate
                      />
                    </div>
                    <div className="form-group">
                      <label >Duration</label>
                      <input type='number' value={FormData.duration} onChange={(e) => setFormData({ ...FormData, duration: e.target.value })} name='NameCategory' className="form-control" id="exampleInputEmail1" placeholder="Enter Name Category" />

                    </div>
                    <div className="form-group">
                      <label >Genre</label>
                      <Select options={genres.map(genres => ({ value: genres.id, label: genres.name }))}
                        onChange={(selectedoption) => handleGenreChange(selectedoption)}
                        value={selectedgenre}
                      />

                    </div>
                    <div className="form-group">
                      <label >Category</label>
                      <Select options={category.map(genres => ({ value: genres.id, label: genres.name }))}
                        onChange={(selectedoption) => handleCategoryChange(selectedoption)}
                        value={selectedcategory}
                      />

                    </div>
                    <div className='form-group'>
                      <label htmlFor="">Picture</label>
                      <input
                        type="file"
                        onChange={(e) => handleFileChange(e)}
                        className="form-control"
                        id='imageInput'
                      />
                    </div>
                    <div className="form-group">
                      <label >Trailer</label>
                      <input type='file' id="trailer" onChange={(e) => handletrailer(e)} name='NameCategory' className="form-control" placeholder="Enter Name Category" />

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
                        <th>title</th>
                        <th>director</th>
                        <th>ReleaseDate</th>
                        <th>Duration</th>
                        <th>Genre</th>
                        <th>Category</th>
                        <th>Picture</th>
                        <th>Trailer</th>
                        <th>Update</th>
                        <th>Delete</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentGender.map((Movies, index) => (
                        <tr key={Movies.id}>
                          <td>{index + 1}</td>
                          
                          <td>{Movies.title}</td>
                          <td>{Movies.director}</td>
                          <td>{new Date(Movies.releaseDate).toLocaleString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</td>
                          <td>{formatDuration(Movies.duration)}</td>
                          <td>{Movies.genreName}</td>
                          <td> {Movies.detailCategoryMovies.length > 0
                            ? Movies.detailCategoryMovies[0].idCategoryNavigation.name
                            : 'No Category'}</td>
                          <td><img src={Movies.detailCategoryMovies.length > 0
                            ? `http://localhost:5231/${Movies.detailCategoryMovies[0].picture}`
                            : 'No Category'} width="100" height="100" style={{ objectFit: 'cover' }} alt="" /></td>
                          <td><a target='_blank' href={Movies.detailCategoryMovies.length > 0 ? `http://localhost:5231/${Movies.detailCategoryMovies[0].trailer}`  : 'No Trailer'}>{Movies.detailCategoryMovies.length > 0 ? Movies.detailCategoryMovies[0].trailer : 'No Trailer'} </a></td>
                          <td><button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => handleEditClick(Movies.id)}>Edit</button></td>
                          <td><button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={()=>deleteSubmit(Movies.id)}>Remove</button></td>
                        </tr>
                      ))}
                      <tr></tr>
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

                <h3 className="box-title">Edit Movie</h3>
              </div>
              <form role="form" onSubmit={handleUpdateSubmit} >
                <div className="box-body">
                  {/* Form fields go here */}
                  <div className="form-group">
                    <label className='float-left'>Title</label>
                    <input name='UpdateNameCategory' value={FormData.updateTittle} onChange={(e) => setFormData({ ...FormData, updateTittle: e.target.value })} className="form-control" />

                  </div>
                  <div className="form-group">
                    <label className='float-left'>Director</label>
                    <input name='UpdateNameCategory' value={FormData.updateDirector} onChange={(e) => setFormData({ ...FormData, updateDirector: e.target.value })} className="form-control" />

                  </div>
                  <div className="form-group">
                    <label className='float-left'>Title</label>
                    <br />
                    <ReactQuill
                      theme="snow"
                      value={FormData.updateDesction}
                      onChange={handlepudateDescriptionChange}
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
                    <label className='float-left'>Release Date</label>

                    <DatePicker name='Birthday' selected={FormData.updateReleaseDate ? new Date(FormData.updateReleaseDate) : null} onChange={handleupdateDate} dateFormat="dd/MM/yyyy"

                      className="form-control"
                      placeholderText="Select Release Date"
                      // Cannot select a date before startDate
                      style={{ textAlign: 'left' }}
                    />
                  </div>
                  <div className="form-group">
                    <label >Duration</label>
                    <input type='number' value={FormData.updateduration} onChange={(e) => setFormData({ ...FormData, updateduration: e.target.value })} name='NameCategory' className="form-control" id="exampleInputEmail1" placeholder="Enter Name Category" />

                  </div>
                  <div className="form-group">
                    <label className='float-left'>Genre</label>
                    <br />
                    <Select
                      options={genres.map(genre => ({ value: genre.id, label: genre.name }))}
                      onChange={selectedOption => handleupdategenre(selectedOption)}
                      value={updategenre}
                      isOptionSelected={(option) => option.value === updategenre}
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
export default Movie;