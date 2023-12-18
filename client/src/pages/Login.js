import { useEffect, useState } from "react"
import { SignIn } from "../api/generalAPI"
import { useNavigate } from "react-router-dom"

export const Login = () => {
    const navigate = useNavigate()
    const [username,setUsename]=useState('')
    const [password,setPassword]=useState('')

    const handleUsernameOnChange=(ev)=>{
        setUsename(ev.target.value)
    }
    const handlePasswordOnChange=(ev)=>{
        setPassword(ev.target.value)
    }
    const handleSignIn=(ev)=>{
        ev.preventDefault()
        SignIn(username,password)
            .then((respone)=>{
                if (respone.message) console.log(respone.message)
            })
    }
    useEffect(()=>{
        //The do nothing but preventing the page from reloading
    },[])
    return (
        <div>
            <main style={{paddingLeft:"35%",paddingRight:'35%',paddingTop:'10%'}} class="form-signin w-100 m-auto">
                <form>
                    {/* <img class="mb-4" src="/docs/5.3/assets/brand/bootstrap-logo.svg" alt="" width="72" height="57" /> */}
                    <h1 class="h3 mb-3 fw-normal">Please sign in</h1>

                    <div class="form-floating">
                        <input onChange={handleUsernameOnChange} type="text" class="form-control" id="floatingInput" />
                        <label for="floatingInput">User name</label>
                    </div>
                    <div class="form-floating">
                        <input onChange={handlePasswordOnChange} type="password" class="form-control" id="floatingPassword" placeholder="Password" />
                        <label for="floatingPassword">Password</label>
                    </div>

                    <div class="form-check text-start my-3">
                        <input class="form-check-input" type="checkbox" value="remember-me" id="flexCheckDefault" />
                        <label class="form-check-label" for="flexCheckDefault">
                            Remember me
                        </label>
                    </div>
                    
                    <div className="btn-group w-100" role="group" aria-label="Button Group">
                        <button onClick={handleSignIn} className="btn btn-primary w-100 py-2 btn-3d" style={{
                            border: 'none',
                            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
                            transform: 'translateY(0)',
                            transition: 'transform 0.2s ease-in-out',
                        }}>Sign in</button>
                        
                        
                    </div>
                    <p class="mt-5 mb-3 text-body-secondary">© 2017–2023</p>
                </form>
            </main>
        </div>
    )
}