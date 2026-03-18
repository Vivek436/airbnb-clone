import axios from 'axios'
import React, { useContext, useEffect } from 'react'
import { createContext } from 'react'
import {authDataContext} from './AuthContext'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export const ListingDataContext = createContext()

const ListingContext = ({children}) => {
  let navigate = useNavigate()
    const [title, setTitle] = useState("")
    const [discription, setDiscription] = useState("")
    const [frontEndImage1, setFrontEndImage1] = useState(null)
    const [frontEndImage2, setFrontEndImage2] = useState(null)
    const [frontEndImage3, setFrontEndImage3] = useState(null)
    const [backEndImage1, setBackEndImage1] = useState(null)
    const [backEndImage2, setBackEndImage2] = useState(null)
    const [backEndImage3, setBackEndImage3] = useState(null)
    const [rent, setRent] = useState("")
    const [city, setCity] = useState("")
    const [landmark, setLandmark] = useState("")
    const [category, setCategory] = useState("")
    const [adding, setAdding] = useState(false)
    const [listingData, setListingData] = useState([])
    const [allListings, setAllListings] = useState([])
    const [selectedCategory, setSelectedCategory] = useState("")
    const [searchQuery, setSearchQuery] = useState("")
    const [priceRange, setPriceRange] = useState({ min: 0, max: 100000 })
    const [isLoading, setIsLoading] = useState(true)
    const {serverUrl} = useContext(authDataContext)

    

    const handleAddListing = async () => {
      setAdding(true)
        try {
            let formData = new FormData()
    formData.append("title",title)
    formData.append("image1",backEndImage1)
    formData.append("image2",backEndImage2)
    formData.append("image3",backEndImage3)
    formData.append("discription",discription)
    formData.append("rent",rent)
    formData.append("city",city)
    formData.append("landmark",landmark)
    formData.append("category",category) 

    let result = await axios.post(serverUrl + "/api/listing/add" , formData,{withCredentials:true})
    setAdding(false)
    console.log(result)
    navigate("/")
    setTitle("")
    setDiscription(null)
    setFrontEndImage1(null)
    setFrontEndImage2(null)
    setFrontEndImage3(null)
    setBackEndImage1(null)
    setBackEndImage2(null)
    setBackEndImage3(null)
    setRent("")
    setCity("")    
    setLandmark("")
    setCategory("")
            
        } catch (error) {
          setAdding(false)
           console.log(error) 
        }
    }

    const getListing = async ()=>{
      try {
        setIsLoading(true)
        let result = await axios.get( serverUrl + "/api/listing/get", {withCredentials:true})
        setAllListings(result.data)
        setListingData(result.data)
      } catch (error) {
        console.log(error)
      } finally {
        setIsLoading(false)
      }
    }
    
    const filterByCategory = (category) => {
      setSelectedCategory(category === selectedCategory ? "" : category)
      applyFilters(searchQuery, category === selectedCategory ? "" : category, priceRange)
    }
    
    const searchListings = (query) => {
      setSearchQuery(query)
      applyFilters(query, selectedCategory, priceRange)
    }
    
    const filterByPrice = (min, max) => {
      setPriceRange({ min, max })
      applyFilters(searchQuery, selectedCategory, { min, max })
    }
    
    const applyFilters = (query, category, price) => {
      let filtered = [...allListings]
      
      // Apply search filter
      if (query && query.trim() !== "") {
        const searchLower = query.toLowerCase()
        filtered = filtered.filter((list) => {
          return (
            list.city?.toLowerCase().includes(searchLower) ||
            list.landMark?.toLowerCase().includes(searchLower) ||
            list.title?.toLowerCase().includes(searchLower)
          )
        })
      }
      
      // Apply category filter
      if (category && category !== "") {
        filtered = filtered.filter((list) => list.category === category)
      }
      
      // Apply price filter
      if (price && (price.min > 0 || price.max < 100000)) {
        filtered = filtered.filter((list) => 
          list.rent >= price.min && list.rent <= price.max
        )
      }
      
      setListingData(filtered)
    }
    
    const updateListingInContext = (updatedListing) => {
      // Update in allListings
      const updatedAll = allListings.map(listing => 
        listing._id === updatedListing._id ? updatedListing : listing
      )
      setAllListings(updatedAll)
      
      // Update in listingData (filtered or all)
      const updatedFiltered = listingData.map(listing => 
        listing._id === updatedListing._id ? updatedListing : listing
      )
      setListingData(updatedFiltered)
    }

useEffect(()=>{
getListing()
},[adding])

    let value={

      title,setTitle,
      discription,setDiscription,
      frontEndImage1,setFrontEndImage1,
      frontEndImage2,setFrontEndImage2,
      frontEndImage3,setFrontEndImage3,
      backEndImage1,setBackEndImage1,
      backEndImage2,setBackEndImage2,
      backEndImage3,setBackEndImage3,
      rent,setRent,
      city,setCity,
      landmark,setLandmark,
      category,setCategory,
      handleAddListing,
      adding,setAdding,
      listingData, setListingData,
      getListing,
      filterByCategory,
      selectedCategory,
      allListings,
      updateListingInContext,
      searchListings,
      searchQuery,
      setSearchQuery,
      filterByPrice,
      priceRange,
      isLoading
    }
  return (
    <div>
      <ListingDataContext.Provider value={value}>
        {children}
      </ListingDataContext.Provider>
    </div>
  )
}

export default ListingContext
