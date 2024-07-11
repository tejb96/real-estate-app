import Homepage from "./pages/homepage/homepage.jsx"
import Layout from './pages/layout/layout.jsx'
import { createBrowserRouter, RouterProvider } from "react-router-dom"

function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Homepage />,
        },
      ]
    }
  ]);

  return <RouterProvider router={router} />;
}

export default App