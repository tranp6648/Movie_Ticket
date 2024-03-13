import React, { useEffect, useState } from "react";
import Menu from "../Menu/Menu";
import Select from 'react-select';
import './Checkout.css';
import Swal from 'sweetalert2';
import VNPayButtonComponent from "../Paypal/Paypal";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

function CheckOutCart() {
    const navigate = useNavigate();
    const location = useLocation();
    const [isselectedRadio, setisselectedRadio] = useState(false);
    const IDAccount = location.state?.ID || '';
    const IDTime = location.state?.IDtime || '';
    const IDAuth = location.state?.IDAuth || '';
    const total = location.state?.total || '';
    const [totalorder, settotalorder] = useState(0);
    const [DetailVoucher, setDetailVoucher] = useState([]);
    const handleVNPayError = (error) => {
        // Handle VNPay error
        console.error('VNPay payment error:', error);
    };
    useEffect(() => {
        const fetchData = async () => {

            try {
                const response = await axios.get(`http://localhost:5231/api/CheckOut/GetVoucherAccount`)
                setDetailVoucher(response.data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchData();
    }, [])
    useEffect(() => {
        settotalorder(total);
    }, [])
   
    const [Movie, setMovie] = useState([]);
    const [seat, setseat] = useState([]);
    useEffect(() => {
        const fetchData = async () => {

            try {
                const response = await axios.get(`http://localhost:5231/api/CheckOut/ShowSeat/${IDAuth}/${IDAccount}/${IDTime}`)
                setseat(response.data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchData();
    }, [])
    useEffect(() => {
        const fetchData = async () => {

            try {
                const response = await axios.get(`http://localhost:5231/api/CheckOut/showInFoCard/${IDAuth}/${IDAccount}/${IDTime}`)
                setMovie(response.data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchData();
    }, [])

    const handleUpdate = async () => {
console.log(seat.map(item => item.id))
        try {

            const response = await fetch(`http://localhost:5231/api/CheckOut/addOrder/${IDAccount}/${IDTime}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    zipCode: FormData.ZipCode,

                    address: FormData.Address,
                    idCity: selectedCity?.value || selectedCity, // Use selectedCity.value,
                    orderNote: FormData.OrderNote,
                    fullName: FormData.FullName,
                    email: FormData.Email,
                    phone: FormData.Phone,
                    totalPrice: totalorder,
                    idAccount: IDAccount,
                    idSeat: seat.map(item => item.id),
                    idVoucher: selectedidvoucher.map(item => item)
                }),
            });
            if (response.ok) {
                Swal.fire({
                    icon: 'success',
                    title: "Add order successfully",
                    showConfirmButton: false,
                    timer: 1500,
                }).then(navigate('/ThankYou',{ state: { IDAccount:IDAccount } }));
            }
        } catch (error) {
            console.log(error)
        }
    }
    const [show, setshow] = useState(false);
    const [city, setcity] = useState([]);
    const [voucher, setvoucher] = useState([]);
    const [FormData, setFormData] = useState({
        ZipCode: '',
        Address: '',
        OrderNote: '',
        FullName: '',
        Phone: '',
        Email: '',
        check: ''
    })
    const handlechange=(event)=>{
        setFormData({ ...FormData, Email: event.target.value });
    }
    const [Email,setEmail]=useState('');
    const [selectedVouchers, setSelectedVouchers] = useState([]);
    const [selectedidvoucher, setselectedidvoucher] = useState([]);
    const [unactive, setunactive] = useState(false);
    const handleCheck = async () => {
        const matchingCharge = voucher.find((charge) => charge.code === FormData.check);
        const match = DetailVoucher.find(
            (change) =>
                (change.idAccount === IDAccount && change.iDvoucher !== matchingCharge.id) ||
                (change.idAccount !== IDAccount && change.iDvoucher !== matchingCharge.id)
        );
        console.log(match)
        if (matchingCharge.minprice <= totalorder && !selectedVouchers.includes(FormData.check) && (DetailVoucher<=0 || match!==undefined )) {
            const discountAmount = (matchingCharge.discountPercent / 100) * totalorder;
            const updatedTotalOrder = totalorder - discountAmount;

            console.log(updatedTotalOrder);

            settotalorder(updatedTotalOrder);

            console.log(matchingCharge.id);
            // Add the selected voucher to the list
            setSelectedVouchers([...selectedVouchers, FormData.check]);
            setselectedidvoucher([...selectedidvoucher, matchingCharge.id]);

        } else if (matchingCharge.minprice > totalorder) {
            Swal.fire({
                icon: 'error',
                title: "Total orders have not been reduced enough",
                showConfirmButton: false,
                timer: 1500,
            });
        } else if (selectedVouchers.includes(FormData.check)) {
            // Handle the case where the voucher is already selected
            Swal.fire({
                icon: 'error',
                title: "Voucher has already been selected",
                showConfirmButton: false,
                timer: 1500,
            });
        }else if(DetailVoucher>0 || match===undefined){
            Swal.fire({
                icon: 'error',
                title: "you have used this voucher",
                showConfirmButton: false,
                timer: 1500,
            });
        } else {
            Swal.fire({
                icon: 'error',
                title: "Voucher is not exists",
                showConfirmButton: false,
                timer: 1500,
            });
        }

    };

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get('http://localhost:5231/ApplyVoucher');
            setvoucher(response.data);
        }
        fetchData();
    }, [])
    const [selectedCity, setselectedCity] = useState(null);
    const handleCategoryChange = (selectedCategory) => {
        setselectedCity(selectedCategory);
    }
    const [Account, setAccount] = useState([]);
    useEffect(() => {
        const fetchdata = async () => {
            try {
                const response = await fetch(`http://localhost:5231/api/CheckOut/getAccount/${IDAccount}`);
                if (response.ok) {
                    const data = await response.json();
                    setAccount(data)
                    setFormData({
                        FullName: data.fullName || '',
                        ZipCode: data.zipcode || '',
                        Phone: data.phone || '',
                        Email: data.email || '',
                        Address: data.streetAddress || ''
                    })
                    setselectedCity(data.iDcity);
                }
            } catch (error) {
                console.log(error)
            }
        }
        fetchdata();
    }, [IDAccount])
    useEffect(() => {
        const fetchdata = async () => {
            try {
                const response = await axios.get("http://localhost:5231/api/CheckOut/city");
                setcity(response.data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchdata();
    }, [])
    
    
   
    
    const handlePaypal = async (details) => {
        try {
            await Promise.all([
                new Promise(async (resolve) => {
                  // Gọi setFormData
                  await setFormData((prevFormData) => {
                    console.log('Inside setFormData callback - Updated FormData:', prevFormData);
                    // Thực hiện xử lý cập nhật dữ liệu trong callback này nếu cần
                    resolve(prevFormData);
                    return prevFormData;
                  });
                }),
                new Promise(async (resolve) => {
                  // Gọi setselectedCity
                  await setselectedCity((prevCity) => {
                    console.log('Inside setselectedCity callback - Updated City:', prevCity);
                    // Thực hiện xử lý cập nhật dữ liệu trong callback này nếu cần
                    resolve(prevCity);
                    return prevCity;
                  });
                }),
              ])
              .then(async ([updatedFormData, updatedCity]) => {
                  // Log dữ liệu sau khi đã được cập nhật
                  try {

                    const response = await fetch(`http://localhost:5231/api/CheckOut/PaymentByPaypal/${IDAccount}/${IDTime}`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            zipCode: updatedFormData.ZipCode,
        
                            address: updatedFormData.Address,
                            idCity: updatedCity?.value || updatedCity, // Use selectedCity.value,
                            orderNote: updatedFormData.OrderNote,
                            fullName: updatedFormData.FullName,
                            email: updatedFormData.Email,
                            phone: updatedFormData.Phone,
                            totalPrice: totalorder,
                            idAccount: IDAccount,
                            idSeat: seat.map(item => item.id),
                            idVoucher: selectedidvoucher.map(item => item)
                        }),
                    });
                    if (response.ok) {
                        Swal.fire({
                            icon: 'success',
                            title: "Add order successfully",
                            showConfirmButton: false,
                            timer: 1500,
                        }).then(navigate('/ThankYou',{ state: { IDAccount:IDAccount } }));
                       
                    }
                } catch (error) {
                    console.log(error)
                }
                })
      
          // Log FormData sau khi đã được cập nhật
         
        } catch (error) {
          console.log(error);
        }
      };
    
    return (
        <div>
            <Menu></Menu>
            <div style={{ height: '296px', marginTop: '5px' }}>
                <div className="breadcrumb-area">
                    <div className="container">
                        <div className="breadcrumb-content">
                            <h2 className="font-bold" style={{ color: '#ffffff', textTransform: 'uppercase', textAlign: 'center', fontSize: '36px', marginBottom: '0', paddingBottom: '20px', fontFamily: '"Lato", sans-serif' }}>CheckOut</h2>
                            <ul>
                                <li>
                                    <a href="" style={{ textDecoration: 'none' }}>Home</a>
                                </li>
                                <li className="active">CheckOut</li>
                            </ul>
                        </div>
                    </div>
                </div>

            </div>
            <div className="row_site" style={{ marginTop: '97px' }}>
                <div className="container_site">
                    <div id="main-content" className="main">
                        <header className="page-header1">
                            <h1 className="page-title">
                                Checkout							</h1>
                        </header>
                        <article className="post-wrap  post-11 page type-page status-publish hentry">
                            <div className="woocommerce">
                                <div className="woocommerce-notices-wrapper"></div>
                                <div className="woocommerce-form-coupon-toggle">
                                    <div className="wc-block-components-notice-banner is-info">
                                        <div className="wc-block-components-notice-banner__content" style={{ color: '#2F2F2F' }}>

                                            Have a coupon?
                                            <a onClick={() => setshow(!show)} className="showcoupon cursor-pointer" style={{ textDecoration: 'none', color: '#d96c2c', backgroundColor: 'transparent', fontSize: '14px', fontFamily: 'Space Grotesk' }}> Click here to enter your code</a>
                                        </div>
                                    </div>
                                </div>
                                <form action="" className="checkout_coupon woocommerce-form-coupon" style={{ height: '144px', transition: 'all ease 0.5s', display: `${show ? '' : 'none'}` }}>
                                    <p style={{ color: '#737373', marginBottom: '13px' }}>If you have a coupon code, please apply it below.</p>
                                    <p className="form-row form-row-first">
                                        <input type="text" className="input-text" value={FormData.check} onChange={(e) => setFormData({ ...FormData, check: e.target.value })} name="coupon_code" placeholder="Coupon code" />
                                    </p>
                                    <p className="form-row form-row-last" style={{ float: 'right' }}>
                                        <button type="button" onClick={() => handleCheck()} className="apply_coupon" style={{ opacity: `${unactive ? '0.5' : ''}` }} disabled={unactive} value={'Apply coupon'}>Apply coupon</button>
                                    </p>
                                </form>
                                <form action="" className="checkout woocommerce-checkout">
                                    <div className="col2-set" id="customer_details">
                                        <div className="col-1 " style={{ float: 'left' }}>
                                            <div className="woocommerce-billing-fields">
                                                <h3 style={{ textTransform: 'uppercase', fontSize: '1.2em', marginTop: '0' }}>Billing details</h3>
                                                <div className="woocommerce-billing-fields__field-wrapper">
                                                    <p className="form-row form-row-first validate-required" id="billing_first_name_field" style={{ width: '100%' }}>
                                                        <label htmlFor="">
                                                            Full name &nbsp;
                                                            <abbr title="" className="required" style={{ visibility: 'visible' }}>*</abbr>
                                                        </label>
                                                        <span className="woocommerce-input-wrapper">
                                                            <input className="input-text" value={FormData.FullName} onChange={(e) => setFormData({ ...FormData, FullName: e.target.value })} />
                                                        </span>
                                                    </p>

                                                    <p className="form-row form-row-wide woocommerce-validated" style={{ order: '3' }}>
                                                        <label htmlFor="">
                                                            ZIP Code &nbsp;
                                                            <abbr title="" className="required" style={{ visibility: 'visible' }}>*</abbr>
                                                        </label>
                                                        <span className="woocommerce-input-wrapper">
                                                            <input className="input-text" value={FormData.ZipCode} onChange={(e) => setFormData({ ...FormData, ZipCode: e.target.value })} />
                                                        </span>
                                                    </p>

                                                    <p className="form-row address-field validate-required form-row-wide" style={{ order: '11' }}>
                                                        <label htmlFor="">
                                                            Street address&nbsp;
                                                            <abbr title="" className="required" style={{ visibility: 'visible' }}>*</abbr>
                                                        </label>
                                                        <span className="woocommerce-input-wrapper">
                                                            <input type="text" value={FormData.Address} onChange={(e) => setFormData({ ...FormData, Address: e.target.value })} className="input-text " placeholder="House number and street name" />
                                                        </span>
                                                    </p>
                                                    <p className="form-row address-field validate-required form-row-wide" style={{ order: '10' }}>
                                                        <label htmlFor="">
                                                            Town / City&nbsp;
                                                            <abbr title="" className="required" style={{ visibility: 'visible' }}>*</abbr>
                                                        </label>
                                                        <div className="woocommerce-input-wrapper">
                                                            <Select options={city.map(genres => ({ value: genres.id, label: genres.name }))} onChange={(selectedoption) => handleCategoryChange(selectedoption)}
                                                                value={selectedCity} isOptionSelected={(option) => option.value === selectedCity}
                                                            ></Select>
                                                        </div>
                                                    </p>

                                                    <p className="form-row form-row-wide validate-required validate-phone" style={{ order: '4', width: '50%', paddingRight: '10px' }}>
                                                        <label htmlFor="">
                                                            Phone &nbsp;
                                                            <abbr title="" className="required" style={{ visibility: 'visible' }}>*</abbr>
                                                        </label>
                                                        <span className="woocommerce-input-wrapper">
                                                            <input type="text" value={FormData.Phone} onChange={(e) => setFormData({ ...FormData, Phone: e.target.value })} className="input-text" />
                                                        </span>
                                                    </p>
                                                    <p className="form-row form-row-wide validate-required validate-email" style={{ order: '5', width: '50%', paddingLeft: '10px' }}>
                                                        <label htmlFor="">
                                                            Email address  &nbsp;
                                                            <abbr title="" className="required" style={{ visibility: 'visible' }}>*</abbr>
                                                        </label>
                                                        <span className="woocommerce-input-wrapper">
                                                            <input type="text" className="input-text" value={FormData.Email} onChange={handlechange}/>
                                                        </span>
                                                    </p>

                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-2">
                                            <div className="woocommerce-shipping-fields">

                                            </div>
                                            <div className="woocommerce-additional-fields">
                                                <h3>Additional information</h3>
                                                <div className="woocommerce-additional-fields__field-wrapper">
                                                    <p className="form-row notes">
                                                        <label htmlFor="" className="order_comments">
                                                            Order notes &nbsp;
                                                            <span className="optional">(optional)</span>
                                                        </label>
                                                        <span className="woocommerce-input-wrapper">
                                                            <textarea name="" value={FormData.OrderNote} onChange={(e) => setFormData({ ...FormData, OrderNote: e.target.value })} className="input-text " id="" cols="5" rows="2" placeholder="Notes about your order, e.g. special notes for delivery."></textarea>
                                                        </span>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <h3 id="order_review_heading">Your order</h3>
                                        <div id="order_review" className="woocommerce-checkout-review-order">
                                            <table className="shop_table woocommerce-checkout-review-order-table">
                                                <thead>
                                                    <tr >
                                                        <th className="product-name" style={{ backgroundColor: '#fff' }}>Product</th>
                                                        <th className="product-total" style={{ backgroundColor: '#fff' }}>Subtotal</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr className="cart_item">
                                                        <td className="product-name">
                                                            <a href="" style={{ color: '#000000', borderBottom: '1px solid #d96c2c', fontWeight: 'normal', fontFamily: 'Space Grotesk' }}>{Movie.movie || ''}</a>
                                                            &nbsp;
                                                            <strong className="product-quantity" style={{ color: '#737373' }}> &nbsp;× 1</strong>
                                                            <dl className="variation">
                                                                <dt className="variation-Date" style={{ color: '#737373', fontFamily: 'Space Grotesk' }}>Date:</dt>
                                                                <dd className="variation-Date">
                                                                    <p style={{ color: '#737373', fontFamily: 'Space Grotesk' }}>{new Date(Movie.date).toLocaleString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', hour: 'numeric', minute: 'numeric' })}</p>
                                                                </dd>
                                                                <dt className="variation-Date" style={{ color: '#737373', fontFamily: 'Space Grotesk' }}>Room:</dt>
                                                                <dd className="variation-Date">
                                                                    <p style={{ color: '#737373', fontFamily: 'Space Grotesk' }}>{Movie.room}</p>
                                                                </dd>
                                                                <dt className="variation-Date" style={{ color: '#737373', fontFamily: 'Space Grotesk' }}>Seat:</dt>
                                                                <dd className="variation-Date">
                                                                    <p style={{ color: '#737373', fontFamily: 'Space Grotesk' }}> {seat.map(movie => movie.name).join(', ')}</p>
                                                                </dd>
                                                                <dt className="variation-Date" style={{ color: '#737373', fontFamily: 'Space Grotesk' }}>Address:</dt>
                                                                <dd className="variation-Date">
                                                                    <p style={{ color: '#737373', fontFamily: 'Space Grotesk' }}>{Movie.address}</p>
                                                                </dd>
                                                            </dl>
                                                        </td>
                                                        <td className="product-total">
                                                            <span className="woocommerce-Price-amount amount">
                                                                <bdi style={{ color: '#737373', fontFamily: 'Space Grotesk' }}>
                                                                    <span className="woocommerce-Price-currencySymbol">
                                                                        $
                                                                    </span>
                                                                    {total}
                                                                </bdi>
                                                            </span>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                                <tfoot>
                                                    <tr className="cart-subtotal">
                                                        <th style={{ color: '#737373', fontFamily: 'Space Grotesk', borderRight: 'none' }}>Subtotal</th>
                                                        <td style={{ fontWeight: '700', borderTop: '1px solid rgba(0,0,0,.1)', borderRight: 'none', borderLeft: 'none' }}>
                                                            <span className="woocommerce-Price-amount amount">
                                                                <bdi style={{ color: '#737373', fontFamily: 'Space Grotesk' }}>
                                                                    <span className="woocommerce-Price-currencySymbol">
                                                                        $
                                                                    </span>
                                                                    40.00
                                                                </bdi>
                                                            </span>
                                                        </td>
                                                    </tr>
                                                    <tr className="cart-subtotal">
                                                        <th style={{ color: '#737373', fontFamily: 'Space Grotesk', borderRight: 'none' }}>Total</th>
                                                        <td style={{ fontWeight: '700', borderTop: '1px solid rgba(0,0,0,.1)', borderRight: 'none', borderLeft: 'none' }}>
                                                            <span className="woocommerce-Price-amount amount">
                                                                <bdi style={{ color: '#737373', fontFamily: 'Space Grotesk' }}>
                                                                    <span className="woocommerce-Price-currencySymbol">
                                                                        $
                                                                    </span>
                                                                    {totalorder}
                                                                </bdi>
                                                            </span>
                                                        </td>
                                                    </tr>
                                                </tfoot>
                                            </table>
                                            <div id="payment" className="woocommerce-checkout-payment">
                                                <ul className="wc_payment_methods payment_methods methods">
                                                    <li className="wc_payment_method payment_method_bacs">
                                                        <input type="radio" id="payment_method_bacs" className="input-radio" checked={isselectedRadio} onChange={() => setisselectedRadio(!isselectedRadio)} />
                                                        <label htmlFor="">
                                                            Direct bank transfer 	</label>
                                                        <div className="payment_box payment_method_bacs" style={{ display: `${isselectedRadio ? '' : 'none'}` }}>
                                                            <p>Make your payment directly into our bank account. Please use your Order ID as the payment reference. Your order will not be shipped until the funds have cleared in our account.</p>
                                                            <VNPayButtonComponent
                                                                type="button"
                                                                amount={`${total}`}
                                                                Email={Email}
                                                                FormData={FormData}
                                                                onSuccess={handlePaypal}
                                                                onError={handleVNPayError}
                                                                setFormData={setFormData}
                                                            />
                                                        </div>
                                                    </li>
                                                    <li className="wc_payment_method payment_method_bacs">
                                                        <input type="radio" id="payment_method_bacs" className="input-radio" checked={!isselectedRadio} onChange={() => setisselectedRadio(!isselectedRadio)} />
                                                        <label htmlFor="">
                                                            Cash on delivery 	</label>
                                                        <div className="payment_box payment_method_bacs" style={{ display: `${!isselectedRadio ? '' : 'none'}` }}>
                                                            <p>Pay with cash upon delivery.</p>
                                                        </div>
                                                    </li>
                                                </ul>
                                                <div className="form-row place-order">
                                                    <div className="woocommerce-terms-and-conditions-wrapper">
                                                        <div className="woocommerce-privacy-policy-text">
                                                            <p style={{ color: '#737373', fontFamily: 'Space Grotesk' }}>Your personal data will be used to process your order, support your experience throughout this website, and for other purposes described in our </p>
                                                            <a className="woocommerce-privacy-policy-link" style={{ color: '#d96c2c', textDecoration: 'none', background: 'transparent' }}>privacy policy</a>
                                                            .
                                                        </div>
                                                    </div>
                                                    <button type="button" id="place_order" className="button alt" onClick={handleUpdate} style={{ float: 'right', backgroundColor: '#333' }} value={'Place order'} >Place order</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </article>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default CheckOutCart;