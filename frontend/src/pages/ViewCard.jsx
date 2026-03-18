import React, { useContext, useEffect, useState } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { FaShareAlt } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { useNavigate, useParams } from "react-router-dom";
import { userDataContext } from "../Context/UserContext";
import { ListingDataContext } from "../Context/ListingContext";
import axios from "axios";
import { authDataContext } from "../Context/AuthContext";
import { showSuccess, showError } from "../utils/showToast";

const ViewCard = () => {
  let navigate = useNavigate();
  const { id } = useParams();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const { userData } = useContext(userDataContext);
  const { serverUrl } = useContext(authDataContext);
  const { updateListingInContext } = useContext(ListingDataContext);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [booking, setBooking] = useState(false);
  const [cancelling, setCancelling] = useState(false);

  // Update form states
  const [title, setTitle] = useState("");
  const [discription, setDiscription] = useState("");
  const [rent, setRent] = useState("");
  const [city, setCity] = useState("");
  const [landmark, setLandmark] = useState("");
  const [frontEndImage1, setFrontEndImage1] = useState(null);
  const [frontEndImage2, setFrontEndImage2] = useState(null);
  const [frontEndImage3, setFrontEndImage3] = useState(null);
  const [backEndImage1, setBackEndImage1] = useState(null);
  const [backEndImage2, setBackEndImage2] = useState(null);
  const [backEndImage3, setBackEndImage3] = useState(null);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    const fetchListing = async () => {
      try {
        setLoading(true);
        const result = await axios.get(`${serverUrl}/api/listing/get`, {
          withCredentials: true,
        });
        const foundListing = result.data.find((item) => item._id === id);
        setListing(foundListing);
        
        // Pre-fill form data
        if (foundListing) {
          setTitle(foundListing.title);
          setDiscription(foundListing.discription);
          setRent(foundListing.rent);
          setCity(foundListing.city);
          setLandmark(foundListing.landMark);
          setFrontEndImage1(foundListing.image1);
          setFrontEndImage2(foundListing.image2);
          setFrontEndImage3(foundListing.image3);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchListing();
  }, [id, serverUrl]);

  const handleImage1 = (e) => {
    let file = e.target.files[0];
    setBackEndImage1(file);
    setFrontEndImage1(URL.createObjectURL(file));
  };

  const handleImage2 = (e) => {
    let file = e.target.files[0];
    setBackEndImage2(file);
    setFrontEndImage2(URL.createObjectURL(file));
  };

  const handleImage3 = (e) => {
    let file = e.target.files[0];
    setBackEndImage3(file);
    setFrontEndImage3(URL.createObjectURL(file));
  };

  const handleUpdateListing = async (e) => {
    e.preventDefault();
    setUpdating(true);
    try {
      let formData = new FormData();
      formData.append("title", title);
      formData.append("discription", discription);
      formData.append("rent", rent);
      formData.append("city", city);
      formData.append("landmark", landmark);
      formData.append("category", listing.category);

      if (backEndImage1) formData.append("image1", backEndImage1);
      if (backEndImage2) formData.append("image2", backEndImage2);
      if (backEndImage3) formData.append("image3", backEndImage3);

      let result = await axios.put(
        `${serverUrl}/api/listing/update/${id}`,
        formData,
        { withCredentials: true }
      );

      // Update the listing state immediately
      setListing(result.data);
      
      // Update in context so Home page also reflects the change
      updateListingInContext(result.data);
      
      showSuccess("Listing updated successfully!");
      setShowUpdateModal(false);
      
      // Reset backend images
      setBackEndImage1(null);
      setBackEndImage2(null);
      setBackEndImage3(null);
    } catch (error) {
      console.log(error);
      showError(error.response?.data?.message || "Failed to update listing");
    } finally {
      setUpdating(false);
    }
  };

  const handleBooking = async (e) => {
    e.preventDefault();
    setBooking(true);
    try {
      const result = await axios.post(
        `${serverUrl}/api/booking/create`,
        {
          listingId: id,
          checkIn,
          checkOut
        },
        { withCredentials: true }
      );

      showSuccess("Booking confirmed successfully!");
      setShowBookingModal(false);
      setCheckIn("");
      setCheckOut("");
      
      // Update listing to show it's booked
      const updatedListing = { ...listing, isBooked: true };
      setListing(updatedListing);
      updateListingInContext(updatedListing);
      
      // Navigate to confirmation page with booking data
      navigate('/booking-confirmation', { state: { bookingData: result.data } });
    } catch (error) {
      console.log(error);
      showError(error.response?.data?.message || "Failed to create booking");
    } finally {
      setBooking(false);
    }
  };

  const handleCancelBooking = async () => {
    setCancelling(true);
    try {
      // First get the booking for this listing
      const bookingsResult = await axios.get(`${serverUrl}/api/booking/host-bookings`, { withCredentials: true });
      const listingBooking = bookingsResult.data.find(b => b.listing._id === id && b.status === 'confirmed');
      
      if (!listingBooking) {
        showError("No active booking found");
        return;
      }

      await axios.put(`${serverUrl}/api/booking/cancel/${listingBooking._id}`, {}, { withCredentials: true });
      
      // Update listing to show it's not booked
      const updatedListing = { ...listing, isBooked: false };
      setListing(updatedListing);
      updateListingInContext(updatedListing);
      
      showSuccess("Booking cancelled successfully!");
      setShowCancelModal(false);
    } catch (error) {
      console.log(error);
      showError(error.response?.data?.message || "Failed to cancel booking");
    } finally {
      setCancelling(false);
    }
  };

  const handleShare = async (platform) => {
    const url = window.location.href;
    const text = `Check out this amazing ${listing.category} in ${listing.city}! ₹${listing.rent}/day`;
    
    switch(platform) {
      case 'copy':
        try {
          await navigator.clipboard.writeText(url);
          showSuccess("Link copied to clipboard!");
          setShowShareModal(false);
        } catch (error) {
          showError("Failed to copy link");
        }
        break;
      case 'whatsapp':
        window.open(`https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`, '_blank');
        break;
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank');
        break;
      default:
        break;
    }
  };

  if (loading) {
    return (
      <div className="w-[100%] h-[100vh] flex items-center justify-center">
        <p className="text-[20px] text-gray-500">Loading...</p>
      </div>
    );
  }

  if (!listing) {
    return (
      <div className="w-[100%] h-[100vh] flex items-center justify-center">
        <p className="text-[20px] text-gray-500">Listing not found</p>
      </div>
    );
  }

  const isOwner = userData?._id === listing.host;

  return (
    <div className="w-[100%] h-[100vh] flex items-center justify-center gap-[10px] flex-col overflow-auto relative">
      <div
        className="w-[50px] h-[50px] bg-[red] cursor-pointer absolute top-[5%] left-[20px] rounded-[50%] flex items-center justify-center z-10"
        onClick={() => navigate("/")}
      >
        <FaArrowLeftLong className="w-[25px] h-[25px] text-[white]" />
      </div>
      
      {/* Share Button */}
      <div
        className="w-[50px] h-[50px] bg-[#FF385C] cursor-pointer absolute top-[5%] right-[20px] rounded-[50%] flex items-center justify-center z-10 hover:bg-[#E31C5F] transition-colors"
        onClick={() => setShowShareModal(true)}
      >
        <FaShareAlt className="w-[22px] h-[22px] text-[white]" />
      </div>
      
      <div className="w-[90%] flex items-start justify-start text-[25px] md:w-[80%] mb-[10px]">
        <h1 className="text-[20px] text-[#272727] md:text-[30px] text-ellipsis text-nowrap overflow-hidden px-[70px] md:px-[0]">
          {`In ${listing.landMark?.toUpperCase()}, ${listing.city?.toUpperCase()}`}
        </h1>
      </div>

      <div className="w-[95%] h-[400px] flex items-center justify-center flex-col md:w-[80%] md:flex-row">
        <div className="w-[100%] h-[65%] md:w-[70%] md:h-[100%] overflow-hidden flex items-center justify-center border-[2px] border-[white]">
          <img src={listing.image1} alt="" className="w-[100%]" />
        </div>
        <div className="w-[100%] h-[30%] flex items-center justify-center md:w-[30%] md:h-[100%] md:flex-col bg-[black]">
          <div className="w-[100%] h-[100%] overflow-hidden flex items-center justify-center border-[2px] border-[white]">
            <img src={listing.image2} alt="" className="w-[100%]" />
          </div>
          <div className="w-[100%] h-[100%] overflow-hidden flex items-center justify-center border-[2px] border-[white]">
            <img src={listing.image3} alt="" className="w-[100%]" />
          </div>
        </div>
      </div>

      <div className="w-[95%] flex items-start justify-start text-[18px] md:w-[80%] md:text-[25px]">
        {`${listing.title?.toUpperCase()} ${listing.category?.toUpperCase()}, ${listing.landMark?.toUpperCase()}`}
      </div>
      
      <div className="w-[95%] flex items-start justify-start text-[18px] md:w-[80%] md:text-[25px] text-gray-800">
        {`${listing.discription?.toUpperCase()}`}
      </div>
      
      <div className="w-[95%] flex items-start justify-start text-[18px] md:w-[80%] md:text-[25px]">
        {`₹${listing.rent}/day`}
      </div>

      <div className="w-[95%] h-[50px] flex items-center justify-start px-[110px] gap-[20px] flex-wrap">
        {isOwner ? (
          <>
            {listing.isBooked && (
              <div className='flex items-center gap-[8px] bg-green-100 px-[20px] py-[10px] rounded-lg'>
                <span className='text-green-600 text-[20px]'>✓</span>
                <span className='text-[16px] font-semibold text-green-600'>Booked</span>
              </div>
            )}
            <button
              className="px-[50px] py-[10px] text-[white] bg-[red] text-[18px] md:px-[100px] rounded-lg cursor-pointer hover:bg-[#d63030] transition-colors"
              onClick={() => setShowUpdateModal(true)}
            >
              Update Listing
            </button>
            {listing.isBooked && (
              <button
                className="px-[50px] py-[10px] text-[white] bg-[#ff6b6b] text-[18px] md:px-[100px] rounded-lg cursor-pointer hover:bg-[#ff5252] transition-colors"
                onClick={() => setShowCancelModal(true)}
              >
                Cancel Booking
              </button>
            )}
            <button
              className="px-[50px] py-[10px] text-[white] bg-[#555] text-[18px] md:px-[100px] rounded-lg cursor-pointer hover:bg-[#333] transition-colors"
              onClick={async () => {
                if (window.confirm("Are you sure you want to delete this listing?")) {
                  try {
                    await axios.delete(`${serverUrl}/api/listing/delete/${id}`, {
                      withCredentials: true,
                    });
                    showSuccess("Listing deleted successfully!");
                    navigate("/mylisting");
                  } catch (error) {
                    console.log(error);
                    showError("Failed to delete listing");
                  }
                }
              }}
            >
              Delete
            </button>
          </>
        ) : (
          <button
            className="px-[50px] py-[10px] text-[white] bg-[red] text-[18px] md:px-[100px] rounded-lg cursor-pointer hover:bg-[#d63030] transition-colors disabled:bg-gray-400"
            onClick={() => {
              if (!userData) {
                showError("Please login to book");
                navigate("/login");
                return;
              }
              setShowBookingModal(true);
            }}
            disabled={listing.isBooked}
          >
            {listing.isBooked ? "Already Booked" : "Book Now"}
          </button>
        )}
      </div>

      {/* Update Modal */}
      {showUpdateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="w-[100%] h-[100vh] bg-white flex items-center justify-center relative overflow-auto">
            <form
              className="max-w-[900px] w-[90%] h-[550px] flex items-center justify-start flex-col md:items-start gap-[10px] overflow-auto mt-[50px]"
              onSubmit={handleUpdateListing}
            >
              <div
                className="w-[50px] h-[50px] bg-[red] cursor-pointer absolute top-[5%] left-[20px] rounded-[50%] flex items-center justify-center"
                onClick={() => setShowUpdateModal(false)}
              >
                <IoMdClose className="w-[30px] h-[30px] text-[white]" />
              </div>
              <div className="w-[200px] h-[50px] text-[20px] bg-[#f14242] text-white flex items-center justify-center rounded-[30px] absolute top-[5%] right-[10px] shadow-lg">
                Update your details
              </div>

              <div className="w-[90%] flex items-start justify-start flex-col gap-[10px]">
                <label htmlFor="title" className="text-[20px]">
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  className="w-[90%] h-[40px] border-[2px] border-[#555656] rounded-lg p-[20px]"
                  required
                  onChange={(e) => setTitle(e.target.value)}
                  value={title}
                />
              </div>

              <div className="w-[90%] flex items-start justify-start flex-col gap-[10px]">
                <label htmlFor="des" className="text-[20px]">
                  Description
                </label>
                <textarea
                  id="des"
                  className="w-[90%] h-[80px] border-[2px] border-[#555656] rounded-lg p-[20px]"
                  required
                  onChange={(e) => setDiscription(e.target.value)}
                  value={discription}
                ></textarea>
              </div>

              <div className="w-[90%] flex items-start justify-start flex-col gap-[10px]">
                <label htmlFor="img1" className="text-[20px]">
                  Image1
                </label>
                <div className="flex items-center justify-start w-[90%] h-[40px] border-[#555656] border-2 rounded-[10px]">
                  <input
                    type="file"
                    id="img1"
                    className="w-[100%] text-[15px] px-[10px]"
                    onChange={handleImage1}
                  />
                </div>
              </div>

              <div className="w-[90%] flex items-start justify-start flex-col gap-[10px]">
                <label htmlFor="img2" className="text-[20px]">
                  Image2
                </label>
                <div className="flex items-center justify-start w-[90%] h-[40px] border-[#555656] border-2 rounded-[10px]">
                  <input
                    type="file"
                    id="img2"
                    className="w-[100%] text-[15px] px-[10px]"
                    onChange={handleImage2}
                  />
                </div>
              </div>

              <div className="w-[90%] flex items-start justify-start flex-col gap-[10px]">
                <label htmlFor="img3" className="text-[20px]">
                  Image3
                </label>
                <div className="flex items-center justify-start w-[90%] h-[40px] border-[#555656] border-2 rounded-[10px]">
                  <input
                    type="file"
                    id="img3"
                    className="w-[100%] text-[15px] px-[10px]"
                    onChange={handleImage3}
                  />
                </div>
              </div>

              <div className="w-[90%] flex items-start justify-start flex-col gap-[10px]">
                <label htmlFor="rent" className="text-[20px]">
                  Rent
                </label>
                <input
                  type="number"
                  id="rent"
                  className="w-[90%] h-[40px] border-[2px] border-[#555656] rounded-lg p-[20px]"
                  required
                  onChange={(e) => setRent(e.target.value)}
                  value={rent}
                />
              </div>

              <div className="w-[90%] flex items-start justify-start flex-col gap-[10px]">
                <label htmlFor="city" className="text-[20px]">
                  City
                </label>
                <input
                  type="text"
                  id="city"
                  className="w-[90%] h-[40px] border-[2px] border-[#555656] rounded-lg p-[20px]"
                  required
                  onChange={(e) => setCity(e.target.value)}
                  value={city}
                />
              </div>

              <div className="w-[90%] flex items-start justify-start flex-col gap-[10px]">
                <label htmlFor="landmark" className="text-[20px]">
                  Landmark
                </label>
                <input
                  type="text"
                  id="landmark"
                  className="w-[90%] h-[40px] border-[2px] border-[#555656] rounded-lg p-[20px]"
                  required
                  onChange={(e) => setLandmark(e.target.value)}
                  value={landmark}
                />
              </div>

              <button
                className="px-[50px] py-[10px] text-[white] bg-[red] text-[18px] md:px-[100px] rounded-lg cursor-pointer disabled:bg-gray-400"
                disabled={updating}
              >
                {updating ? "Updating..." : "Update Listing"}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Cancel Booking Modal */}
      {showCancelModal && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-[20px]"
          onClick={() => setShowCancelModal(false)}
        >
          <div 
            className="w-[100%] max-w-[450px] h-[300px] rounded-lg overflow-hidden shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Background Image */}
            <img 
              src={listing.image1} 
              alt="listing" 
              className="absolute inset-0 w-full h-full object-cover"
            />
            
            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black bg-opacity-50"></div>
            
            {/* Content */}
            <div className="relative z-10 h-full flex flex-col items-center justify-center gap-[25px] px-[40px]">
              <h2 className="text-[32px] font-bold text-white">Booking Cancel!</h2>
              <p className="text-[18px] text-white text-center">Are you sure?</p>
              
              <div className="flex gap-[15px] w-[100%] max-w-[300px]">
                <button
                  className="flex-1 py-[12px] px-[30px] text-[white] bg-[#FF385C] text-[16px] font-semibold rounded-lg cursor-pointer hover:bg-[#E31C5F] transition-colors disabled:bg-gray-400"
                  onClick={handleCancelBooking}
                  disabled={cancelling}
                >
                  {cancelling ? "Cancelling..." : "Yes"}
                </button>
                <button
                  className="flex-1 py-[12px] px-[30px] text-white bg-[#3d4a5c] text-[16px] font-semibold rounded-lg cursor-pointer hover:bg-[#2d3a4c] transition-colors"
                  onClick={() => setShowCancelModal(false)}
                  disabled={cancelling}
                >
                  No
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Share Modal */}
      {showShareModal && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-[20px]"
          onClick={() => setShowShareModal(false)}
        >
          <div 
            className="w-[100%] max-w-[400px] bg-white rounded-lg p-[30px] flex flex-col gap-[20px]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center">
              <h2 className="text-[24px] font-semibold text-gray-800">Share this listing</h2>
              <IoMdClose 
                className="w-[28px] h-[28px] text-gray-600 cursor-pointer hover:text-gray-800"
                onClick={() => setShowShareModal(false)}
              />
            </div>
            
            <div className="flex flex-col gap-[12px]">
              {/* Copy Link */}
              <button
                className="w-[100%] py-[12px] px-[20px] bg-gray-100 hover:bg-gray-200 rounded-lg flex items-center gap-[15px] transition-colors"
                onClick={() => handleShare('copy')}
              >
                <div className="w-[40px] h-[40px] bg-white rounded-full flex items-center justify-center">
                  <span className="text-[20px]">🔗</span>
                </div>
                <span className="text-[16px] font-medium text-gray-800">Copy Link</span>
              </button>
              
              {/* WhatsApp */}
              <button
                className="w-[100%] py-[12px] px-[20px] bg-green-50 hover:bg-green-100 rounded-lg flex items-center gap-[15px] transition-colors"
                onClick={() => handleShare('whatsapp')}
              >
                <div className="w-[40px] h-[40px] bg-white rounded-full flex items-center justify-center">
                  <span className="text-[20px]">💬</span>
                </div>
                <span className="text-[16px] font-medium text-gray-800">WhatsApp</span>
              </button>
              
              {/* Facebook */}
              <button
                className="w-[100%] py-[12px] px-[20px] bg-blue-50 hover:bg-blue-100 rounded-lg flex items-center gap-[15px] transition-colors"
                onClick={() => handleShare('facebook')}
              >
                <div className="w-[40px] h-[40px] bg-white rounded-full flex items-center justify-center">
                  <span className="text-[20px]">📘</span>
                </div>
                <span className="text-[16px] font-medium text-gray-800">Facebook</span>
              </button>
              
              {/* Twitter */}
              <button
                className="w-[100%] py-[12px] px-[20px] bg-sky-50 hover:bg-sky-100 rounded-lg flex items-center gap-[15px] transition-colors"
                onClick={() => handleShare('twitter')}
              >
                <div className="w-[40px] h-[40px] bg-white rounded-full flex items-center justify-center">
                  <span className="text-[20px]">🐦</span>
                </div>
                <span className="text-[16px] font-medium text-gray-800">Twitter</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Booking Modal */}
      {showBookingModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-[20px]">
          <div className="w-[100%] max-w-[900px] bg-white rounded-lg overflow-hidden relative flex flex-col md:flex-row">
            {/* Close Button */}
            <div
              className="w-[40px] h-[40px] bg-[red] cursor-pointer absolute top-[10px] left-[10px] rounded-[50%] flex items-center justify-center z-10"
              onClick={() => setShowBookingModal(false)}
            >
              <IoMdClose className="w-[25px] h-[25px] text-[white]" />
            </div>

            {/* Left Side - Booking Form */}
            <div className="w-[100%] md:w-[50%] p-[40px] bg-gray-50">
              <h2 className="text-[28px] font-semibold mb-[30px] text-center">Confirm & Book</h2>
              
              <form onSubmit={handleBooking} className="flex flex-col gap-[25px]">
                <div>
                  <p className="text-[18px] font-semibold mb-[15px]">Your Trip -</p>
                  
                  <div className="flex flex-col gap-[15px]">
                    <div className="flex flex-col gap-[8px]">
                      <label className="text-[16px] font-medium">CheckIn</label>
                      <input
                        type="date"
                        required
                        value={checkIn}
                        onChange={(e) => setCheckIn(e.target.value)}
                        min={new Date().toISOString().split('T')[0]}
                        className="w-[100%] px-[15px] py-[12px] border-[2px] border-gray-300 rounded-lg focus:border-[#FF385C] outline-none"
                      />
                    </div>

                    <div className="flex flex-col gap-[8px]">
                      <label className="text-[16px] font-medium">CheckOut</label>
                      <input
                        type="date"
                        required
                        value={checkOut}
                        onChange={(e) => setCheckOut(e.target.value)}
                        min={checkIn || new Date().toISOString().split('T')[0]}
                        className="w-[100%] px-[15px] py-[12px] border-[2px] border-gray-300 rounded-lg focus:border-[#FF385C] outline-none"
                      />
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-[100%] py-[14px] text-[white] bg-[#FF385C] text-[18px] font-semibold rounded-lg cursor-pointer hover:bg-[#E31C5F] transition-colors disabled:bg-gray-400"
                  disabled={booking}
                >
                  {booking ? "Booking..." : "Book Now"}
                </button>
              </form>
            </div>

            {/* Right Side - Property Details & Price */}
            <div className="w-[100%] md:w-[50%] p-[40px] bg-white">
              {/* Property Card */}
              <div className="border-[2px] border-gray-300 rounded-lg p-[15px] mb-[25px] flex gap-[15px]">
                <img 
                  src={listing.image1} 
                  alt={listing.title}
                  className="w-[100px] h-[80px] object-cover rounded-lg"
                />
                <div className="flex-1">
                  <h3 className="text-[16px] font-semibold uppercase">{listing.title}</h3>
                  <p className="text-[14px] text-gray-600">IN {listing.landMark}, {listing.city}</p>
                  <p className="text-[14px] text-gray-600">{listing.category.toUpperCase()}</p>
                  <div className="flex items-center gap-[5px] mt-[5px]">
                    <span className="text-[14px]">★</span>
                    <span className="text-[14px] font-semibold">4</span>
                  </div>
                </div>
              </div>

              {/* Booking Price */}
              <div className="border-[2px] border-gray-300 rounded-lg p-[20px]">
                <h3 className="text-[20px] font-semibold mb-[15px]">Booking Price -</h3>
                
                {checkIn && checkOut ? (
                  <div className="flex flex-col gap-[12px]">
                    <div className="flex justify-between items-center">
                      <span className="text-[16px]">₹{listing.rent} X {Math.ceil((new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24))} nights</span>
                      <span className="text-[16px] font-semibold">
                        {Math.ceil((new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24)) * listing.rent}
                      </span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-[16px]">Tax</span>
                      <span className="text-[16px]">
                        {(Math.ceil((new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24)) * listing.rent * 0.07).toFixed(2)}
                      </span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-[16px]">Airbnb Charge</span>
                      <span className="text-[16px]">
                        {(Math.ceil((new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24)) * listing.rent * 0.07).toFixed(2)}
                      </span>
                    </div>
                    
                    <div className="w-[100%] h-[1px] bg-gray-300 my-[5px]"></div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-[18px] font-semibold">Total Price</span>
                      <span className="text-[18px] font-semibold">
                        {(Math.ceil((new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24)) * listing.rent * 1.14).toFixed(2)}
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col gap-[12px]">
                    <div className="flex justify-between items-center">
                      <span className="text-[16px]">₹{listing.rent} X 0 nights</span>
                      <span className="text-[16px] font-semibold">0</span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-[16px]">Tax</span>
                      <span className="text-[16px]">0</span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-[16px]">Airbnb Charge</span>
                      <span className="text-[16px]">0</span>
                    </div>
                    
                    <div className="w-[100%] h-[1px] bg-gray-300 my-[5px]"></div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-[18px] font-semibold">Total Price</span>
                      <span className="text-[18px] font-semibold">0</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewCard;
