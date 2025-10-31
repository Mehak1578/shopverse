import React from 'react'

export default function Loader(){
  return (
    <div style={{display:'flex',alignItems:'center',justifyContent:'center',padding:20}}>
      <div style={{width:36,height:36,border:'4px solid #e5e7eb',borderTop:'4px solid #2563eb',borderRadius:'50%',animation:'spin 1s linear infinite'}} />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  )
}
