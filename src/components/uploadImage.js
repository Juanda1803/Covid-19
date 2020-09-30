import React from 'react'
import firebase from 'firebase'

const uploadImage = file => {
  const ref = firebase.storage().ref(`${file.name}`)
  const task = ref.put(file)
  return task
}

export default uploadImage
