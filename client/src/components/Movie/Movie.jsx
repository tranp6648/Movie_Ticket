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
function Movie() {


  const location = useLocation();
  const username = location.state?.username || 'Default Username';
  const ID = location.state?.ID || '';

  const navigate = useNavigate();
  const [FormData, setFormData] = useState({
    ReleaseDate: null,
    Title:'',
    DescriptionL:'',
    duration:''
  })
  const [genres, setGenres] = useState([]);
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
  const handleDescriptionChange = (value) => {
    setFormData({
      ...FormData,
      DescriptionL: value,
    });
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

  const [selectedgenre, setSelectedgenre] = useState(null);
  const handleGenreChange=(selectedgenre)=>{
    setSelectedgenre(selectedgenre);
  }
  const handleSubmit = async (event) => {
    event.preventDefault();
  
      try {
        const response = await fetch('http://localhost:5231/api/Movie/add', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ title: FormData.Title,description:FormData.DescriptionL,releaseDate:FormData.ReleaseDate,duration:FormData.duration,idGenre:selectedgenre.value }),
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
       
        }

      } catch (error) {
        console.log(error.message)


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
              <div className="box box-primary" style={{ maxHeight: '542px' }}>
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

                      />

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
                      <input type='number' value={FormData.duration} onChange={(e)=>setFormData({ ...FormData, duration: e.target.value })} name='NameCategory' className="form-control" id="exampleInputEmail1" placeholder="Enter Name Category" />

                    </div>
                    <div className="form-group">
                      <label >Genre</label>
                      <Select options={genres.map(genres => ({ value: genres.id, label: genres.name }))} 
                      onChange={(selectedoption)=>handleGenreChange(selectedoption)}
                      value={selectedgenre}
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
                  <input type="text" id="search" name="search" placeholder="Enter your search term" className="border border-gray-300 px-3 py-1 rounded-md focus:outline-none focus:border-blue-500" />

                </div>


                <div className="box-body">
                  <table id="example1" className="table table-bordered table-striped">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Name</th>
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
export default Movie;