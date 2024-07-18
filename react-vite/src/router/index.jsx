import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import Layout from './Layout';
import Main from '../components/Main/Main'
import CreateImage from '../components/CreateImage/CreateImage';
import ImageDetails from '../components/ImageDetails/ImageDetails';
import ShowCollections from '../components/Collection/ShowCollections/ShowCollections';
import CollectionDetails from '../components/Collection/ColectionDetails/CollectionDetails';
import UploadedDetails from '../components/Collection/ColectionDetails/UploadedDetails';

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Main />,
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
      }
    ],
  },
]);
