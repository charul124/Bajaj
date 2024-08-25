import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
  const [data, setData] = useState('');
  const [response, setResponse] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('https://backend-bfhl-5wf9.onrender.com', {
        data: data.split(',').map(item => item.trim())
      });
      setResponse(res.data);
    } catch (err) {
      console.error('Error posting data:', err);
      setResponse({ error: 'An error occurred' });
    }
  };

  const handleGet = async () => {
    try {
      const res = await axios.get('https://backend-bfhl-5wf9.onrender.com');
      setResponse(res.data);
    } catch (err) {
      console.error('Error fetching data:', err);
      setResponse({ error: 'An error occurred' });
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>BFHL API Frontend</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Enter Data (without inverted commas): </label>
          <input
            type="text"
            value={data}
            onChange={(e) => setData(e.target.value)}
            required
          />
        </div>
        <button type="submit">Submit Data</button>
      </form>

      {/* <button onClick={handleGet} style={{ marginTop: '20px' }}>Get Operation Code (GET)</button> */}

      {response && (
        <div style={{ marginTop: '20px' }}>
          <h2>Response:</h2>
          <pre>{JSON.stringify(response, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default App;