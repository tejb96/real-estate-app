import Homepage from "./pages/homepage/homepage.jsx"
import Layout from './pages/layout/layout.jsx'
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import ListPage from "./pages/listPage/listPage.jsx";

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
        {
          path: "/list",
          element: <ListPage/>
        },
      ]
    }
  ]);

  return <RouterProvider router={router} />;
}

export default App