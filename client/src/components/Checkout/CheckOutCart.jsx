import React, { useState } from "react";
import Menu from "../Menu/Menu";
import Select from 'react-select';
import './Checkout.css'
function CheckOutCart() {
    const [show, setshow] = useState(false);
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
                                        <input type="text" className="input-text" name="coupon_code" placeholder="Coupon code" />
                                    </p>
                                    <p className="form-row form-row-last" style={{ float: 'right' }}>
                                        <button type="submit" className="apply_coupon" value={'Apply coupon'}>Apply coupon</button>
                                    </p>
                                </form>
                                <form action="" className="checkout woocommerce-checkout">
                                    <div className="col2-set" id="customer_details">
                                        <div className="col-1 " style={{ float: 'left' }}>
                                            <div className="woocommerce-billing-fields">
                                                <h3 style={{ textTransform: 'uppercase', fontSize: '1.2em', marginTop: '0' }}>Billing details</h3>
                                                <div className="woocommerce-billing-fields__field-wrapper">
                                                    <p className="form-row form-row-first validate-required" id="billing_first_name_field">
                                                        <label htmlFor="">
                                                            First name &nbsp;
                                                            <abbr title="" className="required" style={{ visibility: 'visible' }}>*</abbr>
                                                        </label>
                                                        <span className="woocommerce-input-wrapper">
                                                            <input className="input-text" />
                                                        </span>
                                                    </p>
                                                    <p className="form-row form-row-last validate-required" id="billing_first_name_field">
                                                        <label htmlFor="">
                                                            Last name &nbsp;
                                                            <abbr title="" className="required" style={{ visibility: 'visible' }}>*</abbr>
                                                        </label>
                                                        <span className="woocommerce-input-wrapper">
                                                            <input className="input-text" />
                                                        </span>
                                                    </p>
                                                    <p className="form-row form-row-wide woocommerce-validated" style={{ order: '3' }}>
                                                        <label htmlFor="">
                                                            Company name &nbsp;
                                                            <span className="optional">(optional)</span>
                                                        </label>
                                                        <span className="woocommerce-input-wrapper">
                                                            <input className="input-text" />
                                                        </span>
                                                    </p>
                                                    <p className="form-row form-row-wide address-field update_totals_on_change validate-required" style={{ order: '7' }}>
                                                        <label htmlFor="">
                                                            Country / Region &nbsp;
                                                            <abbr title="" className="required" style={{ visibility: 'visible' }}>*</abbr>
                                                        </label>
                                                        <span className="woocommerce-input-wrapper">
                                                            <Select></Select>
                                                        </span>
                                                    </p>
                                                    <p className="form-row address-field validate-required form-row-wide" style={{ order: '8' }}>
                                                        <label htmlFor="">
                                                            Street address&nbsp;
                                                            <abbr title="" className="required" style={{ visibility: 'visible' }}>*</abbr>
                                                        </label>
                                                        <span className="woocommerce-input-wrapper">
                                                            <input type="text" className="input-text " placeholder="House number and street name" />
                                                        </span>
                                                    </p>
                                                    <p className="form-row address-field validate-required form-row-wide" style={{ order: '10' }}>
                                                        <label htmlFor="">
                                                            Town / City&nbsp;
                                                            <abbr title="" className="required" style={{ visibility: 'visible' }}>*</abbr>
                                                        </label>
                                                        <div className="woocommerce-input-wrapper">
                                                            <input type="text" className="input-text" />
                                                        </div>
                                                    </p>
                                                    <p className="form-row address-field validate-required validate-state form-row-wide" style={{ order: '11' }}>
                                                        <label htmlFor="">
                                                            State&nbsp;
                                                            <abbr title="" className="required" style={{ visibility: 'visible' }}>*</abbr>
                                                        </label>
                                                        <span className="woocommerce-input-wrapper">
                                                            <Select></Select>
                                                        </span>
                                                    </p>
                                                    <p className="form-row form-row-wide validate-required validate-phone" style={{ order: '4', width: '50%', paddingRight: '10px' }}>
                                                        <label htmlFor="">
                                                            Phone &nbsp;
                                                            <abbr title="" className="required" style={{ visibility: 'visible' }}>*</abbr>
                                                        </label>
                                                        <span className="woocommerce-input-wrapper">
                                                            <input type="text" className="input-text" />
                                                        </span>
                                                    </p>
                                                    <p className="form-row form-row-wide validate-required validate-email" style={{ order: '5', width: '50%', paddingLeft: '10px' }}>
                                                        <label htmlFor="">
                                                            Email address  &nbsp;
                                                            <abbr title="" className="required" style={{ visibility: 'visible' }}>*</abbr>
                                                        </label>
                                                        <span className="woocommerce-input-wrapper">
                                                            <input type="text" className="input-text" />
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
                                                            <textarea name="" className="input-text " id="" cols="5" rows="2" placeholder="Notes about your order, e.g. special notes for delivery."></textarea>
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
                                                            <a href="" style={{ color: '#000000', borderBottom: '1px solid #d96c2c', fontWeight: 'normal' }}>The Witcher Season 2</a>
                                                            &nbsp;
                                                            <strong className="product-quantity" style={{ color: '#737373' }}> &nbsp;× 1</strong>
                                                            <dl className="variation">
                                                                <dt className="variation-Date" style={{ color: '#737373', fontFamily: 'Space Grotesk' }}>Date:</dt>
                                                                <dd className="variation-Date">
                                                                    <p style={{ color: '#737373', fontFamily: 'Space Grotesk' }}>05-03-2026 7:30 am</p>
                                                                </dd>
                                                                <dt className="variation-Date" style={{ color: '#737373', fontFamily: 'Space Grotesk' }}>Room:</dt>
                                                                <dd className="variation-Date">
                                                                    <p style={{ color: '#737373', fontFamily: 'Space Grotesk' }}>IMAX</p>
                                                                </dd>
                                                                <dt className="variation-Date" style={{ color: '#737373', fontFamily: 'Space Grotesk' }}>Seat:</dt>
                                                                <dd className="variation-Date">
                                                                    <p style={{ color: '#737373', fontFamily: 'Space Grotesk' }}>G24</p>
                                                                </dd>
                                                                <dt className="variation-Date" style={{ color: '#737373', fontFamily: 'Space Grotesk' }}>Address:</dt>
                                                                <dd className="variation-Date">
                                                                    <p style={{ color: '#737373', fontFamily: 'Space Grotesk' }}>San Francisco, California</p>
                                                                </dd>
                                                            </dl>
                                                        </td>
                                                        <td className="product-total">
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
                                                                    40.00
                                                                </bdi>
                                                            </span>
                                                        </td>
                                                    </tr>
                                                </tfoot>
                                            </table>
                                            <div id="payment" className="woocommerce-checkout-payment">
                                                <ul className="wc_payment_methods payment_methods methods">
                                                    <li className="wc_payment_method payment_method_bacs">
                                                        <input type="radio" id="payment_method_bacs" className="input-radio" />
                                                        <label htmlFor="">
                                                            Direct bank transfer 	</label>
                                                            <div className="payment_box payment_method_bacs">
                                                                <p>Make your payment directly into our bank account. Please use your Order ID as the payment reference. Your order will not be shipped until the funds have cleared in our account.</p>
                                                            </div>
                                                    </li>
                                                    <li className="wc_payment_method payment_method_bacs">
                                                        <input type="radio" id="payment_method_bacs" className="input-radio" />
                                                        <label htmlFor="">
                                                        Cash on delivery 	</label>
                                                            <div className="payment_box payment_method_bacs">
                                                                <p>Pay with cash upon delivery.</p>
                                                            </div>
                                                    </li>
                                                </ul>
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