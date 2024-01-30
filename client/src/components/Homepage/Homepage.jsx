import React from "react";
import picture1 from '../images/1917.jpg';
import picture2 from '../images/spiderman.jpg';
import picture3 from '../images/joker.jpg';
import arrow from '../images/arrow-watch.png';

import underline from '../images/underline-heading-entire.png';
import dotLine from '../images/line_dot.jpg';
import '../Homepage/HomepageCss.css';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useState,useEffect} from "react";
import { useRef } from "react";
import Modal from 'react-modal';
Modal.setAppElement('#root'); 

function Homepage(){
    const [nav1, setNav1] = useState(null);
    const [nav2, setNav2] = useState(null);
    const slider1 = useRef(null);
    const slider2 = useRef(null);

    useEffect(() => {
        setNav1(slider1.current);
        setNav2(slider2.current);
      }, []);

    

    const settingsMain = {
        dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    fade: true,
    asNavFor: nav2,
    ref:slider1
      };
    
      // Settings for the thumbnail carousel
      const settingsThumbs = {
        slidesToShow: 2,
    slidesToScroll: 1,
    dots: true,
    centerMode: true,
    focusOnSelect: true,
    centerPadding: '10px',
    asNavFor: nav1,
    ref:slider2
      };
    
      const slidesData = [
        {
          id: 1,
          title: 'The Witcher Season 2',
          image: picture1,
          videoUrl: 'https://www.youtube.com/embed/ut3niJCNmDw'
        },
        {
          id: 2,
          title: 'Spiderman:far from home',
          image: picture2,
          videoUrl: 'https://www.youtube.com/embed/F478PvRt74Y'
        },
        {
          id: 3,
          title: 'Joker',
          image: picture3,
          videoUrl: 'https://www.youtube.com/embed/DYYtuKyMtY8'
        },
        // ...add more slides
      ];
      
      function openYoutubeVideo(videoId) {
        // This opens the video in watch mode
        window.open(`https://www.youtube.com/watch?v=${videoId}`, '_blank');
      }
      
      const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedVideoUrl, setSelectedVideoUrl] = useState('');

  const openModal = (videoUrl) => {
    
    setSelectedVideoUrl(videoUrl);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };
  const customStyles = {
    overlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.75)',
      zIndex: 1000,
    },
    content: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: '70%',  // or your preferred width
      height: '70%', // or your preferred height
      overflow: 'auto',
      
      
      
      
    }
  };
  
    return(
        <div className="">
            <div>
                <Slider  {...settingsMain}>
                    {slidesData.map((slide) =>
                    <div key={slide.id}>
                    <img className="w-full h-[120vh] object-cover " src={slide.image} alt="" />           
                    <div className="overlay h-[120vh] absolute inset-0 bg-black opacity-50 z-[2]"></div>
                    <div className="absolute w-full h-[60%]  top-[25%] flex flex-col justify-center">
                        
                        <div className="social-share-bar">
                                <h4>Share</h4>
                                <div className="line"></div>
                                <div className="icons">
                                <i class='bx bxl-facebook' style={{color:'#7c7979'}}></i>
                                <i class='bx bxl-twitter' style={{color:'#7c7979'}}></i>
                                <i class='bx bxl-pinterest-alt' style={{color:'#7c7979'}}></i>
                            </div>
                        </div>
                <div className="absolute  z-20 w-[600px]  ml-[150px]">
                    <h1 className="text-[3rem] mb-0">Action Movie</h1>
                    <h3 className=" text-[5.5rem] pb-0 mb-0">{slide.title}</h3>
                    <h2 className="mb-5 pt-0">Written and Directed by Aleesha Rose /Ireland 2023</h2>
                    <div className="button-1   h-[60px] w-[80%] flex gap-3">
                        <a href="" className="px-12 py-3 bg-white text-black">More Info</a>
                        <a href="" className=" px-12 py-3  text-white bg-[#D96C2C]">Get Ticket</a>
                    </div>
                </div>
                
                    </div>
                    <div className=" absolute z-20 w-[300px] top-[30%] left-[77%] h-[50px] flex flex-col">
                        <h1 className="inTheater">In theater</h1>
                        <h1 className="Scheduled">March 2023</h1>
                        <img className="w-[200px]" src={underline} alt="" />
                    </div>
                    
                    </div>
                    )}

                </Slider>


                <div className="trailers-container relative">
                
                <div className="thumbnail-slider ">
                    <div className="thumbnail-slider absolute  w-[42%] h-[260px] bottom-[-20%] right-0 pl-[90px] pr-20 pt-[30px]">
                    <h3 className="trailers-title text-white text-[1.2rem] mb-3 ">Trailers</h3>
        <Slider {...settingsThumbs} >
          {slidesData.map((thumb) =>
            <div className="thumbnail-container relative top-[40%] bg-pink-400 border-[#D96C2C] border-[2px] h-[120px] w-[50%] flex gap-5" key={thumb.id}>
              <img className="mr-[50px] w-[200px] h-[117px] object-cover" src={thumb.image} alt={thumb.title} />
              <button onClick={() => openModal(thumb.videoUrl)} className="play-button absolute">
    {/* Icon for play button */}
    <i className="fas fa-play"></i> {/* Font Awesome play icon */}
  </button>
            </div>
           
          )}
        </Slider>
      </div>
  </div>
  <div className="absolute top-[-200px] right-[37%]">
    <img className="w-[40px]" src={arrow} alt="" />
  </div>
</div>

            </div>


            <div className="my-2">
                <img className="w-full" src={dotLine} alt="" />
            </div>
            <div className="container-1 w-full h-[150vh]">
                <div className="bg-pink-400 h-[220px] w-full px-5">
                    <div className="bg-red-600 w-full grid grid-cols-3 gap-4">
                        <div className="bg-green-400 h-full w-full">wrtgwrg</div>
                        <div className="bg-green-400 h-full w-full">wrtgwrg</div>
                        <div className="bg-green-400 h-full w-full">wrtgwrg</div>

                    </div>
                </div>
            </div>

            <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Video Modal"
        style={customStyles}
        className="video-modal"
        overlayClassName="overlay"
      >
        <iframe
          width="900px"
          height="515px"
          src={selectedVideoUrl}
          frameBorder="0"
          allow="autoplay; encrypted-media"
          allowFullScreen
          title="video"
        ></iframe>
        <button onClick={closeModal}>Close</button>
      </Modal>

        </div>
    )
}
export default Homepage;