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

function CreateAdmin() {


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
  const [Branches, setBrancher] = useState([]);
  const [Cinema, setCinema] = useState([]);
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
  const handleQuan = (selectedOption) => {
    setSelectedQuan(selectedOption);

  };

  const [selectedQuan, setSelectedQuan] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [filteredCinemas, setFilteredCinemas] = useState([]);

  const [userNameInput, setUserNameInput] = useState('');
  const [selectedCinema, setSelectedCinema] = useState(null);
  const [selectedCinemaName, setSelectedCinemaName] = useState('');
  const [selectedCinemaID, setSelectedCinemaID] = useState(null); // Add this state to hold the selected cinema ID

  // Hàm xử lý khi thay đổi lựa chọn rạp
  const handleCinemaChange = (selectedOption) => {
    setSelectedCinema(selectedOption);
    setSelectedCinemaName(selectedOption ? `_${selectedOption.label}` : '');
    setSelectedCinemaID(selectedOption ? selectedOption.value : null);

    // Update FormData to append cinema name to Username
    setFormData((prevFormData) => ({
      ...prevFormData,
      Username: usernameInput ? `${usernameInput}_${selectedOption.label}` : '',
    }));
  };
  const [Account, setAccount] = useState([]);
  const [usernameInput, setUsernameInput] = useState('');
  const handleUsernameInputChange = (event) => {
    const input = event.target.value;
    setUsernameInput(input);

    setFormData((prevFormData) => ({
      ...prevFormData,
      Username: selectedCinemaName ? `${input}${selectedCinemaName}` : input,
    }));
  };

  const handleQuanChange = (selectedOption) => {
    setSelectedQuan(selectedOption);

    const cinemasInDistrict = Cinema.filter((cinema) =>
      cinema.district === selectedOption.value
    );
    setFilteredCinemas(cinemasInDistrict);
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
      FormData.ID = '';
      FormData.UpdateName = '';
      FormData.UpdateLocation = '';
      FormData.UpdatePhone = '';
      setPopupVisibility(false)
      setIsClosingPopup(false)
    }, 500);
  }
  useEffect(() => {
    const fetchdata = async () => {
      try {
        const response = await axios.get("http://localhost:5231/api/Cinema/getCinema");
        setCinema(response.data);
        console.log(response.data)
      } catch (error) {
        console.log(error);
      }
    }
    fetchdata();
  }, [])
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



  const filteredGender = Cinema.filter(Cinema =>

    Cinema.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filterAdmin = Account.filter(Cinema =>

    Cinema.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOflastgen = (currentPage + 1) * perPage;
  const indexOfFirtgen = indexOflastgen - perPage;
  const currentGender = filteredGender.slice(indexOfFirtgen, indexOflastgen)
  const [loading, setloading] = useState(false);
  const isValidEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };


  const indexOfAccount = (currentPage + 1) * perPage;
  const indexOfFirAcount = indexOfAccount - perPage;
  const currentAccount = filterAdmin.slice(indexOfFirAcount, indexOfAccount);

  //==================================================================================================
  const [FormData, setFormData] = useState({
    Username: '',
    Password: '',
    Email: '',
    Phone: null,
    fullname: null,
    Birthday: null,
    Accounttype: '',
    iDCinema: '',

  })

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const response = await axios.get("http://localhost:5231/api/Account/GetAccountAdmin");
        setAccount(response.data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchdata();
  }, [])
  const handleSubmit = async (event) => {
    event.preventDefault();

    const finalUsername = selectedCinemaName ? `${FormData.Username}${selectedCinemaName}` : usernameInput;

    setloading(true);
    FormData.Accounttype = 0;
    FormData.Password = FormData.Password;
    FormData.Username = finalUsername;
    FormData.iDCinema = selectedCinemaID;

    try {
      console.log("Sending data to backend with Cinema ID:", selectedCinemaID, " and FormData:", FormData);
      const response = await fetch(`http://localhost:5231/api/Account/AddAdmin?idCinema=${selectedCinemaID}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(FormData),
      });

      if (!response.ok) {
        throw new Error("invalid Data");
      }

      setFormData({
        fullname: '',
        Email: '',
        Username: '',
        Phone: '',
        Birthday: '',
        Password: ''
      });
      FormData.Password = '';
      setSelectedQuan(null)
      setselectedBrancher(null);
      setSelectedCinema(null)
      Swal.fire({
        icon: 'success',
        title: 'Add success',
        showConfirmButton: false,
        timer: 1500,
      });

      const accountResponse = await axios.get("http://localhost:5231/api/Account/GetAccountAdmin");
      setAccount(accountResponse.data);
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: error.message,
        showConfirmButton: false,
        timer: 1500,
      });
    } finally {
      setloading(false);
    }
  };




  return (
    <div>
      {loading && (
        <div
          className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary-600"></div>
        </div>
      )}

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
            <h1 className='font-serif'>
              CREATE ADMIN

            </h1>
            <ol className="breadcrumb">
              <li><a href="#"><i className="fa fa-dashboard"></i> Home</a></li>
              <li><a href="#">CREATE ADMIN</a></li>
            </ol>
          </section>
          <section className="content">
            <div className="row">
              <div className="box box-primary" style={{ maxHeight: '575px' }}>
                <div className="box-header">
                  <h3 className="box-title">CREATE ADMIN</h3>
                </div>
                <form role="form" onSubmit={handleSubmit}>
                  <div className="box-body">
                    {/* Form fields go here */}
                    <div className="form-group">
                      <label >Email</label>
                      <input className="form-control" id="exampleInputEmail1" placeholder="Enter Location" value={FormData.Email} onChange={(e) => setFormData({ ...FormData, Email: e.target.value })} />

                    </div>

                    <div className="form-group">
                      <label >Password</label>
                      <input className="form-control" id="exampleInputEmail1" placeholder="Enter Location" value={FormData.Password} onChange={(e) => setFormData({ ...FormData, Password: e.target.value })} />

                    </div>

                    <div className="form-group">
                      <label >City</label>
                      <Select options={Branches.map(genres => ({ value: genres.id, label: genres.city }))}
                        onChange={(selectedOption) => handleBracher(selectedOption)}
                        value={selectedBrancher}
                      />

                    </div>
                    <div className="form-group">
                      <label >District</label>
                      <Select
                        options={
                          selectedBrancher?.value === 1
                            ? quanList.map(quan => ({ value: quan, label: quan }))
                            : selectedBrancher?.value === 2
                              ? quanListHanoi.map(quan => ({ value: quan, label: quan }))
                              : []
                        }
                        onChange={handleQuanChange}
                        value={selectedQuan}

                      />

                    </div>
                    <div className='form-group'>
                      <label>Cinema</label>
                      <Select
                        options={filteredCinemas.map(cinema => ({ value: cinema.id, label: cinema.name }))}
                        onChange={handleCinemaChange}
                        value={selectedCinema} // Hiển thị giá trị được chọn trong dropdown
                      />
                    </div>
                    <div className="form-group">

                      <label >Username</label>
                      <input
                        className="form-control"
                        id="exampleInputEmail1"
                        placeholder="Enter Username"
                        value={FormData.Username}
                        onChange={(e) => setFormData({ ...FormData, Username: e.target.value })}
                      />

                    </div>

                  </div>

                  <div className="box-footer ">
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
                        <th>Username</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Birthday</th>
                        <th>FullName</th>

                        <th>Cinema</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentAccount.map((account, index) => (
                        <tr>
                          <td>{index + 1}</td>
                          <td>{account.username}</td>
                          <td>{account.email}</td>
                          <td>{account.phone}</td>
                          <td>{new Date(account.birthDay).toLocaleString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</td>
                          <td>{account.fullName}</td>
                          <td>{account.cinema.name}</td>
                        </tr>
                      ))}

                    </tbody>

                  </table>
                  <Pagination
                    previousLabel={'previous'}
                    nextLabel={'next'}
                    breakLabel={'...'}
                    pageCount={Math.ceil(filterAdmin.length / perPage)}
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
            </div>
          </section>
        </div>


        {isPopupVisible && (
          <div className="popup-container">


          </div>
        )}
      </div>


    </div>


  )
}
export default CreateAdmin;