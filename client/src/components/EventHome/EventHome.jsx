import { useEffect, useState } from "react";
import Menu from "../Menu/Menu";
import FooterHome from "../footer/FooterHome";
import './EventHome.css'
import { useNavigate } from 'react-router-dom';
import axios from "axios";
function EventHome() {
    const navigate=useNavigate();
    const [Event, setEvent] = useState([]);
    useEffect(() => {
        const response = async () => {
            try {
                const response = await axios.get("http://localhost:5231/api/Event/Show");
                setEvent(response.data);
                console.log(response.data)
            } catch (error) {
                console.log(error);
            }

        }
        response();
    }, [])
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
            <div className="elementor elementor-3421" style={{ marginTop: '146px' }}>
                <section className="elementor-section elementor-top-section elementor-element elementor-element-56ee83c elementor-section-boxed elementor-section-height-default elementor-section-height-default">
                    <div className="elementor-container elementor-column-gap-default">
                        <div className="elementor-column elementor-col-100 elementor-top-column elementor-element elementor-element-b3cdce9">
                            <div className="elementor-widget-wrap elementor-element-populated" >
                                <div class="elementor-widget-container">
                                    <div className="ovaev-event-element version_1" style={{ width: '193vh' }}>
                                        {Event.map((event,index)=>(
                                            <div className="item">
                                            <div className="date-time_title">
                                                <div className="date-start">
                                                    <span>{formatDay(event.startDate)}</span>
                                                    <span>{formatWeek(event.startDate)}</span>
                                                </div>
                                                <div className="time_title">
                                                    <div className="time-venue">
                                                        <div className="time">
                                                            <span className="icon-time" style={{ marginRight: '5px' }}>
                                                                <i className="fas fa-clock icon_event" style={{ color: '#d96c2c' }}></i>
                                                            </span>
                                                            <span style={{ color: '#737373', fontFamily: 'Space Grotesk' }}>{new Date(event.startDate).toLocaleString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })} - {new Date(event.endDate).toLocaleString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                                                        </div>

                                                    </div>
                                                    <div className="title">
                                                        <a href="" className="second_font font-bold" onClick={()=>navigate(`/DetailEvent/${event.id}`,{ state: { ID:event.id } })}>

                                                           {event.title}
                                                        </a>
                                                    </div>
                                                </div>
                                               

                                            </div>
                                            <div className="ovaev-booking-btn">
                                                    <a href="" >Visit</a>
                                                </div>
                                        </div>
                                        ))}
                                        
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