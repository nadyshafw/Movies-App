import { BrowserRouter, Routes, Route } from "react-router";
import Login from "./views/login";
import BaseLayout from "./views/BaseLayout";
import Movies from "./views/Movies";
import Genres from "./views/Genres";
import AddUser from "./views/AddUser";
import AddMovie from "./views/AddMovies";
import EditMovie from "./views/EditMovies";
import Detail from "./views/Detail";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/regis" element={<AddUser />} />
            <Route element={<BaseLayout />}>
              <Route path="/" element={<Movies />} />
              <Route path="/genres" element={<Genres />} />
              <Route path="/add" element={<AddMovie />} />
              <Route path="/edit/:id" element={<EditMovie />} />
              <Route path="/detail/:id" element={<Detail />} />
            </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App