  
import "./App.css";

import { useState, useEffect } from "react";

function Cartas(props) {
  let cartas = props.cartas.map((carta, index) => {
    return (
      <div key={index} className="carta">
        <img src={carta.imageUrl} alt={carta.name} />
        <h3>{carta.name}</h3>
        <h5>
          Tipo: {carta.type} | Coste : {carta.manaCost}
        </h5>
        <p>{carta.text}</p>
      </div>
    );
  });
  return <div className="catalogo">{cartas}</div>;
}

function App() {
  const [data, setData] = useState([]);
  const [data2, setData2] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [select, setSelect] = useState("");

  useEffect(() => {
    setLoading(true);
    fetch("https://api.magicthegathering.io/v1/sets")
      .then((res) => res.json())
      .then((res) => {
        setData(res.sets);
        setLoading(false);     //esto para hacer los select
      });
  }, []);

  useEffect(() => {
    setLoading2(true);
    fetch(`https://api.magicthegathering.io/v1/cards?set=${select}`) //coge el valor de select para meterlo en la url y buscarla en la api
      .then((res) => res.json())
      .then((datos) => {         
        setData2(datos.cards);
        setLoading2(false);
      });
  }, [select]);

  const sets = data.map((set, index) => {
    return (
      <option key={index} value={set.code}>
        {set.name}
      </option>
    );
  });

  if (loading) {
    return <h1>LOADING....</h1>;
  } else {
    return ( //si solo tuvieramos un state de loading cambiaria pero tendria que volver a renderizar todo incluido el select por lo que el state se resetea por lo que hay que hacer un segundo state de loading2
      <>
        <select
          key="select"
          onChange={(e) => {
            setSelect(e.target.value);
          }}
        >
          {sets}
        </select>
        {loading2 ? (
          <h1>LOADING....</h1>
        ) : (
          <Cartas key="cartas" cartas={data2} />
        )}
      </>
    );
  }
}

export default App;