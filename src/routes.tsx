import Login from './pages/Auth/Login/Login';
import HomePage from './pages/HomePage/HomePage';
import ProfileSettings from './pages/Settings/ProfileSettings';
import RecoverPassword from './pages/Auth/RecoverPassword/RecoverPassword';
import RecoverPasswordCode from './pages/Auth/RecoverPasswordCode/RecoverPasswordCode';
import SignUp from './pages/Auth/SignUp/SignUp';
import ListUsers from './pages/User/ListUsers/ListUsers';
import ListProfiles from './pages/User/ListProfiles/ListProfiles';
import UserDetails from './pages/User/ListUsers/UserDetails/UserDetails';
import Layout from './components/Layout/Layout_';
import UserCreate from './pages/User/ListUsers/UserCreate/UserCreate';
import UserUpdate from './pages/User/ListUsers/UserUpdate/UserUpdate';
import ProfilesEdit from './pages/User/ListProfiles/ProfilesEdit/ProfilesEdit';

export const commonRoutes = [
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/recover-password',
    element: <RecoverPassword />,
  },
  {
    path: '/recover-password-code',
    element: <RecoverPasswordCode />,
  },
  {
    path: '/signup',
    element: <SignUp />,
  },
];

export const routes = [
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/users',
    element: (
      <Layout>
        <ListUsers />
      </Layout>
    ),
  },
  {
    path: '/new-users',
    element: (
      <Layout>
        <UserCreate />
      </Layout>
    ),
  },
  {
    path: '/users/:id',
    element: (
      <Layout>
        <UserDetails />
      </Layout>
    ),
  },
  {
    path: '/users/:id/edit',
    element: (
      <Layout>
        <UserUpdate />
      </Layout>
    ),
  },
  {
    path: '/profiles',
    element: (
      <Layout>
        <ListProfiles />
      </Layout>
    ),
  },
  {
    path: '/profiles/:id/edit',
    element: (
      <Layout>
        <ProfilesEdit />
      </Layout>
    ),
  },
  {
    path: '/settings/profile',
    element: <ProfileSettings />,
  },
];
