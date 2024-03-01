import React, { useEffect, useState } from "react";
import axios from 'axios';
import Menu from "../Menu/Menu";
import { useLocation, useNavigate } from 'react-router-dom';
import '../AllMovies/AllMovies.css';

import Pagination from 'react-paginate';
import FooterHome from "../footer/FooterHome";
import Select from 'react-select';

import 'react-paginate/theme/basic/react-paginate.css';
function MovieActor() {
    const navigate = useNavigate();
    const [Movies, setMovies] = useState([]);
    const location = useLocation();
    
    const IDAccount = location.state?.IDAccount || '';
    const [perPage, setperPage] = useState(5);
    const [currentPage, setCurrentPage] = useState(0);
    const [searchCountry, setsearchCountry] = useState('');
    const [actor, setactor] = useState([]);
   
    const nationalityOptions = [
        { value: 'United States', label: 'United States' },
        { value: 'canada', label: 'Canada' },
        { value: 'United Kingdom', label: 'United Kingdom' },
        { value: 'france', label: 'France' },
        { value: 'germany', label: 'Germany' },
        { value: 'australia', label: 'Australia' },
        { value: 'japan', label: 'Japan' },
        { value: 'brazil', label: 'Brazil' },
        { value: 'india', label: 'India' },
        { value: 'china', label: 'China' },
        { value: 'russia', label: 'Russia' },
        { value: 'south-korea', label: 'South Korea' },
        { value: 'mexico', label: 'Mexico' },
        { value: 'south-africa', label: 'South Africa' },
        { value: 'Afghanistan', label: 'Afghanistan' },
        { value: 'Armenia', label: 'Armenia' },
        { value: 'Azerbaijan', label: 'Azerbaijan' },
        { value: 'Bahrain', label: 'Bahrain' },
        { value: 'Bangladesh', label: 'Bangladesh' },
        { value: 'Bhutan', label: 'Bhutan' },
        { value: 'Brunei', label: 'Brunei' },
        { value: 'Cambodia', label: 'Cambodia' },
        { value: 'China', label: 'China' },
        { value: 'Cyprus', label: 'Cyprus' },
        { value: 'Georgia', label: 'Georgia' },
        { value: 'India', label: 'India' },
        { value: 'Indonesia', label: 'Indonesia' },
        { value: 'Iran', label: 'Iran' },
        { value: 'Iraq', label: 'Iraq' },
        { value: 'Israel', label: 'Israel' },
        { value: 'Japan', label: 'Japan' },
        { value: 'Jordan', label: 'Jordan' },
        { value: 'Kazakhstan', label: 'Kazakhstan' },
        { value: 'Kuwait', label: 'Kuwait' },
        { value: 'Kyrgyzstan', label: 'Kyrgyzstan' },
        { value: 'Laos', label: 'Laos' },
        { value: 'Lebanon', label: 'Lebanon' },
        { value: 'Malaysia', label: 'Malaysia' },
        { value: 'Maldives', label: 'Maldives' },
        { value: 'Mongolia', label: 'Mongolia' },
        { value: 'Myanmar (Burma)', label: 'Myanmar (Burma)' },
        { value: 'Nepal', label: 'Nepal' },
        { value: 'North Korea', label: 'North Korea' },
        { value: 'Oman', label: 'Oman' },
        { value: 'Pakistan', label: 'Pakistan' },
        { value: 'Palestine', label: 'Palestine' },
        { value: 'Philippines', label: 'Philippines' },
        { value: 'Qatar', label: 'Qatar' },
        { value: 'Saudi Arabia', label: 'Saudi Arabia' },
        { value: 'Singapore', label: 'Singapore' },
        { value: 'South Korea', label: 'South Korea' },
        { value: 'Sri Lanka', label: 'Sri Lanka' },
        { value: 'Syria', label: 'Syria' },
        { value: 'Taiwan', label: 'Taiwan' },
        { value: 'Tajikistan', label: 'Tajikistan' },
        { value: 'Thailand', label: 'Thailand' },
        { value: 'Turkey', label: 'Turkey' },
        { value: 'Turkmenistan', label: 'Turkmenistan' },
        { value: 'United Arab Emirates', label: 'United Arab Emirates' },
        { value: 'Uzbekistan', label: 'Uzbekistan' },
        { value: 'Vietnam', label: 'Vietnam' },
        { value: 'Yemen', label: 'Yemen' },
        { value: 'Albania', label: 'Albania' },
        { value: 'Andorra', label: 'Andorra' },
        { value: 'Austria', label: 'Austria' },
        { value: 'Belarus', label: 'Belarus' },
        { value: 'Belgium', label: 'Belgium' },
        { value: 'Bosnia and Herzegovina', label: 'Bosnia and Herzegovina' },
        { value: 'Bulgaria', label: 'Bulgaria' },
        { value: 'Croatia', label: 'Croatia' },
        { value: 'Cyprus', label: 'Cyprus' },
        { value: 'Czech Republic', label: 'Czech Republic' },
        { value: 'Denmark', label: 'Denmark' },
        { value: 'Estonia', label: 'Estonia' },
        { value: 'Finland', label: 'Finland' },
        { value: 'France', label: 'France' },
        { value: 'Germany', label: 'Germany' },
        { value: 'Greece', label: 'Greece' },
        { value: 'Hungary', label: 'Hungary' },
        { value: 'Iceland', label: 'Iceland' },
        { value: 'Ireland', label: 'Ireland' },
        { value: 'Italy', label: 'Italy' },
        { value: 'Kosovo', label: 'Kosovo' },
        { value: 'Latvia', label: 'Latvia' },
        { value: 'Liechtenstein', label: 'Liechtenstein' },
        { value: 'Lithuania', label: 'Lithuania' },
        { value: 'Luxembourg', label: 'Luxembourg' },
        { value: 'Malta', label: 'Malta' },
        { value: 'Moldova', label: 'Moldova' },
        { value: 'Monaco', label: 'Monaco' },
        { value: 'Montenegro', label: 'Montenegro' },
        { value: 'Netherlands', label: 'Netherlands' },
        { value: 'North Macedonia', label: 'North Macedonia' },
        { value: 'Norway', label: 'Norway' },
        { value: 'Poland', label: 'Poland' },
        { value: 'Portugal', label: 'Portugal' },
        { value: 'Romania', label: 'Romania' },
        { value: 'Russia', label: 'Russia' },
        { value: 'San Marino', label: 'San Marino' },
        { value: 'Serbia', label: 'Serbia' },
        { value: 'Slovakia', label: 'Slovakia' },
        { value: 'Slovenia', label: 'Slovenia' },
        { value: 'Spain', label: 'Spain' },
        { value: 'Sweden', label: 'Sweden' },
        { value: 'Switzerland', label: 'Switzerland' },
        { value: 'Ukraine', label: 'Ukraine' },
        { value: 'United Kingdom', label: 'United Kingdom' },
        { value: 'Vatican City', label: 'Vatican City' },
        // Add more countries as needed
    ];
    const filterActor = actor.filter(actor => (
        actor.nationally.toLowerCase().includes(searchCountry.toLowerCase())
    ))
    useEffect(() => {
        const fetchdata = async () => {
            try {
                const response = await axios.get("http://localhost:5231/api/Actor/ShowActor");
                setactor(response.data);
                console.log(response.data)
            } catch (error) {
                console.log(error);
            }
        }
        fetchdata();
    }, [])
    const indexOflastgen = (currentPage + 1) * perPage;
    const indexOfFirtgen = indexOflastgen - perPage;
    const currentGender = filterActor.slice(indexOfFirtgen, indexOflastgen)
    const handlePageclick = (data) => {
        setCurrentPage(data.selected);
    };
    return (
        <div>
            <Menu />
            <div style={{ height: '296px', marginTop: '5px' }}>
                <div className="breadcrumb-area">
                    <div className="container">
                        <div className="breadcrumb-content">
                            <h2 className="font-bold" style={{ color: '#ffffff', textTransform: 'uppercase', textAlign: 'center', fontSize: '36px', marginBottom: '0', paddingBottom: '20px', fontFamily: '"Lato", sans-serif' }}>Actor</h2>
                            <ul>
                                <li>
                                    <a href="" style={{ textDecoration: 'none' }}>Home</a>
                                </li>
                                <li className="active">Actor</li>
                            </ul>
                        </div>
                    </div>
                </div>

            </div>
            <div className="elementor elementor-72" style={{ paddingTop: '160px', fontWeight: '600' }}>
                <section className="elementor-section elementor-top-section elementor-element elementor-element-9845cb1 elementor-section-boxed elementor-section-height-default elementor-section-height-default mb-[31px]">
                    <div className="elementor-container elementor-column-gap-default">
                        <div className="w-[100%]">
                            <ul className="mb-button-filter-ajax mb-date-tabs">

                                <form>
                                    <div class="form-row">
                                        <div class="form-group col-md-6">
                                            <label for="category1">Select Country:</label>
                                            <select class="form-control" id="category1" name="category1" value={searchCountry} onChange={(e) => setsearchCountry(e.target.value)}>
                                                {nationalityOptions.map((nation, index) => (
                                                    <option key={index} value={nation.value}>{nation.value}</option>
                                                ))}

                                            </select>
                                        </div>


                                    </div>
                                </form>

                            </ul>
                            <div className="elementor-widget-wrap elementor-element-populated">
                                <div>
                                    <div className="elementor-widget-container">
                                        <div className="mb-movie-list mb-movie-list-template1 four_column">
                                            {currentGender.map((actor, index) => (
                                                <div className="mb-movie-item item-template1">
                                                    <a onClick={()=>navigate(`/DetailActor/${actor.id}`,{state:{ID:actor.id,IDAccount:IDAccount }})} style={{ boxShadow: 'none', textDecoration: 'none' }}>
                                                        <div className="movie-image">
                                                            <img src={`http://localhost:5231/${actor.image}`} alt="" />
                                                        </div>
                                                    </a>
                                                    <div className="movie-info">

                                                        <a href="" style={{ boxShadow: 'none', textDecoration: 'none' }}>
                                                            <h3 className="movie-title">
                                                                {actor.name}
                                                            </h3>
                                                        </a>
                                                        <button className="btn btn-booking ">
                                                            Detail   </button>
                                                    </div>
                                                </div>
                                            ))}



                                        </div>
                                        <Pagination
                                            previousLabel={'previous'}
                                            nextLabel={'next'}
                                            breakLabel={'...'}
                                            pageCount={Math.ceil(filterActor.length / perPage)}
                                            marginPagesDisplayed={2}
                                            pageRangeDisplayed={5}
                                            onPageChange={handlePageclick}
                                            containerClassName={'pagination'}
                                            activeClassName={'active'}
                                            previousClassName={'page-item'}
                                            previousLinkClassName={'page-link'}
                                            nextClassName={'page-item'}
                                            nextLinkClassName={'page-link'}
                                            breakClassName={'page-item'}
                                            breakLinkClassName={'page-link'}
                                            pageClassName={'page-item'}
                                            pageLinkClassName={'page-link'}

                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            <FooterHome />

        </div>
    )
}
export default MovieActor;