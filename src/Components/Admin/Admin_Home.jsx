
import { LibraryHeader } from '../Library-Header/Library-Header';

import { Link, Outlet, useNavigate} from "react-router-dom";

import './Admin_Home.css';
import { useCookies } from 'react-cookie';
import { useEffect } from 'react';


export function AdminHome() {
    const[cookies,setCookie,removeCookie] = useCookies('uName');


    let navigate = useNavigate();
    function handleSignOut(){

        removeCookie('uName');
        navigate("/login")
       }

    useEffect(() => {

        if(cookies.uName == null) {
            navigate("/login")
        }
    },[]);

        

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
            
            <div  className='text-white fw-bold m-4' >Welcome {cookies.uName }</div> 
            <div><button onClick={handleSignOut} className="btn btn-warning position-relative m-2 ">SignOut</button></div> 
            </div>
            </header>


            <button type="button" className="btn btn-light ms-3">
                <Link className='text-black text-decoration-none' to="/addBook">Add A New Book</Link></button>
            <button type="button" className="btn btn-light ms-3">
                <Link className='text-black text-decoration-none' to="/AllBooks" >View All The Books</Link></button>
            <button  type="button"className="btn btn-light ms-3">
                <Link className='text-black text-decoration-none' to="/updateBook" >Update The Books</Link></button>
            {/* <button type="button" className="btn btn-light ms-3">Delete the Books</button>     */}

            <div>
                <Outlet></Outlet>
            </div>   

        </>
    )

}