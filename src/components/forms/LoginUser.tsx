import React from 'react';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";

function LoginUser() {

    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    const redirectUser = () => {
        navigate("/profile");
    }

    const loginUser = async (userIput: any) => {

        await fetch('http://localhost:8888/auth-api/login.php', {
        method: 'POST',
        body: JSON.stringify(userIput),
        headers: {'Content-type': 'application/json; charset=UTF-8'},
        })
        .then((response) => response.json())
        .then((data) => {
            
            if (data['success'] === 1) {
                localStorage.setItem('token', JSON.stringify(data['token']));
                redirectUser()
            }else{
                setMessage("Wrong email or password!")
            }
            
        })
        .catch((err) => {
            console.log(err.message);
        });
    };


return (
    <form
        onSubmit={(e: React.SyntheticEvent) => {
            e.preventDefault();
            const target = e.target as typeof e.target & {
            email: { value: string };
            password: { value: string };
            };

            const email = target.email.value; // typechecks!
            const password = target.password.value; // typechecks!
            
            // lav user object
                
            const userIput = {
                "email":email,
                "password":password
            }

            loginUser(userIput);
                            
        }}
        >
        <div className="p-2">
            <input className="w-full h-10 p-6 bg-gray-100 border-2 border-gray-200 rounded" type="text" name="email" placeholder="Email" />
        </div>
        <div className="p-2">
            <input className="w-full h-10 p-6 bg-gray-100 border-2 border-gray-200 rounded" type="text" name="password" placeholder="Password" />
        </div>
        <div className="p-2 pt-5">
            <button className="rounded-full w-full h-12 text-white bg-blue-300" type="submit">Submit</button>
        </div>
        <p className="text-red-400">{ message }</p>
    </form>
  );
}

export default LoginUser;
