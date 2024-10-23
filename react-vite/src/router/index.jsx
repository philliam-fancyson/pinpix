import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/Login/LoginFormPage'
import SignupFormPage from '../components/Signup/SignupFormPage';
import Layout from './Layout';
import Main from '../components/Main/Main'
import CreateImage from '../components/CreateImage/CreateImage';
import ImageDetails from '../components/ImageDetails/ImageDetails';
import ShowCollections from '../components/Collection/ShowCollections/ShowCollections';
import CollectionDetails from '../components/Collection/ColectionDetails/CollectionDetails';
import UploadedDetails from '../components/Collection/ColectionDetails/UploadedDetails';
import AboutPage from '../components/AboutPage/AboutPage';
import ErrorPage from '../components/ErrorPage/ErrorPage';
import UserProfile from '../components/User/UserProfile';

export const router = createBrowserRouter([
  {
    element: <Layout />,
    errorElement: <ErrorPage />,
    // loader: async () => {
    //   const res = await fetch(`/api/properties/${params.id}`);
    //   if (res.status === 404) {
    //     throw new Response("Not Found", { status: 404 });
    //   }
    //   const home = await res.json();
    //   const descriptionHtml = parseMarkdown(
    //     data.descriptionMarkdown
    //   );
    //   return { home, descriptionHtml };
    // },
    children: [
      {
        path: "/",
        element: <Main />,
      },
      {
        path: "about",
        element: <AboutPage />
      },
      {
        path: "login",
        element: <LoginFormPage />,
      },
      {
        path: "signup",
        element: <SignupFormPage />,
      },
      {
        path: "/create",
        element: <CreateImage />
      },
      {
        path: "/pin/:imageId",
        element: <ImageDetails />
      },
      {
        path: "/boards/:username",
        element: <ShowCollections />
      },
      {
        path: "/boards/:username/all-uploads",
        element: <UploadedDetails />
      },
      {
        path: "/boards/:username/:title",
        element: <CollectionDetails />
      },
      {
        path: "/user/:username",
        element: <UserProfile />
      }
    ],
  },
]);
