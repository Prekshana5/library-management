
import { useEffect, useState } from "react";
import axios from "axios";
import {  useNavigate, useParams } from "react-router-dom"
//import { useFormik } from "formik";
import { useCookies } from "react-cookie";
export function Details(){

    const [books,setbooks] = useState([{ID:0,title:" ",image:"",Genre:"",description:"",rating:{rate:0,count:0}}]);
    const[cookies,setCookie,removeCookie] = useCookies(['uName']);

    let params = useParams();
    let navigate = useNavigate();

    function LoadBookDetails(){
        axios.get(`http://127.0.0.1:4000/books/${params.ID}`).then(response =>{
            setbooks(response.data)
        })}

        

    useEffect(()=>{
        LoadBookDetails();

        if(cookies.uName == null) {
            navigate('/login') } 
    },[params.ID]);



    function handleCartItems(){
        let cartItems = {
            userName: cookies.uName,
            ID: books[0].ID,
            title: books[0].title,
            image: books[0].image,
            Genre: books[0].Genre

        }
        axios.post('http://127.0.0.1:4000/cartItems', cartItems);
        alert('Book Added to cart Successfully..');
       
        


    }
             
     return (
        <div>
            {
               
                books.map(book=>(
                    <div className="card p-2 m-2" key={book.ID} style={{width:"250px"}}>
                                <img src={book.image} className="card-img-top" alt="bookimages" height="200px"></img> 
                                <div className="card-header"  style={{height:"30px"}}>
                                    <dt>{book.title}  
                                    <span className="p-1 m-1">{book.rating.rate}<span className= "bi bi-star-fill text-success"></span></span> </dt>
                                </div> 
                                <div className="card-body" style={{height:"300px"}}>
                                    <dl>
                                    <p><b>Genre: </b>  {book.Genre}  <b> Count: </b>  {book.rating.count} </p>
                                    <p style={{height:"120px"}}>{book.description}</p>  

                                    </dl>
                                    
                                </div> 
                                <div className="card-footer">
                                    <button id="button" name={book.ID}  onClick={handleCartItems}className="btn btn-dark w-100 bi bi-cart3"> Add to Cart</button>
                                </div>
                                
                            </div>
                    

                ))

            }


        </div>
     )
 }