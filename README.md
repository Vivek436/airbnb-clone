# Airbnb Clone - Full Stack MERN Application

A fully functional Airbnb clone built with the MERN stack (MongoDB, Express.js, React, Node.js) featuring property listings, bookings, user authentication, and more.

## 🚀 Features

### User Features
- **Authentication System**
  - User registration and login
  - JWT-based authentication
  - Protected routes
  - Session management

- **Property Listings**
  - Browse all available properties
  - Category-based filtering (Villa, Farmhouse, Pool House, Rooms, Flat, PG, Cabin, Shops)
  - Search functionality (by city, landmark, or title)
  - Real-time search suggestions with thumbnails
  - Price range filtering
  - Detailed property view with image gallery

- **Booking System**
  - Book properties with date selection
  - View booking confirmation with price breakdown
  - My Bookings page to manage all bookings
  - Cancel bookings (for both guests and hosts)
  - Booking status tracking (confirmed/cancelled)
  - Rating system for completed bookings

- **Host Features**
  - List your property (multi-step form)
  - Upload multiple images (Cloudinary integration)
  - Update listing details via modal
  - Delete listings
  - View your listings (My Listing page)
  - Cancel guest bookings
  - See booked status on properties

### UI/UX Features
- Responsive design (mobile, tablet, desktop)
- Airbnb-style interface with red (#FF385C) theme
- Hover effects and smooth transitions
- Toast notifications for user feedback
- Loading states for better UX
- Search dropdown with property previews
- Category navigation bar
- Footer with links and social media
- 404 Not Found page

## 🛠️ Tech Stack

### Frontend
- **React.js** - UI library
- **React Router** - Navigation
- **Context API** - State management
- **Axios** - HTTP client
- **React Hot Toast** - Notifications
- **React Icons** - Icon library
- **Tailwind CSS** - Styling

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **Cloudinary** - Image storage
- **Multer** - File upload handling
- **Cookie Parser** - Cookie management
- **Bcrypt** - Password hashing
- **Dotenv** - Environment variables

## 📁 Project Structure

```
airbnb-clone/
├── backend/
│   ├── config/
│   │   ├── cloudinary.js
│   │   ├── db.js
│   │   └── token.js
│   ├── controllers/
│   │   ├── auth.controller.js
│   │   ├── booking.controller.js
│   │   ├── listing.controller.js
│   │   └── user.controller.js
│   ├── middleware/
│   │   ├── isAuth.js
│   │   └── multer.js
│   ├── model/
│   │   ├── booking.model.js
│   │   ├── listing.model.js
│   │   └── user.model.js
│   ├── routes/
│   │   ├── auth.route.js
│   │   ├── booking.route.js
│   │   ├── listing.route.js
│   │   └── user.route.js
│   ├── .env
│   ├── index.js
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── Component/
│   │   │   ├── Card.jsx
│   │   │   ├── Nav.jsx
│   │   │   └── Footer.jsx
│   │   ├── Context/
│   │   │   ├── AuthContext.jsx
│   │   │   ├── ListingContext.jsx
│   │   │   └── UserContext.jsx
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── SignUp.jsx
│   │   │   ├── ListingPage1.jsx
│   │   │   ├── ListingPage2.jsx
│   │   │   ├── ListingPage3.jsx
│   │   │   ├── MyListing.jsx
│   │   │   ├── ViewCard.jsx
│   │   │   ├── MyBookings.jsx
│   │   │   ├── BookingConfirmation.jsx
│   │   │   └── NotFound.jsx
│   │   ├── utils/
│   │   │   └── showToast.jsx
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```

## 🚦 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- Cloudinary account (for image uploads)

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd airbnb-clone
```

2. **Backend Setup**
```bash
cd backend
npm install
```

Create a `.env` file in the backend directory:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

Start the backend server:
```bash
npm start
```

3. **Frontend Setup**
```bash
cd frontend
npm install
```

Start the frontend development server:
```bash
npm run dev
```

The application will be available at:
- Frontend: `http://localhost:5173`
- Backend: `http://localhost:5000`

## 🔑 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user

### User
- `GET /api/user/currentuser` - Get current user details

### Listings
- `GET /api/listing/get` - Get all listings
- `POST /api/listing/add` - Create new listing (protected)
- `PUT /api/listing/update/:id` - Update listing (protected)
- `DELETE /api/listing/delete/:id` - Delete listing (protected)

### Bookings
- `POST /api/booking/create` - Create booking (protected)
- `GET /api/booking/my-bookings` - Get user's bookings (protected)
- `GET /api/booking/host-bookings` - Get host's bookings (protected)
- `PUT /api/booking/cancel/:id` - Cancel booking (protected)

## 🎨 Key Features Explained

### Search Functionality
- Real-time search as you type (300ms debounce)
- Search by city, landmark, or property title
- Dropdown suggestions with property images
- Click to navigate directly to property

### Booking System
- Date-based booking with check-in/check-out
- Automatic price calculation (rent + tax + Airbnb charge)
- Booking confirmation page with rating system
- Host can cancel bookings from home page or view card
- Guest can cancel from My Bookings page

### Listing Management
- Multi-step listing creation process
- Category selection with visual icons
- Image upload (up to 3 images per listing)
- Update listing via modal (no page navigation)
- Immediate UI updates without refresh

### Filter System
- Category filtering (8 categories)
- Price range filtering
- Combined filters (search + category + price)
- Filter persistence across navigation

## 🔒 Security Features
- JWT authentication with HTTP-only cookies
- Password hashing with bcrypt
- Protected routes (frontend and backend)
- Input validation
- CORS configuration
- Secure file upload handling

## 📱 Responsive Design
- Mobile-first approach
- Breakpoints for tablet and desktop
- Touch-friendly interface
- Optimized images
- Adaptive navigation

## 🎯 Future Enhancements
- [ ] Payment gateway integration
- [ ] Email notifications
- [ ] Advanced search filters (guests, amenities, etc.)
- [ ] Reviews and ratings system
- [ ] Wishlist/Favorites
- [ ] Host dashboard with analytics
- [ ] Chat system between host and guest
- [ ] Map integration for property location
- [ ] Multi-language support
- [ ] Social media login

## 🤝 Contributing
Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License
This project is open source and available under the MIT License.

## 👨‍💻 Author
Built with ❤️ by [Your Name]

## 🙏 Acknowledgments
- Airbnb for design inspiration
- React and Node.js communities
- All open-source contributors

---

**Note**: This is a learning project and not affiliated with Airbnb, Inc.
