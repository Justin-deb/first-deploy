import { Route, RouterProvider,createBrowserRouter,createRoutesFromElements } from "react-router-dom";
import { Home } from "./features/home/Home";
import NotFound from "./shared/NotFound";
import Movies from "./features/movies/Movies";
import "./App.css";
import MovieDetails from "./features/movies/MovieDetails";
import MainLayout from "./shared/layout/MainLayout";

function App() {
  const routes = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<MainLayout/>}>
        <Route index element={<Home/>}/>
        <Route path="/movies" element={<Movies />}/>
        <Route path="/movies/:id" element={<MovieDetails />} />

        <Route path="*" element={<NotFound />} />
      </Route>
    )
  );


  return (
    <RouterProvider router={routes}/>
  );
}

export default App;
