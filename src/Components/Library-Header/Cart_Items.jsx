//import { useCookies } from "react-cookie"
import axios from "axios";
import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import {  useNavigate} from "react-router-dom";


export function CartItems(){

   

    const [cookies, setCookie, removeCookie] = useCookies('uName');

    const [books,setbooks] = useState([{userName:"",title:" ",image:"",Genre:""}]);
  
    let navigate = useNavigate();
  

    function LoadBooks(){
        axios.get(`http://127.0.0.1:4000/getCartItems/${cookies.uName}`)
        .then(response=>{
            setbooks(response.data);
        })
    }

     useEffect(()=>{

        LoadBooks();

        if(cookies.uName == null) {
            navigate(`/cartItems/${cookies.uName}`)
        }

     },[]);

     function handleClick(){
        alert("books successfully Obtained.");
        navigate("/")
     }

     function handleDeleteClick(e){
        let id= e.target.value;
        var flag = window.confirm(`Are you sure you want to Delete?`);
        if(flag===true) {

            
            axios.delete(`http://127.0.0.1:4000/cartDeleteBook/${id}`);
            window.location.reload();

            navigate("/cartItems")
        }
    }


    return(
        <div>
            {/* <h3> {cookies['adminName']} - Dashboard</h3> */}
            
            <table  className="table-transparent table-hover container-fluid ">
                <thead style={{borderBottom:"1px solid white"}} >
                    <tr className="text-warning fw-bold">
                    <th style={{width:"5%"}}>ID</th>
                        <th>Title</th>
                        <th>Image</th>
                        <th>Genre</th>
                    </tr>
                </thead>
                <tbody>
                    { 
                        books.map(book=>
                            <tr style={{borderBottom:"1px solid white"}} className="text-light" key={book.title}>
                                
                                <td width="200">{book.ID}</td>
                                <td width="200">{book.title}</td>
                                <td>
                                    <img src={book.image} alt="img" width="100" height="100"></img>
                                </td>
                                <td width="200">{book.Genre}</td>

                                <td>
                                    <button className="btn btn-danger bi bi-trash-fill" value={book.ID} onClick={handleDeleteClick}></button>
                                </td>
                            </tr>
                            )
                    }
                </tbody>
            </table>
            <div > <button onClick={handleClick} className="btn btn-warning p-2 m-3 fw-bold" >Finish</button></div>
        </div>
    )
}