import "./App.css";
import { useEffect, useState } from "react";
import BookList from "./components/BookList";
import {
  Route,
  Routes,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider
} from "react-router-dom";
import BookDetails from "./components/BookDetails";
import WithLoading from "./components/HOC/WithLoading";

function App() {
 
  return (
    <Routes>
      <Route path="/" element={<BookList />} exact />
      <Route
        path="book-detail/:id"
        element={<BookDetails />}
      />
    </Routes>
  );
}

export default App;
