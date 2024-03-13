import image12 from "../../images/1917.jpg";
import { useEffect, useState } from "react";
import { Form, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import { useLocation } from "react-router-dom";
import ReactQuill from "react-quill";
import "../DetailCinema/DetailCinema.css";

import Pagination from "react-paginate";
import "react-paginate/theme/basic/react-paginate.css";
import Select from "react-select";

function DetailCinema() {
  const location = useLocation();
  const username = location.state?.username || "Default Username";
  const ID = location.state?.ID || "";

  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [FormData, setFormData] = useState({
    ID: "",
    Name: "",
    Location: "",
    Phone: "",
    district: "",
    UpdateName: "",
    UpdateLocation: "",
    UpdatePhone: "",
  });
  
  const [id, setid] = useState("");
  
  const [perPage, setperPage] = useState(5);
  const [searchTerm, setSearchtem] = useState("");
  const [Branches, setBrancher] = useState([]);
  const [Cinema, setCinema] = useState([]);
  const [Auditorium,setAuditorium] = useState([]);
  const [selectedBrancher, setselectedBrancher] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [IsClosingPopup, setIsClosingPopup] = useState(false);
  const [isPopupVisible, setPopupVisibility] = useState(false);
  const [isPopupDetailSeat, setPopupDetailSeat] = useState(false);


  const [quantityRoom, setQuantityRoom] = useState(0);
  const [seatCounts, setSeatCounts] = useState({});
  const [roomDetails, setRoomDetails] = useState([]);
  const [vipSeats, setVipSeats] = useState({});
  const [roomSeats, setRoomSeats] = useState([]);
  const [selectedCinemaId, setSelectedCinemaId] = useState(null);
  const [vipSeatsCountByRoom, setVipSeatsCountByRoom] = useState({});
  



  const handlePageclick = (data) => {
    setCurrentPage(data.selected);
  };
  const handleBracher = (selectedBrancher) => {
    setselectedBrancher(selectedBrancher);
  };
  const [selectedQuan, setSelectedQuan] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);

  
  const handleQuan = (selectedOption) => {
    setSelectedQuan(selectedOption);
  };
  useEffect(() => {
    const fetchdata = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5231/api/Cinema/getBranches"
        );
        setBrancher(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchdata();
  }, []);
  const closingAnimation = {
    animation: "flipright 0.5s",
  };
  const popupContentStyle = {
    background: "white",

    borderRadius: "8px",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
    animation: "flipleft 0.5s", // Default animation
  };
  const popupContentStyle1 = {
    background: "#FDFCF0",

    borderRadius: "8px",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
    animation: "flipleft 0.5s", // Default animation
  };
  const handleClosepopup = () => {
    setIsClosingPopup(true);
    setTimeout(() => {
      FormData.ID = "";
      FormData.UpdateName = "";
      FormData.UpdateLocation = "";
      FormData.UpdatePhone = "";
      setPopupVisibility(false);
      setIsClosingPopup(false);
    }, 500);
  };
  useEffect(() => {
    const fetchdata = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5231/api/Cinema/getCinema"
        );
        setCinema(response.data);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchdata();
  }, []);
  useEffect(()=>{
    let isMounted = true;
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5231/api/Seat/getAuditorium"
        );
       if(isMounted){
        setAuditorium(response.data);
        console.log("auditorium full: " , response.data);
       }
      } catch (error) {
        console.log("failed" + error);
        
      }
    };
fetchData();
return () => {
  isMounted = false;
};
  },[]);

  

  const filteredGender = Cinema.filter((Cinema) =>
    Cinema.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const indexOflastgen = (currentPage + 1) * perPage;
  const indexOfFirtgen = indexOflastgen - perPage;
  const currentGender = filteredGender.slice(indexOfFirtgen, indexOflastgen);
 

  const handleSetupClick = (cinemaIdFromButton) => {
    if(existAuditorium(cinemaIdFromButton)){
      Swal.fire({
        icon: 'warning',
        title: 'Auditorium already exist',
        text: 'This cinema already has an auditorium setup'
      })
    }else{
      console.log(cinemaIdFromButton); // For debugging
    setSelectedCinemaId(cinemaIdFromButton); // Store the selected cinema ID
    const selectedCinema = Cinema.find(Movie => Movie.id === cinemaIdFromButton);
    if (selectedCinema) {
      setFormData({ ...FormData, ID: cinemaIdFromButton });
    }
    setActiveTab(0);
    setPopupVisibility(true);
    }
  };
  
  

  const handleQuantityRoomChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (value < 1 || value > 10) {
      Swal.fire({
        icon: "error",
        title: "Invalid Quantity",
        text: "Please enter a number greater than 0 and less than 10",
      });
      setQuantityRoom(0);
    } else {
      setQuantityRoom(value);
    }
  };

  const [setupRoomPopupVisible, setSetupRoomPopupVisible] = useState(false);
