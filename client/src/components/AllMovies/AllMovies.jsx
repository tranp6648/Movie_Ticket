import React, { useEffect, useState } from "react";
import axios from 'axios';
import Menu from "../Menu/Menu";
import './AllMovies.css';
import Pagination from 'react-paginate';
import FooterHome from "../footer/FooterHome";
function AllMovies() {
    const [Movies, setMovies] = useState([]);
    const [perPage, setperPage] = useState(5);

    const [activeIndex, setActiveIndex] = useState(null);
    const [filteredMovies, setFilteredMovies] = useState([]);
    useEffect(() => {

        handleActive(null);
    }, []);
    useEffect(() => {
        const fetchdata = async () => {
            try {
                const response = await axios.get("http://localhost:5231/api/Movie/getMovie")
                setFilteredMovies(response.data);
                console.log(response.data)
            } catch (error) {
                console.log(error);
            }
        }
        fetchdata();
    }, [])
    const handleActive = (index) => {
        setActiveIndex(index === activeIndex ? null : index);

        
        const selectedDate = index !== activeIndex ? nextFiveDays[index] : null;
        setFilteredMovies((prevMovies) => {
            if (index === null) {
                // "All" tab is selected, show all movies
                return Movies;
            }

            // Filter movies based on the selected date
            return prevMovies.filter((movie) => {
                // Extracting year, month, and day from the movie's releaseDate
                const movieYear = parseInt(movie.releaseDate.split('-')[0]);
                const movieMonth = parseInt(movie.releaseDate.split('-')[1]);
                const movieDay = parseInt(movie.releaseDate.split('-')[2]);

                // Comparing year, month, and day
                return (
                    movieYear === selectedDate.year &&
                    movieMonth === selectedDate.month &&
                    movieDay === selectedDate.day
                );
            });
        });
    };

    const [currentPage, setCurrentPage] = useState(0);
    const handlePageclick = (data) => {
        setCurrentPage(data.selected);
    };
    const getNextFiveDays = () => {
        const today = new Date();
        const nextFiveDays = [];

        for (let i = 0; i < 5; i++) {
            const date = new Date(today);
            date.setDate(today.getDate() + i);

            // Format date to "yyyy/MM/dd" including day of the week
            const formattedDate = `${date.getFullYear()}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getDate().toString().padStart(2, '0')} ${['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][date.getDay()]}`;

            nextFiveDays.push({
                year: date.getFullYear(),
                month: date.getMonth() + 1, // Adding 1 because getMonth() returns zero-based month (0-11)
                day: date.getDate(),
                dayOfWeek: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][date.getDay()],
            });
        }

        return nextFiveDays;
    };
    const nextFiveDays = getNextFiveDays();
    const selectedDate = nextFiveDays[2]; // Replace with your selected date

    // Extracting year, month, and day from the selected date
    const selectedYear = selectedDate.year;
    const selectedMonth = selectedDate.month;
    const selectedDay = selectedDate.day;


    function formatDate(date) {
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');

        return `${year}-${month}-${day}`;
    }


    useEffect(() => {
        const fetchdata = async () => {
            try {
                const response = await axios.get("http://localhost:5231/api/Movie/getMovie")
                setMovies(response.data);
                console.log(response.data)
            } catch (error) {
                console.log(error);
            }
        }
        fetchdata();
    }, [])
    const indexOflastgen = (currentPage + 1) * perPage;
    const indexOfFirtgen = indexOflastgen - perPage;
    const currentGender = Movies.slice(indexOfFirtgen, indexOflastgen)


    return (
        <div>
            <Menu />
            <div style={{ height: '100px',marginTop:'97px' }}>
        <div className="breadcrumb-area">
          <div className="container">
            <div className="breadcrumb-content">
              <h2 className="font-bold" style={{ color: '#ffffff', textTransform: 'uppercase', textAlign: 'center', fontSize: '36px', marginBottom: '0', paddingBottom: '20px', fontFamily: '"Lato", sans-serif' }}>My Order</h2>
              <ul>
                <li>
                  <a href="" style={{ textDecoration: 'none' }}>Home</a>
                </li>
                <li className="active">My Order</li>
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
                                <li className={`button-filter-ajax ${activeIndex === null ? 'current' : ''}`} onClick={() => handleActive(null)} >
                                    <div className="day">
                                        <span className="D_m_day">
                                            <span className="m_day" style={{ fontFamily: 'Space Grotesk' }}>All</span>
                                            <span className="m_day" style={{ fontFamily: 'Space Grotesk' }}></span>
                                        </span>
                                        <span className="d_day">

                                        </span>
                                    </div>
                                </li>
                                {Array.isArray(nextFiveDays) &&
                                    nextFiveDays.map((day, index) => (
                                        <li className={`button-filter-ajax ${index === activeIndex ? 'current' : ''}`} onClick={() => handleActive(index)} key={index}>
                                            <div className="day">
                                                <span className="D_m_day">
                                                    <span className="m_day" style={{ fontFamily: 'Space Grotesk' }}>{day.day}</span>
                                                    <span className="m_day" style={{ fontFamily: 'Space Grotesk' }}>{day.dayOfWeek}</span>
                                                </span>
                                                <span className="d_day">
                                                    <strong>{day.day}</strong>
                                                </span>
                                            </div>
                                        </li>
                                    ))}

                            </ul>
                            <div className="elementor-widget-wrap elementor-element-populated">
                                <div>
                                    <div className="elementor-widget-container">
                                        <div className="mb-movie-list mb-movie-list-template1 four_column">
                                            {filteredMovies.map((Movies, index) => (
                                                <div className="mb-movie-item item-template1">
                                                    <a href="" style={{ boxShadow: 'none', textDecoration: 'none' }}>
                                                        <div className="movie-image">
                                                            <img src={Movies.detailCategoryMovies.length > 0
                                                                ? `http://localhost:5231/${Movies.detailCategoryMovies[0].picture}`
                                                                : 'No Category'} alt="" />
                                                        </div>
                                                    </a>
                                                    <div className="movie-info">
                                                        <div className="categories-and-time">
                                                            <div className="movie-category">
                                                                <a href="">{Movies.genreName}</a>
                                                            </div>
                                                            <div className="separator">/</div>
                                                            <span className="running-time">
                                                                {Movies.duration} Mins
                                                            </span>
                                                        </div>
                                                        <a href="" style={{ boxShadow: 'none', textDecoration: 'none' }}>
                                                            <h3 className="movie-title">
                                                                {Movies.title}			</h3>
                                                        </a>
                                                        <button className="btn btn-booking ">
                                                            Get Ticket    </button>
                                                    </div>
                                                </div>
                                            ))}


                                        </div>
                                        <Pagination
                                            previousLabel={'previous'}
                                            nextLabel={'next'}
                                            breakLabel={'...'}
                                            pageCount={Math.ceil(Movies.length / perPage)}
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
export default AllMovies;