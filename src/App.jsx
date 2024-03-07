import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import Dashboard, { dashboardLoader } from './pages/Dashboard';
import Error from './pages/Error';

const router = createBrowserRouter([
  {
    path: "/",
    element:<Dashboard />,
    loader: dashboardLoader,
    errorElement: <Error />
  },
  {
    path: "/transactions",
    element:<h1>Transaction Tracker</h1>
  },
  {
    path: "/tips",
    element:<h1>TIPS Calendar</h1>
  },
]);

function App() {

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  )
}

export default App
