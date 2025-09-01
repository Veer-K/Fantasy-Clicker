import { useState } from 'react';

const ClickCounter = () => {
  const [clickCount, setClickCount] = useState(0);

  const handleClick = () => {
    setClickCount(prevCount => prevCount + 1);
  };

  return (
    <div style={{ 
      textAlign: 'center', 
      padding: '2rem',
      backgroundColor: '#f8f9fa',
      borderRadius: '8px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    }}>
      <h2>Click Counter</h2>
      <p>Click the button below to count your clicks:</p>
      <div style={{ 
        fontSize: '3rem', 
        fontWeight: 'bold', 
        color: '#333',
        margin: '1rem 0'
      }}>
        {clickCount}
      </div>
      <button 
        onClick={handleClick}
        style={{
          padding: '0.8rem 1.5rem',
          fontSize: '1.2rem',
          backgroundColor: '#4CAF50',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          transition: 'background-color 0.3s'
        }}
        onMouseEnter={(e) => (e.target as HTMLButtonElement).style.backgroundColor = '#45a049'}
        onMouseLeave={(e) => (e.target as HTMLButtonElement).style.backgroundColor = '#4CAF50'}
      >
        Click Me!
      </button>
    </div>
  );
};

export default ClickCounter;