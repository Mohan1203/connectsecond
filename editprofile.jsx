import React, { useState, useEffect } from "react";
import "../style/editprofile.css";
import Navigation from "./navigation";
import axios from "axios"

function EditProfile() {

  const [data, setData] = useState([]);
  const[updatedData,setUpdatedData] = useState([]);
  const [profilePhoto, setProfilePhoto] = useState();
  const [name,setName] = useState();
  const [email,setEmail] = useState()
  const [bio,setBio] = useState()
  const [username,setUsername] = useState()

  useEffect(() => {
    axios({
      method: "get",
      url: `http://localhost:3333/userprofile/${localStorage.getItem("userID")}`,
      headers: {
        "Content-Type":"application/json",
        "Authorization": localStorage.getItem("token")
      }
    }).then((res) => {
      console.log(res.data)
      setData(res.data)
    }).catch((err) => {
      console.log(err)
    })

  }, [updatedData])

  function setProfile(e){
    e.preventDefault();
    console.log(profilePhoto)
    const formData = new FormData();
    formData.append('name',name);
    formData.append('email',email);
    formData.append('bio',bio);
    formData.append('username',username);
    if(profilePhoto){
      const blob = new Blob([profilePhoto], { type: profilePhoto.type });
      console.log(blob)
      formData.append('image',blob);
    }
    axios({
      method:"POST",
      url:`http://localhost:3333/userprofile/editprofile`,
      data:formData,
      headers:{
       
        "Content-Type":"multipart/form-data",
        "Authorization":localStorage.getItem("token")
      }
    }).then((res)=>{
      setUpdatedData(res.data)
    }).catch((err)=>{
      console.log(err)
    })
  } 

  return (

    <div>
      <Navigation />
      <div>
        <div className="editprofile-container">
          <form method="post">
            <div className="editprofile-header">
              <div className="editprofile-changeprofile">
                <div>
                  <img src={`http://localhost:3333/profilephoto/${data.profilephoto}`} alt="profilepic" className="editprofile-profilepic" />
                </div>
                <div >
                  <h3>{data.username}</h3>
                  <input type="file" name="file" id="file" className="editprofile-inputs" onChange={(e)=>{setProfilePhoto(e.target.files[0])}}/>
                </div>
              </div>
              <div className="editprofile-fields">
                <span><b>Name</b></span>
                <input type="text" name="name" id="name" className="editptofile-inputs" value={name} onChange={(e)=>{setName(e.target.value)}}/>
                <span><b>Bio</b></span>
                <textarea rows={3} cols={25} className="editprofile-textarea" value={bio}  onChange={(e)=>{setBio(e.target.value)}}/>
                <span><b>Username</b></span>
                <input type="text" name="username" id="username" className="editptofile-inputs" value={username} onChange={(e)=>{setUsername(e.target.value)}}/>
                <span><b>Email</b></span>
                <input type="email" name="email" id="email" className="editptofile-inputs" value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
              </div>
              <button type="submit" className="editprofile-btn" onClick={setProfile}>Submit</button>
            </div>
          </form>

        </div>
      </div>
    </div>
  );
}

export default EditProfile;