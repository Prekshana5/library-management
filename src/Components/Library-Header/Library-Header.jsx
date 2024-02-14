import { useCookies } from 'react-cookie';
import './Library-Header.css'
import axios from "axios";
import { Link, useNavigate, useParams} from "react-router-dom";
import { useState, useEffect } from "react";



export function LibraryHeader() {

    let params = useParams();
    const[count,setCount] = useState(0);

   
    const[cookies,setCookie,removeCookie] = useCookies('uName');

    let navigate = useNavigate();


   function handleSignOut(){

    removeCookie('uName');
    navigate("/login")
   }

   function loadcount(){

    axios.get(`http://127.0.0.1:4000/cartItemsNumber/${cookies.uName}`)
        .then(response=>{
            setCount(response.data);
        })
    }

     useEffect(()=>{
            loadcount();
   },[])

    return (
        <>
            <header>
            
                <div className="p-4 d-flex justify-content-between">
                <div className="p-4 d-flex">
                    <div className='text-light'>
                        <img src="logo.jpeg" alt="logo" hieght="80px" width="130px" />
                        <p>Library Management </p>
                    </div>

                </div>
                     
                    
                    <div className='d-flex'> 
                        <Link className='text-white fw-bold m-4' style={{textDecoration:"none"}} to="/">Home</Link>    
                        <Link className='text-white fw-bold m-4' style={{textDecoration:"none"}} to="/AllBooks">All Books</Link>
                        

                    </div>
                    
                    <div className="d-flex fs-6">
                    <div  className='text-white fw-bold m-4' >Welcome {cookies.uName }</div> 
                    
                    <div>
                    <Link to={`/cartItems/${cookies.uName}`}><button className=" btn btn-light bi-cart4 position-relative m-2">
                     <span className="badge position-absolute rounded rounded-circle bg-danger text-white">{count.count}</span>
                    </button> </Link>
                    </div>

                    <div><button onClick={handleSignOut} className="btn btn-warning position-relative m-2 ">SignOut</button></div> 
                    
                </div>

                </div>

            </header>

        </>
    )

}