import React, { useEffect, useRef, useState } from "react";
import'./Cart.css';
import Menu from "../Menu/Menu";
import ReactDOM from "react-dom";

function Cart(){
  
  const rows = 15; // Specify the number of rows
  const columns = 6; // Specify the number of columns
  const [selectedSeats, setSelectedSeats] = useState([]);

  const handleSeatClick = (row, column) => {
    const seatId = `${row}${column}`;
    setSelectedSeats((prevSelectedSeats) =>
      prevSelectedSeats.includes(seatId)
        ? prevSelectedSeats.filter((seat) => seat !== seatId)
        : [...prevSelectedSeats, seatId]
    );
  };

  const isSeatOccupied = (row, column) => {
    // Implement logic to check if a seat is occupied based on your requirements
    // For now, let's assume no seats are occupied
    return false;
  };
    return(
<div>
    <Menu></Menu>
    <div style={{ height: '100px', marginTop: '97px' }}>
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
                <div className="elementor elementor-3729">
                    <section name="" className="elementor-section elementor-top-section elementor-element elementor-element-757a1704 elementor-section-boxed elementor-section-height-default elementor-section-height-default" id="">
                        <div className="elementor-container elementor-column-gap-default">
                            <div className="elementor-column elementor-col-100 elementor-top-column elementor-element elementor-element-a095e7">
                                <div className="elementor-widget-wrap elementor-element-populated">
                                    <div className="elementor-element elementor-element-2cb76e08 elementor-widget elementor-widget-text-editor">
                                        <div className="elementor-widget-container">
                                            <h2 style={{margin:'1em 98px 0.5em 56px',fontSize:'1.7411em',color:'#000',fontWeight:'bold'}}>Choose Seat</h2>
                                            <div class="theatre">
  <div class="screen-side">
    <div class="screen">Screen</div>
    <h3 class="select-text">Please select a seat</h3>
  </div>
  <div class="exit exit--front">
  </div>
 <ol className="cabin">
            {Array.from({ length: rows }, (_, rowIndex) => (
              <li key={rowIndex} className={`row row--${rowIndex + 1}`}>
                <ol className="seats" type="A">
                  {Array.from({ length: columns }, (_, columnIndex) => (
                    <li key={columnIndex} className="seat">
                      <input
                        type="checkbox"
                        id={`${rowIndex + 1}${String.fromCharCode(
                          65 + columnIndex
                        )}`}
                        checked={selectedSeats.includes(
                          `${rowIndex + 1}${String.fromCharCode(65 + columnIndex)}`
                        )}
                        onChange={() => handleSeatClick(rowIndex + 1, columnIndex + 1)}
                        disabled={isSeatOccupied(rowIndex + 1, columnIndex + 1)}
                      />
                      <label
                        htmlFor={`${rowIndex + 1}${String.fromCharCode(
                          65 + columnIndex
                        )}`}
                      >
                        {`${rowIndex + 1}${String.fromCharCode(65 + columnIndex)}`}
                      </label>
                    </li>
                  ))}
                </ol>
              </li>
            ))}
          </ol>
  <div class="exit exit--back">
  </div>
</div>
<div className="cart-sidebar">
    <div className="cart-info">
        <div className="wp-cart-info">
            <div className="cart_title">
                <h3 className="title">
                    <div className="title"> Booking Information</div>
               
                </h3>
                <div className="content-cart-info">
                    <span className="placeholder " style={{display:'none'}}>Please Select Your Seat</span>
                    <div className="item-info item-header" style={{display:'flex'}}>
                        <span>Seat</span>
                        <span>Price</span>
                    </div>
                    <div className="wp-content-item" style={{display:'block'}}>
                        <div className="item-info item-info-map" style={{display:'flex'}}>
                            <div className="info-type-ticket">
                                <div className="wp-seat-info">
                                    <span className="seat-0">
                                    N10
                                    </span>
                                </div>
                            </div>
                            <div className="info-sub-price">
                            $250.00
                            </div>
                        </div>
                        <div className="item-info area-item area-id-Area2">
                            <div className="info-type-ticket">
                                <span className="area-name">Area2</span>
                            </div>
                            <div className="info-qty-ticket">
                                <span className="area-minus">
                                    <i className="flaticon-minus"></i>
                                    
                                </span>
                                <span className="area-qty">1</span>
                                    <span className="area-plus">
                                        <i className="flaticon-plus"></i>
                                    </span>
                            </div>
                            <div className="info-sub-price">
                            $10.00
                            </div>
                        </div>
                    </div>
                </div>
            </div>
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

            </div>
</div>
    )

}
export default Cart;