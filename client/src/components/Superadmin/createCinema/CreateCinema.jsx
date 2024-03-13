import image12 from '../../images/1917.jpg';
import { useEffect, useState } from 'react';
import { Form, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import ReactQuill from 'react-quill';

import Pagination from 'react-paginate';
import 'react-paginate/theme/basic/react-paginate.css';
import Select from 'react-select';

function CreateCinema() {


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
        padding: '20px',
        maxWidth: '400px',
        textAlign: 'center',
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
    const quanList = [
        "Quận 1", "Quận 2", "Quận 3", "Quận 4", "Quận 5",
        "Quận 6", "Quận 7", "Quận 8", "Quận 9", "Quận 10",
        "Quận 11", "Quận 12", "Bình Thạnh", "Gò Vấp", "Phú Nhuận",
        "Tân Bình", "Tân Phú", "Bình Tân", "Thủ Đức", "Bình Chánh",
        "Cần Giờ", "Củ Chi", "Hóc Môn", "Nhà Bè"
    ];
    const quanListHanoi = [
        "Ba Đình", "Hoàn Kiếm", "Tây Hồ", "Long Biên", "Cầu Giấy",
        "Đống Đa", "Hai Bà Trưng", "Hoàng Mai", "Thanh Xuân", "Sơn Tây",
        "Ba Vì", "Chương Mỹ", "Đan Phượng", "Đông Anh", "Gia Lâm",
        "Hoài Đức", "Mê Linh", "Mỹ Đức", "Phú Xuyên", "Phúc Thọ",
        "Quốc Oai", "Sóc Sơn", "Thạch Thất", "Thanh Oai", "Thanh Trì",
        "Thường Tín", "Ứng Hòa", "Thị xã Sơn Tây"
    ];
    const handleUpdateSubmit = async (e) => {
        e.preventDefault();
      if(FormData.Name==='' || FormData.Location==="" || FormData.Phone==="" || selectedQuan===null || selectedBrancher.value===null){
        Swal.fire({
            icon: 'error',
            title: 'Name And Location And Phone And District And city is required',
            showConfirmButton: false,
            timer: 1500,
          })
      }else{
        try{
            const response=await fetch("http://localhost:5231/api/Cinema/AddCinema",{
                method:'POST',
                headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({name:FormData.Name,location:FormData.Location,phone:FormData.Phone,district:selectedQuan.label,idBranch:selectedBrancher?.value})
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
                    title: 'Add Genre success',
                    showConfirmButton: false,
                    timer: 1500,
                  })
                  FormData.Name='';
                  FormData.Location='';
                  FormData.Phone='';
                  setselectedBrancher(null);
                  setSelectedQuan(null)
                  const response=await axios.get("http://localhost:5231/api/Cinema/getCinema");
                  setCinema(response.data);
            }
           
            
           }catch(error){
            console.log(error)
           }
      }
      
        
      };
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
      const handleEditClick=(CinemaID)=>{
        const selectedCinema = Cinema.find(Movie => Movie.id == CinemaID)
        if(selectedCinema){
            FormData.ID=CinemaID;
            FormData.UpdateName=selectedCinema.name;
            FormData.UpdateLocation=selectedCinema.location;
            FormData.UpdatePhone=selectedCinema.phone;
        }
        setPopupVisibility(true)
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
                            Cinema Branches

                        </h1>
                        <ol className="breadcrumb">
                            <li><a href="#"><i className="fa fa-dashboard"></i> Home</a></li>
                            <li><a href="#">Cinema Branches</a></li>
                        </ol>
                    </section>
                    <section className="content">
                        <div className="row">
                            <div className="box box-primary" style={{ maxHeight: '542px' }}>
                                <div className="box-header">
                                    <h3 className="box-title">Cinema Branches</h3>
                                </div>
                                <form role="form" onSubmit={handleUpdateSubmit}>
                                    <div className="box-body">
                                        {/* Form fields go here */}
                                        <div className="form-group">
                                            
                                            <label >Name</label>
                                            <input className="form-control" id="exampleInputEmail1" placeholder="Enter Name Genre" value={FormData.Name} onChange={(e) => setFormData({ ...FormData, Name: e.target.value })}/>

                                        </div>
                                        <div className="form-group">
                                            <label >Location</label>
                                            <input className="form-control" id="exampleInputEmail1" placeholder="Enter Location" value={FormData.Location} onChange={(e) => setFormData({ ...FormData, Location: e.target.value })}  />

                                        </div>
                                        <div className="form-group">
                                            <label >Phone</label>
                                            <input className="form-control" id="exampleInputEmail1" placeholder="Enter Phone" value={FormData.Phone} onChange={(e) => setFormData({ ...FormData, Phone: e.target.value })} />

                                        </div>
                                        <div className="form-group">
                                            <label >City</label>
                                            <Select options={Branches.map(genres => ({ value: genres.id, label: genres.city }))}
                                                onChange={(selectedOption) => handleBracher(selectedOption)}
                                                value={selectedBrancher}
                                            />

                                        </div>
                                        <div className="form-group">
                                            <label >Branches</label>
                                            <Select
                                                options={
                                                    selectedBrancher?.value === 1
                                                        ? quanList.map(quan => ({ value: quan, label: quan }))
                                                        : selectedBrancher?.value === 2
                                                            ? quanListHanoi.map(quan => ({ value: quan, label: quan }))
                                                            : [] // Nếu selectedBrancher không được chọn, hoặc có giá trị khác 1 và 2, thì trả về mảng rỗng
                                                }
                                                onChange={(selectedOption) => handleQuan(selectedOption)}
                                                value={selectedQuan}
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
                                                <th>Name</th>
                                                <th>Location</th>
                                                <th>Phone</th>
                                                <th>District</th>
                                                <th>City</th>
                                                <th>Update</th>
                                                <th>Delete</th>
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
                                                <td>{Cinema.city}</td>
                                                
                            <td><button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => handleEditClick(Cinema.id)}>Edit</button></td>
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

                <h3 className="box-title">Edit Cinema</h3>
              </div>
              <form role="form" onSubmit={handleUpdate}>
                <div className="box-body">
                  {/* Form fields go here */}
                  <div className="form-group">
                    <label className='float-left'>Name</label>
                    <input name='UpdateNameCategory' value={FormData.UpdateName} onChange={(e) => setFormData({ ...FormData, UpdateName: e.target.value })}   className="form-control" />
                   
                  </div>
                  <div className="form-group">
                    <label className='float-left'>Location</label>
                    <input name='UpdateNameCategory' value={FormData.UpdateLocation} onChange={(e) => setFormData({ ...FormData, UpdateLocation: e.target.value })}   className="form-control" />
                   
                  </div>
                  <div className="form-group">
                    <label className='float-left'>Phone</label>
                    <input name='UpdateNameCategory' value={FormData.UpdatePhone} onChange={(e) => setFormData({ ...FormData, UpdatePhone: e.target.value })}   className="form-control" />
                   
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
export default CreateCinema;