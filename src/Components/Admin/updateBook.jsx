//import { useCookies } from "react-cookie"
import axios from "axios";
import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { Link, useNavigate} from "react-router-dom";


export function UpdateBook(){

   

    const [cookies, setCookie, removeCookie] = useCookies('uName');
    const [books,setbooks] = useState([{ID:0,title:" ",image:"",Genre:"",description:"",rating:{rate:0,count:0}}]);
    let navigate = useNavigate();

   

    function LoadBooks(){
        axios.get('http://127.0.0.1:4000/books')
        .then(response=>{
            setbooks(response.data);
        })
    }

     useEffect(()=>{

        LoadBooks();

        if(cookies.uName == null) {
            navigate("/login")
        }

     },[]);


     function handleDeleteClick(e){
        let id= e.target.value;
        var flag = window.confirm(`Are you sure you want to Delete?`);
        if(flag===true) {

            
            axios.delete(`http://127.0.0.1:4000/deleteBook/${id}`);
            window.location.reload();

            navigate("/updateBook")
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
                        <th>Description</th>
                        <th>Rating</th>
                        <th>Count</th>
                        <th>Edit/Delete</th>
                    </tr>
                </thead>
                <tbody>
                    { 
                        books.map(book=>
                            <tr style={{borderBottom:"1px solid white"}} className="text-light"key={book.ID}>
                                 <td width="200">{book.ID}</td>
                                <td width="200">{book.title}</td>
                                <td>
                                    <img src={book.image} alt="img" width="100" height="100"></img>
                                </td>
                                <td width="200">{book.Genre}</td>
                                <td width="200">{book.description}</td>
                                 
                                 <td width="200">{book.rating?.rate}</td>
                                <td width="200">{book.rating?.count}</td> 
                                <td>
                                    <Link to={`/editBook/${book.ID}`} className="btn btn-warning bi bi-pen-fill me-2"></Link>
                                    {/* <button onClick={handleDeleteClick} className="btn btn-danger bi bi-trash-fill"></button> */}
                                    <button className="btn btn-danger bi bi-trash-fill" value={book.ID} onClick={handleDeleteClick}></button>
                                </td>
                            </tr>
                            )
                    }
                </tbody>
            </table>
            <div > <Link className="text-warning p-3 fw-bold" style={{ textDecoration: "none" }} to="/admin">Back to the Admin HomePage?</Link></div>
        </div>
    )
}