const[setupRoomPopupVisibleDetail,setSetupRoomPopupVisibleDetail] = useState(false);

  const handleOpenSetupRoom = () => {
    if (quantityRoom < 1 || quantityRoom > 10) {
      Swal.fire({
        icon: "error",
        title: "Invalid Quantity",
        text: "Please enter a number greater than 0 and less than 10",
      });
    } else {
      setSetupRoomPopupVisible(true);
    }
  };
 
  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (index) => {
    setActiveTab(index);
  };
  
  useEffect(() => {
    const newRoomSeats = Array.from({ length: quantityRoom }, () => []);
    setRoomSeats(newRoomSeats);
  }, [quantityRoom]);
  useEffect(() => {
    setRoomDetails(Array.from({ length: quantityRoom }, (_, index) => roomDetails[index] || { seatCount: 0, roomName: '' }));
  }, [quantityRoom]);
  
 
  const generateSeats = (index, seatCount) => {
  
    if (!Number.isNaN(seatCount) && seatCount <= 80) {
      const newSeats = Array.from({ length: seatCount }, (_, i) => ` ${i + 1}`);
      setRoomSeats((prevSeats) => {
        const updatedSeats = [...prevSeats];
        updatedSeats[index] = newSeats;
        return updatedSeats;
      });
  
     
      setSeatCounts((prevCounts) => ({
        ...prevCounts,
        [index]: seatCount,
      }));
    }
  };
  const handleSeatCountChange = (index, seatCount) => {
    if (seatCount > 80) {
      // Show error if seat count exceeds 80
      Swal.fire({
        icon: "error",
        title: "Too many seats",
        text: "The seat count cannot exceed 80",
      });
      return;
    }
    
    const newRoomDetails = [...roomDetails];
    newRoomDetails[index].seatCount = seatCount;
    setRoomDetails(newRoomDetails);
    generateSeats(index, seatCount);
  };
  
  
  const toggleSeatVip = (seatNumber) => {
    setVipSeats(prevSeats => {
      const seatKey = `Room${activeTab}Seat${seatNumber}`;
      const newVipSeats = {
        ...prevSeats,
        [seatKey]: !prevSeats[seatKey],
      };
  
      
      const currentVipCount = vipSeatsCountByRoom[`Room${activeTab}`] || 0;
      setVipSeatsCountByRoom({
        ...vipSeatsCountByRoom,
        [`Room${activeTab}`]: newVipSeats[seatKey] ? currentVipCount + 1 : currentVipCount - 1,
      });
  
      return newVipSeats;
    });
  };
  
  
  const renderSeats = (seats) => {
    const rows = [];
    for (let i = 0; i < seats.length; i += 10) {
      const currentRowSeats = seats.slice(i, i + 10);
      rows.push(
        <div key={`row-${i}`} className="seat-row">
          {currentRowSeats.map((seat, index) => {
            const seatNumber = i + index + 1;
            const seatKey = `Room${activeTab}Seat${seatNumber}`;
            const isVip = vipSeats[seatKey];
            const seatClass = `seat-inDetail ${isVip ? 'vip' : ''}`;
            return (
              <div 
                key={`seat-${index}`} 
                className={seatClass} 
                onClick={() => toggleSeatVip(seatNumber)} // Update this function to handle VIP toggle
              >
                {seat}
              </div>
            );
          })}
        </div>
      );
    }
    return <div>{rows}</div>;
  };
  
  
  const vipCount = vipSeatsCountByRoom[`Room${activeTab}`] || 0;
const standardCount = seatCounts[activeTab] - vipCount;
 

  
  
const handleRoomNameChange = (index, name) => {
   
    const newRoomDetails = [...roomDetails];
    newRoomDetails[index].roomName = name;
    setRoomDetails(newRoomDetails);
  };
  

  const renderRoomSetupForm = (index) => {
    return (
      <div className="w-[200px]">
        <form onSubmit={(e) => e.preventDefault()}>
          <label className="inputSeat text-white" htmlFor={`seatCount-room${index}`}>
            Enter seat count for Room {index + 1}:
          </label>
          <br />
          <input
            type="number"
            placeholder="Quantity seats"
            value={roomDetails[index]?.seatCount || 0}
            onChange={(e) => handleSeatCountChange(index, parseInt(e.target.value, 10))}
            className="seat-count-input"
          />
        </form>
        <form onSubmit={(e) => e.preventDefault()}>
          <label className="inputSeat text-white" htmlFor={`roomName-room${index}`}>
            Enter name for Room {index + 1}:
          </label>
          <br />
          <input
            type="text"
            placeholder="Name room"
            value={roomDetails[index]?.roomName || ''}
            onChange={(e) => handleRoomNameChange(index, e.target.value)}
            className="room-name-input"
          />
        </form>
        <ul class="showcase mt-14">
      <li>
        <div class="seat-inDetail-icon"></div>
        <small>Standard {standardCount}</small>
      </li>
      <li>
        <div class="seat-inDetail1-icon"></div>
        <small>Vip  {vipCount}</small>
      </li>
      
    </ul>
    
      </div>
    );
  };
  
  
 
