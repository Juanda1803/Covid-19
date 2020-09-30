import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import uploadImage from './uploadImage'
import '../assets/styles/components/FileUpload.css'

const FileUpload = () => {
  const DRAG = {
    DRAG_OVER: 1,
    UPLOADING: 2,
    COMPLETE: 3
  }

  const [drag, setDrag] = useState(DRAG.NONE)
  const [task, setTask] = useState(null)
  const [imgURL, setImgURL] = useState(null)

  useEffect(() => {
    if (task) {
      const onProgress = () => {}
      const onError = () => {}
      const onComplete = () => {
        console.log('complete')
        task.snapshot.ref.getDownloadURL().then(setImgURL)
      }
      task.on('state_changed', onProgress, onError, onComplete)
    }
  }, [task])

  const handleDragEnter = e => {
    e.preventDefault()
    setDrag(DRAG.DRAG_OVER)
  }
  const handleDragLeave = e => {
    e.preventDefault()

    setDrag(DRAG.NONE)
    task.snapshot.ref.getDownloadURL().then(setImgURL)
  }
  const handleDrop = e => {
    e.preventDefault()
    setDrag(DRAG.NONE)
    const file = e.dataTransfer.files[0]
    const task = uploadImage(file)

    console.log(task)
    setTask(task)
  }

  return (
    <form className='background-img file'>
      <div className='file__container'>
        <textarea
          className='input-area'
          placeholder='Arrastra una imagen para tu perfil'
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        ></textarea>
        {imgURL && (
          <section>
            <Link className='next insert-button' to='/'>
              Siguiente
            </Link>
            <img className='file-image' src={imgURL} />
          </section>
        )}
      </div>

      <style jsx='true'>
        {`
          textarea {
            border: ${
              drag === DRAG.DRAG_OVER
                ? '3px dashed #09f'
                : '3px solid transparent'
            };
          }

          section > img{
            width:100%,
            height:auto,
            border-radius:10px;
          }
        `}
      </style>
    </form>
  )
}

export default FileUpload
