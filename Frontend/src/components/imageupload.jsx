import React from 'react'
import { Route, Link, BrowserRouter as Router, Redirect } from 'react-router-dom';
import '../main.css';
import Image from '../image_upload_doctor.jpeg';
import axios from 'axios';
class Imageupload extends React.Component {

  //Set the current file state as undefined
  state = {
      file: undefined
  };

    //When the image changes set state to contain a file
    handleImageChange = (e) => {
    this.setState({
      file: e.target.files[0]
    })
  };

  //Check if the authorization cookie exists
  getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }

  //Submit the image to the prediction endpoint at our API
  handleSubmit = (e) => {
   e.preventDefault();
   let form_data = new FormData();
   form_data.append('file', this.state.file, this.state.file.name);
   let url = 'http://127.0.0.1:8000/api/v1/predict/';
   axios.post(url, form_data, {
     headers: {
       'Authorization': "Token " + this.getCookie("auth_token"),
       'Content-Type': 'multipart/form-data'
     }
   })
       .then(res => {
         alert(res.data[0]['prediction']);
       })
       .catch(err => console.log(err))


  };


  render() {
    return (
<div>
<div className="welcome-section">
  <p className="page-header">Image Upload</p>
  <img src={Image} alt="image_upload_doctor" width="640" height="340"/>
</div>

<div className="upload-x-ray-section">
  <p className="upload-x-ray-statement">Upload Your X-Ray to Find the Probability of Pneumonia</p>
  <p style={{color: 'red', visibility: this.getCookie("auth_token") == "" ? 'visible':'hidden'}}>You must be logged in to use this feature</p>
  <form className="form-for-x-ray" target="uploadfiles.php" method="post" enctype="multipart/form-data">
  <input className="x-ray-upload" name="xRayUpload" type="file" id="image" accept="image/png, image/jpeg, image/jpg" onChange={this.handleImageChange} required/>
  <input className="x-ray-submit-btn" type="submit" value="Upload" onClick={this.handleSubmit} disabled={this.getCookie("auth_token") == "" || this.state.file == undefined ? true:false}/>
</form>
</div>

  <Link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous"/>
  <Link rel="stylesheet" href="main.css"/>
</div>
    )
  }
}
export default Imageupload
