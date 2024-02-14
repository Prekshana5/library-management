
//import { useEffect, useState } from "react";
import axios from "axios";
import {  Link, useNavigate } from "react-router-dom"
import { useFormik } from "formik";
import { useState } from "react";


export function AddBook(){

    const [userError, setUserError] = useState('');
    const [clsName, setClsName] = useState('')

    
    let navigate = useNavigate;

    const formik = useFormik({
        initialValues: {

            ID: 0,
            title: "",
            image: "",
            Genre: "",
            description: "",
            rate: 0.0,
            count: 0,
    
        },
        onSubmit : (values)=>{

            axios.get('http://127.0.0.1:4000/books')
            .then(response=>{
            

            var bookId = response.data.find(item => item.ID === values.ID);
                        
                        if (bookId) {

                            setUserError('Please choose other ID');
                            setClsName('text-danger')

                        } else {

                            axios.post('http://127.0.0.1:4000/addBook', values);
                             alert('Book Added Successfully..');
                            navigate('/admin');
                            
                        }

        })
    }
})

  

    return(
        <div>
            <h4 className="fw-bold p-4 text-warning">New Book</h4>
            <div className="d-flex justify-content-center align-items-center">
            <form onSubmit={formik.handleSubmit}>
                <dl>
                    <dt className="fw-bold p-2 text-white" >Book Id</dt>
                    <dd><input  className="form-control"  type="number" onChange={formik.handleChange} name="ID"/>
                    <p className={clsName}>{userError}</p></dd>
                    <dt className="fw-bold p-2 text-white">Title</dt>
                    <dd><input  className="form-control" type="text" onChange={formik.handleChange} name="title" /></dd>
                    <dt className="fw-bold p-2 text-white">Image</dt>
                    <dd><input  className="form-control"  type="text" onChange={formik.handleChange} name="image" /></dd>
                    <dt className="fw-bold p-2 text-white">Genre</dt>
                    <dd><input  className="form-control"  type="text" onChange={formik.handleChange}  name="Genre"/></dd>
                    <dt className="fw-bold p-2 text-white">Description</dt>
                    <dd><textarea  className="form-control"  onChange={formik.handleChange} name="description"/></dd>
                    <dt className="fw-bold p-2 text-white">Rating</dt>
                    <dd><input  className="form-control"  type="text" onChange={formik.handleChange} name="rate"/></dd>
                    <dt className="fw-bold p-2 text-white">Count</dt>
                    <dd><input  className="form-control" type="number" onChange={formik.handleChange} name="count"/></dd>
                    <button className="btn btn-warning fw-bold form-control">Add</button>
                    
                </dl>
                <div > <Link className="text-warning p-3 fw-bold" style={{ textDecoration: "none" }} to="/admin">Back to the Admin HomePage?</Link></div>
                
            </form>

            </div>
            
        </div>
    )
}