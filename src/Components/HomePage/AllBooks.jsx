//import { useCookies } from "react-cookie"
import axios from "axios";
import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { Link, Outlet, useNavigate} from "react-router-dom";
import { LibraryHeader } from "../Library-Header/Library-Header";

export function AllBooks(){

   

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



    return(
<div>

<LibraryHeader> </LibraryHeader>
        <div className="card-container">
{

books.map(book=>(
    <div className="card p-2 m-2" key={book.ID} style={{ width: "250px", display: "inline-block" }}>
                <Link key={book.ID} to={`details/${book.ID}`}>

                <img src={book.image} className="card-img-top" alt="bookimages" height="200px"></img> 
                <div className="card-header"  style={{height:"30px"}}>
                    <dt>{book.title}  </dt>           
                </div> 
                </Link>
            </div>
    
    

))

}

<div class="mx-auto">
    <Outlet></Outlet>
</div>





                    
            

        </div>

</div>
       

        
        
    )
}
