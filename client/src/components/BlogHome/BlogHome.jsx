import { useEffect, useState } from "react";
import Menu from "../Menu/Menu";
import FooterHome from "../footer/FooterHome";
import '../EventHome/EventHome.css'
import { useLocation, useNavigate } from 'react-router-dom';
import Pagination from 'react-paginate';
import axios from "axios";
function BlogHome() {
    const navigate = useNavigate();
    const [Movies, setMovies] = useState([]);
    const [perPage, setperPage] = useState(5);
    const location = useLocation();
    const [searchCountry, setsearchCountry] = useState('');
    const ID = location.state?.IDAccount || '';
    const [searchTerm, setSearchtem] = useState('');
    const [activeIndex, setActiveIndex] = useState(null);
    const [filteredMovies, setFilteredMovies] = useState([]);
    console.log(Movies)
    const filteredGender = Movies.filter(gen =>

        gen.idCategory.toString().includes(searchCountry.toLowerCase())
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
                const response = await axios.get("http://localhost:5231/api/Blog/ShowBlog")
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
    const [cate,setcate]=useState([]);
    useEffect(()=>{
        const fetchdata = async () => {
            try {
                const response = await axios.get("http://localhost:5231/api/Blog/Showcate");
                setcate(response.data);
                console.log(response.data)
            } catch (error) {
                console.log(error);
            }
        }
        fetchdata();
    },[])

    return (
        <div>
            <Menu />
            <div style={{ height: '296px', marginTop: '5px' }}>
                <div className="breadcrumb-area">
                    <div className="container">
                        <div className="breadcrumb-content">
                            <h2 className="font-bold" style={{ color: '#ffffff', textTransform: 'uppercase', textAlign: 'center', fontSize: '36px', marginBottom: '0', paddingBottom: '20px', fontFamily: '"Lato", sans-serif' }}>Blog</h2>
                            <ul>
                                <li>
                                    <a href="" style={{ textDecoration: 'none' }}>Home</a>
                                </li>
                                <li className="active">Blog</li>
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
                                            <label for="category1">Select Category:</label>
                                            <select class="form-control" id="category1" name="category1" value={searchCountry} onChange={(e) => setsearchCountry(e.target.value)} >
                                            {cate.map((nation, index) => (
                                                    <option key={index} value={nation.id}>{nation.name}</option>
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
                                            {currentGender.map((Movies, index) => (
                                                <div className="mb-movie-item item-template1">
                                                    <a onClick={() => navigate(`/DetailBlog/${Movies.id}`, { state: { ID: Movies.id, IDAccount: ID } })} style={{ boxShadow: 'none', textDecoration: 'none' }}>
                                                        <div className="movie-image">
                                                            <img src={
                                                                `http://localhost:5231/${Movies.image}`
                                                            } alt="" />
                                                        </div>
                                                    </a>
                                                    <div className="movie-info">
                                                        <div className="categories-and-time">
                                                            <div className="movie-category">
                                                                <a onClick={() => navigate(`/DetailBlog/${Movies.id}`, { state: { ID: Movies.id, IDAccount: ID } })}>{Movies.category}</a>
                                                            </div>
                                                            <div className="separator">/</div>
                                                            <span className="running-time">
                                                                By  {Movies.account}
                                                            </span>
                                                        </div>
                                                        <a onClick={() => navigate(`/DetailBlog/${Movies.id}`, { state: { ID: Movies.id, IDAccount: ID } })} style={{ boxShadow: 'none', textDecoration: 'none' }}>
                                                            <h3 className="movie-title">
                                                                {Movies.title}			</h3>
                                                        </a>
                                                        <button onClick={() => navigate(`/DetailBlog/${Movies.id}`, { state: { ID: Movies.id, IDAccount: ID } })} className="btn btn-booking ">
                                                            Watch Blog    </button>
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
export default BlogHome;