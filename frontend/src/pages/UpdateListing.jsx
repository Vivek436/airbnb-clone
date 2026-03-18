import React, { useContext, useEffect, useState } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate, useParams } from "react-router-dom";
import { authDataContext } from "../Context/AuthContext";
import { userDataContext } from "../Context/UserContext";
import axios from "axios";
import { showSuccess, showError } from "../utils/showToast";

const UpdateListing = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { serverUrl } = useContext(authDataContext);
  const { userData } = useContext(userDataContext);

  const [title, setTitle] = useState("");
  const [discription, setDiscription] = useState("");
  const [rent, setRent] = useState("");
  const [city, setCity] = useState("");
  const [landmark, setLandmark] = useState("");
  const [category, setCategory] = useState("");
  const [frontEndImage1, setFrontEndImage1] = useState(null);
  const [frontEndImage2, setFrontEndImage2] = useState(null);
  const [frontEndImage3, setFrontEndImage3] = useState(null);
  const [backEndImage1, setBackEndImage1] = useState(null);
  const [backEndImage2, setBackEndImage2] = useState(null);
  const [backEndImage3, setBackEndImage3] = useState(null);
  const [existingImages, setExistingImages] = useState({});
  const [updating, setUpdating] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchListing = async () => {
      try {
        const result = await axios.get(`${serverUrl}/api/listing/get`, {
          withCredentials: true,
        });
        const listing = result.data.find((item) => item._id === id);
        
        if (listing) {
          setTitle(listing.title);
          setDiscription(listing.discription);
          setRent(listing.rent);
          setCity(listing.city);
          setLandmark(listing.landMark);
          setCategory(listing.category);
          setExistingImages({
            image1: listing.image1,
            image2: listing.image2,
            image3: listing.image3,
          });
          setFrontEndImage1(listing.image1);
          setFrontEndImage2(listing.image2);
          setFrontEndImage3(listing.image3);
        }
      } catch (error) {
        console.log(error);
        showError("Failed to load listing");
      } finally {
        setLoading(false);
      }
    };

    fetchListing();
  }, [id, serverUrl]);

  const handleImageChange = (e, imageNumber) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (imageNumber === 1) {
          setFrontEndImage1(reader.result);
          setBackEndImage1(file);
        } else if (imageNumber === 2) {
          setFrontEndImage2(reader.result);
          setBackEndImage2(file);
        } else if (imageNumber === 3) {
          setFrontEndImage3(reader.result);
          setBackEndImage3(file);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpdateListing = async () => {
    setUpdating(true);
    try {
      let formData = new FormData();
      formData.append("title", title);
      formData.append("discription", discription);
      formData.append("rent", rent);
      formData.append("city", city);
      formData.append("landmark", landmark);
      formData.append("category", category);

      if (backEndImage1) formData.append("image1", backEndImage1);
      if (backEndImage2) formData.append("image2", backEndImage2);
      if (backEndImage3) formData.append("image3", backEndImage3);

      let result = await axios.put(
        `${serverUrl}/api/listing/update/${id}`,
        formData,
        { withCredentials: true }
      );

      showSuccess("Listing updated successfully!");
      navigate(`/viewcard/${id}`);
    } catch (error) {
      console.log(error);
      showError(error.response?.data?.message || "Failed to update listing");
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="w-[100%] h-[100vh] flex items-center justify-center">
        <p className="text-[20px] text-gray-500">Loading...</p>
      </div>
    );
  }

  return (
    <div className="w-[100%] min-h-[100vh] flex items-center justify-center gap-[10px] flex-col overflow-auto relative py-[50px]">
      <div
        className="w-[50px] h-[50px] bg-[red] cursor-pointer absolute top-[5%] left-[20px] rounded-[50%] flex items-center justify-center"
        onClick={() => navigate(`/viewcard/${id}`)}
      >
        <FaArrowLeftLong className="w-[25px] h-[25px] text-[white]" />
      </div>

      <h1 className="text-[30px] font-semibold text-[black] mb-[20px]">
        Update Listing
      </h1>

      <div className="w-[90%] md:w-[80%] max-w-[900px] flex flex-col gap-[20px]">
        {/* Title */}
        <div className="flex flex-col gap-[10px]">
          <label className="text-[18px]">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-[100%] px-[20px] py-[10px] border-[2px] border-[#555656] rounded-lg"
          />
        </div>

        {/* Description */}
        <div className="flex flex-col gap-[10px]">
          <label className="text-[18px]">Description</label>
          <textarea
            value={discription}
            onChange={(e) => setDiscription(e.target.value)}
            className="w-[100%] px-[20px] py-[10px] border-[2px] border-[#555656] rounded-lg min-h-[100px]"
          />
        </div>

        {/* Rent */}
        <div className="flex flex-col gap-[10px]">
          <label className="text-[18px]">Rent (per day)</label>
          <input
            type="number"
            value={rent}
            onChange={(e) => setRent(e.target.value)}
            className="w-[100%] px-[20px] py-[10px] border-[2px] border-[#555656] rounded-lg"
          />
        </div>

        {/* City */}
        <div className="flex flex-col gap-[10px]">
          <label className="text-[18px]">City</label>
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="w-[100%] px-[20px] py-[10px] border-[2px] border-[#555656] rounded-lg"
          />
        </div>

        {/* Landmark */}
        <div className="flex flex-col gap-[10px]">
          <label className="text-[18px]">Landmark</label>
          <input
            type="text"
            value={landmark}
            onChange={(e) => setLandmark(e.target.value)}
            className="w-[100%] px-[20px] py-[10px] border-[2px] border-[#555656] rounded-lg"
          />
        </div>

        {/* Category */}
        <div className="flex flex-col gap-[10px]">
          <label className="text-[18px]">Category</label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-[100%] px-[20px] py-[10px] border-[2px] border-[#555656] rounded-lg"
            disabled
          />
        </div>

        {/* Images */}
        <div className="flex flex-col gap-[10px]">
          <label className="text-[18px]">Images (Click to change)</label>
          <div className="flex gap-[10px] flex-wrap">
            <div className="flex flex-col gap-[5px]">
              <img
                src={frontEndImage1}
                alt="Image 1"
                className="w-[150px] h-[150px] object-cover rounded-lg cursor-pointer border-[2px] border-[#555656]"
                onClick={() => document.getElementById("image1").click()}
              />
              <input
                type="file"
                id="image1"
                accept="image/*"
                onChange={(e) => handleImageChange(e, 1)}
                className="hidden"
              />
            </div>
            <div className="flex flex-col gap-[5px]">
              <img
                src={frontEndImage2}
                alt="Image 2"
                className="w-[150px] h-[150px] object-cover rounded-lg cursor-pointer border-[2px] border-[#555656]"
                onClick={() => document.getElementById("image2").click()}
              />
              <input
                type="file"
                id="image2"
                accept="image/*"
                onChange={(e) => handleImageChange(e, 2)}
                className="hidden"
              />
            </div>
            <div className="flex flex-col gap-[5px]">
              <img
                src={frontEndImage3}
                alt="Image 3"
                className="w-[150px] h-[150px] object-cover rounded-lg cursor-pointer border-[2px] border-[#555656]"
                onClick={() => document.getElementById("image3").click()}
              />
              <input
                type="file"
                id="image3"
                accept="image/*"
                onChange={(e) => handleImageChange(e, 3)}
                className="hidden"
              />
            </div>
          </div>
        </div>

        {/* Update Button */}
        <button
          className="px-[50px] py-[10px] text-[white] bg-[red] text-[18px] rounded-lg cursor-pointer hover:bg-[#d63030] transition-colors disabled:bg-gray-400"
          onClick={handleUpdateListing}
          disabled={updating}
        >
          {updating ? "Updating..." : "Update Listing"}
        </button>
      </div>
    </div>
  );
};

export default UpdateListing;
