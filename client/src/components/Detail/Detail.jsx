import Menu from "../Menu/Menu";
import FooterHome from "../footer/FooterHome";
import './Detail.css'
function Detail() {
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
                            <div className="movie-heading">
                                <h1 className="movie-title">
                                    Love Nightmare
                                </h1>
                                <div className="categories-and-time">
                                    <div className="movie-category">
                                        <a href="">Adventure</a>
                                    </div>
                                    <div className="separator">/</div>
                                    <span className="running-time" style={{ color: '#737373' }}>
                                        170 Mins
                                    </span>
                                </div>
                            </div>
                            <button className="btn btn-booking">
                                Get Ticket    </button>
                        </div>
                        <div className="movie-media has-trailer">
                            <div className="movie-gallery gallery_blur">
                                <a href="" className="gallery-fancybox">
                                    <img src="https://demo.ovatheme.com/aovis/wp-content/uploads/2023/03/img-3-gallery-slide.jpg" alt="" />

                                </a>
                            </div>
                            <div className="movie-featured-image">
                                <a href="" className="gallery-fancybox">
                                    <img src="https://demo.ovatheme.com/aovis/wp-content/uploads/2023/02/movie-image-03.jpg" alt="" />
                                </a>
                                <div className="btn-trailer-video-wrapper">
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
                        <ul className="info-list">
                            <li className="item item-0 mb-[11px]">
                                <h4 className="title">
                                    Director:
                                </h4>
                                <span className="value">
                                    Christine Eve                                    </span>
                            </li>
                            <li className="item item-2">
                                <h4 className="title">
                                    Preimier:
                                </h4>
                                <span className="value">
                                    14, March 2023                                   </span>
                            </li>
                            <li className="item item-3">
                                <h4 className="title">
                                    Writer:
                                </h4>
                                <span className="value">
                                    Aleesha Rose                                   </span>
                            </li>
                            <li className="item item-4">
                                <h4 className="title">
                                    Time:
                                </h4>
                                <span className="value">
                                    170 Mins                                   </span>
                            </li>
                        </ul>
                        <div className="movie-cast">
                            <h2 className="movie-title-h2 cast-title">
                                Top Cast
                            </h2>
                            <div className="mb-movie-cast-list four_column">
                                <div className="movie-cast-item">
                                    <div className="cast-thumbnail">
                                        <img src="https://demo.ovatheme.com/aovis/wp-content/uploads/2023/02/cast-01.jpg" alt="" />
                                    </div>
                                    <div className="cast-info">
                                        <h2 className="cast-name">Millie Brown</h2>
                                        <p className="cast-description">
                                            as Eleven                </p>
                                    </div>
                                </div>
                                <div className="movie-cast-item">
                                    <div className="cast-thumbnail">
                                        <img src="https://demo.ovatheme.com/aovis/wp-content/uploads/2023/02/cast-02.jpg" alt="" />
                                    </div>
                                    <div className="cast-info">
                                        <h2 className="cast-name">Finn Wolfhard</h2>
                                        <p className="cast-description">

                                            as Mike Wheeler                               </p>
                                    </div>
                                </div>
                                <div className="movie-cast-item">
                                    <div className="cast-thumbnail">
                                        <img src="https://demo.ovatheme.com/aovis/wp-content/uploads/2023/02/cast-03.jpg" alt="" />
                                    </div>
                                    <div className="cast-info">
                                        <h2 className="cast-name">Winona Ryder</h2>
                                        <p className="cast-description">


                                            as Joyce Byers                                              </p>
                                    </div>
                                </div>
                                <div className="movie-cast-item">
                                    <div className="cast-thumbnail">
                                        <img src="https://demo.ovatheme.com/aovis/wp-content/uploads/2023/02/cast-04.jpg" alt="" />
                                    </div>
                                    <div className="cast-info">
                                        <h2 className="cast-name">David Harbour</h2>
                                        <p className="cast-description">



                                            as Jim Hopper                                                          </p>
                                    </div>
                                </div>
                                <div className="movie-cast-item">
                                    <div className="cast-thumbnail">
                                        <img src="https://demo.ovatheme.com/aovis/wp-content/uploads/2023/02/cast-05.jpg" alt="" />
                                    </div>
                                    <div className="cast-info">
                                        <h2 className="cast-name">Gaten Matarazo</h2>
                                        <p className="cast-description">



                                            as Ted Wheeler                                                                         </p>
                                    </div>
                                </div>
                                <div className="movie-cast-item">
                                    <div className="cast-thumbnail">
                                        <img src="https://demo.ovatheme.com/aovis/wp-content/uploads/2023/02/cast-06.jpg" alt="" />
                                    </div>
                                    <div className="cast-info">
                                        <h2 className="cast-name">Natalia Dyer</h2>
                                        <p className="cast-description">

                                            as Nancy Wheeler                                                                                        </p>
                                    </div>
                                </div>
                                <div className="movie-cast-item">
                                    <div className="cast-thumbnail">
                                        <img src="https://demo.ovatheme.com/aovis/wp-content/uploads/2023/02/cast-07.jpg" alt="" />
                                    </div>
                                    <div className="cast-info">
                                        <h2 className="cast-name">Caleb Laughlin</h2>
                                        <p className="cast-description">

                                            as Lucas Sinclair                                                                                                      </p>
                                    </div>
                                </div>
                                <div className="movie-cast-item">
                                    <div className="cast-thumbnail">
                                        <img src="https://demo.ovatheme.com/aovis/wp-content/uploads/2023/02/cast-08.jpg" alt="" />
                                    </div>
                                    <div className="cast-info">
                                        <h2 className="cast-name">Sadie Sink</h2>
                                        <p className="cast-description">


                                            as Max Mayfield                                                                                                                    </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="main-content">
                            <h2 className="movie-title-h2 story-title">
                                Story Line
                            </h2>
                            <p>In a small town where everyone knows everyone, a peculiar incident starts a chain of events that leads to a child’s disappearance, which begins to tear at the fabric of an otherwise-peaceful community. Dark government agencies and seemingly malevolent supernatural forces converge on the town, while a few of the locals begin to understand that more is going on than meets the eye.</p>
                        </div>
                        <div className="movie-related">
                            <h2 className="movie-title-h2 related-title">
                                More Movies Like This
                            </h2>
                        </div>
                    </div>
                </div>
            </div>
            <FooterHome></FooterHome>
        </div>


    )
}
export default Detail;