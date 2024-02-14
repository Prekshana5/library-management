
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import { LibraryFooter } from '../Library-Footer/Library-Footer';
import './Library-welcome.css';

//import { Link} from "react-router-dom";
//import { BooksHome } from '../HomePage/Home';
import { Login } from './login';
import { Register } from './regester';
import { Genre } from "../HomePage/Genre";
import { BooksView } from "../HomePage/BooksView";
import { Details } from "../HomePage/details";
import { LibraryWelcome } from './Login-welcome';
import { AdminHome } from '../Admin/Admin_Home';
import { AddBook } from '../Admin/AddBook';
import { UpdateBook } from '../Admin/updateBook';
import { EditBook } from '../Admin/EditBook';
import { DeleteBook } from '../Admin/DeleteBook';
import { CartItems } from '../Library-Header/Cart_Items';
import { AllBooks } from '../HomePage/AllBooks';

export function LibraryRoutes() {


    return (
        <>
        <BrowserRouter>

        

            <main>
                <Routes>
                     
                    <Route path="welcome" element={<LibraryWelcome></LibraryWelcome>}/>
                    <Route path="/login" element={<Login></Login>}/>
                    <Route path="register" element={<Register></Register>}/>
                    <Route path="/" element={<Genre></Genre>}>
                        <Route path="books/:Genre" element={<BooksView></BooksView>}>
                            <Route path="details/:ID" element={<Details></Details>} />
                        </Route>         
                    </Route>
                    <Route path="/admin" element={<AdminHome></AdminHome>}/>
                    <Route path="/addBook" element = {<AddBook></AddBook>}/>   
                    <Route path="/updateBook" element={<UpdateBook></UpdateBook>}/>    
                    <Route path="/editBook/:id" element={<EditBook></EditBook>}/> 
                    <Route path="/deleteBook/:id" element={<DeleteBook></DeleteBook>}/> 
                    <Route path="/cartItems/:uName" element={<CartItems></CartItems>}/> 
                    <Route path="/AllBooks" element={<AllBooks></AllBooks>} >
                        <Route path="details/:ID" element={<Details></Details>} />

                    </Route>
                        
                        

                </Routes>

            </main>


            

            <LibraryFooter></LibraryFooter>



        </BrowserRouter>
            

        </>
    )

}