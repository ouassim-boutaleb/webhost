import React from "react";

import logo from "../assets/icons/logo.jpg";
import { Link , useNavigate} from "react-router-dom";
import { useFormik,  } from "formik";
import * as Yup from "yup";
import axios from 'axios';


function SignUp(props) {
 const navigate = useNavigate();
  
  
  const formik = useFormik({
    initialValues: {
      firstname: "",
      lastname: "",
      phoneNumber: "",
      email: "",
      password: "",
      cPassword: "",
      userType: "",
      file: null,
      category: ""
      
    },
    validationSchema: Yup.object({
      firstname: Yup.string().required("both name and family name are required"),
      lastname: Yup.string().required(
        "both name and family name are required"
      ),
      email: Yup.string()
        .required("please enter your Email")
        .email("Please Enter a valid Email"),
      password: Yup.string()
        .required("please enter your password")
        .matches(
          /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
          "Must contain 8 characters, one letter and one number"
        ),
      phoneNumber: Yup.string()
        .required("please enter your phone number")
        .matches(/^(06|07|05)[0-9]{8}$/, "Enter a valid Phone Number"),
      cPassword: Yup.string()
        .required("please confirm your password")
        .oneOf([Yup.ref("password"), null], "Passwords must match"),
      userType: Yup.string().required("please select your type of account"),
      category: Yup.string().required("please select your product's category"),
      // file: Yup.mixed().required("please upload your file").test(
      //   "fileType",
      //   "Unsupported File Format",
      //   (value) => {
      //     if (!value) return true; // Skip validation if no file is selected
      //     const supportedFormats = ["image/jpeg", "image/png", "application/pdf"];
      //     return supportedFormats.includes(value.type);
      //   }
      // )
    }),

    onSubmit: async (values)=> {
      const data = {
        firstname: values.firstname,
        lastname: values.lastname,
        phoneNumber: values.phoneNumber,
        email: values.email,
        password: values.password,
        userType: values.userType,
        paperBase64: values.file,
        category: values.category,
      };

      try {
        const response = await axios.post("https://backendhost-production-1804.up.railway.app/auth/register", data, {
          headers: {
            "Content-Type": "application/json",

          },
        });
        console.log("Form submitted successfully:", response.data.user);

        localStorage.setItem("id", response.data.user.id );
        navigate('/verifyotp');
        
        
      } catch (error) {
        
        console.error("Error submitting form:", error);
      }
    }
  });

  const handleFileChange = (event) => {
    
    const file = event.currentTarget.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onloadend = () => {
      formik.setFieldValue("file", reader.result); // Set the Base64 string
      formik.setFieldValue("fileName", file.name); // Set the file name
    };
    reader.readAsDataURL(file); // Convert the file to Base64
  }
  };
  console.log(formik.values.file);

 

  return (
    <div className="bg-gray-100 w-screen h-screen  ">
      <div className="container flex items-center justify-center h-full">
        <div className="w-[600px] bg-white rounded-sm pb-3 mb-[1px] ">
          <div className="flex items-center gap-2 justify-center ">
            <img src={logo} alt="" className="w-[60px]" />
            <h3 className="text-[#FF6F00] text-xl font-medium">Serbili Shop</h3>
          </div>
          <div className="bg-[#F7EDE8] text-center text-gray-600 capitalize px-16 py-2 mx-10 mb-[3px]">
            <h3 className="text-black font-medium text-[15px] mb-[3px]">
              Welcome To Serbili Shop
            </h3>
            <p className="text-[11px] ">
              fill out your information below to be <br />
              signed up for our shop
            </p>
          </div>
          <form action="" className="px-10" onSubmit={formik.handleSubmit}>
            <div className="flex items-center gap-4 ">
              <div className="flex flex-col w-1/2">
                <label htmlFor="firstname" className="text-sm">
                  First Name
                </label>
                <input
                  type="text"
                  name="firstname"
                  id="firstname"
                  className="border border-[#ccc]  py-2 rounded-md px-2 mt-[2px] placeholder:text-sm"
                  placeholder="Enter Your First Name"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.firstname}
                />
              </div>
              <div className="flex flex-col w-1/2 ">
                <label htmlFor="lastname" className="text-sm">
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastname"
                  id="lastname"
                  className="border border-[#ccc] py-2 rounded-md px-2 mt-[2px] placeholder:text-sm"
                  placeholder="Enter Your Last Name"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.lastname}
                />
              </div>
            </div>
            {(formik.errors.firstname || formik.errors.lastname) &&
            (formik.touched.firstname || formik.touched.lastname) ? (
              <p className="text-red-700 text-[10px] ">*{formik.errors.firstname}</p>
            ) : null}
            <div className="flex flex-col ">
              <label htmlFor="email" className="text-sm">
                Email
              </label>
              <input
                type="text"
                name="email"
                id="email"
                className="border border-[#ccc] py-2 rounded-md px-2 mt-[2px] placeholder:text-sm"
                placeholder="Enter Your Email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
              />
            </div>
            {formik.errors.email && formik.touched.email ? (
              <p className="text-red-700 text-[10px]">
                *{formik.errors.email}
              </p>
            ) : null}
            <div className="flex flex-col ">
              <label htmlFor="phoneNumber" className="text-sm">
                Phone Number
              </label>
              <input
                type="text"
                name="phoneNumber"
                id="phoneNumber"
                className="border border-[#ccc] py-2 rounded-md px-2 mt-[2px] placeholder:text-sm"
                placeholder="Enter Your Phone Number"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.phoneNumber}
              />
            </div>
            {formik.errors.phoneNumber && formik.touched.phoneNumber ? (
              <p className="text-red-700 text-[10px]">
                *{formik.errors.phoneNumber}
              </p>
            ) : null}

            <div
              className={`flex items-center gap-4 ${
                !formik.errors.password && !formik.errors.cPassword
                  ? "mb-2"
                  : "mb-[4px]"
              } `}
            >
              <div className="flex flex-col w-1/2">
                <label htmlFor="password" className="text-sm">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  className="border border-[#ccc] py-2 rounded-md px-2 mt-[2px] placeholder:text-sm"
                  placeholder="Enter Your Password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                />
              </div>
              <div className="flex flex-col w-1/2">
                <label htmlFor="cPassword" className="text-sm">
                  Confirm Password
                </label>
                <input
                  type="password"
                  name="cPassword"
                  id="cPassword"
                  className="border border-[#ccc] py-2 rounded-md px-2 mt-[2px] placeholder:text-sm"
                  placeholder="Confirm Your Password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.cPassword}
                />
              </div>
            </div>
            {formik.errors.password && formik.touched.password ? (
              <p className="text-red-700 text-[10px] mb-1">
                *{formik.errors.password}
              </p>
            ) : null}
            {formik.errors.cPassword &&
            formik.touched.cPassword &&
            !formik.errors.password ? (
              <p className="text-red-700 text-[10px] ">
                *{formik.errors.cPassword}
              </p>
            ) : null}
            <div>
              <select
                name="userType"
                id="userType"
                className="w-full border-[2px] rounded-md py-2 px-3 cursor-pointer"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.userType}
              >
                <option value="">Select Your Profile Type</option>
                <option value="shop">I'm a Shop</option>
                <option value="warehouse">I'm a Warhouse</option>
              </select>
              {formik.errors.userType && formik.touched.userType ? (
                <p className="text-red-700 text-[10px]">
                  *{formik.errors.userType}
                </p>
              ) : null}
            </div>

              {/* Add Category of your products */}

              <div className="mt-2">
              <select
                name="category"
                id="category"
                className="w-full border-[2px] rounded-md py-2 px-3 cursor-pointer"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.category}
              >
                <option value="">Select Your product's category</option>
                <option value="Electronics">Electronics</option>
                <option value="Clothes">Clothes</option>
                <option value="Food">Food</option>
                <option value="Furniture">Furniture</option>
              </select>
              {formik.errors.category && formik.touched.category ? (
                <p className="text-red-700 text-[10px]">
                  *{formik.errors.category}
                </p>
              ) : null}
            </div>

            { !formik.values.file  ?
            
            <div>
              <h3 className="mt-[4px] font-medium">Upload Your File</h3>
              <p className="text-[12px] text-gray-600 mb-2">
                Please Upload The File You Want To Share With Us
              </p>
              <label
                htmlFor="file"
                className="text-center py-5 w-full border-dotted border-[2px] block mt-2 cursor-pointer "
              >
                <span className="text-[#FF6F00] font-medium">Choose File</span>{" "}
                Or Drop Here
              </label> 
              <input
                type="file"
                name="file"
                id="file"
                className="hidden"
                onChange={handleFileChange}
                onBlur={formik.handleBlur}
              /> 
              {/* {formik.errors.file && formik.touched.file ? 
              <p>*{formik.errors.file}</p>
              :
              null
            } */}
              
            </div>
            
            
            :
            <h3>
              {formik.values.fileName}
            </h3>
}

            <button
              type="submit"
              className={`w-full py-2 text-white font-medium  mt-3 ${formik.isSubmitting ? 'bg-[#f7a86c] cursor-not-allowed' : 'bg-[#FF6F00]'} `}
            >
              Sign Up
            </button>
            <div className="text-center my-3 flex justify-center items-center gap-1">
              <p>I already Have an Account</p>
              <Link to={"/login"} className="text-[#FF6F00] font-medium">
                Login
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignUp;