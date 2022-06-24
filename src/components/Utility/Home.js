import React from 'react'
import * as faceapi from 'face-api.js'
import * as canvas from 'canvas'


function Home() {
  console.log(faceapi.nets)
  return (
    <div>
      <div>
        <img className='h-25 mx-auto' src="https://upload.wikimedia.org/wikipedia/commons/3/34/Elon_Musk_Royal_Society_%28crop2%29.jpg" alt="" />
      </div>
    </div>
  )
}

export default Home