import React from 'react';
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";


function Update() {

  const [message, setMessage] = useState('');
  const [oldUserName, setUserName] = useState('');
  const [oldUserEmail, setUserEmail] = useState('');
  const [userToken, setUserToken] = useState('');

  const navigate = useNavigate();
  const redirectUser = () => {
    navigate("/profile");
}

const getUserData = async (token: String) => {
    await fetch('http://localhost:8888/auth-api/getUser.php', {
        method: 'GET',
        headers: {'Content-type': 'application/json; charset=UTF-8', 'GetUser':'', 'Authorization': 'Bearer '+token},
        })
        .then((response) => response.json())
        .then((data) => {
            
            if (data['success'] === 1) {
            setUserName(data['user'].name)
            setUserEmail(data['user'].email)
            }else{
                setMessage("No user")
            }
            
        })
        .catch((err) => {
            console.log(err.message);
    });
}

const updateUserData = async (userIput: any) => {
await fetch('http://localhost:8888/auth-api/updateUser.php', {
    method: 'POST',
    body: JSON.stringify(userIput),
    headers: {'Content-type': 'application/json; charset=UTF-8', 'Update':'', 'Authorization': 'Bearer '+userToken},
    })
    .then((response) => response.json())
    .then((data) => {
        
        if (data['success'] === 1) {
            redirectUser()
        }else{
            setMessage("Update failed!")
        }
        
    })
    .catch((err) => {
        console.log(err.message);
});
}



useEffect(() => {

    const token = localStorage.getItem('token') || "";
    if (token !== "") {
        getUserData(JSON.parse(token))
        setUserToken(JSON.parse(token))
    }else{
        setMessage('No user is logged in!')
    }

}, [])


  return (
    <div className='bg-gray-200 h-screen pt-32'>
        <div className='mx-auto bg-gray-50 rounded-xl w-5/6 md:w-2/3 lg:w-1/2 max-w-xl p-8 pb-32'>
        <div className="text-center pb-8 pt-5">
            <p className='text-3xl text-gray-700 font-bold mb-5'>Update Profile</p>
        </div>
            <form
            onSubmit={(e: React.SyntheticEvent) => {
                e.preventDefault();
                const target = e.target as typeof e.target & {
                userName: { value: string };
                userEmail: { value: string };
                };

                const userName = target.userName.value; // typechecks!
                const userEmail = target.userEmail.value; // typechecks!
                    
                const userIput = {
                    "name":userName,
                    "email":userEmail
                }
                updateUserData(userIput);                                    
            }}
            >
                
                <div className="p-2 relative pt-2">
                    <p className="absolute top-0 pl-3 pr-3 bg-gray-50 left-8 text-gray-400 text-xs">Username</p>
                    <input 
                        className="w-full h-10 p-6 bg-gray-50 border-2 border-gray-200 rounded" 
                        type="text" 
                        name="userName" 
                        placeholder="Username" 
                        value={oldUserName}
                        onChange={event => {
                            setUserName(event.target.value);
                        }}
                    />
                </div>
                <div className="p-2 relative pt-2">
                <p className="absolute top-0 pl-3 pr-3 bg-gray-50 left-8 text-gray-400 text-xs">Email</p>
                    <input 
                        className="w-full h-10 p-6 bg-gray-50 border-2 border-gray-200 rounded" 
                        type="text" 
                        name="userEmail" 
                        placeholder="Email" 
                        value={oldUserEmail}
                        onChange={event => {
                            setUserEmail(event.target.value);
                        }}
                    />
                </div>
                <div className="p-2 pt-5">
                    <button className="rounded-full w-full h-12 text-white bg-blue-300" type="submit">Update</button>
                </div>
                <p className="text-red-400">{ message }</p>
            </form>
        </div>
    </div>
  );
}

export default Update;
