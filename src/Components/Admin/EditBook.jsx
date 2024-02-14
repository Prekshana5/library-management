import { useEffect, useState } from "react";
import axios from "axios";
import { useFormik } from "formik";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useCookies } from "react-cookie";

export function EditBook(){


    const [cookies, setCookie, removeCookie] = useCookies('uName');

    
    const [books,setbooks] = useState([{ID:0,title:" ",image:"",Genre:"",description:"",rating:{rate:0,count:0}}]);
    
    let navigate = useNavigate();
    let params = useParams();

    const formik = useFormik({
        initialValues: {
            ID: books[0].ID,
            title: books[0].title,
            image:books[0].image,
            Genre:books[0].Genre,
            description:books[0].description,
            rating: {
                rate: books[0].rating.rate,
                count: books[0].rating.count
            }
        },
        enableReinitialize: true,
        onSubmit: (values) => {
            axios.put(`http://127.0.0.1:4000/editBook/${params.id}`,values);
            alert('Book Updated..');
            navigate('/updateBook');
        }
    })


    useEffect(()=>{
        axios.get(`http://127.0.0.1:4000/books/${params.id}`)
        .then(response=>{
            setbooks(response.data);

            if(cookies.uName == null) {
                navigate("/login")
            }
    
        })
    },[]);



    return (
        <div>
            <h4 className="fw-bold p-4 text-warning">Edit Book</h4>
            <div className="d-flex justify-content-center align-items-center">
           <form onSubmit={formik.handleSubmit}>
                <dl>
                    <dt className="fw-bold p-2 text-white" >Book Id</dt>
                    <dd><input className="form-control"  type="number" value={formik.values.ID}  onChange={formik.handleChange} name="ID"/></dd>
                    <dt className="fw-bold p-2 text-white" >Title</dt>
                    <dd><input className="form-control"  type="text" value={formik.values.title}  onChange={formik.handleChange} name="title" /></dd>
                    <dt className="fw-bold p-2 text-white" >Image</dt>
                    <dd><input className="form-control"  type="text" value={formik.values.image}  onChange={formik.handleChange} name="image" /></dd>
                    <dt className="fw-bold p-2 text-white" >Description</dt>
                    <dd><textarea className="form-control"  value={formik.values.description}  onChange={formik.handleChange}  name="description"/></dd>
                    <dt className="fw-bold p-2 text-white" >Rating</dt>
                    <dd><input  className="form-control" type="text" value={formik.values.rating?.rate} onChange={formik.handleChange} name="rating.rate"/></dd>
                    <dt className="fw-bold p-2 text-white" >Count</dt>
                    <dd><input className="form-control"  type="number" value={formik.values.rating?.count} onChange={formik.handleChange} name="rating.count"/></dd>
                    
                </dl>
                <button className="btn btn-success">Save</button>
                <Link to="/updateBook" className='btn btn-danger ms-2'>Cancel</Link>
                <div > <Link className="text-white" style={{ textDecoration: "none" }} to="/admin">Back to the Admin HomePage?</Link></div>
            </form>
          
             
            </div>
        </div>
    )
}