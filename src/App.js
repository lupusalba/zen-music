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
  const [photos, setPhotos] = useState({})

  // current photo for background
  const [photo, setPhoto] = useState({})

  // counter
  const [count, setCount] = useState(1)


//   const getPhoto = (search) => {
//     Axios.get(`${api.base}?key=${api.key}&q=${search}&image_type=photo`)
//     .then(res => {
//       const apiData = res.data
//       setPhotos(apiData.hits)
//       setPhoto(photos[0])
//       console.log(photo)
//     })
//   }  

// // get array of data from pixabay
//   const handleSearch = (e) => {
//     console.log(search)
//     e.preventDefault();

//     getPhoto(search)
    
//     console.log(photo)
//   }






//default
useEffect(() => {
  let term = "snow"

  async function fetchPhotos() {
    const res = await fetch(`${api.base}?key=${api.key}&q=${term}&image_type=photo`)
    const data = await res.json()
    setPhotos(data.hits)
    setPhoto(data.hits[0])
  }
  fetchPhotos()

},[])

const test = {
  backgroundImage: `url(${photo.largeImageURL})`
}

const searchPhoto = async(search) => {
    const res = await fetch(`${api.base}?key=${api.key}&q=${search}&image_type=photo`)
    const data = await res.json()
    setPhotos(data.hits)
    setPhoto(data.hits[0])
    console.log(photos)
    console.log("searchphoto")
}



const changeBackground = () => {
  console.log("clicked")
  console.log(`${photos[count].largeImageURL}`)
  setPhoto(photos[count])
  setCount(count + 1)
}


const handleSearch = (e) => {
  e.preventDefault()
  console.log("handele search")
 
  console.log(search)

  if(e.key === 'Enter'){
    searchPhoto(search)
  }
}


  return (
    <div className="App" style={test}>


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
        <a className="authorCredits" href={photo.pageURL}>{photo.user}</a>
        <a className="hostCredits" href="https://www.pexels.com/">Provided by Pexels</a>
      </div>
    </div>
  );
}

export default App;