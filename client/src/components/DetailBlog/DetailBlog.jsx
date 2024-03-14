import React, { useEffect, useState } from "react";
import Menu from "../Menu/Menu";
import { useLocation, useNavigate } from "react-router-dom";
import '../DetailEvent/DetailEvent.css'
import axios from "axios";
import FooterHome from "../footer/FooterHome";
function DetailBlog() {
    const location = useLocation();

    const ID = location.state?.ID || '';
    const IDAccount = location.state?.IDAccount || '';
    const [DetailEv, setDetailEv] = useState([]);
    useEffect(() => {
        const fetchdata = async () => {
            try {
                const response = await axios.get(`http://localhost:5231/api/Blog/DetailBlog/${ID}`);
                setDetailEv(response.data);
            } catch (error) {
                console.log(error)
            }
        }
        fetchdata();
    }, [])
    return (
        <div>
            <Menu></Menu>
            <div style={{ height: '296px', marginTop: '5px' }}>
                <div className="breadcrumb-area">
                    <div className="container">
                        <div className="breadcrumb-content">
                            <h2 className="font-bold" style={{ color: '#ffffff', textTransform: 'uppercase', textAlign: 'center', fontSize: '36px', marginBottom: '0', paddingBottom: '20px', fontFamily: '"Lato", sans-serif' }}>DetailBlog</h2>
                            <ul>
                                <li>
                                    <a href="" style={{ textDecoration: 'none' }}>Home</a>
                                </li>
                                <li className="active">DetailBlog</li>
                            </ul>
                        </div>
                    </div>
                </div>

            </div>
            <section className="elementor-section elementor-top-section elementor-element elementor-element-3929839 elementor-section-boxed elementor-section-height-default elementor-section-height-default mt-[141px] mb-[100px]">
                <div className="elementor-container elementor-column-gap-default">
                    <div className="elementor-column elementor-col-50 elementor-top-column elementor-element elementor-element-19202dd">
                        <div className="elementor-widget-wrap elementor-element-populated">
                            <section className="elementor-section elementor-inner-section elementor-element elementor-element-5f1324f elementor-section-full_width elementor-section-height-default elementor-section-height-default">
                                <div className="elementor-container elementor-column-gap-no">
                                    <div className="elementor-column elementor-col-50 elementor-inner-column elementor-element elementor-element-6f840c5">
                                        <div className="elementor-widget-wrap elementor-element-populated">
                                            <div className="elementor-element elementor-element-4a3372f elementor-widget elementor-widget-ova_event_title">
                                                <div className="elementor-widget-container" style={{ width: '213%' }}>
                                                {DetailEv.map((detail, index) => (
                                                    <h1 className="ovaev-event-title">

                                                        {detail.id}
                                                    </h1>
                                                      ))}
                                                        {DetailEv.map((detail, index) => (
                                <div className="elementor-element elementor-element-29bf31d elementor-widget elementor-widget-ova_event_content">
                                    <div className="elementor-widget-container">
                                    <img src={`http://localhost:5231/${detail.imageUrl}`}
                                                        width="770" height="500" style={{ objectFit: 'cover' }} alt="" />
                                        <div className="ovaev-event-content">
                                            <div dangerouslySetInnerHTML={{ __html: detail.name }} />
                                      
                                        </div>
                                    </div>
                                   
                                </div>


                            ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>
                            <br />
                           
                        </div>
                      
                    </div>
                  
                </div>
               
            </section>
            <FooterHome></FooterHome>
        
        </div>


    )
}
export default DetailBlog;