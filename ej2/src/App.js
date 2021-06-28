import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [url, setUrl]= useState("http://swapi.dev/api/planets/")
  const [data, setData]=useState([])
  const [select, setSelect]=useState("")
  const [data2, setData2]=useState([])
  
  function Planet(props){
    const [personajes, setPersonajes]= useState([])

    useEffect(()=>{
      Promise.all(props.urls.map((url) => fetch(url)))
      .then((respuesta)=> Promise.all(respuesta.map((res)=>res.json()))) //las promesas se esperan a que todas las url saquen lo que necesitas y luego se muestran pero si una da fallo para el proceso y no devuelven nada
      .then((datos)=>{
        setPersonajes(datos)
      })
    },[setData2])

    const personajesHTML = personajes.map((personaje, index)=>{
      return (<li key={index}>{personaje.name}</li>)
    })

    return(<ul>{personajesHTML}</ul>)
  }
  useEffect(()=>{
    fetch(url)
    .then(res=> res.json())
    .then((datos)=>{
      setData(datos.results)
    })
  },[url])

  const planetas = data.map((planeta, index)=>{
    return(<option key={index} value={planeta.url}>{planeta.name}</option>)
  })

  useEffect(()=>{
    fetch(select)
    .then(res=> res.json())
    .then((datos)=>{setData2(datos.residents)})
  }, [select])



  return (
    <>
    <select
    onChange={(e)=>{setSelect(e.target.value); window.alert(e.target.value)}}>{planetas}</select>
    <Planet urls={data2}/>
    </> 
  );
}

export default App;
