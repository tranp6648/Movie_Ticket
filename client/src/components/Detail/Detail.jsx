import { useEffect, useState } from "react";
import Menu from "../Menu/Menu";
import FooterHome from "../footer/FooterHome";
import './Detail.css'
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
function Detail() {
    const navigate = useNavigate();
    const location = useLocation();

    const ID = location.state?.ID || '';
    console.log(ID)
    const [popup, setpopup] = useState(false);
    const handlepoup = () => {
        setpopup(!popup);
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
                console.log(response.data)
            } catch (error) {
                console.log(error);
            }
        }
        fetchdata();
    }, [])
    return (
        <div>
            <Menu />
            <div style={{ height: '100px', marginTop: '97px' }}>
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

                            <button className="btn btn-booking">
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
                                {DetailMovie.map((detail, index) => (
                                    <div key={detail.id} className="movie-cast-item">
                                        {detail.detailActor.map((actor, actorIndex) => (
                                            <div> <div className="cast-thumbnail">

                                                <img
                                                    src={detail.detailActor.length > 0
                                                        ? `http://localhost:5231/${actor.idActorMovie.image}`
                                                        : 'No Category'} width="100" height="100" style={{ objectFit: 'cover' }}
                                                    alt={`Image of ${detail.detailActor.name}`}
                                                />

                                                <div className="cast-info mt-[8px]">
                                                    <h2 className="cast-name">{actor.idActorMovie.name}</h2>
                                                    <p className="cast-description">as {actor.role}</p>
                                                </div></div>


                                            </div>
                                        ))}

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
                                <div className="mb-movie-item item-template1">
                                    <a href="" style={{ textDecoration: 'none', backgroundColor: 'transparent', color: '#d96c2c' }}>
                                        <div className="movie-image">
                                            <img src="https://demo.ovatheme.com/aovis/wp-content/uploads/2023/03/movie-image-09-768x513.jpg" alt="" />
                                        </div>
                                    </a>
                                    <div className="movie-info">
                                        <div className="categories-and-time">
                                            <div className="movie-category">
                                                <a href="">Thriller</a>
                                            </div>
                                            <div className="separator">/</div>
                                            <span className="running-time">180 mins</span>
                                        </div>
                                        <a href="">
                                            <h3 className="movie-title font-bold">
                                                The Scariest Dream				</h3>
                                        </a>
                                        <button className="btn btn-booking">
                                            Get Ticket    </button>
                                    </div>
                                </div>
                                <div className="mb-movie-item item-template1">
                                    <a href="" style={{ textDecoration: 'none', backgroundColor: 'transparent', color: '#d96c2c' }}>
                                        <div className="movie-image">
                                            <img src="https://demo.ovatheme.com/aovis/wp-content/uploads/2023/03/movie-image-07-768x519.jpg" alt="" />
                                        </div>
                                    </a>
                                    <div className="movie-info">
                                        <div className="categories-and-time">
                                            <div className="movie-category">
                                                <a href="">Thriller</a>
                                            </div>
                                            <div className="separator">/</div>
                                            <span className="running-time">180 mins</span>
                                        </div>
                                        <a href="">
                                            <h3 className="movie-title font-bold">

                                                Alis Keep Walking								</h3>
                                        </a>
                                        <button className="btn btn-booking mr-[10px]">
                                            Get Ticket   </button>

                                    </div>
                                </div>
                                <div className="mb-movie-item item-template1">
                                    <a href="" style={{ textDecoration: 'none', backgroundColor: 'transparent', color: '#d96c2c' }}>
                                        <div className="movie-image">
                                            <img src="https://demo.ovatheme.com/aovis/wp-content/uploads/2023/03/movie-image-05-768x520.jpg" alt="" />
                                        </div>
                                    </a>
                                    <div className="movie-info">
                                        <div className="categories-and-time">
                                            <div className="movie-category">
                                                <a href="">Thriller</a>
                                            </div>
                                            <div className="separator">/</div>
                                            <span className="running-time">180 mins</span>
                                        </div>
                                        <a href="">
                                            <h3 className="movie-title font-bold">


                                                The Seventh Day											</h3>
                                        </a>
                                        <button className="btn btn-booking mr-[10px]">
                                            Get Ticket   </button>

                                    </div>
                                </div>
                                <div className="mb-movie-item item-template1">
                                    <a href="" style={{ textDecoration: 'none', backgroundColor: 'transparent', color: '#d96c2c' }}>
                                        <div className="movie-image">
                                            <img src="https://demo.ovatheme.com/aovis/wp-content/uploads/2023/03/movie-image-04-768x513.jpg" alt="" />
                                        </div>
                                    </a>
                                    <div className="movie-info">
                                        <div className="categories-and-time">
                                            <div className="movie-category">
                                                <a href="">Thriller</a>
                                            </div>
                                            <div className="separator">/</div>
                                            <span className="running-time">180 mins</span>
                                        </div>
                                        <a href="">
                                            <h3 className="movie-title font-bold">

                                                Behind the Mask														</h3>
                                        </a>
                                        <button className="btn btn-booking mr-[10px]">
                                            Get Ticket   </button>

                                    </div>
                                </div>
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
        </div>


    )
}
export default Detail;