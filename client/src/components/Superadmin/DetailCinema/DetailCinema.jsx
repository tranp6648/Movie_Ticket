import image12 from '../../images/1917.jpg';
import { useEffect, useState } from 'react';
import { Form, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import ReactQuill from 'react-quill';
import '../DetailCinema/DetailCinema.css';

import Pagination from 'react-paginate';
import 'react-paginate/theme/basic/react-paginate.css';
import Select from 'react-select';

function DetailCinema() {


    const location = useLocation();
    const username = location.state?.username || 'Default Username';
    const ID = location.state?.ID || '';

    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [FormData,setFormData]=useState({
        ID:'',
        Name:'',
        Location:'',
        Phone:'',
        district:'',
        UpdateName:'',
        UpdateLocation:'',
        UpdatePhone:''
    })
    const [updatename, setupdatename] = useState('');
    const [id, setid] = useState('');
    const [Gen, setGen] = useState([]);
    const [perPage, setperPage] = useState(5);
    const [searchTerm, setSearchtem] = useState('');
    const [Branches, setBrancher] = useState([]);
    const [Cinema,setCinema]=useState([]);
    const [selectedBrancher, setselectedBrancher] = useState(null);
    const [currentPage, setCurrentPage] = useState(0);
    const [IsClosingPopup, setIsClosingPopup] = useState(false);
    const [isPopupVisible, setPopupVisibility] = useState(false);
    const handlePageclick = (data) => {
        setCurrentPage(data.selected);
    };
    const handleBracher = (selectedBrancher) => {
        setselectedBrancher(selectedBrancher);
    }
    const [selectedQuan, setSelectedQuan] = useState(null);
    const [showDropdown, setShowDropdown] = useState(false);

    const handleDropdownToggle = () => {
        setShowDropdown(!showDropdown);
    };
    const handleQuan = (selectedOption) => {
        setSelectedQuan(selectedOption);
       
      };
    useEffect(() => {
        const fetchdata = async () => {
            try {
                const response = await axios.get("http://localhost:5231/api/Cinema/getBranches");
                setBrancher(response.data);

            } catch (error) {
                console.log(error);
            }
        }
        fetchdata();
    }, [])
    const closingAnimation = {
        animation: 'flipright 0.5s',
      };
      const popupContentStyle = {
        background: 'white',
      
        
        
        borderRadius: '8px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        animation: 'flipleft 0.5s', // Default animation
      };
      const popupContentStyle1 = {
        background: '#FDFCF0',
      
        
        
        borderRadius: '8px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        animation: 'flipleft 0.5s', // Default animation
      };
      const handleClosepopup = () => {
        setIsClosingPopup(true);
        setTimeout(() => {
            FormData.ID='';
            FormData.UpdateName='';
            FormData.UpdateLocation='';
            FormData.UpdatePhone='';
          setPopupVisibility(false)
          setIsClosingPopup(false)
        }, 500);
      }
    useEffect(()=>{
        const fetchdata=async()=>{
            try{
                const response=await axios.get("http://localhost:5231/api/Cinema/getCinema");
                setCinema(response.data);
                console.log(response.data)
            }catch(error){
                console.log(error);
            }
        }
        fetchdata();
    },[])
    
    
      const handleUpdate=async (event)=>{
        event.preventDefault();
        try{
            const response=await fetch(`http://localhost:5231/api/Cinema/update/${FormData.ID}`,{
                method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({name:FormData.UpdateName,location:FormData.UpdateLocation,phone:FormData.UpdatePhone}),
            })
            if(!response.ok){
                const responseBody = await response.json();
                if (responseBody.message) {
                  Swal.fire({
                    icon: 'error',
                    title: responseBody.message || 'Failed to add Cinema',
                    showConfirmButton: false,
                    timer: 1500,
                  });

                }
            }else{
                Swal.fire({
                    icon: 'success',
                    title: 'Update Cinema success',
                    showConfirmButton: false,
                    timer: 1500,
                  })
                  FormData.UpdateName='';
                  FormData.UpdateLocation='';
                  FormData.UpdatePhone='';
                  FormData.ID=''
                  setPopupVisibility(false);
                  const response=await axios.get("http://localhost:5231/api/Cinema/getCinema");
                  setCinema(response.data);
            }
           
        }catch(error){
            console.log(error.message)
        }
      }
      
      const filteredGender = Cinema.filter(Cinema =>

        Cinema.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      const indexOflastgen = (currentPage + 1) * perPage;
  const indexOfFirtgen = indexOflastgen - perPage;
  const currentGender = filteredGender.slice(indexOfFirtgen, indexOflastgen)
  const deleteSubmit= async (CinemaID) => {
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
            const response = await axios.post(`http://localhost:5231/api/Cinema/Delete/${CinemaID}`);
            if (response.status === 200) {
                Swal.fire({
                    icon: 'success',
                    title: 'Deletion successful',
                    showConfirmButton: false,
                    timer: 1500,
                });
                const response=await axios.get("http://localhost:5231/api/Cinema/getCinema");
                setCinema(response.data);
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

  

  const handleSetupClick = () => {
    setPopupVisibility(true);
  }

  const [quantityRoom,setQuantityRoom] = useState(0);

  const handleQuantityRoomChange = (e) => {
    const value = parseInt(e.target.value,10);
    if(value < 1 || value > 10){
        Swal.fire({
            icon: 'error',
            title: 'Invalid Quantity',
            text: 'Please enter a number greater than 0 and less than 10'
        });
        setQuantityRoom(0);
    }else{
        setQuantityRoom(value);
    }
  }
 

  const [setupRoomPopupVisible, setSetupRoomPopupVisible] = useState(false);

  const handleOpenSetupRoom = () => {
    if(quantityRoom < 1 || quantityRoom >10){
        Swal.fire({
            icon: 'error',
            title: 'Invalid Quantity',
            text: 'Please enter a number greater than 0 and less than 10'
        });
    }else{
        setSetupRoomPopupVisible(true);
    }
  };
  const handleSubmitRooms = (e) => {
    e.preventDefault();
    // Xử lý logic để lưu thông tin của các phòng vào đây...
    // Ví dụ: Gửi dữ liệu đến server hoặc cập nhật state
    console.log('Room information submitted');
  };
  const [activeTab,setActiveTab] = useState(0);

  const handleTabClick = (index) => {
    setActiveTab(index);
  }
    return (
        <div>


            <div className="wrapper">



             

                <aside className="main-sidebar " style={{ zIndex: '10' }}>

                    <section className="sidebar h-auto">

                        <div className="user-panel">
                            <div className="pull-left image">
                                <img src={image12} className="img-circle" alt="User Image" />
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
                            Cinema Brands

                        </h1>
                        <ol className="breadcrumb">
                            <li><a href="#"><i className="fa fa-dashboard"></i> Home</a></li>
                            <li><a href="#">Cinema Brands</a></li>
                        </ol>
                    </section>
                    <section className="content">
                        <div className="row">
                            
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
                                                <th>Name</th>
                                                <th>Location</th>
                                                <th>Phone</th>
                                                <th>District</th>
                                                <th>City</th>
                                                <th>Setup</th>
                                                <th>Detail</th>
                                            </tr>
                                        </thead>
                                        <tbody>

                                        {currentGender.map((Cinema,index)=>(
                                            <tr key={Cinema.ID}>
                                                <td>{index+1}</td>
                                                <td>{Cinema.name}</td>
                                                <td>{Cinema.location}</td>
                                                <td>{Cinema.phone}</td>
                                                <td>{Cinema.district}</td>
                                                <td>{Cinema.detailCityBranch.length > 0
                            ? Cinema.detailCityBranch[0].idBranchNavigation.city
                            : 'No Category'}</td>
                            <td><button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleSetupClick}>Setup</button></td>
                            <td><button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={()=>deleteSubmit(Cinema.id)}>Remove</button></td>
                                            </tr>
                                        ))}

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

                
                {isPopupVisible && (
          <div className="popup-container ">

            <div className="popup-content " style={IsClosingPopup ? { ...popupContentStyle, ...closingAnimation } : popupContentStyle}>
              <div className='flex justify-end'>
                <button onClick={handleClosepopup} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded float-right "><i className="fas fa-times"></i></button>
              </div>

              
              <div className="form-group">
                    <label className='float-left'>Select Room Quantity</label>
                    <input type='number' value={quantityRoom}  onChange={handleQuantityRoomChange} className="form-control" />
                   
                  </div>
                  <div className='flex justify-center'>
                <button onClick={handleOpenSetupRoom} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded float-right ">Next</button>
              </div>

            </div>
          </div>
        )}

{setupRoomPopupVisible && (
          <div className="popup-container">
          <div className="popup-content1">
              <div className='flex justify-end'>
                  <button onClick={() => setSetupRoomPopupVisible(false)} className="close-btn">X</button>
              </div>
              {/* Menu các rạp */}
              <div className="tabs">
                  {Array.from({ length: quantityRoom }).map((_, i) => (
                      <button
                          key={i}
                          className={`tab-item ${i === activeTab ? 'active' : ''}`}
                          onClick={() => handleTabClick(i)}
                      >
                          Room {i + 1}
                      </button>
                  ))}
              </div>
              {/* Nội dung tương ứng với rạp được chọn */}
              <div className="tab-content">
                  <h2 className='text-black'>Content for Room {activeTab + 1}</h2>
                  {/* Đây là nơi bạn có thể thêm form hoặc thông tin chi tiết cho từng rạp */}
              </div>
              <button onClick={() => setSetupRoomPopupVisible(false)} className="close-btn bg-blue-500 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded float-right">Next</button>
              
          </div>
      </div>
        )}


            </div>
       
            
        </div>


    )
}
export default DetailCinema;