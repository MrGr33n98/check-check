import React from 'react'

const DebugHomePage: React.FC = () => {
  console.log('DebugHomePage rendering...')
  
  return (
    <div style={{ padding: '20px', backgroundColor: '#f0f0f0', minHeight: '100vh' }}>
      <h1 style={{ color: '#333', fontSize: '2rem', marginBottom: '1rem' }}>
        Debug HomePage
      </h1>
      <p style={{ color: '#666', marginBottom: '1rem' }}>
        Esta é uma versão de debug para identificar problemas.
      </p>
      <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
        <h2 style={{ color: '#333', marginBottom: '1rem' }}>Status dos Componentes:</h2>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          <li style={{ padding: '5px 0', color: '#28a745' }}>✅ React funcionando</li>
          <li style={{ padding: '5px 0', color: '#28a745' }}>✅ Router funcionando</li>
          <li style={{ padding: '5px 0', color: '#28a745' }}>✅ Layout funcionando</li>
          <li style={{ padding: '5px 0', color: '#ffc107' }}>⚠️ Testando componentes...</li>
        </ul>
      </div>
    </div>
  )
}

export default DebugHomePage