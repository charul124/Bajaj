import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
  const [data, setData] = useState('');
  const [response, setResponse] = useState(null);
  const [filter, setFilter] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('https://bajaj-c7pu.onrender.com/bfhl', {
        data: data.split(',').map(item => item.trim())
      });
      setResponse(res.data);
    } catch (err) {
      console.error('Error posting data:', err);
      setResponse({ error: 'An error occurred' });
    }
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const getFilteredResponse = () => {
    if (!response) return null;

    switch (filter) {
      case 'Numbers':
        return response.numbers;
      case 'Alphabets':
        return response.alphabets;
      case 'Highest Lowercase Alphabet':
        return response.highest_lowercase_alphabet;
      default:
        return response;
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>BFHL API Frontend</h1>

      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Enter Data (without inverted commas):</label>
          <input
            type="text"
            value={data}
            onChange={(e) => setData(e.target.value)}
            required
            style={styles.input}
          />
        </div>
        <button type="submit" style={styles.button}>Submit Data</button>
      </form>

      {response && (
        <div style={styles.responseContainer}>
          <h2 style={styles.responseTitle}>Response:</h2>

          <label style={styles.label}>Filter by: </label>
          <select value={filter} onChange={handleFilterChange} style={styles.select}>
            <option value="">--Select Filter--</option>
            <option value="Numbers">Numbers</option>
            <option value="Alphabets">Alphabets</option>
            <option value="Highest Lowercase Alphabet">Highest Lowercase Alphabet</option>
          </select>

          <div style={styles.filteredResponseContainer}>
            <h3 style={styles.filteredResponseTitle}>Filtered Response</h3>
            <pre style={styles.filteredResponse}>{JSON.stringify(getFilteredResponse(), null, 2)}</pre>
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    maxWidth: '600px',
    margin: '0 auto',
    backgroundColor: '#f4f4f9',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
  },
  title: {
    textAlign: 'center',
    color: '#333',
    marginBottom: '20px'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px'
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '20px'
  },
  label: {
    marginBottom: '5px',
    color: '#555'
  },
  input: {
    padding: '10px',
    fontSize: '16px',
    borderRadius: '4px',
    border: '1px solid #ccc'
  },
  button: {
    padding: '12px',
    backgroundColor: '#007bff',
    color: 'white',
    fontSize: '16px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease'
  },
  buttonHover: {
    backgroundColor: '#0056b3'
  },
  responseContainer: {
    marginTop: '30px',
    padding: '20px',
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
  },
  responseTitle: {
    marginBottom: '15px',
    color: '#333'
  },
  select: {
    padding: '10px',
    fontSize: '16px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    marginBottom: '20px'
  },
  filteredResponseContainer: {
    marginTop: '20px'
  },
  filteredResponseTitle: {
    marginBottom: '10px',
    color: '#333'
  },
  filteredResponse: {
    backgroundColor: '#f8f8f8',
    padding: '10px',
    borderRadius: '4px',
    border: '1px solid #ddd',
    whiteSpace: 'pre-wrap'
  }
};

export default App;
