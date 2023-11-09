import { useEffect, useState } from 'react';
import LoginPage from './pages/login.page';

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Aqui você busca os dados da API e depois os define no estado.
    fetch('http://localhost:5000/chamados')
      .then(res => res.json())
      .then(data => setData(data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div className="App">
      <></>
      <main>
        <LoginPage />
      </main>
    </div>
  );
}

export default App;
