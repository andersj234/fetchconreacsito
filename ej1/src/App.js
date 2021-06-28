import {useState, useEffect} from "react"
import './App.css';

function App() {
  const [data, setData]=useState([])
  const [url, setUrl] = useState("https://rickandmortyapi.com/api/character/");
  const [next, setNext] = useState("")
  const [prev, setPrev]= useState("")

  useEffect(()=>{
    fetch(url)
    .then(res => res.json())
    .then((datos)=>{
      setData(datos.results);
      setNext(datos.info.next);
      setPrev(datos.info.prev)})
  },[url])

  let personajes = data.map((personaje, index)=>{
    if(index <= 9){
      return (
        <div key={index}>
          <img src={personaje.image} alt={personaje.name}></img>
          <p>{personaje.name}</p>
        </div>
      )
    }
  })

  return (
    <>
     <div>
       {personajes}
     </div>
     <div>
       <button onClick={()=>{prev !== null ? setUrl(prev) : setUrl("https://rickandmortyapi.com/api/character/")}}>pagina anterior</button>
       <button onClick={()=>{setUrl(next)}}>pagina siguiente</button>
     </div>
    </>
  );
}

export default App;
