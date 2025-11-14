import axios from 'axios'
import React, { useContext } from 'react'
import { Children } from 'react'
import { createContext } from 'react'
import {authDataContext} from './AuthContext'
import { useState } from 'react'

export const ListingDataContext = createContext()

const ListingContext = ({children}) => {
    const [title, setTittle] = useState("")
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
    const {serverUrl} = useContext(authDataContext)

    

    const handleAddListing = async () => {
        try {
            let formData = new FormData()
    formData.append("title",title)
    formData.append("image1",image1)
    formData.append("image2",image2)
    formData.append("image3",image3)
    formData.append("discription",discription)
    formData.append("rent",rent)
    formData.append("city",city)
    formData.append("landmark",landmark)
    formData.append("category",category) 

    let result = await axios.post(serverUrl + "/api/listing/add" , formData,{withCredentials:true})
    console.log(result)
            
        } catch (error) {
           console.log(error) 
        }
    }

    let value={

      title,setTittle,
      discription,setDiscription,
      frontEndImage1,setFrontEndImage1,
      frontEndImage2,setFrontEndImage2,
      frontEndImage3,setFrontEndImage3,
      backEndImage1,setBackEndImage1,
      backEndImage2,setBackEndImage2,
      backEndImage3,setBackEndImage3,
      rent,setRent,
      landmark,setLandmark,
      category,setCategory,
      handleAddListing
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
