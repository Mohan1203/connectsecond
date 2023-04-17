import React,{useState} from "react";
import "../style/navigation.css";
import { GrHomeRounded } from "react-icons/gr"
import { FiSearch } from "react-icons/fi";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { CgProfile } from "react-icons/cg"
import { FiSettings } from "react-icons/fi";
import { Link,useNavigate } from "react-router-dom";
import {BiLogOut} from "react-icons/bi";
import {BsTelephoneForwardFill} from "react-icons/bs";
import {MdPrivacyTip} from "react-icons/md";
import {BiEdit} from "react-icons/bi";
import axios from "axios";

function Navigation() {
    const navigate = useNavigate();
    const [active, setActive] = useState(false);
    const [userID,setuserID] = useState(localStorage.getItem("userID"));

    const showSetting = (e) =>{
        e.preventDefault();
        setActive(!active);
    }

    const logOut = (e) =>{
        e.preventDefault();
        axios({
            method:"POST",
            url:"http://localhost:3333/logout",
            headers:{
                "Content-Type":"Apllication/json",
                "Authorization":localStorage.getItem("token")
            }
        }).then((res)=>{
            localStorage.removeItem("token");
            localStorage.removeItem("userID");
            navigate("/login");
        }).catch((err)=>{
            console.log(err);
        })
    }
    return (
        <div className="navigation">
            <div className="navigation-list">
                <div className="instagram" style={{ fontSize: "2rem" }}> Instagram</div>
                <ul >
                    <Link to={"/"}><a href="#" onClick={()=>setActive(false)}><li><GrHomeRounded size={30} style={{ margin: "0 10px" }} />Home</li></a></Link>
                    <a href="#" onClick={()=>setActive(false)}><li> <FiSearch size={30} style={{ margin: "0 10px" }} />Search</li></a>
                    <a href="#" onClick={()=>setActive(false)}><li ><AiOutlinePlusCircle size={30} style={{ margin: "0 10px" }} />Add Post</li></a>
                    <Link to={`/profile/${userID}`}><a href="#" onClick={()=>setActive(false)}><li> <CgProfile size={30} style={{ margin: "0 10px" }} />Profile</li></a></Link>
                </ul>
            </div>
            <div className="nav-setting">
                <div className="setting-options" style={active?{display:"flex"}:{display:"none"}}>
                   <ul>
                   <li ><a href="#" className="setting-listitems"><CgProfile size={30} style={{ margin: "0 10px" }} />Your account</a></li>
                    <li ><Link to={"/editprofile"} className="setting-listitems"><BiEdit size={30} style={{ margin: "0 10px" }} />Edit Profile</Link></li>
                    <li ><a href="#" className="setting-listitems"><MdPrivacyTip size={30} style={{ margin: "0 10px" }} />Privacy policy</a></li>
                    <li ><a href="#" className="setting-listitems"><BsTelephoneForwardFill size={30} style={{ margin: "0 10px" }} />Contact us</a></li>
                    <li ><a href="#" onClick={(e)=>logOut(e)} className="setting-listitems"><BiLogOut size={30} style={{ margin: "0 10px" }} />log Out</a></li>
                   </ul>

                </div>
                <div className="nav-setting-icon">
                    <a href="#" onClick={showSetting}><FiSettings size={30} style={{ margin: "0 10px" }} />Setting</a>
                </div>
            </div>
        </ div>

    )
}

export default Navigation;