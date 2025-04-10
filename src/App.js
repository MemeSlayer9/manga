import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import { Toaster } from "react-hot-toast";

import GlobalStyle from "./styles/globalStyles";
import Nav from "./components/Navigation/Nav";
import SearchResults from "./Pages/SearchResults";
import NewLatest from "./Pages/NewLatest";

import MangaDetails from "./Pages/MangaDetails";
import HotPage from "./Pages/HotPage";
import TopPage from "./Pages/TopPage";
import News from "./Pages/News";
import Rank from "./Pages/Rank";

import Try from "./Pages/Try";

import './App.css';
import Advanced from './Pages/Advanced';
import Chapter from "./Pages/Chapter";
 
function App() {
   
/**useEffect(() => {
    // Disable developer tools and context menu
    const disableDevTools = (e) => {
      if (e.key === 'F12' || (e.ctrlKey && e.shiftKey && e.key === 'I')) {
        e.preventDefault();
      }
    };

    const disableContextMenu = (e) => {
      e.preventDefault();
    };

    document.addEventListener('keydown', disableDevTools);
    document.addEventListener('contextmenu', disableContextMenu);

    // Cleanup event listeners on component unmount
    return () => {
      document.removeEventListener('keydown', disableDevTools);
      document.removeEventListener('contextmenu', disableContextMenu);
    };
  }, []); **/
  return (
    <Router>
      <GlobalStyle />
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search/:name" element={<SearchResults />} />
        <Route path="/advanced/:genre" element={<Advanced />} />
        <Route exact path="/hot/1" element={<HotPage />} />
        <Route exact path="/new/1" element={<NewLatest />} />
        <Route exact path="/top/1" element={<TopPage />} />
                <Route exact path="/news/1" element={<News />} />
                <Route exact path="/rank/1" element={<Rank />} />

        <Route exact path="/try/1" element={<Try />} />
        <Route exact path="/id/:slug" element={<MangaDetails />} />
        <Route exact path="/read/manga/comick/chapter/:chapterId" element={<Chapter />} />
      </Routes>
      <Toaster
        toastOptions={{
          style: {
            borderRadius: "10px",
            background: "#242235",
            border: "1px solid #393653",
            color: "#fff",
          },
        }}
      />
    </Router>
  );
}

export default App;
