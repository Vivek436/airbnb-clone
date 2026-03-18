import React, { createContext, useState, useEffect, useContext } from 'react'
import { userDataContext } from './UserContext'

export const WishlistContext = createContext()

const WishlistContextProvider = ({ children }) => {
    const userContext = useContext(userDataContext)
    const userData = userContext?.userData
    const [wishlist, setWishlist] = useState([])

    // Load wishlist from localStorage
    useEffect(() => {
        if (userData?._id) {
            const savedWishlist = localStorage.getItem(`wishlist_${userData._id}`)
            if (savedWishlist) {
                try {
                    setWishlist(JSON.parse(savedWishlist))
                } catch (error) {
                    console.error('Error loading wishlist:', error)
                    setWishlist([])
                }
            }
        } else {
            setWishlist([])
        }
    }, [userData])

    // Save wishlist to localStorage
    useEffect(() => {
        if (userData?._id && wishlist.length >= 0) {
            try {
                localStorage.setItem(`wishlist_${userData._id}`, JSON.stringify(wishlist))
            } catch (error) {
                console.error('Error saving wishlist:', error)
            }
        }
    }, [wishlist, userData])

    const addToWishlist = (listing) => {
        if (!listing?._id) return false
        if (!wishlist.find(item => item._id === listing._id)) {
            setWishlist([...wishlist, listing])
            return true
        }
        return false
    }

    const removeFromWishlist = (listingId) => {
        if (!listingId) return
        setWishlist(wishlist.filter(item => item._id !== listingId))
    }

    const isInWishlist = (listingId) => {
        if (!listingId) return false
        return wishlist.some(item => item._id === listingId)
    }

    const toggleWishlist = (listing) => {
        if (!listing?._id) return false
        if (isInWishlist(listing._id)) {
            removeFromWishlist(listing._id)
            return false
        } else {
            return addToWishlist(listing)
        }
    }

    const value = {
        wishlist,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
        toggleWishlist
    }

    return (
        <WishlistContext.Provider value={value}>
            {children}
        </WishlistContext.Provider>
    )
}

export default WishlistContextProvider
