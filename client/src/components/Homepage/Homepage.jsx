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
import ToddPhillip from '../images/ToddPhillips.png';
import Joker_bg from '../images/joker4k.jpg';
import comment_logo from '../images/commet-logo.png'
import popCorn from '../images/popcorn.png';
import backGroundPopcorn from '../images/background-popcorn.png';
import FooterHome from "../footer/FooterHome";


import underline from '../images/underline-heading-entire.png';
import dotLine from '../images/line_dot.jpg';
import '../Homepage/HomepageCss.css';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useState,useEffect} from "react";
import { useRef } from "react";
import Modal from 'react-modal';
import Movie from "../Movie/Movie";
import Cinema from "../Cinema/Cinema";
import axios from "axios";
import Blog from "../Blog/Blog";
import avatarAi from "../images/avatar_AI.webp";
import { useLocation, useNavigate } from "react-router-dom";
Modal.setAppElement('#root'); 

function Homepage(){
    const [nav1, setNav1] = useState(null);
    const [nav2, setNav2] = useState(null);
    const slider1 = useRef(null);
    const slider2 = useRef(null);
    const [ViewBlog, setViewBlog] = useState([]);

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
      const navigate = useNavigate();
      const location = useLocation();
      const ID = location.state?.ID || '';
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
      const [slidesMovies1,setslidesMovies1]=useState([]);
      useEffect(()=>{
        const fetchData=async ()=>{
          try{
            const response = await axios.get('http://localhost:5231/api/Movie/getMovie');
            setslidesMovies1(response.data)
          }catch(error){
            console.log(error)
          }
        }
        fetchData();
      },[])
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
  image: Joker_bg,
  nameMovie: "  Joker The Movie of the Week",
  content: "Phasellus non cursus ligula, sed mattis urna. Aenean ac tor gravida, volutpat quam eget, consequat elit.",
  nameDirector: "Mike Hardson",
  position: "Film Director",
  avatarDirector: ToddPhillip,
  prize: "Awards Nominations",
  quantityPrize: 30
}

  ];
  
const [cinema,setCinema] = useState([]);
useEffect(() => {
  const fetchdata = async () => {
      try {
          const response = await axios.get("http://localhost:5231/api/Cinema/getCinema");
          setCinema(response.data);

      } catch (error) {
          console.log(error);
      }
  }
  fetchdata();
}, [])


