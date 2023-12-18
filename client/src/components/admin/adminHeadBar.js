import { useState } from "react"

export const AdminHeadBar = (props) => {
    // const [content,setContent] = useState(props.content)
    // console.log(props.content)
    
    return(
        <nav class="navbar bg-body-tertiary fixed-top headbar-admin">
            <div class="container-fluid">
               
                <div class="me-2 position-relative d-flex justify-content-end mt-n5">
                    <a href="/">
                        <img src="https://i.imgur.com/Y5wXAX5.png" height='60px' width='80px' class="avatar-xl position-relative" alt="avatar" />
                    </a>
                </div>
                
                
            </div>
        </nav>
    )
}