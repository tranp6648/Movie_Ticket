import image from './face11.jpg'
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import Pagination from 'react-paginate';
import 'react-paginate/theme/basic/react-paginate.css';
import './Admin/admin.css';
function Order() {

  const [searchTerm, setSearchtem] = useState('');

  const [currentPage, setCurrentPage] = useState(0);
  const [perPage, setperPage] = useState(5);
  const [Picture, setPicture] = useState([]);
  const location = useLocation();
  const username = location.state?.username || 'Default Username';
  const ID = location.state?.ID || '';
  const navigate = useNavigate();
  const [Order, setOrder] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:5231/api/Order/View/${ID}`)
        setOrder(response.data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchData();
  }, [])



  const filterVoucher = Order.filter(voucher => (
    voucher.orderCode.toLowerCase().includes(searchTerm.toLowerCase())
  ))
  const indexOflastgen = (currentPage + 1) * perPage;
  const indexOfFirtgen = indexOflastgen - perPage;
  const currentGender = filterVoucher.slice(indexOfFirtgen, indexOflastgen)
  const handlePageclick = (data) => {
    setCurrentPage(data.selected);
  };
  return (
    <div>

      <div className="wrapper">

        <header className="main-header">

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
              Order

            </h1>
            <ol className="breadcrumb">
              <li><a href="#"><i className="fa fa-dashboard"></i> Home</a></li>
              <li><a href="#">Order</a></li>
            </ol>
          </section>
          <section className="content">
            <div className="row">

              <div className="box">
                <div className="box-header">
                  <h3 className="box-title">list orders</h3>
                </div>
                <div className="flex items-center space-x-4 float-left flex-1 mb-2 ml-2">
                  <label for="search" className="text-gray-600">Search</label>

                  <input type="text" id="search" name="search" placeholder="Enter your search term" className="border border-gray-300 px-3 py-1 rounded-md focus:outline-none focus:border-blue-500" value={searchTerm} onChange={(e) => setSearchtem(e.target.value)} />

                </div>
                <div className="flex items-center space-x-4 float-right flex-1 mb-2 ml-2">
                  <label for="search" className="text-gray-600">Search</label>

                </div>
                <div className="box-body">
                  <table id="example1" className="table table-bordered table-striped">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Code orders</th>
                        <th>Customer</th>
                        <th>Payment</th>
                        <th>Day Order</th>
                        <th>View</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentGender.map((order, index) => (
                        <tr>
                          <td>{index + 1}</td>
                          <td>{order.orderCode}</td>
                          <td>{order.user}</td>
                          <td>{order.payment == 0 ? 'cash payment' : 'paypal payment'}</td>
                          <td>{new Date(order.dateorder).toLocaleString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', hour: 'numeric', minute: 'numeric' })}</td>
                          <td><button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => navigate('/DetailOrder', { state: { ID: order.id } })}>Detail</button></td>
                        </tr>
                      ))}
                    </tbody>

                  </table>
                  <Pagination
                    previousLabel={'previous'}
                    nextLabel={'next'}
                    breakLabel={'...'}
                    pageCount={Math.ceil(filterVoucher.length / perPage)}
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

      </div>

    </div>

  )
}
export default Order;