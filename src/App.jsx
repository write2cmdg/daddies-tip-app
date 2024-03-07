import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import Dashboard, { dashboardLoader } from './pages/Dashboard';
import Error from './pages/Error';
import Main, { mainLoader } from './layouts/Main';
import { logoutAcion } from './actions/logout';

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
        loader: dashboardLoader
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
    </div>
  )
}

export default App
