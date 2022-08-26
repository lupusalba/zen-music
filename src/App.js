import Axios from 'axios'
import { useState, useEffect } from 'react';
import './App.css';
import SearchIcon from './searchIcon.png'

function App() {

  const api = {
    base: 'https://pixabay.com/api/',
    key: "9342397-9c4d96ed2afeb8a6567bd1d19"
  }
  // search term/s
  const [search, setSearch] = useState('');

  // all photos retrived from pixabay api <=> 20 photos
  const [allPhotos, setAllPhotos] = useState({})

  // current photo for background
  const [photo, setPhoto] = useState({})




  const getPhoto = async(search) => {
    let result = await Axios.get(`${api.base}?key=${api.key}&q=${search}&image_type=photo`)
    let data = await result.data.hits
    console.log(data)
  }  
  

  // get array of data from pixabay
  const handleSearch = (e) => {
    console.log(search)
    e.preventDefault();

    getPhoto(search)
    
    console.log(photo)
  }

  
  const changeBackground = () => {
    console.log("clicked")
  }


  return (
    <div className="App">


      <form onSubmit={handleSearch}>
        <input
          name="search"
          type="text"
          placeholder="Search Thames"
          onChange={(e) => setSearch(e.target.value)}
          value={search}
        />
        <button onClick={handleSearch} className="submit"><img id="searchIcon" src={SearchIcon} alt="search"/></button>
      </form>

      <button onClick={changeBackground} className="refresh">Refresh</button>

      <div className="credits">
        <a className="authorCredits" href="#">Author</a>
        <a className="hostCredits">Pexels</a>
      </div>
    </div>
  );
}

export default App;