import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Root from './pages/rootComponent/Root';
import ProtectedRoute from './routes/protectedRoute';
import Error from './pages/errorPage/Error';
import Content from './pages/contentPage/Content';
import Login from './pages/loginPage/Login';
import ProfilePage from './pages/profilePage/ProfilePage';
import Registration from './pages/registrationPage/Registration';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        path: '/',
        element: <Content />,
        children: [
          { path: 'login', element: <Login /> },
          { path: 'register', element: <Registration /> },
          {
            path: 'profile',
            element: (
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            ),
          },
        ],
      },
    ],
  },
  { path: '*', element: <Error /> },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