useEffect(() => {
    const fetchdata = async () => {
        try {
            const categoryBlog = await axios.get("http://localhost:5231/api/Blog/ShowBlog");
            const sortData = categoryBlog.data.slice(0,3).sort((a,b)=> b.Id - a.Id);
            setViewBlog(sortData);
            console.error(sortData);
            
        } catch (error) {
            console.log(error)
        }
    }
    fetchdata();
}, [])


    return(
        <div className="">
            <div>
                <Slider  {...settingsMain}>
                    {slidesMovies1.map((slide) =>
                    <div key={slide.id}>
                    <img className="w-full h-[120vh] object-cover " src={slide.detailCategoryMovies.length > 0
                            ? `http://localhost:5231/${slide.detailCategoryMovies[0].picture}`
                            : 'No Category'} alt="" />           
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
                    <h1 className="text-[3rem] mb-0">{slide.genreName} Movie</h1>
                    <h3 className=" text-[5.5rem] pb-0 mb-0">{slide.title}</h3>
                    <h2 className="mb-5 pt-0">Written and Directed by Aleesha Rose /Ireland 2023</h2>
                    <div className="button-1   h-[60px] w-[80%] flex gap-3">
                        <a href="" className="btn-slider-moreInfo px-12 py-3 bg-white text-black">More Info</a>
                        <a href="" className=" px-12 py-3  text-white bg-[#D96C2C]">Get Ticket</a>
                    </div>
                </div>
                
                    </div>
                    <div className=" absolute z-20 w-[300px] top-[30%] left-[77%] h-[50px] flex flex-col">
                        <h1 className="inTheater">In theater</h1>
                        <h1 className="Scheduled">{new Date(slide.releaseDate).toLocaleString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</h1>
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
          {slidesMovies1.map((thumb) =>
            <div className="thumbnail-container relative top-[40%] bg-pink-400 border-[#D96C2C] border-[2px] h-[120px] w-[50%] flex gap-5" key={thumb.id}>
              <img className="mr-[50px] w-[215px] h-[117px] object-cover" src={thumb.detailCategoryMovies.length > 0
                            ? `http://localhost:5231/${thumb.detailCategoryMovies[0].picture}`
                            : 'No Category'} alt={thumb.title} />
              <button onClick={() => openModal(thumb.detailCategoryMovies.length > 0
                            ? `http://localhost:5231/${thumb.detailCategoryMovies[0].trailer}`
                            : 'No Category')} className="play-button absolute">
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
              {slidesMovies1.map((slide) =>
                    <div key={slide.id} className=" px-3">
                    <div className="cardmain bg-pink-200 w-full h-full relative">
                      <img className="card-Movies w-[278px] h-[117px] object-cover" src={slide.detailCategoryMovies.length > 0
                            ? `http://localhost:5231/${slide.detailCategoryMovies[0].picture}`
                            : 'No Category'} alt="" />
                      
                      <div className="absolute card-content bottom-0">
                        <p className="genre">{slide.genreName}/ {slide.duration} Mins</p>
                        <p className="nameMovies">{slide.title}</p>
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
                <div className=" w-full grid grid-cols-3 gap-5 mt-7">
                  {slidesMovies1.slice(0,3).map((slide)=>
                      <div key={slide.id} className=" relative">
                        <img className="image-featured w-full h-[260px] object-cover" src={slide.detailCategoryMovies.length > 0
                            ? `http://localhost:5231/${slide.detailCategoryMovies[0].picture}`
                            : 'No Category'} alt="" />
                      <div className="">
                      <div className="cardmain absolute bg-white  w-[90%] h-[200px] left-5 top-[230px] px-[40px]">
                      <p onClick={()=>navigate(`/Detail/${slide.id}`,{ state: { ID:slide.id,IDAccount:ID } })} className="name-movie mt-9 cursor-pointer">{slide.title}</p>
                      <div className="flex gap-4 mt-2">
                        <div className="flex gap-1 items-center">
                          <img className="w-[20px] h-[20px]" src={oclock} alt="" />
                          <p className="text-2">{slide.genreName}</p>
                        </div>
                        <div className="flex gap-1 items-center">
                          <img className="w-[20px] h-[20px]" src={tag} alt="" />
                          <p className="text-2">{new Date(slide.releaseDate).toLocaleString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
                        </div>
                      </div>
                      <div className="flex gap-2 mt-2">
                          <a className="btn-watchtrailer" href=""><button>Watch Trailer</button></a>
                          <a className="btn-getTicket" onClick={()=>navigate(`/Detail/${slide.id}`,{ state: { ID:slide.id,IDAccount:ID } })} href=""><button>Get Ticket</button></a>
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
                    <div className=" w-full h-[100vh]">
                      {MovieTrending.map((slide)=>
                      <div className="relative" key={slide.id}>
                          <img className="h-[100vh] w-full absolute object-cover" src={slide.image} alt="" />
                          <div className="flex w-full h-full absolute top-0">
                          <div className="award-nomination-container bg-pink-400 ml-[22%] px-[20px]   w-[230px] h-[110px] flex">
                              <p className="award-nomination-quantity">{slide.quantityPrize}</p>
                              <p className="award-nomination-category">{slide.prize}</p>
                          </div>
                          <div className="- h-[810px] w-full ml-[19%] py-[8%]">
                          <div className="button-out">
  <div className="button">
    <i className='bx bxl-play-store play-icon'></i>
  </div>
</div>

                            <div className="flex flex-col">
                              <p className="titleGenre C]">Trending Movie</p>
                              <p className="nameMovie-1">{slide.nameMovie}</p>
                              <p className="content-1">{slide.content}</p>
                              <div className="flex flex-row gap-4 mt-12">
                                <a className="btn-gecticket" href="hskdvh">Get Ticket</a>
                                
                                <div className=" h-[60px] w-[300px] flex flex-row ">
                                  <div className="img-ringDirector">
                                    <img className="img-director" src={slide.avatarDirector} alt="" />
                                  </div>
                                  <div className=" justify-center w-full flex flex-col">
                                    <h1 className="text-nameDirector">{slide.nameDirector}</h1>
                                    <h1 className="text-position">{slide.position}</h1>

                                  </div>

                                </div>
                              </div>
                            </div>
                          </div>
                          </div>
                      </div>
                      )

                      };

                    </div>
                    <div className="bg-black w-full  px-[7.5%] ">
                      
                      <div className=" w-full h-[360px] flex flex-row gap-[50px]">
                        <div className=" h-full w-full flex flex-col justify-center ">
                          <div className="w-full h-[70px]"></div>
                          <img className="w-[30px] h-[30px] mb-2" src={cinemaLogo} alt="" />
                          <h1 className="subTitle mb-2">Sub Title</h1>
                          <h1 className="blog-topicMain">Latest News & Articles from the Posts </h1>

                        </div>
                        <div className=" h-full w-full flex flex-col justify-center">
                        <div className="w-full h-[70px]"></div>
                         <p className="blog-textUpper">Phasellus non cursus ligula, sed mattis urna. Aenean ac tor gravida, volutpat quam eget, consequat elit.</p>
                        </div>

                      </div>
                      <div className=" w-full h-[260px] grid grid-cols-3 gap-4">
                        
                        {ViewBlog.slice(0,3).map((ViewBlog, index) => (
                                                <div>
                                                  <img className="h-[260px] w-full object-cover" src={`http://localhost:5231/${ViewBlog.image}`}
                                                         style={{ objectFit: 'cover' }} alt="" />
                                                          
                                                </div>  
                                            ))}
                        
                      </div>

                    </div>
                    <div className="bg-white w-full h-[45vh] px-[7.5%]">
                          <div className="w-full h-[210px]   grid grid-cols-3 gap-4">
                           
                             {ViewBlog.slice(0,3).map((ViewBlog, index) => (
                                                
                                                <div className="blog-card px-[8%]" >
                                                    <div className="w-[300px]  h-[40px] flex flex-row mt-7">
                                                    
                                                         <img className="avatar-Blog" src={avatarAi} alt="" />
                                                         <div className="flex flex-col  ml-3 justify-center" >
                                                         <p className="text-nameAdmin-blog">by</p>
                                                         <p className=" text-nameAdmin-blog">{ViewBlog.account}</p>
                                                         </div>
                                                         <div className="lineBlog ml-7"></div>
                                                         
                                                         <div className="flex text-center items-center ml-6">
                                                         <img className="w-[20px] h-[20px]" src={comment_logo} alt="" />
                                                         <p className="category-blog">{ViewBlog.category}</p>
                                                         </div>
                                                    
                                    
                                                    </div>
                                                    <div className=" w-full">
                                                      <h1 className="topic-blog">{ViewBlog.title}</h1>
                                                    </div>
                                                    <div className="mt-2">
                                                      
                                                      <button class="button-89" role="button">Read me</button>
                                                    </div>
                                                    <div className="absolute bg-[#D96C2C] text-center top-[572vh] flex justify-center w-[100px] h-[30px]">
                                                                
                                                                <h1 className="created-Blog">{new Date(ViewBlog.createdAt).toLocaleString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</h1>

                                                    </div>

                                                </div>
                                            ))}
                                            
                          </div>
                    </div>
                    <div className="relative h-[80vh] w-full">
                    
                    <img className="h-[70vh] absolute bottom-0 object-cover" src={backGroundPopcorn} alt="" />
                    <img className="popcorn-1 absolute top-0  right-[250px]" src={popCorn} alt="" />
                    <div className="box-popcorn absolute  left-[10%] top-[220px] w-[50%]">
                              <div className="w-full flex justify-center">
                              <h1 className="Selected-movies">Selected Movies</h1>
                              </div>
                              <h1 className="topic-Popcorn">Enjoy 30% Discount on Tickets</h1>
                              <button className="btn-get-ticket">Get Ticket</button>
                    </div>
                    </div>
                    <FooterHome></FooterHome>
                    
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