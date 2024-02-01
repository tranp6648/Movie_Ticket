import React from "react";
import picture1 from '../images/1917.jpg';
import picture2 from '../images/spiderman.jpg';
import picture3 from '../images/joker.jpg';
import arrow from '../images/arrow-watch.png';
import filmCard from '../images/lineFilm2.png';
import lotus from '../images/lotus.png';
import start from '../images/start.png';
import voice from '../images/voice.png';
import cinemaLogo from '../images/logoCinema.png';
import tag from '../images/tag.png';
import oclock from '../images/oclock.png';

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
      const slidesMovies = [
        {
          id: 1,
          Genre:"Animation,Comedy / 190 Mins",
          
          nameMovie: "Spiderman: No Way Home",
          image: picture1,
          Genre1:"Action",
          time:"180 Mins"
        },
        {
          id: 2,
          Genre:"Animation,Comedy / 190 Mins",
          nameMovie: "Spiderman: No Way Home",
          image: picture1,
          Genre1:"Action",
          time:"180 Mins"
          
        },
        {
          id: 3,
          Genre:"Animation,Comedy / 190 Mins",
          nameMovie: "Spiderman: No Way Home",
          image: picture1,
          Genre1:"Action",
          time:"180 Mins"
        },
        {
          id: 4,
          Genre:"Animation,Comedy / 190 Mins",
          nameMovie: "Spiderman: No Way Home",
          image: picture1,
          Genre1:"Action",
          time:"180 Mins"
        },
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
  const settings1 = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
  };
  // const [hover, setHover] = useState(false);

  const [timer, setTimer] = useState(0);
  const [hasTriggeredCount, setHasTriggeredCount] = useState(false);
  const featuredMovieRef = useRef(null); // Tham chiếu đến phần container-featured-movie

  const checkIfShouldStartCount = () => {
    if (!featuredMovieRef.current || hasTriggeredCount) return;

    const topPosition = featuredMovieRef.current.getBoundingClientRect().top;
    const triggerPosition = window.innerHeight / 2; // Ví dụ: kích hoạt khi phần đó ở giữa màn hình

    if (topPosition < triggerPosition) {
      setHasTriggeredCount(true);

      const interval = setInterval(() => {
        setTimer(prevTimer => {
          if (prevTimer < 23) {
            return prevTimer + 1;
          } else {
            clearInterval(interval);
            return prevTimer;
          }
        });
      }, 1000 / 24);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', checkIfShouldStartCount);

    return () => window.removeEventListener('scroll', checkIfShouldStartCount);
  }, [hasTriggeredCount]);

  const MovieTrending = [
{
  id: 1,
  image: picture1,
  nameMovie: "  Joker The Movie of the Week",
  content: "Phasellus non cursus ligula, sed mattis urna. Aenean ac tor gravida, volutpat quam eget, consequat elit.",
  nameDirector: "Mike Hardson",
  position: "Film Director",
  avatarDirector: picture2,
  prize: "Awards Nominations",
  quantityPrize: 30
}
  ];
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


            <div className="my-2 pb-12">
                <img className="w-full" src={dotLine} alt="" />
            </div>
            <div className="container-1 w-full  h-[140vh]">
                <div className=" h-[220px] w-full px-5">
                    <div className=" w-full grid grid-cols-3 gap-4">
                        <div className="cardcontent overflow-hidden relative bg-black h-full w-full">
                          <img className="imgFilmCard bg-black opacity-10" src={filmCard} alt="" />
                          <div className="absolute w-full top-[20%] items-center z-10 flex justify-between px-3">
                            <div>
                              <p className="titleContentFilm1">Join Now</p>
                              <p className="titleContentFilm2">Upcoming Film Festival</p>
                            </div>
                            <img className="w-[120px]" src={lotus} alt="" />
                            
                          </div>
                        </div>
                        <div className="cardcontent overflow-hidden relative bg-black h-full w-full">
                          <img className="imgFilmCard absolute bg-black opacity-10" src={filmCard} alt="" />
                          <div className="absolute w-full top-[20%] items-center z-10 flex justify-between px-3">
                            <div>
                              <p className="titleContentFilm1">Watch Now</p>
                              <p className="titleContentFilm2">Watch Film Awards</p>
                            </div>
                            <img className="w-[120px]" src={start} alt="" />
                            
                          </div>
                        </div>
                        <div className="cardcontent overflow-hidden relative bg-black h-full w-full">
                          <img className="imgFilmCard bg-black opacity-10" src={filmCard} alt="" />
                          <div className="absolute w-full top-[20%] items-center z-10 flex justify-between px-3">
                            <div>
                              <p className="titleContentFilm1">Get Ticket</p>
                              <p className="titleContentFilm2">Comedy TV Shows</p>
                            </div>
                            <img className="w-[120px]" src={voice} alt="" />
                            
                          </div>
                        </div>
                        

                    </div>
                </div>
                <div className="mt-[110px]  flex flex-col items-center justify-center">
                  <img className="w-[40px] mb-2" src={cinemaLogo} alt="" />
                  <p className="watchNew">Watch New Movies</p>
                  <p className="MoviesNow">Movies Now Playing</p>
                </div>
              <div className="carousel-movie mt-10 w-full h-[380px] px-[8%]">
              <Slider {...settings1}>
              {slidesMovies.map((slide) =>
                    <div key={slide.id} className=" px-3">
                    <div className="cardmain bg-pink-200 w-full h-full relative">
                      <img className="card-Movies" src={slide.image} alt="" />
                      
                      <div className="absolute card-content bottom-0">
                        <p className="genre">{slide.Genre}</p>
                        <p className="nameMovies">{slide.nameMovie}</p>
                        <a href=""><button className="button-getTicket">Get Ticket</button></a>

                      </div>
                      <div className="overlay"></div>
                    </div>
                    
                    </div>
                    )}
        </Slider>
              </div>
              
            </div>
            <div ref={featuredMovieRef} className=" relative container-featured-movie bg-pink-500 w-full h-[120vh] px-[8%]">
                <div className="w-full flex justify-between ">
                  <div className="mt-[80px]">
                    <img className="w-[35px]" src={cinemaLogo} alt="" />
                    <p className="checkOutMovie">Checkout Movies</p>
                    <p className="topFeatured">Top Featured Movies</p>
                  </div>
