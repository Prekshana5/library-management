
import './Library-welcome.css';

import { Link} from "react-router-dom";


export function LibraryWelcome() {


    return (
        <>    

        <header>

                <div className="p-4 d-flex">
                    <div className='text-light'>
                        <img src="logo.jpeg" alt="logo" hieght="80px" width="130px" />
                        <p>Library Management </p>
                    </div>

                </div>
            </header>

            <div className="container-fluid d-flex justify-content-center align-items-center p-5">
                <h1 className="text-warning">Welcome to library management system</h1>


            </div>


            <button type="button" className="btn btn-light ms-3">
                <Link className='text-black text-decoration-none' to="/login">My Account</Link></button>
            <button type="button" className="btn btn-light ms-3">
                <Link className='text-black text-decoration-none' to="/register" >New User?</Link></button>
            <button  type="button"className="btn btn-light ms-3  ">Daily Timings</button>
            <button type="button" className="btn btn-light ms-3  ">Contact US </button>       

        </>
    )

}