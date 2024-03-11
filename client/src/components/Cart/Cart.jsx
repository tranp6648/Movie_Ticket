import React, { useEffect, useRef, useState } from "react";
import './Cart.css';
import Swal from 'sweetalert2';
import Menu from "../Menu/Menu";
import ReactDOM from "react-dom";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import VNPayButtonComponent from "../Paypal/Paypal";
import { PayPalButton } from "react-paypal-button-v2";
import FooterHome from "../footer/FooterHome";

function Cart() {
  const navigate = useNavigate();
  const location = useLocation();
  const IDAccount = location.state?.IDAccount || '';
  const [total,settotal]=useState(0);
 
  const handleVNPaySuccess = async (Payment) => {
    try {
      const response = await fetch(`http://localhost:5231/api/Order/Add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          totalPrice: totalPrice.toFixed(0),
          idAccount: IDAccount,
          idseat: Info.map(item => item.id)
        }),
      });
      if (response.ok) {
        Swal.fire({
          icon: 'success',
          title: "Add  successfully",
          showConfirmButton: false,
          timer: 1500,
        });
        const response = await axios.get(`http://localhost:5231/api/CardSet/ShowCard/${ID}/${IDAccount}/${IDtime}`);
        setSeat(response.data)
        const responsedata = await axios.get(`http://localhost:5231/api/CardSet/ShowInfoCard/${IDAccount}/${ID}/${IDtime}`);
        setInfo(responsedata.data)

        const calculatedTotalPrice = responsedata.data.reduce((acc, item) => acc + item.price, 0);
        setTotalPrice(calculatedTotalPrice);
      }
    } catch (error) {
      console.log(error);
    }

  };

  const handleVNPayError = (error) => {
    // Handle VNPay error
    console.error('VNPay payment error:', error);
  };

  const handlePaymentError = (error) => {
    // Handle payment error
    console.error('Payment error:', error);
  };
  const ID = location.state?.ID || '';
  const IDtime = location.state?.IDtime || '';
  const [seat, setSeat] = useState([]);
  const [Info, setInfo] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:5231/api/CardSet/ShowInfoCard/${IDAccount}/${ID}/${IDtime}`);
        setInfo(response.data)
        console.log(response.data)
        const calculatedTotalPrice = response.data.reduce((acc, item) => acc + item.price, 0);
        setTotalPrice(calculatedTotalPrice);
      } catch (error) {
        console.log(error)
      }
    }
    fetchData();
  }, [])
  useEffect(() => {
    const fetchdata = async () => {
      try {

        const response = await axios.get(`http://localhost:5231/api/CardSet/ShowCard/${ID}/${IDAccount}/${IDtime}`);
        setSeat(response.data)
        console.log(response.data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchdata();
  }, [])

  const [hoveredSeat, setHoveredSeat] = useState(null);
  const [activeSeats, setActiveSeats] = useState([]);
  const [active, setActive] = useState(null);
  const rows = 8; // Specify the number of rows
  const columns = 9; // Specify the number of columns
  const [Copon, setCopon] = useState(false);
  const OpenCopen = () => {
    setCopon(!Copon)
  }
  const handleSeatHover = (seatdata) => {
    setHoveredSeat(seatdata);
  };
  const handleSeatLeave = () => {
    setHoveredSeat(null);
  };
  const handleUpdate = async (id) => {
    try {
      const response = await axios.post(`http://localhost:5231/api/CardSet/updateSeat/${id}`);
      if (response.status == 200) {
        const response = await axios.get(`http://localhost:5231/api/CardSet/ShowCard/${ID}/${IDAccount}/${IDtime}`);
        setSeat(response.data)
        const responsedata = await axios.get(`http://localhost:5231/api/CardSet/ShowInfoCard/${IDAccount}/${ID}/${IDtime}`);
        setInfo(responsedata.data)

        const calculatedTotalPrice = responsedata.data.reduce((acc, item) => acc + item.price, 0);
        setTotalPrice(calculatedTotalPrice);
      }
    } catch (error) {
      console.log(error);
    }
  }
  const handleActive = (row, col) => {
    const seat = { row, col };

    // Check if the seat is already active
    const isActive = activeSeats.some((activeSeat) => (
      activeSeat.row === row && activeSeat.col === col
    ));

    // If it's active, remove it; otherwise, add it to the active seats
    setActiveSeats((prevActiveSeats) => (
      isActive
        ? prevActiveSeats.filter((activeSeat) => !(activeSeat.row === row && activeSeat.col === col))
        : [...prevActiveSeats, seat]
    ));
  };

  const renderCheckboxes = () => {
    const checkboxes = seat.map((seatdata, index) => (
      <label key={index} aria-label={seatdata}
        onMouseEnter={() => handleSeatHover(seatdata)}
        onMouseLeave={handleSeatLeave}
      >
        <input type="checkbox" className={`${seatdata.status === 1 ? 'active unactive' : seatdata.status === 2 ? 'active setlected' : 'unactive'}  ${seatdata.nameCategory === 'Vip' ? 'vip' : 'unactive'} ` } disabled={seatdata.status === 2}  onClick={() => handleUpdate(seatdata.id)} value={seatdata.id} />
        {hoveredSeat === seatdata && (
          <div className="popup">
            <p> {seatdata.nameCategory}</p>
            <p> {seatdata.seatName}</p>
            <p> {seatdata.categoryseat}</p>
          </div>
        )}
      </label>
    ));

    const result = [];
    for (let i = 0; i < checkboxes.length; i += 9) {
      result.push(
        <li key={i}>
          {checkboxes.slice(i, i + 9)}
        </li>
      );
    }

    return result;
  };
  useEffect(()=>{
    settotal(totalPrice.toFixed(0))
  },[totalPrice])
  return (
    <div>
      <Menu></Menu>
      <div style={{ height: '296px', marginTop: '5px' }}>
                <div className="breadcrumb-area">
                    <div className="container">
                        <div className="breadcrumb-content">
                            <h2 className="font-bold" style={{ color: '#ffffff', textTransform: 'uppercase', textAlign: 'center', fontSize: '36px', marginBottom: '0', paddingBottom: '20px', fontFamily: '"Lato", sans-serif' }}>Cart</h2>
                            <ul>
                                <li>
                                    <a href="" style={{ textDecoration: 'none' }}>Home</a>
                                </li>
                                <li className="active">Cart</li>
                            </ul>
                        </div>
                    </div>
                </div>

            </div>
      <div style={{ height: '100px', marginTop: '97px' }}>
       
        <div className="elementor elementor-3729">
          <section name="" className="elementor-section elementor-top-section elementor-element elementor-element-757a1704 elementor-section-boxed elementor-section-height-default elementor-section-height-default" id="">
            <div className="elementor-container elementor-column-gap-default">
              <div className="elementor-column elementor-col-100 elementor-top-column elementor-element elementor-element-a095e7">
                <div className="elementor-widget-wrap elementor-element-populated">
                  <div className="elementor-element elementor-element-2cb76e08 elementor-widget elementor-widget-text-editor">
                    <div className="elementor-widget-container">
                      <h2 style={{ margin: '1em 98px 0.5em 56px', fontSize: '1.7411em', color: '#000', fontWeight: 'bold' }}>Choose Seat</h2>
                      <fieldset className="ui-cinema">
                        <legend>Choose your seats</legend>
                        <ol>


                          {renderCheckboxes()}




                        </ol>
                      </fieldset>

                      <br />

                      <ul class="ui-color-key">
                        <li >Selected</li>
                        <li  >Sold</li>
                        <li >Available</li>
                        <li >Unavailable</li>
                      </ul>
                      <div className="cart-sidebar">
                        <div className="cart-info">
                          <div className="wp-cart-info mt-[54px]">
                            <div className="cart_title">
                              <h3 className="title">
                                <div className="title"> Booking Information</div>

                              </h3>
                              <div className="content-cart-info">
                                <span className="placeholder " style={{ display: 'none' }}>Please Select Your Seat</span>
                                <div className="item-info item-header" style={{ display: 'flex' }}>
                                  <span>Seat</span>
                                  <span>Price</span>
                                </div>
                                <div className="wp-content-item" style={{ display: 'block' }}>
                                  <div className="item-info item-info-map" style={{ display: 'flex' }}>
                                    <div className="info-type-ticket">
                                      <div className="wp-seat-info">
                                        {Info.map((info, inex) => (
                                          <span className="seat-0">
                                            {info.name}
                                          </span>
                                        ))}

                                      </div>
                                    </div>
                                    <div className="info-sub-price">
                                      ${totalPrice.toFixed(0)}
                                    </div>
                                  </div>
                                  
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="total-cart-info">
                            <span className="text">Total</span>
                            <span className="total-price">  ${total}</span>
                          </div>
                        </div>
                       
                        <div className={`cart-checkout ${Info.length > 0 ? '' : 'mb-disable'}`} style={{marginBottom:'161px'}}>
                          <div className="submit-load-more">
                            <div className="load-more" >
                              <div className="lds-spinner"></div>
                              
                            </div>
                            {/* {seat.length > 0 && (
  <VNPayButtonComponent 
    amount={`${totalPrice.toFixed(0)}`} 
    onSuccess={handleVNPaySuccess} 
    onError={handleVNPayError} 
  />
)}  
                          */}
                            <a className="cursor-pointer" onClick={()=>navigate(`/checkout`,{ state: { ID:IDAccount,IDtime:IDtime,IDAuth:ID,total:total } })}  id="btn-checkout">
                              Proceed to checkout    </a>
                          </div>

                        </div>

                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
        <FooterHome ></FooterHome>
      </div>
    
    </div>
  )

}
export default Cart;