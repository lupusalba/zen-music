import Axios from 'axios'
import { useState, useEffect } from 'react';
import './App.css';

// music
import Music1 from './Music/ambient-piano-ampamp-strings-10711.mp3'
import Music2 from './Music/morning-garden-acoustic-chill-15013.mp3'
import Music3 from './Music/cinematic-atmosphere-score-2-22136.mp3'
import Music4 from './Music/relax-in-the-forest-background-music-for-video-9145.mp3'
import Music5 from './Music/cinematic-documentary-115669.mp3'
import Music6 from './Music/mindfulness-relaxation-amp-meditation-music-22174.mp3'

function App() {

  const api = {
    base: 'https://pixabay.com/api/',
    key: "9342397-9c4d96ed2afeb8a6567bd1d19"
  }
  // search term/s
  // const [search, setSearch] = useState('');

  // all photos retrived from pixabay api <=> 20 photos
  const [photos, setPhotos] = useState({})

  // current photo for background
  const [photo, setPhoto] = useState({})

  // counter
  const [count, setCount] = useState(1)

  // toggle sound 
  const [isPlaying, setIsPlaying] = useState(true)




  // const [musicAuthor, setMusicAuthor] = useState([
  //   '<a href="https://pixabay.com/users/daddysmusic-22836301/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=music&amp;utm_content=10711">Zakhar Valaha</a> from <a href="https://pixabay.com/music//?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=music&amp;utm_content=10711">Pixabay</a>',
  //   '<a href="https://pixabay.com/users/olexy-25300778/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=music&amp;utm_content=15013">Olexy</a> from <a href="https://pixabay.com/music//?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=music&amp;utm_content=15013">Pixabay</a>',
  //   '<a href="https://pixabay.com/users/musictown-25873992/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=music&amp;utm_content=22136">Musictown</a> from <a href="https://pixabay.com/music//?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=music&amp;utm_content=22136">Pixabay</a>',
  //   '<a href="https://pixabay.com/users/lesfm-22579021/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=music&amp;utm_content=9145">Oleksii Kaplunskyi</a> from <a href="https://pixabay.com//?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=music&amp;utm_content=9145">Pixabay</a>',
  //   '<a href="https://pixabay.com/users/lexin_music-28841948/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=music&amp;utm_content=115669">Aleksey Chistilin</a> from <a href="https://pixabay.com//?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=music&amp;utm_content=115669">Pixabay</a>',
  //   '<a href="https://pixabay.com/users/john_kensy_music-26026995/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=music&amp;utm_content=22174">John K.</a> from <a href="https://pixabay.com//?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=music&amp;utm_content=22174">Pixabay</a>'
  
  // ])

  // theme button
  const [theme, setTheme] = useState({
    type: "forest",
    sound: Music1
  })


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
  stopMusic()
  let audioElement = document.getElementById("audio")
  let source = document.getElementById("audioSource")
  source.src = theme.sound
  audioElement.play()


  async function fetchPhotos() {
    //stopMusic()
    const res = await fetch(`${api.base}?key=${api.key}&q=${theme.type}&image_type=photo`)
    const data = await res.json()
    setPhotos(data.hits)
    setPhoto(data.hits[0])
    
  }
  fetchPhotos()
  console.log(theme.sound)
  

},[theme])

// useEffect(() => {
//   stopMusic()
// const startSound = () => {
//   let audioElement = document.getElementById("audio")
//   let source = document.getElementById("audioSource")
//   source.src = theme.sound
//   audioElement.play()
// }
// startSound()
// },[theme])



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

  let audioSource = document.getElementById('audio');
  audioSource.pause()


  switch(e.target.id) {
    case "mountain": setTheme({type: "mountain", sound: Music1}); break;
    case "forest": setTheme({type: "forest", sound: Music2}); break;
    case "river": setTheme({type: "river", sound: Music3}); break;
    case "night": setTheme({type: "night", sound: Music4}); break;
    case "nature": setTheme({type: "nature", sound: Music5}); break;
    case "sea": setTheme({type: "sea", sound: Music6}); break;
    
    default: setTheme({type: "forest", sound: Music3}); break;
  }
  
}

const startMusic = () => {
  let audioSource = document.getElementById('audio');
  console.log(audioSource)
  audioSource.play()
}

const stopMusic = () => {
  let audioSource = document.getElementById('audio');
  audioSource.pause()
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

    <button onClick={stopMusic}>stop</button>

    <button onClick={startMusic}>start</button>

    <audio id="audio">
      <source id="audioSource" src={Music1} />
    </audio>

    <button onClick={changeBackground} className="refresh">Refresh</button>

    <div className="creditsWrapper">
      <div className="credits">
        <a className="authorCredits" href={photo.pageURL}>Photo Author{photo.user}</a>
        <a className="hostCredits" href="https://www.pexels.com/">Provided by Pexels</a>
      </div>

      {/* <div className="credits">
        <a className="musicAuthorCredits authorCredits" href="#">Music Author{theme.musicAuthor}</a>
        <a className="hostCredits" href="https://www.pexels.com/">Provided by Pexels</a>
      </div> */}
    </div>
  </div>
);
}

export default App;