import axios from "axios";
import { useEffect, useState } from "react";
import { Link, Outlet, useParams } from "react-router-dom"

export function BooksView(){

    const [books, setbooks] = useState([]);

    let params = useParams();

    function LoadBooksGenre(url)
    {
        console.log("coming here")
        //axios.get(`http://127.0.0.1:4000/books/genre/${params.Genre}`)
         axios.get(url)
        .then(response=>{
            setbooks(response.data);
        }
        );

    }

    useEffect(()=>
    {
        var url=`http://127.0.0.1:4000/books/genre/${params.Genre}`;
        LoadBooksGenre(url);
        
    },[params.Genre]);          

    return(
        <div>
            <div style={{display:'grid', gridTemplateColumns:'6fr 6fr'}}>

              <div>
               <h3 className="text-warning"> {params.Genre} Genre Boooks Here-- </h3> 
              
                
                { 

                
                    books.filter(books=>params.Genre===books.Genre).map(book=>
                        
                            <dl key={book.ID}>
                                <dt><img src={book.image}  width="100" height="100" alt="imgs" style={{margin:'20px', display:'block'}}/></dt>
                                <Link key={book.ID} to={`details/${book.ID}`} >
                                 <dt className="text-start m-2">{book.title}</dt></Link>
                            </dl>
                        
                        )
                }
              </div>
              <div>
                    <Outlet></Outlet>
              </div>
            </div>

            <p>
                <Link to="/">Back to BooksHome</Link>
            </p>
            
        </div>
    )
}