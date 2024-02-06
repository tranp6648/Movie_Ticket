import { useLocation } from "react-router-dom";
import Menu from "../Menu/Menu";
import FooterHome from "../footer/FooterHome";
import './Contact.css';
import Swal from 'sweetalert2';
import { useEffect, useState } from "react";
function Contact() {
    const location = useLocation();
    const ID = location.state?.IDAccount || '';
    const [FormData,setFormData]=useState({
        Name:'',
        Email:'',
        Phone:'',
        Subject:'',
        Comment:'',
    })
    useEffect(() => {
        const fetchdata = async () => {
            try {
                const response = await fetch(`http://localhost:5231/api/CheckOut/getAccount/${ID}`);
                if (response.ok) {
                    const data = await response.json();
     
                    setFormData({
                        Name: data.fullName || '',
                      
                        Phone: data.phone || '',
                        Email: data.email || '',
                       
                    })
                   
                }
            } catch (error) {
                console.log(error)
            }
        }
        fetchdata();
    }, [ID])
    const handleSubmit=async(e)=>{
        e.preventDefault();
        if(FormData.Email==''|| FormData.Name=='' || FormData.Phone=='' || FormData.Comment=='' || FormData.Subject==''){
            Swal.fire({
                icon: 'error',
                title: "Please complete all information",
                showConfirmButton: false,
                timer: 1500,
              });
        }else{
            try{
                const response = await fetch('http://localhost:5231/api/Order/SendContact', {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ name: FormData.Name, email: FormData.Email, phone: FormData.Phone, subject: FormData.Subject, comment: FormData.Comment}),
                  })
                  if(response.ok){
                    Swal.fire({
                        icon: 'success',
                        title: 'Add Genre success',
                        showConfirmButton: false,
                        timer: 1500,
                      })
                      FormData.Email=''
                      setFormData({
                        Name:'',
                        Email:'',
                        Phone:'',
                        Subject:'',
                        Comment:'',
                      })
                   
                  }
            }catch(error){
                console.log(error);
            }
        }
       
    }
    return (
        <div>
            <Menu></Menu>
            <div className="breadcrumb-area">
                <div className="container">
                    <div className="breadcrumb-content">
                        <h2 className="font-bold" style={{ color: '#ffffff', textTransform: 'uppercase', textAlign: 'center', fontSize: '36px', marginBottom: '0', paddingBottom: '20px', fontFamily: '"Lato", sans-serif' }}>Contact</h2>
                        <ul>
                            <li>
                                <a href="" style={{ textDecoration: 'none' }}>Home</a>
                            </li>
                            <li className="active">Contact</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="elementor elementor-38" style={{marginTop:'31px'}}>
                <section className="elementor-section elementor-top-section elementor-element elementor-element-34407b9 elementor-section-boxed elementor-section-height-default elementor-section-height-default">
                    <div className="elementor-container elementor-column-gap-default">
                        <div className="elementor-column elementor-col-100 elementor-top-column elementor-element elementor-element-b5e8793">
                            <div className="elementor-widget-wrap elementor-element-populated">
                                <div className="elementor-element elementor-element-49147d5 elementor-widget elementor-widget-aovis_elementor_heading">
                                    <div className="elementor-widget-container">
                                        <div className="ova-heading ova-heading-template1">
                                            <div className="icon">
                                            
                                            <i class="fa-solid fa-video"></i>
                                            </div>
                                            <div className="top-heading">
                                                <h3 className="sub-title">Contact With us</h3>
                                                <h2 className="title" style={{color:'#000',fontFamily:'Space Grotesk',fontWeight:'bold'}}>Feel Free to Write us
                                                    Anytime</h2>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="elementor-element elementor-element-53cc65f elementor-widget elementor-widget-shortcode">
                                    <div className="elementor-widget-container">
                                        <div className="elementor-shortcode">
                                            <div className="wpcf7 js">
                                                <div className="screen-reader-response">
                                                    
                                                </div>
                                                <form action="" onSubmit={handleSubmit} className="wpcf7-form init">
                                                    <div className="ova-ctform7">
                                                        <div className="two-column">
                                                            <div className="name ova_wrap_input">
                                                                <p>
                                                                    <span className="wpcf7-form-control-wrap">
                                                                        <input type="text" value={FormData.Name} onChange={(e) => setFormData({ ...FormData, Name: e.target.value })} className="wpcf7-form-control wpcf7-text wpcf7-validates-as-required" placeholder="Your Name" />
                                                                       
                                                                    </span>
                                                                </p>
                                                            </div>
                                                            <div className="email ova_wrap_input">
                                                                <p>
                                                                    <span className="wpcf7-form-control-wrap">
                                                                    <input type="email" value={FormData.Email} onChange={(e) => setFormData({ ...FormData, Email: e.target.value })} className="wpcf7-form-control wpcf7-email wpcf7-validates-as-required wpcf7-text wpcf7-validates-as-email" placeholder="Email Adress" />
                                                                    </span>
                                                                </p>
                                                         
                                                            </div>
                                                        </div>
                                                        <div className="two-column">
                                                            <div className="phone ova_wrap_input">
                                                                <p>
                                                                    <span className="wpcf7-form-control-wrap">
                                                                        <input type="text" value={FormData.Phone} onChange={(e) => setFormData({ ...FormData, Phone: e.target.value })} className="wpcf7-form-control wpcf7-tel wpcf7-validates-as-required wpcf7-text wpcf7-validates-as-tel" placeholder="Phone" />
                                                                    </span>
                                                                </p>
                                                            </div>
                                                            <div className="subject ova_wrap_input">
                                                                <p>
                                                                    <span className="wpcf7-form-control-wrap">
                                                                        <input type="text" value={FormData.Subject} onChange={(e) => setFormData({ ...FormData, Subject: e.target.value })} className="wpcf7-form-control wpcf7-text wpcf7-validates-as-required" placeholder="Subject" />
                                                                    </span>
                                                                </p>
                                                            </div>
                                                        </div>
                                                        <div className="message ova_wrap_input">
                                                            <p>
                                                                <span className="wpcf7-form-control-wrap">
                                                                    <textarea name="" value={FormData.Comment} onChange={(e) => setFormData({ ...FormData, Comment: e.target.value })}  id="" cols="40" rows="10" className="wpcf7-form-control wpcf7-textarea wpcf7-validates-as-required" placeholder="Write a Comment"></textarea>
                                                                </span>
                                                            </p>
                                                        </div>
                                                        <div className="ova-submit">
                                                            <p>
                                                                <input type="submit" className="wpcf7-form-control wpcf7-submit has-spinner" style={{color:'white',zIndex:'7'}} value={'Send a Message'} />
                                                            </p>
                                                        </div>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                          
                        </div>
                    </div>
                </section>
                <section className="elementor-section elementor-top-section elementor-element elementor-element-3e5e475 elementor-section-boxed elementor-section-height-default elementor-section-height-default">
                    <div className="elementor-background-overlay">
                        
                    </div>
                    <div className="elementor-container elementor-column-gap-extended">
                            <div className="elementor-column elementor-col-33 elementor-top-column elementor-element elementor-element-f7e58e9">
                                <div className="elementor-widget-wrap elementor-element-populated">
                                    <div className="elementor-element elementor-element-12ef2eb elementor-widget elementor-widget-aovis_elementor_contact_info">
                                        <div className="elementor-widget-container">
                                            <div className="ova-contact-info">
                                                <div className="content " style={{zIndex:'3'}}>
                                                <h3 className="tittle">About</h3>
                                                <ul className="info">
                                                    <li className="item">
                                                        <p>Morbi ut tellus ac leo mol stie luctus nec vehicula sed</p>
                                                    </li>
                                                </ul>
                                                </div>
                                                <span className="icon" style={{zIndex:'3'}}>
                                                <i class="fa fa-address-book" aria-hidden="true" style={{fontSize:'60px',color:'#d96c2c'}}></i>
                                                </span>
                                                <div className="background" style={{backgroundImage:'url(https://demo.ovatheme.com/aovis/wp-content/uploads/2023/03/background-contact-info-1.png)'}}>

                                                </div>
                                                <div className="overlay1"></div>
                                                <div className="border-wrapper"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="elementor-column elementor-col-33 elementor-top-column elementor-element elementor-element-f7e58e9">
                                <div className="elementor-widget-wrap elementor-element-populated">
                                    <div className="elementor-element elementor-element-12ef2eb elementor-widget elementor-widget-aovis_elementor_contact_info">
                                        <div className="elementor-widget-container">
                                            <div className="ova-contact-info">
                                                <div className="content " style={{zIndex:'3'}}>
                                                <h3 className="tittle">Address </h3>
                                                <ul className="info">
                                                    <li className="item">
                                                        <a href="">68 Road Broklyn Street, New York, UnitedStates of America
</a>
                                                    </li>
                                                </ul>
                                                </div>
                                                <span className="icon" style={{zIndex:'3'}}>
                                                <i class="fa fa-address-card" aria-hidden="true" style={{fontSize:'60px',color:'#d96c2c'}}></i>
         
                                                </span>
                                                <div className="background" style={{backgroundImage:'url(https://demo.ovatheme.com/aovis/wp-content/uploads/2023/03/background-contact-info-1.png)'}}>

                                                </div>
                                                <div className="overlay1"></div>
                                                <div className="border-wrapper"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="elementor-column elementor-col-33 elementor-top-column elementor-element elementor-element-f7e58e9">
                                <div className="elementor-widget-wrap elementor-element-populated">
                                    <div className="elementor-element elementor-element-12ef2eb elementor-widget elementor-widget-aovis_elementor_contact_info">
                                        <div className="elementor-widget-container">
                                            <div className="ova-contact-info">
                                                <div className="content " style={{zIndex:'3'}}>
                                                <h3 className="tittle">Contact</h3>
                                                <ul className="info">
                                                    <li className="item">
                                                        <p>+92 ( 8800 ) - 6780
needhelp@qrowd.com
info@qrowd.com</p>
                                                    </li>
                                                </ul>
                                                </div>
                                                <span className="icon" style={{zIndex:'3'}}>
                                                <i class="fa fa-address-book" aria-hidden="true" style={{fontSize:'60px',color:'#d96c2c'}}></i>
                                                </span>
                                                <div className="background" style={{backgroundImage:'url(https://demo.ovatheme.com/aovis/wp-content/uploads/2023/03/background-contact-info-1.png)'}}>

                                                </div>
                                                <div className="overlay1"></div>
                                                <div className="border-wrapper"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                </section>
                <div className="contact-main-page">
      <div className="container">
        <div
          id="google-map"
          style={{ position: 'relative', overflow: 'hidden' }}
       
        >
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.060291476182!2d106.71160187451761!3d10.806694358635804!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317529ed00409f09%3A0x11f7708a5c77d777!2zQXB0ZWNoIENvbXB1dGVyIEVkdWNhdGlvbiAtIEjhu4cgVGjhu5FuZyDEkMOgbyB04bqhbyBM4bqtcCBUcsOsbmggVmnDqm4gUXXhu5FjIHThur8gQXB0ZWNo!5e0!3m2!1sfr!2s!4v1704812725990!5m2!1sfr!2s"
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>

          {/* Add a custom overlay for the hover effect */}
        
        </div>
      </div>
    </div>
            </div>
            <FooterHome></FooterHome>
        </div>
    )
}
export default Contact;