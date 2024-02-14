import { useFormik } from "formik"
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useState} from "react";


export function Register() {

    
    const [userError, setUserError] = useState('');
    const [clsName, setClsName] = useState('')

    let navigate = useNavigate();

    const formik = useFormik(
        {
            initialValues: {
                EmailId: '',
                UserName: '',
                Password: '',
                MobileNum: ''
            },
            onSubmit: (user) => {

               // console.log("function   " + VerifyUserId())

                axios.get('http://127.0.0.1:4000/users')
                    .then(response => {

                        var userdetails = response.data.find(item => item.UserName === user.UserName);
                        
                        if (userdetails) {

                            setUserError('UserId taken');
                            setClsName('text-danger')

                        } else {
                            axios.post('http://127.0.0.1:4000/register', user)
                            alert("User Registered");
                            navigate("/login")
                        }
                    }


                    )
            }


        }

    )


    return (
        <div>
            <h3 className="text-warning m-4" >User Regestration </h3>

            <div className="d-flex justify-content-center align-items-center">

                <form className="w-25" onSubmit={formik.handleSubmit}>

                    <div className="mb-2">
                        <label className="form-label fw-bold text-white" >Email Id<span className="text-danger "> *</span></label>
                        <input className="form-control" type="text" name="EmailId" placeholder="jhon98@gmail.com" required onChange={formik.handleChange} />
                    </div>
                    <div>
                        <label className="form-label fw-bold text-white" >User Name<span className="text-danger "> *</span></label>
                        <input className="form-control" type="text" name="UserName" placeholder="jhon98" required onChange={formik.handleChange} />
                        <p className={clsName}>{userError}</p>

                    </div>

                    <div className="mb-2">
                        <label className="form-label fw-bold text-white" >Password<span className="text-danger "> *</span></label>
                        <input className="form-control" type="password" name="Password" placeholder="jhon@98" required onChange={formik.handleChange} />

                    </div>
                    <div className="mb-2">
                        <label className="form-label fw-bold text-white" >Mobile Number<span className="text-danger "> *</span></label>
                        <input className="form-control" type="text" name="MobileNum" placeholder="8322485675" required onChange={formik.handleChange} />

                    </div>
                    <div className="mb-2">
                        <button type="submit" className="btn btn-warning w-100">Register</button>
                    </div>
                    <div > <Link className="text-white" style={{ textDecoration: "none" }} to="/welcome">Back to the HomePage?</Link></div>

                </form>


            </div>


        </div>



    )
}