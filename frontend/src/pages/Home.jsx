import React, { useContext } from 'react'
import Nav from '../Component/Nav'
import Footer from '../Component/Footer'
import SkeletonCard from '../Component/SkeletonCard'
import { ListingDataContext } from '../Context/ListingContext'
import Card from '../Component/Card'

const Home = () => {
  let { listingData, searchQuery, selectedCategory, isLoading } = useContext(ListingDataContext)
  
  return (
    <div className='min-h-[100vh] bg-gray-50 flex flex-col'>
      <Nav />
      <div className='w-[100vw] min-h-[77vh] flex items-center justify-center gap-[25px] flex-wrap mt-[250px] md:mt-[180px] px-[20px] pb-[50px]'>
        {isLoading ? (
          // Show skeleton cards while loading
          Array(6).fill(0).map((_, index) => <SkeletonCard key={index} />)
        ) : listingData.length > 0 ? (
          listingData.map((list) => (
            <Card key={list._id} id={list._id} listing={list} title={list.title} landmark={list.landMark} city={list.city} image1={list.image1} image2={list.image2} image3={list.image3} rent={list.rent} />
          ))
        ) : (
          <div className='flex flex-col items-center justify-center gap-[20px] mt-[50px]'>
            <p className='text-[24px] text-gray-600 font-semibold'>
              {searchQuery ? `No results found for "${searchQuery}"` : 
               selectedCategory ? `No ${selectedCategory} listings available` : 
               'No listings available'}
            </p>
            <p className='text-[16px] text-gray-500'>Try adjusting your search or filters</p>
          </div>
        )}
      </div>
      <Footer />
    </div>
  )
}

export default Home
