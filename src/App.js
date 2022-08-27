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

  // theme button
  const [theme, setTheme] = useState("forest")


//default theme
useEffect(() => {
  let term = "forest"

  async function fetchPhotos() {
    const res = await fetch(`${api.base}?key=${api.key}&q=${term}&image_type=photo`)
    const data = await res.json()
    setPhotos(data.hits)
    setPhoto(data.hits[0])
  }
  fetchPhotos()

},[])


// get new theme
useEffect(() => {

  async function fetchPhotos() {
    const res = await fetch(`${api.base}?key=${api.key}&q=${theme}&image_type=photo`)
    const data = await res.json()
    setPhotos(data.hits)
    setPhoto(data.hits[0])
  }
  fetchPhotos()

},[theme])

const test = {
  backgroundImage: `url(${photo.largeImageURL})`
}

const changeBackground = () => {
  console.log("clicked")
  console.log(`${photos[count].largeImageURL}`)
  setPhoto(photos[count])
  setCount(count + 1)
}

const handleSearch = (e) => {
  e.preventDefault()
  setTheme(e.target.id)
}


return (
  <div className="App" style={test}>


    <div className="choices">
      <button onClick={handleSearch} id="mountain" className="choiceBtn">mountain</button>
      <button onClick={handleSearch} id="forest" className="choiceBtn">forest</button>
      <button onClick={handleSearch} id="river" className="choiceBtn">river</button>
      <button onClick={handleSearch} id="night" className="choiceBtn">night</button>
      <button onClick={handleSearch} id="nature" className="choiceBtn">nature</button>
      <button onClick={handleSearch} id="sea" className="choiceBtn">sea</button>
    </div>

    <button onClick={changeBackground} className="refresh">Refresh</button>

    <div className="credits">
      <a className="authorCredits" href={photo.pageURL}>{photo.user}</a>
      <a className="hostCredits" href="https://www.pexels.com/">Provided by Pexels</a>
    </div>
  </div>
);
}

export default App;