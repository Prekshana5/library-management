
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Genre } from "./Genre";
import { BooksView } from "./BooksView";
import { Details } from "./details";


export function BooksHome(){

    return (
        <div>
            <BrowserRouter>
                
                <Routes>
                    <Route path="/" element={<Genre></Genre>}>
                        <Route path="books/:Genre" element={<BooksView></BooksView>}>
                            <Route path="details/:ID" element={<Details></Details>} />
                        </Route>         
                        </Route>
                   
                </Routes>
            </BrowserRouter>

        </div>
        
    )

}