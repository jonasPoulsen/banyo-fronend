import React from 'react';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";

function CreateUser() {

    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    const redirectUser = () => {
        navigate("/login");
    }

    const createUser = async (user: any) => {
        console.log(user);
        await fetch('http://localhost:8888/auth-api/register.php', {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {'Content-type': 'application/json; charset=UTF-8'},
        })
        .then((response) => response.json())
        .then((data) => {

            console.log(data)
            redirectUser()
            
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
            username: { value: string };
            email: { value: string };
            password: { value: string };
            passwordtwo: { value: string };
            };

            const username = target.username.value; // typechecks!
            const email = target.email.value; // typechecks!
            const password = target.password.value; // typechecks!
            const passwordtwo = target.passwordtwo.value; // typechecks!
                
            const user = {
                "name":username,
                "email":email,
                "password":password
            }
            
            if (password === passwordtwo) {
                createUser(user);
            }else{
                setMessage("Passwords are NOT the same!");
            }
            
        }}
        >
        <div className="p-2 relative pt-2">
            <p className="absolute top-0 pl-3 pr-3 bg-gray-100 left-8 text-gray-400 text-xs">Username</p>
            <input className="w-full h-10 p-6 bg-gray-100 border-2 border-gray-200 rounded" type="text" name="username" placeholder="Username" />
        </div>
        <div className="p-2">
            <input className="w-full h-10 p-6 bg-gray-100 border-2 border-gray-200 rounded" type="text" name="email" placeholder="Email" />
        </div>
        <div className="p-2">
            <input className="w-full h-10 p-6 bg-gray-100 border-2 border-gray-200 rounded" type="text" name="password" placeholder="Password" />
        </div>
        <div className="p-2">
            <input className="w-full h-10 p-6 bg-gray-100 border-2 border-gray-200 rounded" type="text" name="passwordtwo" placeholder="Repeat Password" />
        </div>
        <div className="p-2 pt-5">
            <button className="rounded-full w-full h-12 text-white bg-blue-300" type="submit">Submit</button>
        </div>
        <p className="text-red-400">{ message }</p>
    </form>
  );
}

export default CreateUser;
