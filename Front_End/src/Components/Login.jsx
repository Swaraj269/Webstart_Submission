
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";


function Login({onLoginSuccess}) {
  // State to toggle between login and signup forms
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);

  // State for form inputs
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name,setName]=useState('');
  const [phone,setPhone]=useState('')

  // Placeholder for form submission
  const handleSubmit = async (event) => {
    event.preventDefault(); 
    if (isLogin) {
            console.log('Login attempt');
            try {
              /*
                // Send login credentials. withCredentials is important for cookies.
                const response = await axios.post("http://localhost:3000/user/signin",
                    { email, password },
                    { withCredentials: true }
                );
                onLoginSuccess(email); // <-- Add this line
                // navigate(`/home/${email}`); 
              */
                

            } catch (error) {
                // Axios throws an error for non-2xx status codes (like 400, 401, 500)
                if (error.response) {
                    console.error("Error status:", error.response.status);
                    console.error("Error data:", error.response.data);

              
                    // If it's a 401, clear any lingering client-side cookies/tokens
                    if (error.response.status === 401) {
                        Cookies.remove('token');
                    }
                    // navigate("/login"); 
                } else if (error.request) {
                  /*
                    // Request was made but no response received (e.g., server down)
                    console.error("No response received:", error.request);*/
                    // navigate("/login");
                } else {
                    /*
                    // Something else happened (e.g., network error)
                  console.error("Error:", error.message);*/
                    // navigate("/login");
                }
            }
        } else { // Registration logic
            if (password !== confirmPassword) {
                showNotification("Password Not matched", "warning");
                return;
            }
            try {
              /*
                const response = await axios.post("http://localhost:3000/user/signup", {
                    email: email,
                    password: password,
                    name: name,
                    phone: phone
                });
              */
                onLoginSuccess(email); // <-- Add this line
                // console.log("Registration successful response:", response);
                navigate(`/home/${email}`); // Navigate after successful registration


            } catch (error) {
                if (error.response) {
                    console.error("Error status:", error.response.status);
                    console.error("Error data:", error.response.data);
           
                } else if (error.request) {
                    console.error("No response received:", error.request);
               
                } else {
            
                }
                navigate("/login");
            }
        }
    // Reset form fields after submission
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setName('');
    setPhone('')
  };

  // Function to toggle between login and signup views
  const toggleForm = () => {
    setIsLogin(!isLogin);
    // Clear form fields when switching to avoid carrying over data
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setName('');
    setPhone('')
  };




  

  return (
    <div className=' h-screen w-screen flex items-center justify-center  bg-white '>
    
    <div className="w-full max-w-md bg-gray-100 rounded-xl shadow-2xl mx-2 sm:p-6 md:px-10  border border-gray-200 transform transition-all duration-300 ease-in-out hover:scale-[1.02]">
      <h2 className="text-3xl font-extrabold text-[#FE7743] text-center mb-1">
        {isLogin ? 'Login' : 'Create Account'}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-2 px-[8px]">
        {/* Name Input */}
        {!isLogin && (<div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="appearance-none block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base transition-all duration-200 ease-in-out"
            placeholder="Enter your name"
            minLength="6"
          />
        </div>
        )}
        {/* Email Input */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="appearance-none block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base transition-all duration-200 ease-in-out"
            placeholder="you@example.com"
          />
        </div>
        {!isLogin && (<div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
            Phone
          </label>
          <input
            id="phone"
            name="phone"
            type="number"
            autoComplete="phone"
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="appearance-none block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base transition-all duration-200 ease-in-out"
            placeholder="Enter your phone"
            minLength="10"
          />
        </div>
        )}

        {/* Password Input */}
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>

          <div className='flex'>
              <input
              id="password"
              name="password"
              type="password"
              autoComplete={isLogin ? 'current-password' : 'new-password'}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="appearance-none block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base transition-all duration-200 ease-in-out"
              placeholder="••••••••"
              minLength="6"
            />

            <div className="mt-2">
              <label className="text-sm text-gray-600 flex px-2">
                <input
                  type="checkbox"
                  onChange={(e) => {
                    const input = document.getElementById('password');
                    input.type = e.target.checked ? 'text' : 'password';
                  }}
                  className="mr-2"
                />
                Show
              </label>
            </div>
          </div>
        </div>


        {/* Confirm Password Input (only for Signup) */}
        {!isLogin && (
          <div>
            <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700 mb-1">
              Confirm Password
            </label>
            <div className='flex'>
              <input
              id="confirm-password"
              name="confirm-password"
              type="password"
              autoComplete="new-password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="appearance-none block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base transition-all duration-200 ease-in-out"
              placeholder="••••••••"
              minLength="6"
            />
             <div className="mt-2">
              <label className="text-sm text-gray-600 flex px-2">
                <input
                  type="checkbox"
                  onChange={(e) => {
                    const input = document.getElementById('confirm-password');
                    input.type = e.target.checked ? 'text' : 'password';
                  }}
                  className="mr-2"
                />
                Show
              </label>
            </div>
            </div>
          </div>
        )}

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-md text-lg font-semibold text-white bg-[#FE7743] hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 ease-in-out transform hover:scale-[1.01] cursor-pointer"
          >
            {isLogin ? 'Sign in' : 'Sign up'}
          </button>
        </div>
      </form>

        <div className='flex w-full items-center justify-between px-[15px]'>
          {/**Google  */}
            <div >
              <a href="#">
                <button
                type="submit"
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg  text-lg font-semibold text-white focus:outline-none  transition-all duration-200 ease-in-out transform hover:scale-[1.01] cursor-pointer mt-2"
              >
                <img src="/images/unnamed-Photoroom.png" alt="" className='h-[24px] scale-[3] object-fill'/>
              </button>
              </a>
            </div>
            <h1 className='p-2'>OR</h1>
            {/* Toggle Link */}
            <div className="mt-2 text-center">
              <p className="text-sm text-gray-600">
              {isLogin ? "Don't have an account?" : "Already have an account?"}{' '}
              <button
                  onClick={toggleForm}
                  className="font-medium text-blue-600 hover:text-blue-500 focus:outline-none focus:underline transition-colors duration-200"
              >
                  {isLogin ? 'Sign up' : 'Sign in'}
              </button>
              </p>
            </div>
        </div>
    </div>
    </div>
  )
}

export default Login