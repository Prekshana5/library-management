import axios from "axios";
import { useFormik } from "formik";
import { useState } from "react";

//import { useEffect } from "react";
import { useCookies } from "react-cookie";
import {  useNavigate,Link } from "react-router-dom";




export function Login(){

    const [errorMsg,setErrorMsg]= useState('')

   // const [cookie,setCookie,removeCookie] = useCookies(['uName'])

    
    let navigate = useNavigate();
    
    const [cookies, setCookie, removeCookie] = useCookies(['uname']);

    const formik = useFormik({
        initialValues: { 
            user:'',
            UserName: '',
            Password: ''
        }, 
        onSubmit: (user)=> {


            if(user.user === "") setErrorMsg('Please select Admin or User')
            else{

                if(user.user === "admin") {

               

                    axios.get('http://127.0.0.1:4000/adminUsers')
                     .then(response=> {
                    
                    var userdetails = response.data.find(item=> item.UserName===user.UserName);
                    console.log(userdetails);
    
                    if(userdetails&&userdetails.UserName === user.UserName && userdetails.Password === user.Password){
                          setCookie('uName',user.UserName,[{expires: new Date('2024-01-30')}])
                            navigate("/admin");

                          // alert(cookies.uName)
                       
                    }else setErrorMsg('Invalied Credentials Please try again') })
                
    
                }else { 
    
    
                axios.get('http://127.0.0.1:4000/users')
                .then(response=> {
    
                    var userdetails = response.data.find(item=> item.UserName===user.UserName);
    
                    console.log(userdetails);
    
                    if(userdetails&& userdetails.UserName === user.UserName && userdetails.Password === user.Password){
                            setCookie("uName",user.UserName,[{expires: new Date('2024-01-30')}])
                            navigate("/");
                       
                    } else setErrorMsg('Invalied Credentials Please try again') 
                    
                      
                })
    
                }
        }
            
            

        }
    })

  



    return (
        <div>
            <h3 className="text-white bi bi-person m-4 ">Login User</h3> 

            <div className="d-flex justify-content-center align-items-center">
            <form  onSubmit={formik.handleSubmit}>
            <div>
                    <label className="fw-bold p-2 text-white">Admin </label>
                        <input type="radio" name="user" value="admin" onChange={formik.handleChange} />
                        <label className="fw-bold p-2 text-white">User </label>
                        <input type="radio"  name="user" value="user" onChange={formik.handleChange} />
                    </div>
                <div>
                    <label className="form-label fw-bold text-white">User Name</label>
                    <div>
                        <input type="text" className="form-control" name="UserName" onChange={formik.handleChange} />
                    </div>
                </div>
                <div className="mb-3">
                    <label className="form-label fw-bold text-white">Password</label>
                    <div>
                        <input type="password" className="form-control"   name="Password" onChange={formik.handleChange} />
                    </div>
                </div>
                <div className="mb-2">
                    <button type="submit"  className="btn btn-warning w-100" >Login</button>
                </div>

                <div > <Link  className="text-white" style={{textDecoration:"none"}}to="/welcome">Back to the HomePage?</Link></div>

                <div className="text-danger"> {errorMsg} </div>
                
            </form>
        </div>
        </div>
    )
}