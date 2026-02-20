# Portfolio V4 🚀

A modern, interactive portfolio website built with React and FastAPI, featuring a sleek terminal-style interface, animated components, and a comprehensive UI library.

![Portfolio Banner](https://img.shields.io/badge/Portfolio-V4-blue?style=for-the-badge)
![React](https://img.shields.io/badge/React-19.0.0-61DAFB?style=for-the-badge&logo=react)
![FastAPI](https://img.shields.io/badge/FastAPI-0.110.1-009688?style=for-the-badge&logo=fastapi)
![TailwindCSS](https://img.shields.io/badge/Tailwind-3.4.17-38B2AC?style=for-the-badge&logo=tailwind-css)

## ✨ Features

- **Interactive Terminal Component** - Custom-built terminal interface for unique user experience
- **Animated Spring Cards** - Smooth, physics-based animations using spring dynamics
- **Video Transitions** - Seamless page transitions with video effects
- **Professional Page** - Comprehensive portfolio showcase with modern design
- **Extensive UI Library** - 40+ custom UI components built with Radix UI
- **FastAPI Backend** - RESTful API with MongoDB integration
- **Responsive Design** - Fully responsive across all devices
- **Dark Mode Support** - Built-in theme switching capabilities

## 🛠️ Tech Stack

### Frontend
- **React 19.0.0** - Latest React version with concurrent features
- **Tailwind CSS** - Utility-first CSS framework
- **Radix UI** - Headless UI components for accessibility
- **React Router** - Client-side routing
- **Axios** - HTTP client for API requests
- **CRACO** - Custom webpack configuration
- **Embla Carousel** - Smooth carousel implementation
- **React Hook Form** - Form validation and management
- **Zod** - Schema validation

### Backend
- **FastAPI** - Modern Python web framework
- **MongoDB** - NoSQL database with Motor (async driver)
- **Uvicorn** - ASGI server
- **Pydantic** - Data validation
- **Python-dotenv** - Environment variable management

### Development Tools
- **Webpack** - Module bundler with custom plugins
- **PostCSS** - CSS processing
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Jest** - Testing framework

## 📦 Installation

### Prerequisites
- Node.js (v16 or higher)
- Python 3.12+
- MongoDB instance
- npm or yarn package manager

### Clone Repository
```bash
git clone https://github.com/Blazehue/PORTFOLIO.git
cd PORTFOLIO
```

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Create `.env` file in frontend directory:
```env
REACT_APP_API_URL=http://localhost:8000
```

4. Start development server:
```bash
npm start
# or
yarn start
```

Frontend will run on `http://localhost:3000`

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Create virtual environment (optional but recommended):
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Create `.env` file in backend directory:
```env
MONGO_URL=your_mongodb_connection_string
DB_NAME=your_database_name
```

5. Start server:
```bash
uvicorn server:app --reload --port 8000
```

Backend will run on `http://localhost:8000`

## 📁 Project Structure

```
PORTFOLIO/
├── frontend/
│   ├── public/
│   │   ├── index.html
│   │   ├── profile-photo.jpg
│   │   ├── panther.png
│   │   └── transition-video.mp4
│   ├── src/
│   │   ├── components/
│   │   │   ├── ui/              # 40+ Radix UI components
│   │   │   ├── SpringCard.jsx   # Animated card component
│   │   │   ├── Terminal.jsx     # Interactive terminal
│   │   │   └── VideoTransition.jsx
│   │   ├── pages/
│   │   │   └── Professional.jsx
│   │   ├── data/
│   │   │   └── mock.js          # Mock data
│   │   ├── hooks/
│   │   │   └── use-toast.js
│   │   ├── lib/
│   │   │   └── utils.js
│   │   ├── App.js
│   │   └── index.js
│   ├── plugins/
│   │   ├── health-check/        # Webpack health plugin
│   │   └── visual-edits/        # Visual editing plugin
│   ├── package.json
│   ├── tailwind.config.js
│   ├── craco.config.js
│   └── postcss.config.js
├── backend/
│   ├── server.py                # FastAPI application
│   ├── requirements.txt
│   └── .env
├── tests/
│   └── __init__.py
└── README.md
```

## 🎨 UI Components

The project includes a comprehensive UI library with 40+ components:

### Form Components
- Input, Textarea, Select, Checkbox, Radio Group
- Form validation with React Hook Form
- OTP Input, Switch, Slider

### Layout Components
- Card, Sheet, Drawer, Dialog
- Accordion, Tabs, Collapsible
- Separator, ScrollArea, Resizable

### Navigation
- Navigation Menu, Menubar, Breadcrumb
- Dropdown Menu, Context Menu
- Command Palette, Pagination

### Feedback
- Toast, Alert, Alert Dialog
- Progress, Skeleton, Badge
- Tooltip, Popover, Hover Card

### Data Display
- Table, Avatar, Calendar, Carousel
- Aspect Ratio

### Interactive
- Button, Toggle, Toggle Group

## 🚀 Deployment

### Frontend Deployment
Build production version:
```bash
cd frontend
npm run build
```

Deploy the `build` folder to your preferred hosting service (Vercel, Netlify, AWS S3, etc.)

### Backend Deployment
Options include:
- **Heroku**: Deploy with Procfile
- **AWS EC2**: Run with Uvicorn
- **Docker**: Containerize the application
- **Railway**: Simple Python deployment

## 🔧 Configuration

### Webpack Plugins
- **Health Check Plugin**: Monitors webpack build health
- **Visual Edits Plugin**: Enhanced development experience with Babel metadata
- **CRACO Config**: Custom webpack configuration without ejecting

### Tailwind Configuration
Custom theme with:
- Extended color palette
- Custom animations
- Border radius variants
- Container configurations

## 🧪 Testing

Run tests:
```bash
# Frontend tests
cd frontend
npm test

# Backend tests
cd backend
pytest
```

## 📝 Environment Variables

### Frontend (.env)
```env
REACT_APP_API_URL=http://localhost:8000
REACT_APP_ENV=development
```

### Backend (.env)
```env
MONGO_URL=mongodb://localhost:27017
DB_NAME=portfolio_db
PORT=8000
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👤 Author

**Blazehue**
- GitHub: [@Blazehue](https://github.com/Blazehue)
- Portfolio: [Your Portfolio URL]

## 🙏 Acknowledgments

- [Radix UI](https://www.radix-ui.com/) - Unstyled, accessible components
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [FastAPI](https://fastapi.tiangolo.com/) - Modern Python web framework
- [React](https://react.dev/) - JavaScript library for UI
- [shadcn/ui](https://ui.shadcn.com/) - UI component inspiration

## 📧 Support

For support, email your-email@example.com or open an issue in the GitHub repository.

---

⭐ **Star this repository if you found it helpful!**
