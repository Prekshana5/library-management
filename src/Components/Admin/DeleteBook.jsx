import { useEffect, useState } from "react";
import axios from "axios";
//import { useFormik } from "formik";
import { useNavigate, useParams, Link } from "react-router-dom";

export function DeleteBook()
{
    const [books,setbooks] = useState([{ID:0,title:"",image:"",Genre:"",description:"",rating:{rate:0,count:0}}]);
    
    let navigate = useNavigate();
    
    let params = useParams();

    useEffect(()=>{
        axios.get(`http://127.0.0.1:4000/books/${params.ID}`)
        .then(response=>{
            setbooks(response.data);
        })
    },[]);

    function handleDeleteClick(){
        axios.delete(`http://127.0.0.1:4000/deleteBook/${params.ID}`);
        alert('Book Deleted');
        navigate('/updateBook');
    }

     return(
        <div>
            <h3 className="fw-bold p-2 text-white">Delete Book</h3>
            <div>
                <h3 className="fw-bold p-2 text-white">{books.title}</h3>
                <img src={books.image} alt="img" width="100" height="100"></img>
                
            </div>
            <div className="mt-3">
                <button onClick={handleDeleteClick} className="btn btn-danger me-2">Delete</button>
                <Link to="/updateBook" className="btn btn-warning">Cancel</Link>
            </div>
        </div>
     )
}