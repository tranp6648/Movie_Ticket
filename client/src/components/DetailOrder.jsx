import image from './face11.jpg'
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import jsPDF from 'jspdf';
import axios from 'axios';

import { useLocation } from 'react-router-dom';
import Pagination from 'react-paginate';
import 'react-paginate/theme/basic/react-paginate.css';
import './Admin/admin.css';
import Movie from './Movie/Movie';
function DetailOrder() {

    const [searchTerm, setSearchtem] = useState('');
    const [loading, setloading] = useState(false);
    const [totalPrice, setTotalPrice] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    const [perPage, setperPage] = useState(5);
    const [customer, setCustomer] = useState(null);
    const [Picture, setPicture] = useState([]);
    const location = useLocation();
    const [Acc, setAcc] = useState([]);
    const [shipprice, setshipprice] = useState([]);
    const username = location.state?.username || 'Default Username';
    const ID = location.state?.ID || '';
    const IDorder = location.state?.IDorder || '';
    const [Movie,setMovie]=useState([]);
    const caculateTotalPrice = (quanlity, Price) => {
        return (quanlity * Price);
    }
    const [price,setprice]=useState(0);
    useEffect(() => {
        const fetchdata = async () => {
            try {
                const response = await axios.get(`http://localhost:5231/api/Order/Voucherprice/${ID}`);
                setprice(response.data);
                
            } catch (error) {
                console.error("error fetching product", error)
            }
        }
        fetchdata();
    }, [price])
    
    const exportPdf = () => {
        const doc = new jsPDF();
    
        // Add header
        doc.setFont('Arial', 'bold');
        doc.setFontSize(14);
        doc.text('Fashion Infinity', 105, 10, { align: 'center' });
        doc.text('Order Summary', 105, 20, { align: 'center' });
        doc.line(20, 30, 190, 30);
    
        
        doc.setFont('Arial', 'bold');
        doc.setFontSize(12);
        doc.text('Information Customer', 20, 40);
    
        // Reset font for customer details
        doc.setFont('Arial', 'normal');
        doc.setFontSize(12);
   

        // Add customer information
        doc.text(`Customer Name: ${Acc ? Acc.fullName : ""}`, 20, 50);
        doc.text(`Address: ${Acc ? Acc.address : ""}`, 20, 60);
        doc.text(`Zipcode: ${Acc ? Acc.Zipcode : ""}`, 20, 70);
        doc.text(`Phone: ${Acc ? Acc.phone : ""}`, 20, 80);
    
        let currentY = 90; // Adjust starting Y position based on customer info height
    
        // Add title for product details
        doc.setFont('Arial', 'bold');
        doc.setFontSize(12);
        doc.text('Detail Product', 20, currentY);
    
        // Reset font for product details
        doc.setFont('Arial', 'normal');
        doc.setFontSize(12);
    
        // Increment currentY to make space for the title
        currentY += 15;
    
        // Iterate through products and add to the PDF table
        seat.forEach((product, index) => {
            // Product Name
            const productNameLines = doc.splitTextToSize(`Name seat : ${product.seatName}`, 160); // Adjust the width based on your needs
            productNameLines.forEach((line, lineIndex) => {
                doc.text(line, 20, currentY + lineIndex * 10);
            });
    
            // Quantity
         
    
            // Price
            doc.text(`Price: $${product.price}`, 20, currentY + productNameLines.length * 10 + 10);
    
            // Total
          
    
            currentY += productNameLines.length * 10 + 35; // Adjust spacing
        });
    
        // Add total prices
       
            doc.text(`Total pay: $${totalPrice.toFixed(2)}`, 20, currentY  * 15);
        
    
        // Add ship price outside the table
        // if (shipprice.Price !== null && shipprice.Price !== undefined && shipprice.Price !== '') {
        //     doc.text(`Ship price: $${shipprice.Price}`, 20, currentY + uniqueTotalPrices.length * 15);
        // }
    
        // Save the PDF
        doc.save('order_summary.pdf');
    };
const [seat,setseat]=useState([])
useEffect(() => {
    const fetchdata = async () => {
        try {
            const response = await axios.get(`http://localhost:5231/api/Order/SeatMovie/${ID}`);
            setseat(response.data);
            const calculatedTotalPrice = response.data.reduce((acc, item) => acc + item.price, 0);
            setTotalPrice(calculatedTotalPrice);
        } catch (error) {
            console.error("error fetching product", error)
        }
    }
    fetchdata();
}, [])
    useEffect(() => {
        const fetchdata = async () => {
            try {
                const response = await axios.get(`http://localhost:5231/api/Order/ViewAccount/${ID}`);
                setAcc(response.data);
            } catch (error) {
                console.error("error fetching product", error)
            }
        }
        fetchdata();
    }, [IDorder])
    useEffect(() => {
        const fetchdata = async () => {
            try {
                const response = await axios.get(`http://localhost:5231/api/Order/ViewCard/${ID}`);
                setMovie(response.data);
                console.log(response.data)
            } catch (error) {
                console.error("error fetching customer", error)
            }
        }
        fetchdata();
    }, [])
    useEffect(() => {
        const fetchdata = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/detailCustomer/${IDorder}`);
                setCustomer(response.data);
            } catch (error) {
                console.error("error fetching customer", error)
            }
        }
        fetchdata();
    }, [IDorder])


    const navigate = useNavigate();

    // const uniqueTotalPrices = [...new Set(Product.map((card) => card.TotalPrice))];

    return (
        <div>
            {loading && (
                <div
                    className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex justify-center items-center z-[9000]">
                    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary-600"></div>
                </div>
            )}
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
                                <p className='text-white'>Alexander Pierce</p>

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
                            <li><a href="#">Category</a></li>
                        </ol>
                    </section>
                    <section className="content">
                        <div className="row">

                            <div className="box">
                                <div className="box-header">
                                    <h3 className="box-title">Customer information</h3>
                                </div>


                                <div className="box-body">
                                    <table id="example1" className="table table-bordered table-striped">
                                        <thead>
                                            <tr>
                                                <th>FullName</th>
                                                <th>Date</th>
                                                <th>Phone</th>
                                                <th>Address</th>
                                                <th>City</th>

                                                <th>Zipcode</th>

                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>{Acc ? Acc.fullName : ""}</td>
                                                <td>{Acc ? new Date(Acc.birthday).toLocaleString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', hour: 'numeric', minute: 'numeric' }) : ""}</td>
                                                <td>{Acc ? Acc.phone : ""}</td>
                                                <td>{Acc ? Acc.address : ""}</td>
                                                <td>{Acc ? Acc.city : ""}</td>
                                                <td>{Acc ? Acc.zipcode : ""}</td>


                                            </tr>
                                        </tbody>

                                    </table>


                                </div>
                            </div>
                            <div className="box">
                                <div className="box-header">
                                    <h3 className="box-title">List order details</h3>
                                </div>


                                <div className="box-body">
                                    <h2 style={{color:'black'}}>{Movie ? Movie.movie : ""}</h2>
                                    <table id="example1" className="table table-bordered table-striped">
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>Seat Name</th>
                                                <th>Category seat</th>
                                                <th>Price</th>
                                               

                                            </tr>
                                        </thead>
                                        <tbody>
                                            {seat.map((product, index) => (
                                                <tr>

                                                    <td>{index + 1}</td>
                                                    <td>{product.seatName}</td>
                                                    <td>{product.nameSeatCategory}</td>
                                                    <td>${product.price}</td>
                                                 


                                                </tr>
                                            ))}
                                            {/* {shipprice.Price !== null && shipprice.Price !== undefined && shipprice.Price !== "" && (
                                                <tr>
                                                    <td>Ship price: {shipprice.Price}</td>
                                                    <td></td>
                                                    <td></td>
                                                    <td></td>
                                                    <td></td>
                                                </tr>

                                            )} */}
                                           
                                            <tr>
                                                
                                                    <td>Total pay:${totalPrice}</td>

                                                

                                                <td><button style={{
                                                padding: '10px 20px',
                                                fontSize: '16px',
                                                fontWeight: 'bold',
                                                backgroundColor: '#3498db',
                                                color: '#ffffff',
                                                border: 'none',
                                                borderRadius: '5px',
                                                cursor: 'pointer',
                                            }} onClick={exportPdf}>Export PDF</button></td>
                                            </tr>
                                            <tr>Discount Percent: {price>0 ? price : ""}%</tr>
                                            <tr>Total {Movie ? Movie.total : ""}</tr>
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
export default DetailOrder;