import React, { useEffect, useState } from "react";
import Menu from "../Menu/Menu";
import "./About.css";
import Odometer from 'odometer';
import FooterHome from "../footer/FooterHome";

function About() {
    const [Open, setOpen] = useState(false);
    const [odometer, setOdometer] = useState(null); // State to store Odometer instance
    const [count, setCount] = useState(0);
    const popupContentStyle = {
        display: "flex",
        animation: "fadeDown 0.5s ease-out"
    };

    const closepopup = {
        display: "none",
        animation: "fadeUp 0.5s ease-out" // Specify the animation properties
    };


    useEffect(() => {
        const interval = setInterval(() => {
            if (count < 20) {
                setCount(prevCount => prevCount + 1);
            }
        }, 100);

        // Xóa interval khi component unmount
        return () => clearInterval(interval);
    }, [count]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const testimonials = [
        {
            name: "Hubert J. Johnso",
            job: "Customer",
            content: "This is due to their excellent service, competitive pricing and customer support. It’s refresing to get such a personal touch. Duis aute lorem ipsum is simply free text available in the market reprehen.",
            image: "https://demo.ovatheme.com/aovis/wp-content/uploads/2023/02/image-1-our-team.jpg"
        },
        // Add more testimonials here
    ];
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
        }, 5000); // Change 5000 to adjust the interval duration
        return () => clearInterval(interval);
    }, [testimonials.length]);
    return (
        <div>
            <Menu />
            <div className="breadcrumb-area">
                <div className="container">
                    <div className="breadcrumb-content">
                        <h2
                            className="font-bold"
                            style={{
                                color: "#ffffff",
                                textTransform: "uppercase",
                                textAlign: "center",
                                fontSize: "36px",
                                marginBottom: "0",
                                paddingBottom: "20px",
                                fontFamily: '"Lato", sans-serif'
                            }}
                        >
                            About
                        </h2>
                        <ul>
                            <li>
                                <a href="" style={{ textDecoration: "none" }}>
                                    Home
                                </a>
                            </li>
                            <li className="active">About</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="elementor elementor-30" style={{marginBottom:'35px'}}>
                <section
                    className="elementor-section elementor-top-section elementor-element elementor-element-b05f2a6 elementor-section-boxed elementor-section-height-default elementor-section-height-default"
                >

                    <div className="elementor-container elementor-column-gap-default">
                        <div className="elementor-column elementor-col-50 elementor-top-column elementor-element elementor-element-633a54c">
                            <div className="elementor-widget-wrap elementor-element-populated">
                                <div className="elementor-element elementor-element-609a474 elementor-widget elementor-widget-image">
                                    <div className="elementor-widget-container">
                                        <img
                                            src="https://demo.ovatheme.com/aovis/wp-content/uploads/2023/03/image-about-about-page.jpg"
                                            width={496}
                                            height={495}
                                            alt=""
                                        />
                                    </div>
                                </div>
                                <div
                                    className="elementor-element elementor-element-030c5f4 elementor-widget__width-auto elementor-absolute elementor-hidden-mobile elementor-widget elementor-widget-image animated rotateIn"
                                    style={{ position: "absolute", top: "47vh" }}
                                >
                                    <div className="elementor-widget-container">
                                        <img
                                            src="https://demo.ovatheme.com/aovis/wp-content/uploads/2023/03/image-arrow-about-about-page.png"
                                            className="attachment-full size-full wp-image-1472"
                                            alt=""
                                        />
                                    </div>
                                </div>
                                <div
                                    className="elementor-element elementor-element-dd138d8 elementor-widget__width-auto elementor-absolute elementor-widget elementor-widget-aovis_elementor_video"
                                    style={{ position: "absolute" }}
                                >
                                    <div className="elementor-widget-container">
                                        <div className="ova-video">
                                            <div className="icon-content-view video_active no-animation inline-block">
                                                <div
                                                    className="content video-btn cursor-pointer"
                                                    onClick={() => setOpen(!Open)}
                                                >
                                                    <i
                                                        className="fas fa-play"
                                                        style={{
                                                            color: "white",
                                                            zIndex: "2",
                                                            fontSize: "25px"
                                                        }}
                                                    ></i>
                                                </div>
                                            </div>
                                            <div
                                                className="ova-modal-container"
                                                onClick={() => setOpen(!Open)}
                                                style={
                                                    Open
                                                        ? { ...closepopup, ...popupContentStyle }
                                                        : closepopup
                                                }
                                            >
                                                <div className="modal1">
                                                    <div className="close" onClick={() => setOpen(!Open)}>
                                                        <button
                                                            style={{
                                                                position: "absolute",
                                                                top: "21px",
                                                                color: "white"
                                                            }}
                                                            onClick={() => setOpen(!Open)}
                                                        >
                                                            <i
                                                                className="fa fa-close"
                                                                style={{
                                                                    fontSize: "41px",
                                                                    right: "108px"
                                                                }}
                                                            ></i>
                                                        </button>
                                                    </div>
                                                    <iframe
                                                        src="https://www.youtube.com/embed/XHOmBV4js_E?autoplay=1&mute=0&loop=1&controls=1&showinfo=0&modestbranding=1"
                                                        frameborder="0"
                                                        allow="autoplay"
                                                        className="modal-video"
                                                    ></iframe>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div
                                    className="elementor-element elementor-element-a8a71ed elementor-widget__width-auto elementor-absolute elementor-widget elementor-widget-aovis_elementor_ova_counter"
                                    style={{ position: "absolute" }}
                                >
                                    <div className="elementor-widget-container">
                                        <div className="ova-counter template2 " data-count="20">
                                            <div className="counter-content">
                                                <span className="odometer odometer-auto-theme">
                                                    <div className="odometer-inside">
                                                        <span className="odometer-digit">
                                                            <span className="odometer-digit-spacer">8</span>
                                                            <span
                                                                className="odometer-digit-inner"
                                                                style={{ position: "absolute" }}
                                                            >
                                                                <span className="odometer-ribbon">
                                                                    <div className="odometer-ribbon-inner">

                                                                        <span className="odometer-value" style={{ fontSize: '55px', fontWeight: 'bold' }}>{count}</span>

                                                                    </div>
                                                                </span>

                                                            </span>
                                                        </span>

                                                    </div>
                                                    <span className="suffix">
                                                        <p className="content1">
                                                            Years of
                                                            Producing
                                                        </p>
                                                    </span>
                                                </span>

                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                        <div className="elementor-column elementor-col-50 elementor-top-column elementor-element elementor-element-62d01fa" style={{ marginLeft: '101px' }}>
                            <div className="elementor-widget-wrap elementor-element-populated">
                                <div className="elementor-element elementor-element-259763b elementor-widget elementor-widget-aovis_elementor_heading">
                                    <div className="elementor-widget-container">
                                        <div className="ova-heading ova-heading-template1">
                                            <div className="icon">
                                                <i class="fa-solid fa-video"></i>
                                            </div>
                                            <div className="top-heading">
                                                <h3 className="sub-title">Get To Know</h3>
                                                <h2 className="title" style={{ color: '#000', fontFamily: 'Space Grotesk', fontWeight: 'bold' }}>Proving the Best Film
                                                    Services</h2>
                                            </div>
                                            <p className="description" style={{ lineHeight: '1.86em', color: '#737373', fontFamily: 'Space Grotesk' }}>
                                                Lorem ipsum dolor sit amet consectur adipiscing elit sed eiusmod tempor incididunt labore dolore magna aliquaenim ad minim. Sed risus commodo ornare felis non, eleifend molestie metus pharetra eleifend.
                                            </p>
                                        </div>
                                    </div>
                                    <div className="elementor-element elementor-element-1dd128e elementor-position-left elementor-vertical-align-bottom background-square-38-top-left elementor-view-default elementor-mobile-position-top elementor-widget elementor-widget-icon-box">
                                        <div className="elementor-widget-container">
                                            <div className="elementor-icon-box-wrapper">
                                                <div className="elementor-icon-box-icon">
                                                    <span className="elementor-icon elementor-animation-" style={{ fontSize: '64px', color: '#d96c2c' }}>
                                                        <i class="fa-solid fa-clapperboard"></i>
                                                    </span>
                                                </div>
                                                <div className="elementor-icon-box-content" style={{ position: 'absolute', top: '19px', left: '83px' }}>
                                                    <h3 className="elementor-icon-box-title" style={{ fontSize: '20px' }}>
                                                        <span style={{ color: '#000', fontWeight: 'bold', fontFamily: 'Space Grotesk' }}>
                                                            6 Years of Innovation					</span>
                                                    </h3>
                                                    <p className="elementor-icon-box-description" style={{ color: '#737373', fontFamily: 'Space Grotesk' }}>
                                                        We're here for look even you from start to finish.					</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="elementor-element elementor-element-f8dfd57 elementor-widget elementor-widget-button">
                                            <div className="elementor-widget-container">
                                                <div className="elementor-button-wrapper">
                                                    <a href="" className="elementor-button elementor-button-link elementor-size-sm" style={{ backgroundColor: '#000' }}>
                                                        <span className="elementor-button-content-wrapper">
                                                            <span className="elementor-button-text1" style={{ color: 'white' }}>Discover More</span>
                                                        </span>
                                                    </a>
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
            <section className="elementor-section elementor-top-section elementor-element elementor-element-8e6a5fb elementor-section-boxed elementor-section-height-default elementor-section-height-default" style={{ backgroundColor: '#000', padding: '482px 0px 220px    ' }} id="over">
                <div className="elementor-background-overlay"></div>
                <div className="elementor-container elementor-column-gap-default">
                    <div className="elementor-column elementor-col-100 elementor-top-column elementor-element elementor-element-bf4ab17">
                        <div className="elementor-widget-wrap elementor-element-populated" style={{ flexDirection: 'column' }}>
                            <div className="elementor-element elementor-element-54d0ecc elementor-widget elementor-widget-aovis_elementor_heading" style={{ marginBottom: '45px' }}>
                                <div className="elementor-widget-container">
                                    <div className="ova-heading ova-heading-template2" style={{ textAlign: 'center' }}>
                                        <div className="icon"></div>
                                        <div className="top-heading" style={{ position: 'relative', display: 'inline-block' }}>
                                            <h2 className="title" style={{ fontSize: '60px', lineHeight: '1.2em', color: '#fff', fontFamily: 'Space Grotesk', fontWeight: 'bold' }}>
                                                Watch Live Interview with  &nbsp;
                                                <span className="word">
                                                    Movie</span>

                                                &nbsp;Producer
                                            </h2>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="elementor-element elementor-element-77369d3 elementor-align-center elementor-widget elementor-widget-button">
                                <div className="elementor-widget-container">
                                    <div className="elementor-button-wrapper" style={{ textAlign: 'center' }}>
                                        <a href="" className="elementor-button elementor-button-link elementor-size-sm">
                                            <span className="elementor-button-content-wrapper" >
                                                <span className="elementor-button-text">Discover more</span>
                                            </span>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="elementor-section elementor-top-section elementor-element elementor-element-2b67610 elementor-section-boxed elementor-section-height-default elementor-section-height-default">
                <div className="elementor-container elementor-column-gap-no">
                    <div className="elementor-column elementor-col-100 elementor-top-column elementor-element elementor-element-ce9b9b7">
                        <div className="elementor-widget-wrap elementor-element-populated" style={{ flexDirection: 'column' }}>
                            <div className="elementor-element elementor-element-97049ad elementor-widget elementor-widget-aovis_elementor_heading">
                                <div className="elementor-widget-container">
                                    <div className="ova-heading ova-heading-template1">
                                        <div className="icon" style={{ textAlign: 'center' }}>
                                            <i className="fa-solid fa-video"></i>

                                        </div>
                                        <div class="top-heading">
                                            <h3 className="sub-title " style={{ textAlign: 'right',marginRight:'186px' }}>The Film Crew</h3>
                                            <h2 className="title" style={{ color: '#000000', fontWeight: 'bold', fontFamily: 'Space Grotesk',marginLeft:'289px' }}>Professional Film Crew</h2>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <section className="elementor-section elementor-inner-section elementor-element elementor-element-f7d1625 elementor-section-full_width elementor-section-height-default elementor-section-height-default">
                                <div className="elementor-container elementor-column-gap-default">
                                    <div className="elementor-column elementor-col-33 elementor-inner-column elementor-element elementor-element-0d285cb">
                                        <div className="elementor-widget-wrap elementor-element-populated" >
                                            <div className="elementor-element elementor-element-861f8ba elementor-widget elementor-widget-aovis_elementor_our_team">
                                                <div className="elementor-widget-container">
                                                    <div className="ova-our-team">
                                                        <div className="author-image">
                                                            <div className="background" style={{ backgroundImage: 'url(https://demo.ovatheme.com/aovis/wp-content/uploads/2023/02/background-lines-our-team.png)' }}>

                                                            </div>
                                                            <img className="author" src="https://demo.ovatheme.com/aovis/wp-content/uploads/2023/02/image-1-our-team.jpg" alt="" />
                                                        </div>
                                                        <div className="author-info">
                                                            <div className="name-job">
                                                                <h3 className="name" style={{color:'#000000'}}>

                                                                    Kevin Martin
                                                                </h3>
                                                                <p className="job" style={{color:'#737373'}}>
                                                                    Film Director						</p>
                                                            </div>
                                                            <div className="socials">
                                                                <span className="elementor-repeater-item-f1d4174">
                                                                    <a href="https://twitter.com/" target="_blank" className="icon">
                                                                        <i className="fab fa-twitter" ></i>
                                                                    </a>
                                                                </span>
                                                                <span className="elementor-repeater-item-f1d4174">
                                                                    <a href="https://www.facebook.com/" target="_blank" className="icon">
                                                                        <i className="fab fa-facebook" ></i>
                                                                    </a>
                                                                </span>
                                                                <span className="elementor-repeater-item-f1d4174">
                                                                    <a href="https://www.instagram.com/" target="_blank" className="icon">
                                                                        <i className="fab fa-instagram" ></i>
                                                                    </a>
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="elementor-column elementor-col-33 elementor-inner-column elementor-element elementor-element-0d285cb">
                                        <div className="elementor-widget-wrap elementor-element-populated" >
                                            <div className="elementor-element elementor-element-861f8ba elementor-widget elementor-widget-aovis_elementor_our_team">
                                                <div className="elementor-widget-container">
                                                    <div className="ova-our-team">
                                                        <div className="author-image">
                                                            <div className="background" style={{ backgroundImage: 'url(https://demo.ovatheme.com/aovis/wp-content/uploads/2023/02/background-lines-our-team.png)' }}>

                                                            </div>
                                                            <img className="author" src="https://demo.ovatheme.com/aovis/wp-content/uploads/2023/02/image-2-our-team.jpg" alt="" />
                                                        </div>
                                                        <div className="author-info">
                                                            <div className="name-job">
                                                                <h3 className="name" style={{color:'#000000'}}>

                                                                Jessica Brown
                                                                </h3>
                                                                <p className="job" style={{color:'#737373'}}>
                                                                    Film Director						</p>
                                                            </div>
                                                            <div className="socials">
                                                                <span className="elementor-repeater-item-f1d4174">
                                                                    <a href="https://twitter.com/" target="_blank" className="icon">
                                                                        <i className="fab fa-twitter" ></i>
                                                                    </a>
                                                                </span>
                                                                <span className="elementor-repeater-item-f1d4174">
                                                                    <a href="https://www.facebook.com/" target="_blank" className="icon">
                                                                        <i className="fab fa-facebook" ></i>
                                                                    </a>
                                                                </span>
                                                                <span className="elementor-repeater-item-f1d4174">
                                                                    <a href="https://www.instagram.com/" target="_blank" className="icon">
                                                                        <i className="fab fa-instagram" ></i>
                                                                    </a>
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="elementor-column elementor-col-33 elementor-inner-column elementor-element elementor-element-0d285cb">
                                        <div className="elementor-widget-wrap elementor-element-populated" >
                                            <div className="elementor-element elementor-element-861f8ba elementor-widget elementor-widget-aovis_elementor_our_team">
                                                <div className="elementor-widget-container">
                                                    <div className="ova-our-team">
                                                        <div className="author-image">
                                                            <div className="background" style={{ backgroundImage: 'url(https://demo.ovatheme.com/aovis/wp-content/uploads/2023/02/background-lines-our-team.png)' }}>

                                                            </div>
                                                            <img className="author" src="https://demo.ovatheme.com/aovis/wp-content/uploads/2023/02/image-3-our-team.jpg" alt="" />
                                                        </div>
                                                        <div className="author-info">
                                                            <div className="name-job">
                                                                <h3 className="name" style={{color:'#000000'}}>

                                                                Mike Hardson
                                                                </h3>
                                                                <p className="job" style={{color:'#737373'}}>
                                                                    Film Director						</p>
                                                            </div>
                                                            <div className="socials">
                                                                <span className="elementor-repeater-item-f1d4174">
                                                                    <a href="https://twitter.com/" target="_blank" className="icon">
                                                                        <i className="fab fa-twitter" ></i>
                                                                    </a>
                                                                </span>
                                                                <span className="elementor-repeater-item-f1d4174">
                                                                    <a href="https://www.facebook.com/" target="_blank" className="icon">
                                                                        <i className="fab fa-facebook" ></i>
                                                                    </a>
                                                                </span>
                                                                <span className="elementor-repeater-item-f1d4174">
                                                                    <a href="https://www.instagram.com/" target="_blank" className="icon">
                                                                        <i className="fab fa-instagram" ></i>
                                                                    </a>
                                                                </span>
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
            </section>
            <section className="elementor-section elementor-top-section elementor-element elementor-element-16bf55d elementor-section-boxed elementor-section-height-default elementor-section-height-default" style={{padding:'110px 0px 40px 0px',background:'#F3F3F3',marginTop:'67px'}}>
                <div className="elementor-container elementor-column-gap-default">
                    <div className="elementor-column elementor-col-50 elementor-top-column elementor-element elementor-element-f826d00">
                        <div className="elementor-widget-wrap elementor-element-populated" style={{flexDirection:'column'}}>
                            <div className="elementor-element elementor-element-6913590 elementor-widget elementor-widget-aovis_elementor_heading">
                                <div className="elementor-widget-container">
                                    <div className="ova-heading ova-heading-template1">
                                        <div className="icon">
                                        <i className="fa-solid fa-video"></i>
                                        </div>
                                        <div class="top-heading">
                                            <h3 className="sub-title " >Our Feedbacks</h3>
                                            <h2 className="title" style={{ color: '#000000', fontWeight: 'bold', fontFamily: 'Space Grotesk' }}>What They’re
Talking About us?</h2>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="elementor-element elementor-element-d696c48 elementor-widget elementor-widget-aovis_elementor_testimonial">
                                <div className="elementor-widget-container">
                                    <div className="ova-testimonial template1">
                                        <div className="slide-testimonials owl-carousel owl-theme owl-loaded owl-drag" style={{display:'block'}}>
                                            <div className="owl-stage-outer">
                                                <div className="owl-stage" >
                                                    <div className="owl-item cloned" style={{width:'503.6px'}}>
                                                        <div className="item" style={{position:'relative',zIndex:'1'}}>
                                                            <div className="quote">
                                                                <i className="ovaicon ovaicon-conversation"></i>
                                                            </div>
                                                            <div className="author">
                                                                <div className="image">
                                                                    <img src="https://demo.ovatheme.com/aovis/wp-content/uploads/2023/02/image-1-our-team.jpg" alt="" />
                                                                </div>
                                                                <div className="info">
                                                                    <div className="rating">
                                                                        <i className="fas fa-star"></i>
                                                                        <i className="fas fa-star"></i>
                                                                        <i className="fas fa-star"></i>
                                                                        <i className="fas fa-star"></i>
                                                                        <i className="fas fa-star"></i>
                                                                    </div>
                                                                    <h3 className="name" style={{color:'black',fontSize:'26px',fontFamily:'Space Grotesk'}}>Hubert J. Johnso</h3>
                                                                    <p className="job" style={{color:'#737373',fontSize:'16px',fontFamily:'Space Grotesk'}}>Customer</p>
                                                                </div>
                                                            </div>
                                                            <p className="content">This is due to their excellent service, competitive pricing and customer support. It’s refresing to get such a personal touch. Duis aute lorem ipsum is simply free text available in the market reprehen.</p>
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
                    <div className="elementor-column elementor-col-50 elementor-top-column elementor-element elementor-element-7a66698 elementor-hidden-tablet elementor-hidden-mobile">
                        <div className="elementor-widget-wrap elementor-element-populated">
                            <div className="elementor-element elementor-element-b11d003 elementor-widget elementor-widget-image">
                                <div className="elementor-widget-container">
                                    <img src="https://demo.ovatheme.com/aovis/wp-content/uploads/2023/02/image-testimonial-home-2.png" className="attachment-full size-full wp-image-1104" width={715} height={645}  alt="" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
           <FooterHome></FooterHome>
        </div>
    );
}

export default About;
