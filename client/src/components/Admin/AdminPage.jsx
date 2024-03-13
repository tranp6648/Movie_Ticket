import { useEffect, useState, useRef } from 'react';
import image from '../face11.jpg';
import { useLocation } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

import './admin.css'
import { format } from 'date-fns';

import axios from 'axios';
import { Bar, Pie } from 'react-chartjs-2';
import Chart from 'chart.js/auto'; // Import the Chart object from 'chart.js/auto'
import { CategoryScale, LinearScale, BarController, Title } from 'chart.js';

function AdminPage() {
  const canvasRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  const username = location.state?.username || 'Default Username';
  const [orderData, setOrderData] = useState([]);
  const ID = location.state?.ID || '';
  const [showDropdown, setShowDropdown] = useState(false);
  const [Movie, setMovie] = useState(null);
  const [Actor, setActor] = useState(null);
  const [User, setUser] = useState(null);
  const [Event, setEvent] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [CategoryMovie, setCategoryMovie] = useState(null);
  const [Genre, setGenre] = useState(null);
  const [Username, setUsername] = useState([]);
  const [Order, setOrder] = useState(null);
  const [showtime, setshowtime] = useState(null);
  const handleDropdownToggle = () => {
    setShowDropdown(!showDropdown);
  };
  useEffect(() => {
    const fetchProductCount = async () => {
      try {
        const response = await axios.get('http://localhost:5231/api/Movie/CountCategoryMovie');
        setCategoryMovie(response.data);
      } catch (error) {
        console.error('Error fetching product count:', error);
      }
    };

    fetchProductCount();
  }, [])
  useEffect(() => {
    const fetchProductCount = async () => {
      try {
        const response = await axios.get('http://localhost:5231/api/Movie/Orderdesc');
        setUsername(response.data);
      } catch (error) {
        console.error('Error fetching product count:', error);
      }
    };

    fetchProductCount();
  }, [])
  useEffect(() => {
    const fetchProductCount = async () => {
      try {
        const response = await axios.get('http://localhost:5231/api/Movie/CountShowtime');
        setshowtime(response.data);
      } catch (error) {
        console.error('Error fetching product count:', error);
      }
    };

    fetchProductCount();
  }, [])
  useEffect(() => {
    const fetchProductCount = async () => {
      try {
        const response = await axios.get('http://localhost:5231/api/Movie/CountOrder');
        setOrder(response.data);
      } catch (error) {
        console.error('Error fetching product count:', error);
      }
    };

    fetchProductCount();
  }, [])
  useEffect(() => {
    const fetchProductCount = async () => {
      try {
        const response = await axios.get('http://localhost:5231/api/Movie/CountGenre');
        setGenre(response.data);
      } catch (error) {
        console.error('Error fetching product count:', error);
      }
    };

    fetchProductCount();
  }, [])
  useEffect(() => {
    const fetchProductCount = async () => {
      try {
        const response = await axios.get('http://localhost:5231/api/Movie/CountEvent');
        setEvent(response.data);
      } catch (error) {
        console.error('Error fetching product count:', error);
      }
    };

    fetchProductCount();
  }, [])
  useEffect(() => {
    const fetchProductCount = async () => {
      try {
        const response = await axios.get('http://localhost:5231/api/Movie/countUser');
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching product count:', error);
      }
    };

    fetchProductCount();
  }, [])
  useEffect(() => {
    const fetchProductCount = async () => {
      try {
        const response = await axios.get('http://localhost:5231/api/Movie/CountActor');
        setActor(response.data);
      } catch (error) {
        console.error('Error fetching product count:', error);
      }
    };

    fetchProductCount();
  }, [])
  useEffect(() => {
    const fetchProductCount = async () => {
      try {
        const response = await axios.get('http://localhost:5231/api/Movie/CountMovie');
        setMovie(response.data);
      } catch (error) {
        console.error('Error fetching product count:', error);
      }
    };

    fetchProductCount();
  }, []);
  const chartDataProduct = {
    labels: ['Movie', 'Category', 'Actor', 'User'],
    datasets: [{
      data: [Movie, CategoryMovie, Actor, User],
      backgroundColor: [
        'rgba(255, 99, 132, 0.6)',
        'rgba(54, 162, 235, 0.6)',
        'rgba(255, 206, 86, 0.6)',
        'rgba(75, 192, 192, 0.6)',
        // Add more colors if you have more categories
      ],
    }],
  };
  useEffect(() => {
    // Register required chart.js components
    Chart.register(CategoryScale, LinearScale, BarController, Title);
  }, []);

  useEffect(() => {
    const fetchOrderData = async () => {
      try {
        const response = await axios.get(`http://localhost:5231/api/Order/GetCoutorder/${selectedMonth}`);
        setOrderData(response.data);

      } catch (error) {
        console.error('Error fetching order data', error);
      }
    };

    fetchOrderData();
  }, [selectedMonth]);

  const chartOptions = {
    scales: {
      x: {
        type: 'category', // Specify the scale type as 'category' for the x-axis
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  const generateChartData = () => {
    const daysInMonth = new Date(new Date().getFullYear(), selectedMonth, 0).getDate();
    const chartData = Array.from({ length: daysInMonth }, (_, index) => 0);

    orderData.forEach((orderCount) => {
      const orderDay = new Date(orderCount.orderDate).getDate();
      chartData[orderDay - 1] = orderCount.orderCount;
    });

    return chartData;
  };

  const chartData = {
    labels: Array.from({ length: new Date(new Date().getFullYear(), selectedMonth, 0).getDate() }, (_, index) => index + 1),
    datasets: [
      {
        label: 'Number of Unique Orders',
        data: generateChartData(),
        backgroundColor: 'rgba(75,192,192,0.6)',
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="wrapper">

      <header className="main-header">

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
              <a href="#"  onClick={() => navigate('/Edit', { state: { username: username, ID: ID } })}>
                <i className="fa fa-user" aria-hidden="true"></i> Account
              </a>

              {/* Các mục khác của dropdown có thể được thêm vào đây */}
            </div>
          )}
        </nav>
      </header>

      <aside className="main-sidebar ">

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
            Dashboard
            <small>Control panel</small>
          </h1>
          <ol className="breadcrumb">
            <li><a href="#"><i className="fa fa-dashboard"></i> Home</a></li>
            <li className="active">Dashboard</li>
          </ol>
        </section>


        <section className="content">

          <div className="row">
            <div className="col-lg-3 col-xs-6">

              <div className="small-box bg-aqua">
                <div className="inner">
                  <h3>{Event}</h3>
                  <p>Event</p>
                </div>
                <div className="icon">
                  <i className="ion ion-bag"></i>
                </div>
                <a href="#" className="small-box-footer">More info <i className="fa fa-arrow-circle-right"></i></a>
              </div>
            </div>
            <div className="col-lg-3 col-xs-6">

              <div className="small-box bg-green">
                <div className="inner">
                  <h3>{Order}</h3>
                  <p>Order</p>
                </div>
                <div className="icon">
                  <i className="ion ion-stats-bars"></i>
                </div>
                <a href="#" className="small-box-footer">More info <i className="fa fa-arrow-circle-right"></i></a>
              </div>
            </div>
            <div className="col-lg-3 col-xs-6">

              <div className="small-box bg-yellow">
                <div className="inner">
                  <h3>{Genre}</h3>
                  <p>Genre</p>
                </div>
                <div className="icon">
                  <i className="ion ion-person-add"></i>
                </div>
                <a href="#" className="small-box-footer">More info <i className="fa fa-arrow-circle-right"></i></a>
              </div>
            </div>
            <div className="col-lg-3 col-xs-6">

              <div className="small-box bg-red">
                <div className="inner">
                  <h3>{showtime}</h3>
                  <p>Shotimes</p>
                </div>
                <div className="icon">
                  <i className="ion ion-pie-graph"></i>
                </div>
                <a href="#" className="small-box-footer">More info <i className="fa fa-arrow-circle-right"></i></a>
              </div>
            </div>
          </div>

          <div className="row">

            <section className="col-lg-7 connectedSortable">


              <div className="box box-success">

                <div className="box-body chat" id="chat-box">



                  {/* Dropdown to select the month */}
                  <Bar data={chartData} options={chartOptions} />
                  <label>Select Month:</label>
                  <select id="selectMonth"
                    className="form-select" value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)}>
                    {[...Array(12).keys()].map((month) => (
                      <option key={month + 1} value={month + 1}>
                        {month + 1}
                      </option>
                    ))}
                  </select>

                </div>
                <div className="box-footer">
                  <div className="input-group">
                    <input className="form-control" placeholder="Type message..." />
                    <div className="input-group-btn">
                      <button className="btn btn-success"><i className="fa fa-plus"></i></button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="box box-primary">
                <div className="box box-solid bg-light-blue-gradient">
                  <div className="box-header">

                    <div className="pull-right box-tools">
                      <button className="btn btn-primary btn-sm daterange pull-right" data-toggle="tooltip" title="Date range"><i className="fa fa-calendar"></i></button>
                      <button className="btn btn-primary btn-sm pull-right" data-widget='collapse' data-toggle="tooltip" title="Collapse" ><i className="fa fa-minus"></i></button>
                    </div>

                    <i className="fa fa-map-marker"></i>
                    <h3 className="box-title">
                      Visitors
                    </h3>
                  </div>
                </div>
                <div className="box-header">


                </div>
                <div className="box-body">

                </div>

              </div>

              <div className="box box-info">
                <div className="box-header">
                  <i className="fa fa-envelope"></i>
                  <h3 className="box-title">Quick Email</h3>

                  <div className="pull-right box-tools">
                    <button className="btn btn-info btn-sm" data-widget="remove" data-toggle="tooltip" title="Remove"><i className="fa fa-times"></i></button>
                  </div>
                </div>

                {/* Dropdown to select the month */}
                <label>Select Month:</label>

                <div className="box-footer clearfix">
                  <button className="pull-right btn btn-default" id="sendEmail">Send <i className="fa fa-arrow-circle-right"></i></button>
                </div>
              </div>

            </section>
            <section className="col-lg-5 connectedSortable">


              <div className="box box-solid bg-light-blue-gradient">
                <div className="box-header">

                  <div className="pull-right box-tools">
                    <button className="btn btn-primary btn-sm daterange pull-right" data-toggle="tooltip" title="Date range"><i className="fa fa-calendar"></i></button>
                    <button className="btn btn-primary btn-sm pull-right" data-widget='collapse' data-toggle="tooltip" title="Collapse" ><i className="fa fa-minus"></i></button>
                  </div>

                  <i className="fa fa-map-marker"></i>
                  <h3 className="box-title">
                    Visitors
                  </h3>
                </div>

                <div className="box-footer no-border">
                  <Pie data={chartDataProduct} />

                </div>
              </div>

              <div className="box box-solid bg-teal-gradient">
                <div className="box-header">
                  <i className="fa fa-th"></i>
                  <h3 className="box-title">Sales Graph</h3>
                  <div className="box-tools pull-right">
                    <button className="btn bg-teal btn-sm" data-widget="collapse"><i className="fa fa-minus"></i></button>
                    <button className="btn bg-teal btn-sm" data-widget="remove"><i className="fa fa-times"></i></button>
                  </div>
                </div>
                <div className="box-body border-radius-none">
                  <div className="chart" id="line-chart" ></div>
                </div>
                <div className="box-footer no-border">
                  <table id="example1" className="table table-bordered table-striped">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Username</th>

                        <th>Fullname</th>
                        <th>OrderCount</th>



                      </tr>
                    </thead>
                    <tbody>
                      {Username.map((user, index) => (
                        <tr>
                          <td>{index + 1}</td>
                          <td>{user.username}</td>
                          <td>{user.fullName}</td>
                          <td>{user.ordercount}</td>
                        </tr>
                      ))}
                      <tr></tr>
                    </tbody>

                  </table>
                </div>
              </div>




            </section>
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

  )
}
export default AdminPage;