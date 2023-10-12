import React from 'react';
import { useState } from 'react'


function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <h1 className='font-semibold'>Conexia</h1>

      <button className="bg-blue-500 hover:bg-blue-700 text-black font-bold py-2 px-4 rounded">
  Botón
</button>
    </div>
  )
}

export default App
