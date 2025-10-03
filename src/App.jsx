// import React from 'react'

// const App = () => {
//   return (
//     <div>
//       <h1 className="text-3xl font-bold bg-red-500 border-4 border-blue-500 p-10 m-10 text-center text-white" style={{ textShadow: '2px 2px 5px black' }}>
//         Hello world!
//       </h1>
//     </div>
//   )
// }

// export default App
import React, { useState } from 'react';

const App = () => {
  const [first, setFirst] = useState('');
  const [message, setMessage] = useState('');

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setMessage('');
    try {
      const response = await fetch('http://localhost:5000/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: first }),
      });
      if (response.ok) {
        const data = await response.json();
        setMessage(`User created: ${data.name}`);
        setFirst('');
      } else {
        setMessage('Failed to create user');
      }
    } catch (error) {
      setMessage('Error connecting to server');
    }
  };

  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-black gap-4px' >
      <form className='flex flex-col items-center justify-center bg-white p-10 rounded shadow-lg' onSubmit={onSubmitHandler}>
        <input
          value={first}
          onChange={e => setFirst(e.target.value)}
          className='p-2 border border-gray-300 rounded m-5px p-5px'
          type="text"
          placeholder='Your Name'
        />
        <button className='p-2 bg-blue-500 text-white rounded font-bold-semibold m-5px p-5px'>Submit</button>
      </form>
      {message && <div className='mt-4 text-white'>{message}</div>}
    </div>
  );
}

export default App;
