// import { Link } from "react-router-dom";
// import addImage from "../assets/addImage.png";
// import "../../src/styles/Register.scss";

// const RegisterPage = () => {
//     return (
//         <div className="register">
//             <div className="register-container">
//                 <form>
//                     <input type="text" name="firstName" required />
//                     <input type="text" name="lastName" required />
//                     <input type="email" name="email" required />
//                     <input type="password" name="password" required />
//                     <input type="password" name="confirmPassword" required />
//                     <input
//                         id="image"
//                         type="file"
//                         name="profileImage"
//                         accept="image/*"
//                         style={{ display: "none" }}
//                         required
//                     />
//                     <label htmlFor="image">
//                         <img src={addImage} alt="add profile photo" />
//                         <p>Upload Your Photo</p>
//                     </label>
//                     <button type="submit">REGISTER</button>
//                 </form>
//                 <Link to="/login">Already have an account ? Login Here</Link>
//             </div>
//         </div>
//     );
// };

// export default RegisterPage;

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import "../styles/Register.scss";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    profileImage: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: value,
      [name]: name === "profileImage" ? files[0] : value,
    });
  };

  const [passwordMatch, setPasswordMatch] = useState(true)

  useEffect(() => {
    setPasswordMatch(formData.password === formData.confirmPassword || formData.confirmPassword === "")
  })

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const register_form = new FormData()

      for (var key in formData) {
        register_form.append(key, formData[key])
      }

      const response = await fetch("http://localhost:3001/auth/register", {
        method: "POST",
        body: register_form
      })

      if (response.ok) {
        navigate("/login")
      }
    } catch (err) {
      console.log("Registration failed", err.message)
    }
  }

  return (
    <div className="register">
      <div className="register_content">
        <form className="register_content_form" onSubmit={handleSubmit}>
          <input
            placeholder="First Name"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
          <input
            placeholder="Last Name"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
          <input
            placeholder="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            placeholder="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            type="password"
            required
          />
          <input
            placeholder="Confirm Password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            type="password"
            required
          />

          {!passwordMatch && (
            <p style={{ color: "red" }}>Passwords are not matched!</p>
          )}

          <input
            id="image"
            type="file"
            name="profileImage"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleChange}
            required
          />
          <label htmlFor="image">
            <img src="/assets/addImage.png" alt="add profile photo" />
            <p>Upload Your Photo</p>
          </label>

          {formData.profileImage && (
            <img
              src={URL.createObjectURL(formData.profileImage)}
              alt="profile photo"
              style={{ maxWidth: "80px" }}
            />
          )}
          <button type="submit" disabled={!passwordMatch}>REGISTER</button>
        </form>
        <a href="/login">Already have an account? Log In Here</a>
      </div>
    </div>
  );
};

export default RegisterPage;
