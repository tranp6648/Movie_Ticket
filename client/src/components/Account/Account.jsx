import Menu from '../Menu/Menu';
import './Account.css';
import React, { useState } from 'react';
function Account() {
    const [showPassword, setShowPassword] = useState(false);
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
      };
  
  return (
    <div >
      <Menu />
      <div style={{height:'100px'}}>
      <div className="breadcrumb-area">
                <div className="container">
                    <div className="breadcrumb-content">
                        <h2 className="font-bold" style={{ color: '#ffffff', textTransform: 'uppercase', textAlign: 'center', fontSize: '36px', marginBottom: '0', paddingBottom: '20px', fontFamily: '"Lato", sans-serif' }}>My Order</h2>
                        <ul>
                            <li>
                                <a href="" style={{ textDecoration: 'none' }}>Home</a>
                            </li>
                            <li className="active">My Order</li>
                        </ul>
                    </div>
                </div>
            </div>

      </div>
     

      <div className='row_site' style={{paddingTop:'160px'}}>
        <div className='container_site'>
          <div id='main-content' className='main'>
            <article id='post12' className='post-wrap post-12 page type-page status-publish hentry'>
              <div className='woocommerce'>
                <div className='woocommerce-notices-wrapper'>
                  <ul className='ova-login-register-woo'>
                    <li className='active'>
                      <a href=''>Login</a>
                    </li>
                    <li>
                        <a href="">Register</a>
                    </li>
                  </ul>
                  <div className='u-columns col2-set'>
                    <div className='u-column1 col-1' style={{width:'48%'}}>
                        <h2>Login</h2>
                        <form action="" className='woocommerce-form woocommerce-form-login login'>
                            <p className='woocommerce-form-row woocommerce-form-row--wide form-row form-row-wide'>
                                <label htmlFor="" className='username'>
                                Username or email address&nbsp; 
                                <span className='required'>*</span>
                                </label>
                            <input type="text" className='woocommerce-Input woocommerce-Input--text input-text' />
                            </p>
                            <p className='woocommerce-form-row woocommerce-form-row--wide form-row form-row-wide'>
                                <label htmlFor="" className='username'>
                                Password&nbsp; 
                                <span className='required'>*</span>
                                </label>
                                <input
          type={showPassword ? 'text' : 'password'}
          className='woocommerce-Input woocommerce-Input--text input-text'
        /> <span
          onClick={togglePasswordVisibility}
          className={`show-password-input ${showPassword ? 'visible' : 'hidden'}`}
        >
          {showPassword ? '🙈' : '👁️'} 
        </span>            </p>
        <p className='form-row'>
            <label htmlFor="" className='woocommerce-form__label woocommerce-form__label-for-checkbox woocommerce-form-login__rememberme'>
                <input type="checkbox" className='woocommerce-form__input woocommerce-form__input-checkboxwoocommerce-form__input woocommerce-form__input-checkbox' />
                <span style={{color:'#737373'}}>&nbsp;Remember me</span>
            </label>
            
        </p>
        <button type="submit" className='woocommerce-button button woocommerce-form-login__submit' >Log in</button>
        <p className='woocommerce-LostPassword lost_password'>
            <a href="">Lost your password?</a>
        </p>
                        </form>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Account;
