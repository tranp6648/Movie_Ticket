import React, { useState } from "react";
import Menu from "../Menu/Menu";
import './Forgot.css';
import Swal from 'sweetalert2';
import axios from "axios";

function Forgot() {
    const [FormData,setFormData]=useState({
        AccoutForgot:''
    })
    const handleForgot=async (event) => {
        event.preventDefault();
        try{
            const response=await axios.post(`http://localhost:5231/api/Account/Forgot/${FormData.AccoutForgot}`);
            if(response.status==200){
                Swal.fire({
                    icon: 'success',
                    title: 'Reset successful',
                    showConfirmButton: false,
                    timer: 1500,
                  });
                  FormData.AccoutForgot='';
            }else{
               
                Swal.fire({
                    icon: 'error',
                    title: 'Account is not Exist',
                    showConfirmButton: false,
                    timer: 1500,
                  });
            }
        }catch(error){
            Swal.fire({
                icon: 'error',
                title: 'Account is not Exist',
                showConfirmButton: false,
                timer: 1500,
              });
        }
    }
    return (
        <div>
            <Menu></Menu>
            <div style={{ height: '296px', marginTop: '5px' }}>
                <div className="breadcrumb-area">
                    <div className="container">
                        <div className="breadcrumb-content">
                            <h2 className="font-bold" style={{ color: '#ffffff', textTransform: 'uppercase', textAlign: 'center', fontSize: '36px', marginBottom: '0', paddingBottom: '20px', fontFamily: '"Lato", sans-serif' }}>Forgot</h2>
                            <ul>
                                <li>
                                    <a href="" style={{ textDecoration: 'none' }}>Home</a>
                                </li>
                                <li className="active">Forgot</li>
                            </ul>
                        </div>
                    </div>
                </div>

            </div>
            <div className="row_site" style={{ paddingTop: '160px', fontWeight: '600' }}>
                <div className="container_site">
                    <div id="main-content" className="main">
                        <article id="post-12" className="post-wrap  post-12 page type-page status-publish hentry">
                            <div className="woocommerce">
                                <div className="woocommerce-notices-wrapper">
                                    <form onSubmit={handleForgot} action="" className="woocommerce-ResetPassword lost_reset_password">
                                        <p style={{ lineHeight: '1.86em', margin: '0 0 2em',color:'#737373',fontFamily:'Space Grotesk',fontSize:'16px' }}>Lost your password? Please enter your username or email address. You will receive a link to create a new password via email.</p>
                                        <p className="woocommerce-form-row woocommerce-form-row--first form-row form-row-first" style={{width:'95%'}}>
                                            <label htmlFor="" className="user_login" style={{color:'#737373',fontFamily:'Space Grotesk'}}>Username or email</label>
                                            <input type="text" value={FormData.Title} onChange={(e) => setFormData({ ...FormData, AccoutForgot: e.target.value })}  className="woocommerce-Input woocommerce-Input--text input-text" id="user_login" />
                                        </p>
                                        <br />
                                        <p className="woocommerce-form-row form-row">
                                            <button type="submit" className="woocommerce-Button button" value='Reset password' >Reset password</button>
                                        </p>
                                    </form>
                                </div>
                            </div>
                        </article>
                    </div>
                </div>
            </div>
        </div>
    )

}
export default Forgot;