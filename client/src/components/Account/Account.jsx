import Menu from '../Menu/Menu';
import './Account.css';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import Swal from 'sweetalert2';
import React, { useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';
function Account() {
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const [showRememberMeMessage, setShowRememberMeMessage] = useState(false);
  const [rememberMe, setrememberMe] = useState(false);
  const handleRememberMeChange = () => {
    setrememberMe(!rememberMe);
    setShowRememberMeMessage(false);
  };
  const navigate=useNavigate();

  const [pillDetail, setPillDetail] = useState({
    Username: '',
    Password: '',
    Email: '',
    Phone: '',
    fullname: '',
    Birthday: null,
    Accounttype:'',
  })
  const [AccLogin, setAccLogin] = useState({
    AccountLogin: '',
    PasswordLogin: ''
  })
  const [loading, setloading] = useState(false);
  const [ActiveTab, setActiveTab] = useState('Login');
  const handleTabChange = (tabID) => {
    setActiveTab(tabID);
  }

  const handleDateChange = (date) => {

    const formattedDate = date.toISOString().split('T')[0];
    setPillDetail({ ...pillDetail, Birthday: formattedDate });
  }
  const isValidDate = (dateString) => {
    const regexDate = /^\d{4}-\d{2}-\d{2}$/;

    if (!regexDate.test(dateString)) {
      return false;
    }

    const dateParts = dateString.split('-');
    const year = parseInt(dateParts[0]);
    const month = parseInt(dateParts[1]) - 1; // Months are zero-based
    const day = parseInt(dateParts[2]);

    const dateObject = new Date(year, month, day);

    return (
      dateObject.getFullYear() === year &&
      dateObject.getMonth() === month &&
      dateObject.getDate() === day
    );
  };
  const [errors, setErrors] = useState({});
  const validateInput = (fieldName, value) => {
    const newErrors = { ...errors };
    if (fieldName === 'Username') {
      newErrors[fieldName] = value.trim() === '' ? 'Username is required' : '';
    } else if (fieldName === "Email") {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      newErrors[fieldName] = !emailPattern.test(value) ? "Invalid email format" : '';

    } else if (fieldName === 'Phone') {
      const phonePattern = /^(?!([0-9])\1+$)\d{10}$/;
      newErrors[fieldName] = !phonePattern.test(value) ? 'Invalid phone number format' : '';
    } else if (fieldName === 'Birthday') {
      newErrors[fieldName] = !isValidDate(value) ? 'Invalid date format' : '';
    } else if (fieldName === 'FullName') {
      newErrors[fieldName] = value.trim() === '' ? 'FullName is required' : '';
    }
    setErrors(newErrors)
  }
  const isvalidPhone = (phone) => {
    const phonePattern = /^(?!([0-9])\1+$)\d{10}$/;
    return phonePattern.test(phone);
  }
  const isValidEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };
  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      if (!rememberMe) {
        setShowRememberMeMessage(true);
        return; // Do not proceed with login
      }
      const response = await fetch('http://localhost:5231/api/Account/Login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(AccLogin),
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.message || 'Login failed');
      }

      const {id, accountType,username } = responseData;

      // Additional actions after a successful response
      Swal.fire({
        icon: 'success',
        title: 'Login success',
        showConfirmButton: false,
        timer: 1500,
      }).then(() => {
        if(accountType==0){
        
          navigate('/admin',{ state: { ID:id,username:username } });
         
        }
      
      });
    
    } catch (error) {
      console.error('Error during login:', error);
      Swal.fire({
        icon: 'error',
        title: 'Login failed',
        text: error.message || 'An error occurred during login.',
      });
    }
  };


  const handleSubmit = (event) => {
    event.preventDefault();

    if (pillDetail.Username === '' || pillDetail.Email === '' || pillDetail.Phone === '' || pillDetail.fullname === '' || pillDetail.Birthday === null) {
      Swal.fire({
        icon: 'error',
        title: 'Username And Email And Phone And FullName is required',
        showConfirmButton: false,
        timer: 1500,

      });
    } else if (!isValidEmail(pillDetail.Email)) {
      Swal.fire({
        icon: 'error',
        title: 'Invalid email format',
        showConfirmButton: false,
        timer: 1500,
      });
    } else if (!isvalidPhone(pillDetail.Phone)) {
      Swal.fire({
        icon: 'error',
        title: 'Invalid Phone format',
        showConfirmButton: false,
        timer: 1500,
      });
    } else if (!isValidDate(pillDetail.Birthday)) {
      Swal.fire({
        icon: 'error',
        title: 'Invalid Date format',
        showConfirmButton: false,
        timer: 1500,
      });
    }
    else {
      setloading(true);
      pillDetail.Accounttype=1;
      pillDetail.Password = pillDetail.Username
      fetch('http://localhost:5231/api/Account/Add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(pillDetail),
      })
        .then(async (response) => {
          const contentType = response.headers.get('content-type');
          let responseData = await response.json();


          if (!response.ok) {
            throw new Error(responseData.message);

          }


        })
        .then((data) => {
          setPillDetail({
            fullname: '',
            Email: '',
            Username: '',
            Phone: '',
            Birthday: '',
            Password: ''
          })
          Swal.fire({
            icon: 'success',
            title: 'Add success',
            showConfirmButton: false,
            timer: 1500,

          });
          // Additional actions after a successful response
        })
        .catch((error) => {
          Swal.fire({
            icon: 'error',
            title: error.message,
            showConfirmButton: false,
            timer: 1500,
          });
        })
        .finally(() => {
          setloading(false);
        });
    }

  };
  const handleInputChange = (e) => {
    setPillDetail({ ...pillDetail, [e.target.name]: e.target.value });
  }
  const handleLoginChange = (e) => {
    setAccLogin({ ...AccLogin, [e.target.name]: e.target.value });
  }
  const renderTabContent = () => {
    switch (ActiveTab) {
      case 'Login':
        return (
          <>
            <form action="" className='woocommerce-form woocommerce-form-login login' onSubmit={handleLogin}>
              <p className='woocommerce-form-row woocommerce-form-row--wide form-row form-row-wide'>
                <label htmlFor="" className='username'>
                  Username or email address&nbsp;
                  <span className='required'>*</span>
                </label>
                <input type="text" value={AccLogin.AccountLogin} onChange={handleLoginChange} name='AccountLogin' className='woocommerce-Input woocommerce-Input--text input-text' />
              </p>
              <p className='woocommerce-form-row woocommerce-form-row--wide form-row form-row-wide'>
                <label htmlFor="" className='username'>
                  Password&nbsp;
                  <span className='required'>*</span>
                </label>
                <input
                  type={showPassword ? 'text' : 'password'} value={AccLogin.PasswordLogin} name='PasswordLogin' onChange={handleLoginChange}
                  className='woocommerce-Input woocommerce-Input--text input-text'
                /> <span
                  onClick={togglePasswordVisibility}
                  className={`show-password-input ${showPassword ? 'visible' : 'hidden'}`}
                >
                  {showPassword ? '🙈' : '👁️'}
                </span>            </p>
              <p className='form-row'>
                <label htmlFor="" className='woocommerce-form__label woocommerce-form__label-for-checkbox woocommerce-form-login__rememberme'>
                  <input type="checkbox" className='woocommerce-form__input woocommerce-form__input-checkboxwoocommerce-form__input woocommerce-form__input-checkbox' onChange={handleRememberMeChange} />
                  <span style={{ color: '#737373' }}>&nbsp;Remember me</span>
                </label>
                {showRememberMeMessage && (
                  <span style={{ color: 'red', marginLeft: '10px' }}>
                    Please check the "Remember Me" box before logging in.
                  </span>
                )}
              </p>
              <button type="submit" className='woocommerce-button button woocommerce-form-login__submit' >Log in</button>
              <p className='woocommerce-LostPassword lost_password'>
                <a href="">Lost your password?</a>
              </p>
            </form>
          </>
        );
      case 'Register':
        return (
          <>
            <form action="" onSubmit={handleSubmit} className='woocommerce-form woocommerce-form-login login'>
              <p className='woocommerce-form-row woocommerce-form-row--wide form-row form-row-wide'>
                <label htmlFor="" className='username'>
                  FullName&nbsp;
                  <span className='required'>*</span>
                </label>
                <input type="text" value={pillDetail.fullname} onChange={handleInputChange} onBlur={() => validateInput('FullName', pillDetail.fullname)} name='fullname' className='woocommerce-Input woocommerce-Input--text input-text' />
                {errors.FullName && (
                  <p className="text-red-500 text-sm italic">{errors.FullName}</p>
                )}
              </p>
              <p className='woocommerce-form-row woocommerce-form-row--wide form-row form-row-wide'>
                <label htmlFor="" className='username'>
                  UserName&nbsp;
                  <span className='required'>*</span>
                </label>
                <input type="text" value={pillDetail.Username} onChange={handleInputChange} name='Username' onBlur={() => validateInput('Username', pillDetail.Username)} className='woocommerce-Input woocommerce-Input--text input-text' />
                {errors.Username && (
                  <p className="text-red-500 text-sm italic">{errors.Username}</p>
                )}
              </p>
              <p className='woocommerce-form-row woocommerce-form-row--wide form-row form-row-wide'>
                <label htmlFor="" className='username'>
                  Phone&nbsp;
                  <span className='required'>*</span>
                </label>
                <input type="text" name='Phone' value={pillDetail.Phone} onChange={handleInputChange} onBlur={() => validateInput('Phone', pillDetail.Phone)} className='woocommerce-Input woocommerce-Input--text input-text' />
                {errors.Phone && (
                  <p className="text-red-500 text-sm italic">{errors.Phone}</p>
                )}
              </p>
              <p className='woocommerce-form-row woocommerce-form-row--wide form-row form-row-wide'>
                <label htmlFor="" className='username'>
                  Birthday&nbsp;
                  <span className='required'>*</span>
                </label>
                <DatePicker name='Birthday' selected={pillDetail.Birthday ? new Date(pillDetail.Birthday) : null} onBlur={() => validateInput('Birthday', pillDetail.Birthday)} onChange={handleDateChange} className='woocommerce-Input woocommerce-Input--text input-text' dateFormat="dd/MM/yyyy" />
                {errors.Birthday && (
                  <p className="text-red-500 text-sm italic">{errors.Birthday}</p>
                )}
              </p>
              <p className='woocommerce-form-row woocommerce-form-row--wide form-row form-row-wide'>
                <label htmlFor="" className='username'>
                  Email&nbsp;
                  <span className='required'>*</span>
                </label>
                <input type="text" name='Email' value={pillDetail.Email} onChange={handleInputChange} onBlur={() => validateInput('Email', pillDetail.Email)} className='woocommerce-Input woocommerce-Input--text input-text' />
                {errors.Email && (
                  <p className="text-red-500 text-sm italic">{errors.Email}</p>
                )}
              </p>
              <p style={{ marginLeft: '3px', color: '#737373' }}>A link to set a new password will be sent to your email address.</p>
              <div className='woocommerce-privacy-policy-text' style={{ color: '#737373' }}>
                Your personal data will be used to support your experience throughout this website, to manage access to your account, and for other purposes described in our <a href="" className='woocommerce-privacy-policy-link' style={{ backgroundColor: 'transparent', color: '#d96c2c' }}>privacy policy</a>
              </div>
              <button type="submit" className='woocommerce-button button woocommerce-form-login__submit' >Register</button>

            </form>
          </>
        )
    }
  }


  return (
    <div >
      {loading && (
        <div
          className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary-600"></div>
        </div>
      )}
      <Menu />
      <div style={{ height: '100px' }}>
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


      <div className='row_site' style={{ paddingTop: '160px', fontWeight: '600' }}>
        <div className='container_site'>
          <div id='main-content' className='main'>
            <article id='post12' className='post-wrap post-12 page type-page status-publish hentry'>
              <div className='woocommerce'>
                <div className='woocommerce-notices-wrapper'>
                  <ul className='ova-login-register-woo'>
                    <li className={ActiveTab === 'Login' ? 'active' : ''}>
                      <a style={{ cursor: 'pointer' }} onClick={() => handleTabChange("Login")}>Login</a>
                    </li>
                    <li className={ActiveTab === 'Register' ? 'active' : ''}>
                      <a style={{ cursor: 'pointer' }} onClick={() => handleTabChange("Register")}>Register</a>
                    </li>
                  </ul>
                  <div className='u-columns col2-set'>
                    <div className='u-column1 col-1' style={{ width: '48%' }}>
                      <h2>Login</h2>
                      <div className="tab-content hiraola-tab_content">
                        <div id="Login" className={`tab-pane ${ActiveTab === 'Login' ? 'active show' : ''}`}>
                          {renderTabContent()}
                        </div>
                        <div id="Register" className={`tab-pane ${ActiveTab === 'Register' ? 'active show' : ''}`}>
                          {renderTabContent()}
                        </div>
                      </div>

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
