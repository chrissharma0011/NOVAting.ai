import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client';
import './index.css'
import NOVAting from './screens/homepage.jsx';
import LoginScreen from './screens/login.jsx';
import UserHomePage from './screens/userpage.jsx';
import App from './App.jsx';
import { Navigate } from 'react-router-dom';
import { 
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from 'react-router-dom';
import RegisterScreen from './screens/register.jsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      {/* Default redirect to /homepage */}
      <Route index element={<Navigate to="/homepage" replace />} />
      
      <Route path="login" element={<LoginScreen />} />
      <Route path="register" element={<RegisterScreen />} />
      <Route path="homepage" element={<NOVAting />} />
      <Route path="userPage" element={<UserHomePage />} />
    </Route>
  ));

ReactDOM.createRoot(document.getElementById('root')).render(
  
  <StrictMode>
     <RouterProvider router={router} />  
  </StrictMode>,
)
