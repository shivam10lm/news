# News Application

A modern, full-stack news application that allows users to browse, search, and save their favorite news articles. Built with React, Node.js, Express, and MySQL.

## 🚀 Features

- **News Browsing**: Access latest news articles from various sources
- **Search Functionality**: Search for specific news topics with real-time results
- **Category Filtering**: Browse news by categories (General, Business, Technology, Sports, Entertainment, Health)
- **Favorites System**: Save and manage favorite articles
- **Responsive Design**: Fully responsive UI that works on all device sizes
- **Pagination**: Browse through multiple pages of news results
- **Detailed Article View**: Read full articles with source attribution
- **Search History**: Track and quickly access recent searches

## 🏗️ Architecture

### Frontend Architecture

#### Components
- `App.js`: Main application component with routing setup
- `Navbar`: Navigation component with app logo and favorites link
- `SearchBar`: Search functionality with history feature
- `Categories`: Category selection buttons
- `NewsList`: Grid display of news articles
- `NewsCard`: Individual article card with favorite toggle
- `ArticleView`: Detailed view of a single article
- `FavoritesList`: Display and management of favorite articles

#### Custom Hooks
- `useNews`: Manages news fetching, searching, and pagination
- `useFavorites`: Handles favorites functionality and persistence

#### State Management
- Local state management using React hooks
- Browser's localStorage for search history
- Context-free architecture for simplicity

### Backend Architecture

#### API Layer
- RESTful API built with Express.js
- Swagger documentation for API endpoints
- CORS enabled for secure client-server communication

#### Services
- `newsService`: Handles communication with external News API
- `favoriteService`: Manages favorite articles operations

#### Controllers
- `newsController`: Handles news-related requests
- `favoriteController`: Manages favorites operations

#### Database
- MySQL database for storing favorite articles
- Organized table structure for efficient data retrieval

## 🛠️ Technical Stack

### Frontend
- React.js
- Material-UI (MUI)
- React Router
- Axios
- CSS3

### Backend
- Node.js
- Express.js
- MySQL
- Swagger UI
- Cors
- Dotenv

## 📋 API Endpoints

### News Endpoints
- `GET /api/news/search`: Search news articles with query parameters

### Favorites Endpoints
- `GET /api/favorites`: Retrieve all favorite articles
- `POST /api/favorites`: Add an article to favorites
- `DELETE /api/favorites/:id`: Remove an article from favorites

## 🏃‍♂️ Running the Application

### Prerequisites
- Node.js (v14 or higher)
- MySQL
- News API Key

### Environment Variables

#### Frontend (.env)
```
REACT_APP_API_URL=http://localhost:5001/api
```

#### Backend (.env)
```
PORT=5001
NEWS_API_KEY=your_news_api_key
DB_HOST=localhost
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_NAME=your_db_name
```

### Installation Steps

1. Clone the repository
2. Install backend dependencies:
   ```bash
   cd backend
   npm install
   ```
3. Install frontend dependencies:
   ```bash
   cd frontend
   npm install
   ```
4. Set up the database:
   - Create a MySQL database
   - The tables will be created automatically when the server starts

5. Start the backend server:
   ```bash
   cd backend
   npm start
   ```

6. Start the frontend development server:
   ```bash
   cd frontend
   npm start
   ```

## 🔒 Security Features

- CORS protection
- Environment variable protection
- SQL injection prevention
- Error handling middleware
- API rate limiting
- Secure database connections

## 💡 Key Design Decisions

1. **Component Separation**: Clear separation between presentational and container components
2. **Custom Hooks**: Reusable logic extracted into custom hooks
3. **Responsive Design**: Mobile-first approach with Material-UI
4. **Error Handling**: Comprehensive error handling on both frontend and backend
5. **API Structure**: RESTful API design with clear endpoint structure
6. **Database Design**: Efficient schema design for favorites storage

## 🔄 Future Improvements

1. User authentication system
2. Advanced filtering options
3. Social sharing features
4. Offline support with PWA
5. News recommendations based on reading history
6. Advanced analytics and user preferences
7. Real-time news updates
8. Multiple language support

## 📈 Performance Considerations

- Pagination for large data sets
- Image optimization
- Caching mechanisms
- Efficient database queries
- API response optimization
- Load time optimization

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details
