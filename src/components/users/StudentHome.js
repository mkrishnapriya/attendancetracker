import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import * as faceapi from 'face-api.js'
import * as canvas from 'canvas'
import Webcam from 'react-webcam'

function StudentHome() {

  let { userObj } = useSelector(state => state.user)
  let stuImg = userObj.profileImg

  const videoHeight = 480
  const videoWidth = 640
  const [initializing, setInitializing] = useState(false)
  const videoRef = useRef()
  const canvasRef = useRef()

  useEffect(() => {
    const loadModels = async () => {
      const MODEL_URI = process.env.PUBLIC_URL + '/models'
      setInitializing(true)
      Promise.all([
        await faceapi.loadSsdMobilenetv1Model(MODEL_URI),
        await faceapi.loadFaceLandmarkTinyModel(MODEL_URI),
        await faceapi.loadFaceRecognitionModel(MODEL_URI),
        console.log('Models loaded')
      ]).then(startVideo)
    }
    loadModels();
  }, [])

  const startVideo = () => {
    navigator.getUserMedia(
      { video: {} },
      stream => videoRef.current.srcObject = stream
    )
  }
  
  // const handleVideoPlay = () => {

  //   setInterval(async () => {
  //     if (initializing) {
  //       setInitializing(false)
  //     }

  //     const results = await faceapi
  //       .detectAllFaces(stuImg)
  //       .withFaceLandmarks()
  //       .withFaceDescriptors()

  //     if (!results.length) {
  //       return
  //     }

  //     const faceMatcher = new faceapi.FaceMatcher(results)

  //     const singleResult = await faceapi
  //       .detectSingleFace(stuImg)
  //       .withFaceLandmarks()
  //       .withFaceDescriptor()

  //     if (singleResult) {
  //       const bestMatch = faceMatcher.findBestMatch(singleResult.descriptor)
  //       console.log(bestMatch.toString())
  //     }



  //   }, 100)
  // }



  return (
    <div className='container mx-auto'>
      <h2>Welcome {userObj.name}</h2>
      <span>{initializing ? 'initializing' : 'Ready'}</span>
      <div className='mx-auto'>
        <video ref={videoRef} autoplay muted height={videoHeight}
          width={videoWidth} />
        <canvas ref={canvasRef} />
      </div>
    </div>
  )
}

export default StudentHome