<div className="w-[45%] flex items-center">
<p className="text-1">Phasellus non cursus ligula, sed mattis urna. Aenean ac tor gravida, volutpat quam eget, consequat elit.</p>

</div>
                </div>
                <div className=" w-full grid grid-cols-3 gap-4 mt-7">
                  {slidesMovies.slice(0,3).map((slide)=>
                      <div key={slide.id} className=" relative">
                        <img className="image-featured w-full h-[260px]" src={slide.image} alt="" />
                      <div className="">
                      <div className="cardmain absolute bg-white  w-[90%] h-[200px] left-5 top-[230px] px-[40px]">
                      <p className="name-movie mt-9">{slide.nameMovie}</p>
                      <div className="flex gap-4 mt-2">
                        <div className="flex gap-1 items-center">
                          <img className="w-[20px] h-[20px]" src={oclock} alt="" />
                          <p className="text-2">{slide.Genre1}</p>
                        </div>
                        <div className="flex gap-1 items-center">
                          <img className="w-[20px] h-[20px]" src={tag} alt="" />
                          <p className="text-2">{slide.time}</p>
                        </div>
                      </div>
                      <div className="flex gap-2 mt-2">
                          <a className="btn-watchtrailer" href=""><button>Watch Trailer</button></a>
                          <a className="btn-getTicket" href=""><button>Get Ticket</button></a>
                      </div>
</div>


                      </div>
                      </div>
                  )};
                  <div className=" px-[26%] h-[60px] w-full absolute right-[0px] bottom-[80px]">
                  <div className="border-[2px] border-black h-full flex justify-between items-center px-[20px]">
                    <p className="count">{timer}.00+</p>
                    <p className="description-1">more comedy & horror movies you can explore</p>
                    <a href=""><button className="btn-explore">Explore Now</button></a>

                  </div>
                      

                </div>
                  
                </div>
                
              </div>
                    <div className="bg-pink-500 w-full h-[110vh]">
                      {MovieTrending.map((slide)=>
                      <div className="relative" key={slide.id}>
                          <img className="h-[110vh] w-full absolute object-cover" src={slide.image} alt="" />
                          <div className="flex w-full h-full absolute top-0">
                          <div className="award-nomination-container bg-pink-400 ml-[22%] px-[20px] mt-11 w-[230px] h-[110px] flex">
                              <p className="award-nomination-quantity">{slide.quantityPrize}</p>
                              <p className="award-nomination-category">{slide.prize}</p>
                          </div>
                          <div className="bg-pink-500 h-[810px] w-full ml-[19%] py-[8%]">
                            <div><img className="w-[100px]" src={picture1} alt="" /></div>
                            <div className="flex flex-col">
                              <p className="titleGenre">Trending Movie</p>
                              <p className="nameMovie-1">{slide.nameMovie}</p>
                              <p className="content-1">{slide.content}</p>
                            </div>
                          </div>
                          </div>
                      </div>
                      )

                      };

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