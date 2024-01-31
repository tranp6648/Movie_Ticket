import Menu from "../Menu/Menu";
import FooterHome from "../footer/FooterHome";
import './EventHome.css'
function EventHome() {
    return (
        <div>
            <Menu></Menu>
            <div style={{ height: '296px', marginTop: '5px' }}>
                <div className="breadcrumb-area">
                    <div className="container">
                        <div className="breadcrumb-content">
                            <h2 className="font-bold" style={{ color: '#ffffff', textTransform: 'uppercase', textAlign: 'center', fontSize: '36px', marginBottom: '0', paddingBottom: '20px', fontFamily: '"Lato", sans-serif' }}>Event</h2>
                            <ul>
                                <li>
                                    <a href="" style={{ textDecoration: 'none' }}>Home</a>
                                </li>
                                <li className="active">Event</li>
                            </ul>
                        </div>
                    </div>
                </div>

            </div>
            <div className="elementor elementor-70" style={{ height: '296px', marginTop: '177px',marginBottom:'281px' }}>
                <section className="elementor-section elementor-top-section elementor-element elementor-element-56ee83c elementor-section-boxed elementor-section-height-default elementor-section-height-default">
                    <div className="elementor-container elementor-column-gap-default">
                        <div className="elementor-column elementor-col-100 elementor-top-column elementor-element elementor-element-b3cdce9">
                            <div className="elementor-widget-wrap elementor-element-populated" id="Wrap">
                                <div className="elementor-element elementor-element-2e11853 elementor-widget elementor-widget-ova_events">
                                    <div className="elementor-widget-container">
                                        <div className="ovaev-event-element version_2">
                                            <div className="container-event">
                                                <div id="main-event" className="content-event">
                                                    <div className="archive_event col3">
                                                        <div className="ovaev-content">
                                                            <div className="type2">
                                                                <div className="desc">
                                                                    <div className="event-thumbnail" style={{ backgroundImage: 'url(https://demo.ovatheme.com/aovis/wp-content/uploads/2023/03/Event02.jpg)' }}>
                                                                        <a href="">
                                                                            <img src="https://demo.ovatheme.com/aovis/wp-content/uploads/2023/03/Event02.jpg" alt="" />
                                                                        </a>
                                                                    </div>
                                                                    <div className="event_post">
                                                                        <div className="date-event">
                                                                            <span className="date" style={{ fontFamily: 'Space Grotesk' }}>
                                                                                12 Feb, 2025	</span>
                                                                        </div>
                                                                        <h2 className="second_font event_title">
                                                                            <a href="https://demo.ovatheme.com/aovis/event/the-story-love-movie-oscar-event/">

                                                                                The Story Love Movie Oscar Event
                                                                            </a>
                                                                        </h2>
                                                                        <div className="time-event">
                                                                            <div className="wrapper1">
                                                                                <div className="time equal-date">
                                                                                    <span className="icon-time">
                                                                                        <i className="fas fa-clock icon_event"></i>
                                                                                    </span>
                                                                                    <span className="time-date-child">
                                                                                        <span className="date-child">

                                                                                            17:00 - 21:00
                                                                                        </span>
                                                                                    </span>
                                                                                </div>
                                                                                <label className="Timing">Timing</label>
                                                                            </div>
                                                                            <div className="wrapper1">
                                                                                <div className="venue">
                                                                                    <i className="fas fa-map-marker-alt icon_event"></i>
                                                                                    <span className="number">New York</span>
                                                                                </div>
                                                                               <label htmlFor="">Location</label>
                                                                            </div>
                                                                        </div>
                                                                        <a href="">
                                                                            <div className="icon">
                                                                                <i className="ovaicon-next-4"></i>
                                                                            </div>
                                                                        </a>
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
                            </div>
                        </div>
                    </div>
                </section>
            </div>
           <FooterHome ></FooterHome>
        </div>
    )
}
export default EventHome;