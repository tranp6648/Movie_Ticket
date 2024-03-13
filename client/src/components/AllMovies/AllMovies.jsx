import React, { useEffect, useState } from "react";
import axios from 'axios';
import Menu from "../Menu/Menu";
import { useLocation, useNavigate } from 'react-router-dom';
import './AllMovies.css';
import Pagination from 'react-paginate';
import FooterHome from "../footer/FooterHome";
function AllMovies() {
    const navigate=useNavigate();
    const [Movies, setMovies] = useState([]);
    const [perPage, setperPage] = useState(5);
    const location = useLocation();

    const ID = location.state?.IDAccount || '';
    const [searchTerm, setSearchtem] = useState('');
    const [activeIndex, setActiveIndex] = useState(null);
    const [filteredMovies, setFilteredMovies] = useState([]);
    const filteredGender =filteredMovies.filter(gen =>

        gen.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    useEffect(() => {
        const fetchdata = async () => {
            try {
                const response = await axios.get("http://localhost:5231/api/Movie/ShowMovie")
                setFilteredMovies(response.data);
                console.log(response.data)
            } catch (error) {
                console.log(error);
            }
        }
        fetchdata();
    }, [])
   

    const [currentPage, setCurrentPage] = useState(0);
    const handlePageclick = (data) => {
        setCurrentPage(data.selected);
    };
  


    useEffect(() => {
        const fetchdata = async () => {
            try {
                const response = await axios.get("http://localhost:5231/api/Movie/ShowMovie")
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
    const currentGender = filteredGender.slice(indexOfFirtgen, indexOflastgen)


    return (
        <div>
            <Menu />
            <div style={{ height: '296px', marginTop: '5px' }}>
        <div className="breadcrumb-area">
          <div className="container">
            <div className="breadcrumb-content">
              <h2 className="font-bold" style={{ color: '#ffffff', textTransform: 'uppercase', textAlign: 'center', fontSize: '36px', marginBottom: '0', paddingBottom: '20px', fontFamily: '"Lato", sans-serif' }}>Movie</h2>
              <ul>
                <li>
                  <a href="" style={{ textDecoration: 'none' }}>Home</a>
                </li>
                <li className="active">Movie</li>
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
           
                  <input type="text" id="search" name="search" placeholder="Enter your search term"  className="border border-gray-300 px-3 py-1 rounded-md focus:outline-none focus:border-blue-500" value={searchTerm} onChange={(e) => setSearchtem(e.target.value)} />
        </div>


    </div>
</form>

</ul>
                            <div className="elementor-widget-wrap elementor-element-populated">
                                <div>
                                    <div className="elementor-widget-container">
                                        <div className="mb-movie-list mb-movie-list-template1 four_column">
                                            {currentGender.map((Movies, index) => (
                                                <div className="mb-movie-item item-template1">
                                                    <a onClick={()=>navigate(`/Detail/${Movies.id}`,{ state: { ID:Movies.id,IDAccount:ID } })} style={{ boxShadow: 'none', textDecoration: 'none' }}>
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
                                            pageCount={Math.ceil(filteredGender.length / perPage)}
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