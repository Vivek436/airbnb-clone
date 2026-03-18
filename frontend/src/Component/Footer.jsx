import React from 'react'
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'

function Footer() {
    const navigate = useNavigate()
    const currentYear = new Date().getFullYear()

    return (
        <footer className='w-[100%] bg-gray-900 text-white py-[50px] px-[20px] mt-[50px]'>
            <div className='max-w-[1200px] mx-auto'>
                <div className='grid grid-cols-1 md:grid-cols-4 gap-[40px] mb-[40px]'>
                    {/* About Section */}
                    <div>
                        <h3 className='text-[20px] font-semibold mb-[20px]'>About Airbnb</h3>
                        <ul className='flex flex-col gap-[10px]'>
                            <li className='text-gray-400 hover:text-white cursor-pointer transition-colors'>How it works</li>
                            <li className='text-gray-400 hover:text-white cursor-pointer transition-colors'>Newsroom</li>
                            <li className='text-gray-400 hover:text-white cursor-pointer transition-colors'>Investors</li>
                            <li className='text-gray-400 hover:text-white cursor-pointer transition-colors'>Careers</li>
                        </ul>
                    </div>

                    {/* Community Section */}
                    <div>
                        <h3 className='text-[20px] font-semibold mb-[20px]'>Community</h3>
                        <ul className='flex flex-col gap-[10px]'>
                            <li className='text-gray-400 hover:text-white cursor-pointer transition-colors'>Diversity & Belonging</li>
                            <li className='text-gray-400 hover:text-white cursor-pointer transition-colors'>Accessibility</li>
                            <li className='text-gray-400 hover:text-white cursor-pointer transition-colors'>Airbnb Associates</li>
                            <li className='text-gray-400 hover:text-white cursor-pointer transition-colors'>Guest Referrals</li>
                        </ul>
                    </div>

                    {/* Host Section */}
                    <div>
                        <h3 className='text-[20px] font-semibold mb-[20px]'>Host</h3>
                        <ul className='flex flex-col gap-[10px]'>
                            <li 
                                className='text-gray-400 hover:text-white cursor-pointer transition-colors'
                                onClick={() => navigate('/listingpage1')}
                            >
                                Host your home
                            </li>
                            <li className='text-gray-400 hover:text-white cursor-pointer transition-colors'>Host an experience</li>
                            <li className='text-gray-400 hover:text-white cursor-pointer transition-colors'>Responsible hosting</li>
                            <li className='text-gray-400 hover:text-white cursor-pointer transition-colors'>Resource Center</li>
                        </ul>
                    </div>

                    {/* Support Section */}
                    <div>
                        <h3 className='text-[20px] font-semibold mb-[20px]'>Support</h3>
                        <ul className='flex flex-col gap-[10px]'>
                            <li className='text-gray-400 hover:text-white cursor-pointer transition-colors'>Help Center</li>
                            <li className='text-gray-400 hover:text-white cursor-pointer transition-colors'>Safety information</li>
                            <li className='text-gray-400 hover:text-white cursor-pointer transition-colors'>Cancellation options</li>
                            <li className='text-gray-400 hover:text-white cursor-pointer transition-colors'>Our COVID-19 Response</li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className='border-t border-gray-700 pt-[30px] flex flex-col md:flex-row justify-between items-center gap-[20px]'>
                    <div className='flex flex-col md:flex-row items-center gap-[20px]'>
                        <p className='text-gray-400 text-[14px]'>© {currentYear} Airbnb Clone. All rights reserved.</p>
                        <div className='flex gap-[20px] text-[14px]'>
                            <span className='text-gray-400 hover:text-white cursor-pointer transition-colors'>Privacy</span>
                            <span className='text-gray-400 hover:text-white cursor-pointer transition-colors'>Terms</span>
                            <span className='text-gray-400 hover:text-white cursor-pointer transition-colors'>Sitemap</span>
                        </div>
                    </div>

                    {/* Social Media Icons */}
                    <div className='flex gap-[20px]'>
                        <FaFacebook className='w-[24px] h-[24px] text-gray-400 hover:text-white cursor-pointer transition-colors' />
                        <FaTwitter className='w-[24px] h-[24px] text-gray-400 hover:text-white cursor-pointer transition-colors' />
                        <FaInstagram className='w-[24px] h-[24px] text-gray-400 hover:text-white cursor-pointer transition-colors' />
                        <FaLinkedin className='w-[24px] h-[24px] text-gray-400 hover:text-white cursor-pointer transition-colors' />
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer
