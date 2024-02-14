import { useEffect, useState } from "react";
import axios from "axios";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { LibraryHeader } from "../Library-Header/Library-Header";
import { useCookies } from "react-cookie";



export function Genre() {



    const [genre, setgenre] = useState([])

    const[cookies,setCookie,removeCookie] = useCookies(['uName']);
    let navigate = useNavigate();

    
    function Loadbooks() {

        axios.get("http://127.0.0.1:4000/check/catogeries")
            .then(response => {
                setgenre(response.data)
            })
    }

    useEffect(() => {
        Loadbooks();

        if(cookies.uName == null) {
            navigate("/login")
        }
    },[]);

   

    return (


        <div>
            <LibraryHeader> </LibraryHeader>
            <h3 className="text-warning p-4"> Select Book Catogies </h3>
            <div  className="p-4 d-flex justify-content-between">
                {

                    genre.map(genre =>

                        <div className="rounded-circle bg-primary text-center p-5" key={genre}> <Link style={{ textDecoration: "none", color: "white" }} to={`books/${genre}`}> {genre} </Link> </div>
                    )

                }       
            </div>


            <div>
                <Outlet></Outlet>
            </div>

        </div>
    )
}