import React, { useEffect, useState } from "react";
import { DefaultNavBar } from "../components/defaultNavBar.js";
import {NavigationBar} from '../components/NavBar';
import Badge from 'react-bootstrap/Badge';
import { GetUserSession } from "../api/generalAPI";
import { useNavigate } from "react-router-dom";
export default function Homepage() {
    const navigate = useNavigate();
    const [hasSession, setHasSession] = useState(false);
    const [user, setUser] = useState();
    useEffect(() => {
        GetUserSession()
            .then(respone => {
                if (respone.userinfo !== null && typeof (respone.userinfo) !== 'undefined') {
                    console.log("Userinfo",respone.userinfo);
                    setHasSession(true)
                    setUser(respone.userinfo)
                    if(respone.userinfo==="ADMIN"){
                        navigate("/admin");
                    }
                }else {
                  console.log("error");
                }
    
            })
    }, [])



    return (

        <div className="hot-topic-section">
            {!hasSession ? (
        // Render tutor-specific content
            <DefaultNavBar></DefaultNavBar>
            ) : (
                <NavigationBar user={user} > </NavigationBar>
            )}
            
            <h2>
                Welcome <Badge bg="secondary">User</Badge>
            </h2>
            <h3 style={{marginTop:"20%"}}>You can use sidebar for locating</h3>
        </div>
               
    )
}