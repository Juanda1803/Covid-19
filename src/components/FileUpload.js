import React from 'react'
import firebase from 'firebase'

class FileUpload extends React.Component {
  constructor () {
    super()
    this.state = {
      uploadValue: 0,
      picture: null
    }
    this.handleUpload = this.handleUpload.bind(this)
  }

  handleUpload = e => {
    const file = e.target.files[0]
    const ref = firebase.storage().ref(`/images/${file.name}`)
    const task = ref.put(file)
    console.log(task)
    if (task) {
      task.on(
        'state_changed',
        snapshot => {
          let percentage =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          this.setState({
            uploadValue: percentage
          })
        },
        error => {
          console.log(error)
        },
        () => {
          task.snapshot.ref.getDownloadURL().then(img => {
            this.setState({
              uploadValue: 100,
              picture: img
            })
          })
        }
      )
    }
  }

  render () {
    console.log(this.state.picture)
    return (
      <div>
        <progress value={this.state.uploadValue} max='100' />
        <br />
        <input type='file' onChange={this.handleUpload} />
        <br />
        <img src={this.state.picture} />
      </div>
    )
  }
}

export default FileUpload
