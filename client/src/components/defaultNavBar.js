import React, { useState, useEffect } from 'react';
import { GetAllNotifications,GetNotification } from '../api/generalAPI';


export const DefaultNavBar = ()=>{

    const [isEmpty,setIsEmpty]= useState(false);
    const [notifications,setNotifications] = useState([]);
    useEffect(() => {
        GetAllNotifications()
            .then(respone => {
                console.log(respone)
                setNotifications(respone)
                if(respone.message){
                  setIsEmpty(true)
                  console.log(respone.message)

                }
            })
    }, [])

    
    return(
        <nav class="navbar bg-body-tertiary fixed-top">
            <div class="container-fluid">
                <a class="navbar-brand" href="#">Online Academy</a>
                <div class="me-2 position-relative d-flex justify-content-end mt-n5">
                    <a href="/">
                        <img src="https://i.imgur.com/Y5wXAX5.png" height='60px' width='80px' class="avatar-xl position-relative" alt="avatar" />
                    </a>
                </div>
                <button class="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
                    <div class="offcanvas-header">
                        <h5 class="offcanvas-title" id="offcanvasNavbarLabel">Online Academy</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                    </div>
                    <div class="offcanvas-body">
                        <ul class="navbar-nav justify-content-end flex-grow-1 pe-3">
                            <li class="nav-item">
                                <a class="nav-link active" aria-current="page" href="#">Home</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link active" aria-current="page" href="/topic">Đề tài tham khảo</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link active" aria-current="page" href="/lecturer">Danh sách giảng viên</a>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Announcements
                                </a>
                                <ul className="dropdown-menu">
                                    {isEmpty ? (
                                    <li><a className="dropdown-item" href="#">No announcement</a></li>
                                    ) : (
                                    <>  
                                        {notifications.map((notify, index) => (
                                        <div key={index}>
                                            <li><a className="dropdown-item" href="#">{notify.title} (Date: {notify.lastUpdatedAt.split("T")[0]})</a></li>
                                        </div>
                                        ))}
                                       
                                    </>
                                    )}
                                </ul>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link active" aria-current="page" href="/login">Sign in</a>
                            </li>
                            
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    )
}