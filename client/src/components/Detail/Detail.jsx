import { useEffect, useState } from "react";
import Menu from "../Menu/Menu";
import Swal from 'sweetalert2';
import FooterHome from "../footer/FooterHome";
import './Detail.css'
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { format } from 'date-fns-tz';
function Detail() {
    const navigate = useNavigate();
    const location = useLocation();

    const ID = location.state?.ID || '';
    const IDAccount = location.state?.IDAccount || '';
    
    const [Actor, setActor] = useState([]);
    const [time, settime] = useState([]);
    const [Detail, setDetail] = useState([]);
    const [id,setid]=useState("");
    useEffect(() => {
        const fetchdata = async () => {
            try {
                const response = await axios.get("http://localhost:5231/api/DetailMovie/ShowMostMovie");
                setDetail(response.data);
            } catch (error) {
                console.log(error);
            }
        }
        fetchdata();
    }, [])
    useEffect(() => {
        const fetchdate = async () => {
            try {
                const response = await axios.get(`http://localhost:5231/api/ShowTime/Gettime/${id}`);
                settime(response.data)
                if (response.data.length > 0) {
                    setSelectedTime(response.data[0].time);
                }

            } catch (error) {
                console.log(error);
            }
        }
        fetchdate();
    }, [id])
    const formatMonth = (dateString) => {
        const dateObj = new Date(dateString);
        const options = { month: 'short' };
        return dateObj.toLocaleDateString('en-US', options);
    };
    useEffect(() => {
        const fetchdata = async () => {
            try {
                const response = await axios.get(`http://localhost:5231/api/Actor/DetailActorMovie/${ID}`);
                setActor(response.data)

            } catch (error) {
                console.log(error);
            }
        }
        fetchdata();
    }, [])
    const [popup, setpopup] = useState(false);
    const handlepoup = () => {
        setpopup(!popup);
    }
    const formatDay = (dateString) => {
        const dateObj = new Date(dateString);
        const options = { day: '2-digit' };
        return dateObj.toLocaleDateString('en-US', options);
    }
    const formatWeek = (dateString) => {
        const dateObj = new Date(dateString);
        const options = { weekday: 'short' };
        return dateObj.toLocaleDateString('en-US', options);
    }
    const [selectedTime, setSelectedTime] = useState(null);
    const [Info, setInfo] = useState([]);
    const [popupinfo, setpopupinfo] = useState(false);
    const Closepopupinfo=()=>{
        setpopupinfo(!popupinfo)
        setid("");
    }
    const handlepopupinfo = async (id) => {
      
           
            setid(id)
        
     
            const response = await axios.get(`http://localhost:5231/api/ShowTime/Gettime/${id}`);
            settime(response.data);
            if(response.data.length<=0){
                Swal.fire({
                    icon: 'error',
                    title: 'This Movie not time',
                    showConfirmButton: false,
                    timer: 1500,
                  });
            }else{
                setpopupinfo(!popupinfo)
                setSelectedTime(response.data[0].time);
            }
       
    }
    useEffect(() => {
        const fetchData = async () => {
           
            try {
                const response = await axios.get(`http://localhost:5231/api/ShowTime/GetInfo/${selectedTime}/${id}`);
                setInfo(response.data)
                console.log(selectedTime)
                
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();

    }, [selectedTime,id]);
    const handleUpdate=async (ID,IDAccount,idTime)=>{
        try{
            const response=await axios.post(`http://localhost:5231/api/CardSet/Addstatus/${ID}/${IDAccount}/${idTime}`);
            if(response.status==200){
                console.log("Response Data:", response.data);
                navigate(`/Cart/${ID}`, { state: { ID: ID, IDAccount: IDAccount,IDtime:idTime } });

            }
        }catch(error){
            console.log(error)
        }
    }
    const popupContentStyle = {
        display: 'flex',
        animation: 'fadeDown 0.5s ease-out',
    };
    const closepopup = {
        display: 'none',
        animation: 'fadeUp 0.5s ease-out', // Specify the animation properties
    };
    const [DetailMovie, setDetailMovie] = useState([]);
    useEffect(() => {
        const fetchdata = async () => {
            try {
                const response = await axios.get(`http://localhost:5231/api/DetailMovie/ShowDetail/${ID}`)
                setDetailMovie(response.data);

            } catch (error) {
                console.log(error);
            }
        }
        fetchdata();
    }, [])
    const formatTime = (date) => {
        return format(new Date(date), 'h:mm a', { timeZone: 'UTC' });
    };
    return (
        <div>
            <Menu />
            <div style={{ height: '296px', marginTop: '5px' }}>
                <div className="breadcrumb-area">
                    <div className="container">
                        <div className="breadcrumb-content">
                            <h2 className="font-bold" style={{ color: '#ffffff', textTransform: 'uppercase', textAlign: 'center', fontSize: '36px', marginBottom: '0', paddingBottom: '20px', fontFamily: '"Lato", sans-serif' }}>Detail Movie</h2>
                            <ul>
                                <li>
                                    <a href="" style={{ textDecoration: 'none' }}>Home</a>
                                </li>
                                <li className="active">Detail Movie</li>
                            </ul>
                        </div>
                    </div>
                </div>

            </div>
            <div className="row_site mt-10">
                <div className="container_site">
                    <div className="ova_movie_single">
                        <div className="top-content">
                            {DetailMovie.map((detail, index) => (
                                <div className="movie-heading">
                                    <h1 className="movie-title">
                                        {detail.title}
                                    </h1>
                                    <div className="categories-and-time">
                                        <div className="movie-category">
                                            <a href="">{detail.genreName}</a>
                                        </div>
                                        <div className="separator">/</div>
                                        <span className="running-time" style={{ color: '#737373' }}>
                                            {detail.duration} Mins
                                        </span>
                                    </div>
                                </div>
                            ))}

                            <button className="btn btn-booking" onClick={() => handlepopupinfo(ID)}>
                                Get Ticket    </button>
                        </div>
                        {DetailMovie.map((detail, index) => (
                            <div className="movie-media has-trailer">
                                <div className="movie-gallery gallery_blur">
                                    <a href="" className="gallery-fancybox">
                                        <img src={detail.detailCategoryMovies.length > 0
                                            ? `http://localhost:5231/${detail.detailCategoryMovies[0].picture}`
                                            : 'No Category'} alt="" width="100" height="100" style={{ objectFit: 'cover' }} />

                                    </a>
                                </div>
                                <div className="movie-featured-image">
                                    <a href="" className="gallery-fancybox">
                                        <img src={detail.detailCategoryMovies.length > 0
                                            ? `http://localhost:5231/${detail.detailCategoryMovies[0].picture}`
                                            : 'No Category'} alt="" width="100" height="100" style={{ objectFit: 'cover' }} />
                                    </a>
                                    <div className="btn-trailer-video-wrapper" onClick={() => handlepoup()}>
                                        <div className="btn-video btn-trailer-video">
                                            <i class="fas fa-play"></i>
                                        </div>
                                    </div>
                                    <span className="text-trailer">

                                        Watch the Trailer
                                        <i class="fa-solid fa-arrow-right"></i>
                                    </span>
                                </div>
                            </div>
                        ))}


                        <ul className="info-list">
                            {DetailMovie.map((detail, index) => (
                                <li className="item item-0 mb-[11px]">
                                    <h4 className="title">
                                        Director:
                                    </h4>
                                    <span className="value">
                                        {detail.director}                                    </span>
                                </li>

                            ))}
                            {DetailMovie.map((detail, index) => (
                                <li className="item item-0 mb-[11px]">
                                    <h4 className="title">
                                        Preimier:
                                    </h4>
                                    <span className="value">
                                        {new Date(detail.releaseDate).toLocaleString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}                            </span>
                                </li>

                            ))}



                            <li className="item item-3">
                                <h4 className="title">
                                    Writer:
                                </h4>
                                <span className="value">
                                    Aleesha Rose                                   </span>
                            </li>
                            {DetailMovie.map((detail, index) => (
                                <li className="item item-4">
                                    <h4 className="title">
                                        Time:
                                    </h4>
                                    <span className="value">
                                        {detail.duration} Mins                                   </span>
                                </li>

                            ))}

                        </ul>
                        <div className="movie-cast">
                            <h2 className="movie-title-h2 cast-title">
                                Top Cast
                            </h2>
                            <div className="mb-movie-cast-list four_column">
                                {Actor.map((actor, index) => (
                                    <div className="movie-cast-item">

                                        <div className="cast-thumbnail">
                                            <img src={`http://localhost:5231/${actor.image}`} alt="" />
                                        </div>
                                        <div className="cast-info">
                                            <h4 className="cast-name">{actor.name}</h4>
                                            <p className="cast-description">
                                                {actor.detailActor.length > 0
                                                    ? actor.detailActor[0].role
                                                    : 'No Category'}             </p>
                                        </div>
                                    </div>
                                ))}

                            </div>
                        </div>
                        <div className="main-content">
                            <h2 className="movie-title-h2 story-title">
                                Story Line
                            </h2>
                            {DetailMovie.map((detail, index) => (
                                <p dangerouslySetInnerHTML={{ __html: detail.description }} />
                            ))}

                        </div>
                        <div className="movie-related">
                            <h2 className="movie-title-h2 related-title">
                                More Movies Like This
                            </h2>
                            <div className="mb-movie-list mb-movie-list-template1 four_column">
                                {Detail.map((De, index) => (
                                    <div className="mb-movie-item item-template1">
                                        <a href="" onClick={()=>navigate(`/Detail/${De.id}`,{ state: { ID:De.id,IDAccount:IDAccount } })} style={{ textDecoration: 'none', backgroundColor: 'transparent', color: '#d96c2c' }}>
                                            <div className="movie-image">
                                                <img src={De.detailMovie.length > 0
                            ? `http://localhost:5231/${De.detailMovie[0].picture}`
                            : 'No Category'} alt="" />
                                            </div>
                                        </a>
                                        <div className="movie-info">
                                            <div className="categories-and-time">
                                                <div className="movie-category">
                                                    <a onClick={()=>navigate(`/Detail/${De.id}`,{ state: { ID:De.id,IDAccount:ID } })}>{De.nameGenre}</a>
                                                </div>
                                                <div className="separator">/</div>
                                                <span className="running-time">{De.duration} mins</span>
                                            </div>
                                            <a onClick={()=>navigate(`/Detail/${De.id}`,{ state: { ID:De.id,IDAccount:ID } })}>
                                                <h3 className="movie-title font-bold">
                                                    {De.name}			</h3>
                                            </a>
                                            <button className="btn btn-booking" onClick={()=>handlepopupinfo(De.id)}>
                                                Get Ticket    </button>
                                        </div>
                                    </div>
                                ))}

                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <FooterHome></FooterHome>
            <div id="mb_trailer_video_popup" style={popup ? { ...closepopup, ...popupContentStyle } : closepopup} className="mb_trailer_video_popup">


                <div className="modal-content2">
                    {popup && DetailMovie.map((detail, index) => (
                        <video width="1100" height="700" controls autoPlay >
                            <source src={detail.detailCategoryMovies.length > 0
                                ? `http://localhost:5231/${detail.detailCategoryMovies[0].trailer}`
                                : 'No Category'} type="video/mp4" />

                        </video>
                    ))}



                </div>



                <div className="close">
                    <button style={{ position: 'absolute', top: '21px', color: 'white' }} onClick={() => handlepoup()}><i className="fa fa-close" style={{ fontSize: '41px', right: '108px' }}></i></button>
                </div>
            </div>
            <div id="mb_booking_popup" className="mb_booking_popup" style={popupinfo ? { ...closepopup, ...popupContentStyle } : closepopup}>
                <div className="mb-bp-container">
                    <div className="mb-bp-content">
                        <ul className="toggle-tabs mb-date-tabs">
                            {time.map((timemap, index) => (
                                <li className={`${selectedTime == timemap.time ? "current" : ''}`} onClick={() => setSelectedTime(prevTime => (prevTime === timemap.time ? null : timemap.time))}>
                                    <div className="day">
                                        <span className="D_m_day">
                                            <span className="D_m_day">
                                                {formatMonth(timemap.time)}
                                            </span>
                                            <span className="D_day">{formatWeek(timemap.time)}</span>
                                        </span>
                                        <div className="d_day">
                                            <strong>{formatDay(timemap.time)}</strong>
                                        </div>
                                    </div>

                                </li>
                            ))}
                            {/*                         
                            <li className="current">
                                <div className="day">
                                    <span className="D_m_day">
                                        <span className="D_m_day">
                                            03
                                        </span>
                                        <span className="D_day">Thu</span>
                                    </span>
                                    <div className="d_day">
                                        <strong>05</strong>
                                    </div>
                                </div>

                            </li>
                            <li >
                                <div className="day">
                                    <span className="D_m_day">
                                        <span className="D_m_day">
                                            03
                                        </span>
                                        <span className="D_day">Thu</span>
                                    </span>
                                    <div className="d_day">
                                        <strong>05</strong>
                                    </div>
                                </div>

                            </li>
                            <li >
                                <div className="day">
                                    <span className="D_m_day">
                                        <span className="D_m_day">
                                            03
                                        </span>
                                        <span className="D_day">Thu</span>
                                    </span>
                                    <div className="d_day">
                                        <strong>05</strong>
                                    </div>
                                </div>

                            </li>
                            <li >
                                <div className="day">
                                    <span className="D_m_day">
                                        <span className="D_m_day">
                                            03
                                        </span>
                                        <span className="D_day">Thu</span>
                                    </span>
                                    <div className="d_day">
                                        <strong>05</strong>
                                    </div>
                                </div>

                            </li>
                            <li >
                                <div className="day">
                                    <span className="D_m_day">
                                        <span className="D_m_day">
                                            03
                                        </span>
                                        <span className="D_day">Thu</span>
                                    </span>
                                    <div className="d_day">
                                        <strong>05</strong>
                                    </div>
                                </div>

                            </li>
                            <li >
                                <div className="day">
                                    <span className="D_m_day">
                                        <span className="D_m_day">
                                            03
                                        </span>
                                        <span className="D_day">Thu</span>
                                    </span>
                                    <div className="d_day">
                                        <strong>05</strong>
                                    </div>
                                </div>

                            </li>
                            <li >
                                <div className="day">
                                    <span className="D_m_day">
                                        <span className="D_m_day">
                                            03
                                        </span>
                                        <span className="D_day">Thu</span>
                                    </span>
                                    <div className="d_day">
                                        <strong>05</strong>
                                    </div>
                                </div>

                            </li>
                            <li >
                                <div className="day">
                                    <span className="D_m_day">
                                        <span className="D_m_day">
                                            03
                                        </span>
                                        <span className="D_day">Thu</span>
                                    </span>
                                    <div className="d_day">
                                        <strong>05</strong>
                                    </div>
                                </div>

                            </li>
                            <li >
                                <div className="day">
                                    <span className="D_m_day">
                                        <span className="D_m_day">
                                            03
                                        </span>
                                        <span className="D_day">Thu</span>
                                    </span>
                                    <div className="d_day">
                                        <strong>05</strong>
                                    </div>
                                </div>

                            </li>
                            <li >
                                <div className="day">
                                    <span className="D_m_day">
                                        <span className="D_m_day">
                                            03
                                        </span>
                                        <span className="D_day">Thu</span>
                                    </span>
                                    <div className="d_day">
                                        <strong>05</strong>
                                    </div>
                                </div>

                            </li>
                            <li >
                                <div className="day">
                                    <span className="D_m_day">
                                        <span className="D_m_day">
                                            03
                                        </span>
                                        <span className="D_day">Thu</span>
                                    </span>
                                    <div className="d_day">
                                        <strong>05</strong>
                                    </div>
                                </div>

                            </li>
                            <li >
                                <div className="day">
                                    <span className="D_m_day">
                                        <span className="D_m_day">
                                            03
                                        </span>
                                        <span className="D_day">Thu</span>
                                    </span>
                                    <div className="d_day">
                                        <strong>05</strong>
                                    </div>
                                </div>

                            </li>
                            <li >
                                <div className="day">
                                    <span className="D_m_day">
                                        <span className="D_m_day">
                                            03
                                        </span>
                                        <span className="D_day">Thu</span>
                                    </span>
                                    <div className="d_day">
                                        <strong>05</strong>
                                    </div>
                                </div>

                            </li>
                            <li >
                                <div className="day">
                                    <span className="D_m_day">
                                        <span className="D_m_day">
                                            03
                                        </span>
                                        <span className="D_day">Thu</span>
                                    </span>
                                    <div className="d_day">
                                        <strong>05</strong>
                                    </div>
                                </div>

                            </li> */}
                        </ul>
                        <dl className="collateral-tabs">
                            <dd className="tab-container current">
                                <div className="tab-content1 mb-showtimes">
                                   
                                    <div className="collateral-tabs">
                                        <dd className="tab-container current">
                                            <div className="tab-content1 mb-room-types">
                                               
                                                <dl className="collateral-tabs">
                                                    <dd className="tab-container current">
                                                        <div className="tab-content1 showtimes">
                                                        {Info.reduce((acc, info, index) => {
    // Check if the current info.auth has already been rendered
    const authRendered = acc.auths.includes(info.auth);
    // If it hasn't been rendered, add it to the accumulator array
    if (!authRendered) {
        acc.auths.push(info.auth);
        // Find all info entries with the same auth and accumulate their times
        const times = Info.filter(item => item.auth === info.auth).map(item => (
            <li key={item.id} className="item">
                <a onClick={() => `${IDAccount === '' ? navigate('/Account') : handleUpdate(item.id, IDAccount, item.idTime)}`}>
                    <span>{formatTime(item.time)}</span>
                </a>
            </li>
        ));
        // Render the info.auth and its associated times
        acc.elements.push(
            <div key={index} className="mb-venue">
                <div className="venue-name mb-[11px]">
                    <h3>{info.auth + " " +info.ditrict}</h3>
                </div>
                <div className="mb-room-name mb-[11px]  ">
                    <h4>IMAX</h4>
                </div>
                <ul className="mb-tab-showtime">
                    {times}
                </ul>
            </div>
        );
    }
    return acc;
}, { auths: [], elements: [] }).elements}
                                                        </div>
                                                    </dd>
                                                </dl>
                                            </div>
                                        </dd>
                                    </div>
                                </div>
                            </dd>
                        </dl>
                    </div>
                    <div className="mb-close" onClick={() => Closepopupinfo()}>X</div>
                </div>
            </div>
        </div>


    )
}
export default Detail;