const handleSave = async () => {
   
    const roomData = roomDetails.map((room, index) => {
        const seats = roomSeats[index].map((_, seatIndex) => {
            const seatKey = `Room${index}Seat${seatIndex}`;
            const isVip = vipSeats[`Room${index}Seat${seatIndex + 1}`];
            return {
                name: `${seatIndex + 1}`,
                type: isVip ? "1" : "2",
            };
        });

        return {
            name: room.roomName,
            cinemaID: selectedCinemaId,
            seats,
        };
    });
    const payload = roomData;
    const bodyData = payload.map(room => ({
      name: room.name,
      seats: room.seats.map(seat => ({
          seatName: seat.name,
          type: seat.type
      }))
  }));

    console.log("roomData:", roomData);
  
    payload.forEach(room => {
      room.seats.forEach(seat => {
          console.log(seat.name); 
      });
  });

    try {
        const response = await fetch(`http://localhost:5231/api/Seat/saveSeats/${selectedCinemaId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
         
          body: JSON.stringify(bodyData),
        });

        if (response.ok) {
            // const responseData = await response.json();
            Swal.fire('Success', 'All configurations have been saved successfully!', 'success');
        } else {
            Swal.fire('Error', 'Failed to save configurations.', 'error');
        }
    } catch (error) {
        console.error('Error saving configurations:', error);
        Swal.fire('Error', 'There was a problem saving the configurations.', 'error');
    }
};
const existAuditorium = (cinemaId) => {
  return Auditorium.some(auditorium => auditorium.idCinema === cinemaId);
}
const [cinemaDetails, setCinemaDetails] = useState({ auditoriums: [],seats: {} });
const [selectedAuditorium, setSelectedAuditorium] = useState(null);

const handleDetailAuditoriums = async (cinemaIdFromButton) => {
  if(existAuditorium(cinemaIdFromButton)){
  try {
      const seatsResponse = await axios.get(`http://localhost:5231/api/Seat/getAuditoriumWithSeats/${cinemaIdFromButton}`);
      console.log("Auditoriums and Seats Details: ", seatsResponse.data);
  
      setCinemaDetails({
        auditoriums: seatsResponse.data,
        seats: seatsResponse.data.reduce((acc, auditoriumDetail) => {
          acc[auditoriumDetail.AuditoriumId] = auditoriumDetail.Seats;
          return acc;
        }, {})
      });
  
      if (seatsResponse.data && seatsResponse.data.length > 0) {
        setSelectedAuditorium(seatsResponse.data[0]);
      }

      setPopupDetailSeat(true); // Giả định rằng bạn đã định nghĩa hook này để quản lý trạng thái của popup
    } catch (error) {
      console.error('Failed to fetch auditorium details: ', error);
      Swal.fire('Error', 'Could not load auditorium details.', 'error');
    }
}else{
  Swal.fire({
    icon: 'info',
    title:"Cinema hasn't been created",
    text:"please created auditorium before click"
  })
}
  
};

// ... previous code

// Generate a layout for seats within the selected auditorium
const generateSeatLayout = () => {
  // Ensure selectedAuditorium and its seats are defined
  if (!selectedAuditorium || !selectedAuditorium.seats) {
    return null; // Return nothing or a placeholder if there's no data
  }

  // Use the seats data directly from selectedAuditorium
  const seats = selectedAuditorium.seats;
  const rows = [];

  // Assuming that seats are sorted in the order they should be displayed
  for (let i = 0; i < seats.length; i += 10) {
    const rowSeats = seats.slice(i, i + 10); // Get seats for the current row
    const rowSeatsJSX = rowSeats.map(seat => {
      const seatClass = seat.category === 'Vip' ? 'vip' : '';
      return (
        <div key={seat.id} className={`seat-inDetail ${seatClass}`}>
          {seat.name}
        </div>
      );
    });
    rows.push(
      <div key={`row-${i}`} className="seat-row">
        {rowSeatsJSX}
      </div>
    );
  }

  return <div className="seats-layout">{rows}</div>;
};



