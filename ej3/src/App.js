import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [url, setUrl]=useState("https://pokeapi.co/api/v2/type/")
  const [data,setData]=useState([])
  const [data2, setData2]= useState([])
  const [select, setSelect]= useState("")

  function Lista(props){
    let listaFinal = props.pokemons.map((pokemon, index)=>{
      return(<li>{pokemon}</li>)
    })
    return <ul>{listaFinal}</ul>
  }
  useEffect(()=>{
    fetch(url)
    .then(res=>res.json())
    .then((datos)=>{setData(datos.results)})
  },[url])

  const tipos = data.map((tipos, index)=>{
    return <option key={index} value={tipos.url}>{tipos.name}</option>
  })

  useEffect(()=>{
    fetch(select)
    .then(res=> res.json())
    .then((datos)=>{
      let arrayPokemon=[]
      if(datos.pokemon.length >= 1){
        for (let i = 0; i < 3; i++) {
          let rnd = Math.floor(Math.random()*datos.pokemon.length)
          arrayPokemon.push(datos.pokemon[rnd].pokemon.name)
        }

      }else{
        arrayPokemon=["no hay ningun pokemon de este tipo"]
      }
      setData2(arrayPokemon)
    })
  }, [select])


  return (
    <>
    <select onChange={(e)=>{setSelect(e.target.value)}}>{tipos}</select>
    <Lista pokemons={data2}/>
    </>
  );
}

export default App;
