import { useState, useEffect } from 'react'

function App() {

  const [politicians, setPoliticians] = useState([]);

  useEffect(() => {
    async function politiciansData() {

      try {

        const response = await fetch('http://localhost:3333/politicians')

        const data = await response.json();
        console.log(data);
        setPoliticians(data)



      } catch (error) {

        console.error('Errore durante la chiamata:', error);
      }

    }
    politiciansData();


  }, []);


  return (
    <>
      <p>ESERCITAZIONE </p>
      <h1>Politicians</h1>
      <ul className='card-list'>
        {politicians.map(politician => (
          <li key={politician.id} >
            <div className='card'>
              <h3>{politician.name}</h3>
              <span>{politician.position}</span>
              <p>{politician.biography}</p>
              <img src={politician.image} alt="Photo" />
            </div>
          </li>
        ))}
      </ul>

    </>
  )
}

export default App

//  Milestone 1: Recuperare e visualizzare i dati
// Effettua una chiamata API a
// /politicians

// Salva la risposta in uno stato React (useState).

// Mostra i politici in una lista di card, visualizzando almeno le seguenti proprietà:

// Nome (name)
// Immagine (image)
// Posizione (position)
// Breve biografia (biography)

// Obiettivo: Caricare e mostrare i politici in un’interfaccia chiara e leggibile.