// ... rest of your component code


  
  return (
    <div>
      <div className="wrapper">
        <aside className="main-sidebar " style={{ zIndex: "10" }}>
          <section className="sidebar h-auto">
            <div className="user-panel">
              <div className="pull-left image">
                <img src={image12} className="img-circle" alt="User Image" />
              </div>
              <div className="pull-left info">
                <p className="text-white">Alexander Pierce</p>

                <a href="#" className="text-white">
                  <i className="fa fa-circle text-green-500"></i> Online
                </a>
              </div>
            </div>

            <ul className="sidebar-menu">
              <li className="header">MAIN NAVIGATION</li>
              <li className="treeview text-white">
                <a
                  className="cursor-pointer"
                  onClick={() =>
                    navigate("/admin", {
                      state: { username: username, ID: ID },
                    })
                  }
                >
                  <i className="fa fa-dashboard"></i> <span>Dashboard</span>
                </a>
                <a
                  className="cursor-pointer"
                  onClick={() =>
                    navigate("/Genre", {
                      state: { username: username, ID: ID },
                    })
                  }
                >
                  <i class="fas fa-film"></i> <span>Genre</span>
                </a>
                <a
                  className="cursor-pointer"
                  onClick={() =>
                    navigate("/Category_Movie", {
                      state: { username: username, ID: ID },
                    })
                  }
                >
                  <i class="fa fa-list-alt" aria-hidden="true"></i>{" "}
                  <span>Category Movie</span>
                </a>
              </li>
            </ul>
          </section>
        </aside>

        <div className="content-wrapper">
          <section className="content-header">
            <h1>Cinema Brands</h1>
            <ol className="breadcrumb">
              <li>
                <a href="#">
                  <i className="fa fa-dashboard"></i> Home
                </a>
              </li>
              <li>
                <a href="#">Cinema Brands</a>
              </li>
            </ol>
          </section>
          <section className="content">
            <div className="row">
              <div className="box">
                <div className="box-header">
                  <h3 className="box-title">List Genre</h3>
                </div>
                <div className="flex items-center space-x-4 float-left flex-1 mb-2 ml-2">
                  <label for="search" className="text-gray-600">
                    Search
                  </label>
                  <input
                    type="text"
                    id="search"
                    name="search"
                    value={searchTerm}
                    onChange={(e) => setSearchtem(e.target.value)}
                    placeholder="Enter your search term"
                    className="border border-gray-300 px-3 py-1 rounded-md focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div className="box-body">
                  <table
                    id="example1"
                    className="table table-bordered table-striped"
                  >
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Name</th>
                        
                        <th>Location</th>
                        <th>Phone</th>
                        <th>District</th>
                        <th>City</th>
                        <th>Setup</th>
                        <th>Detail</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentGender.map((CinemaItem, index) => (
                        <tr key={CinemaItem.ID}>
                          <td>{index + 1}</td>
                          <td>{CinemaItem.name}</td>
                          
                          <td>{CinemaItem.location}</td>
                          <td>{CinemaItem.phone}</td>
                          <td>{CinemaItem.district}</td>
                          <td>
                            {CinemaItem.city}
                          </td>
                          <td>
                            <button
                              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                              onClick={()=>handleSetupClick(CinemaItem.id)}
                            >
                              Setup
                            </button>
                          </td>
                          <td>
                            <button
                              className="bg-yellow-300 hover:bg-yellow-500 text-white font-bold py-2 px-4 rounded"
                              onClick={()=> handleDetailAuditoriums(CinemaItem.id)}
                            >
                             Details
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <Pagination
                    previousLabel={"previous"}
                    nextLabel={"next"}
                    breakLabel={"..."}
                    pageCount={Math.ceil(filteredGender.length / perPage)}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={handlePageclick}
                    containerClassName={"pagination"}
                    activeClassName={"active"}
                    previousClassName={"page-item"}
                    previousLinkClassName={"page-link"}
                    nextClassName={"page-item"}
                    nextLinkClassName={"page-link"}
                    breakClassName={"page-item"}
                    breakLinkClassName={"page-link"}
                    pageClassName={"page-item"}
                    pageLinkClassName={"page-link"}
                  />
                </div>
              </div>
              {/* Additional boxes go here */}
            </div>
          </section>
        </div>

        {/* {isPopupDetailSeat && (
  <div className="popup-container" 
  style={
    IsClosingPopup
      ? { ...popupContentStyle, ...closingAnimation }
      : popupContentStyle
  }> 
    
    <div className="tabs">
      {cinemaDetails.map((auditorium, index) => (
        <button key={auditorium.id} onClick={() => setActiveTab(index)}>
          {auditorium.name}
        </button>
      ))}
    </div> */}
    {/* {cinemaDetails.auditoriums.length > 0 && (
      <div className="seats-container">
        {cinemaDetails.seats[cinemaDetails.auditoriums[activeTab].id].map((seat) => (
          <div key={seat.id} className={`seat ${seat.isVip ? 'vip-seat' : ''}`}>
            {seat.number}
          </div>
        ))}
      </div>
    )} */}
  {/* </div>
)} */}

{isPopupDetailSeat && (
  <div className="popup-container">
    <div
      className="popup-content1"
      style={IsClosingPopup ? { ...popupContentStyle1, ...closingAnimation } : popupContentStyle1}
    >
      <div className="flex justify-end">
        <button onClick={() => setPopupDetailSeat(false)} className="close-btn">
          X
        </button>
      </div>
      <div className="tabs">
        {cinemaDetails.auditoriums.map((auditorium) => (
          <button
          key={auditorium.AuditoriumId}
          onClick={() => setSelectedAuditorium(auditorium)}
          className={`tab-item ${selectedAuditorium && selectedAuditorium.AuditoriumId === auditorium.AuditoriumId ? 'active' : ''}`}
        >
            Room {auditorium.nameAuditorium}
          </button>
        ))}
      </div>
      <div className="w-full border-[black] border-[1px]"></div>

      {selectedAuditorium && (
        <div className="tab-content1">
          <h3>{selectedAuditorium.nameAuditorium}</h3>
          <p>Total Seats: {selectedAuditorium.normalSeatsCount + selectedAuditorium.vipSeatsCount}</p>
          <p>VIP Seats: {selectedAuditorium.vipSeatsCount}</p>
          <p>Normal Seats: {selectedAuditorium.normalSeatsCount}</p>
        </div>
      )}
      <div className="seats-layout  flex justify-center">
        {selectedAuditorium && generateSeatLayout()}
      </div>
      <div>
      <ul class="showcase1">
      <li>
        <div class="seat-inDetail-icon"></div>
        <small>Standard</small>
      </li>
      <li>
        <div class="seat-inDetail1-icon"></div>
        <small>Vip </small>
      </li>
      
    </ul>
      </div>
    </div>
  </div>
)}



        {isPopupVisible && (
          <div className="popup-container ">
            <div
              className="popup-content"
              style={
                IsClosingPopup
                  ? { ...popupContentStyle, ...closingAnimation }
                  : popupContentStyle
              }
            >
              <div className="flex justify-end">
                <button
                  onClick={handleClosepopup}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded float-right "
                >
                  <i className="fas fa-times"></i>
                </button>
              </div>

              <div className="form-group">
                <label className="float-left">Select Room Quantity</label>
                <input
                  type="number"
                  value={quantityRoom}
                  onChange={handleQuantityRoomChange}
                  className="form-control"
                />
              </div>
              <div className="flex justify-center">
                <button
                  onClick={handleOpenSetupRoom}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded float-right "
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        )}

{setupRoomPopupVisible && (
  <div className="popup-container">
    <div
      className="popup-content1"
      style={
        IsClosingPopup
          ? { ...popupContentStyle1, ...closingAnimation }
          : popupContentStyle1
      }
    >
      <div className="flex justify-end">
        <button
          onClick={() => setSetupRoomPopupVisible(false)}
          className="close-btn"
        >
          X
        </button>
      </div>
    
      <div className="tabs">
        {Array.from({ length: quantityRoom }).map((_, i) => (
          <button
            key={i}
            className={`tab-item ${i === activeTab ? "active" : ""}`}
            onClick={() => handleTabClick(i)}
          >
            Room {i + 1}
          </button>
        ))}
      </div>
      
      <div className="w-full border-[black] border-[1px]"></div>
      <div className="tab-content">
        {renderRoomSetupForm(activeTab)}
        
        <div className="room-seats-layout">
          <div className="screen1"></div>
          {roomSeats[activeTab] && renderSeats(roomSeats[activeTab])}
        </div>
      </div>
     
      {activeTab < quantityRoom - 1 ? (
        <button
          onClick={() => setActiveTab(activeTab + 1)}
          className="next-btn bg-blue-500 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded float-right"
        >
          Next
        </button>
      ) : (
        <button
          onClick={() => handleSave()}
          className="save-btn bg-blue-500 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded float-right"
        >
          Save
        </button>
      )}
    </div>
  </div>
)}



      </div>
    </div>
  );
}
export default DetailCinema;
