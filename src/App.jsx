import { useState, useEffect, memo, useMemo } from 'react'

const Card = memo(({ politician }) => {
  console.log('Politician card:', politician);

  return (
    <li key={politician.id}>
      <div className="card">
        <h3>{politician.name}</h3>
        <h4>Nazione : {politician.country}</h4>
        <span>Posizione : {politician.position}</span>
        <p>{politician.biography}</p>
        <img src={politician.image} alt="Photo" />
      </div>
    </li>
  );
});



function App() {

  const [politicians, setPoliticians] = useState([]);
  const [search, setSearch] = useState('');

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

  const filteredPoliticians = useMemo(() => {
    return politicians.filter(politician => {
      const isInList = politician.name.toLowerCase().includes(search.toLowerCase())
      const isInCountry = politician.country.toLowerCase().includes(search.toLowerCase())

      return isInList || isInCountry;
    })
  }, [politicians, search])


  return (
    <>

      <h1>POLITICI</h1>

      <input
        type="text"
        placeholder='Cerca un politico per nome o per nazione'
        value={search}
        onChange={e => setSearch(e.target.value)}
      />

      <ul className='card-list'>
        {filteredPoliticians.map(politician => (
          <Card key={politician.id} politician={politician} />
        ))}
      </ul>

    </>
  )
}

export default App

