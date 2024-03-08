import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import Dashboard, { dashboardAction, dashboardLoader } from './pages/Dashboard';
import Error from './pages/Error';
import Main, { mainLoader } from './layouts/Main';
import { logoutAcion } from './actions/logout';

//Toast
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

const router = createBrowserRouter([
  {
    path: "/",
    element:<Main />,
    loader: mainLoader,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element:<Dashboard />,
        loader: dashboardLoader,
        action: dashboardAction
      },
      {
        path: "logout",
        action: logoutAcion
      }
      
    ]
  }
]);

function App() {

  return (
    <div className="App">
      <RouterProvider router={router} />
      <ToastContainer />
    </div>
  )
}

export default App
