import pencil from './../Pencil.svg';
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";


function Users() {

  const [message, setMessage] = useState('');
  const [users, setUsers] = useState([]);
  const [userToken, setUserToken] = useState('');

  const navigate = useNavigate();
  const redirectUser = () => {
    navigate("/users");
  }

  const getUserData = async (token: String) => {
    await fetch('http://localhost:8888/auth-api/getUser.php', {
        method: 'GET',
        headers: {'Content-type': 'application/json; charset=UTF-8', 'GetUser':'', 'Authorization': 'Bearer '+token},
        })
        .then((response) => response.json())
        .then((data) => {

        console.log(data);
            
            if (data['success'] === 1) {

              if (data['user'].admin == "1") {
                getUsers(token)

              }else{
                setMessage("Not admin user!")
              }

            }else{
                setMessage("No user!")
            }
            
        })
        .catch((err) => {
            console.log(err.message);
    });
}

const getUsers = async (token: String) => {
await fetch('http://localhost:8888/auth-api/handleUsers.php?', {
    method: 'GET',
    headers: {'Content-type': 'application/json; charset=UTF-8', 'Authorization': 'Bearer '+token, 'AllUsers': ''},
    })
    .then((response) => response.json())
    .then((data) => {

    console.log(data);
        
        if (data['success'] === 1) {
            setUsers(data['users'])
        }else{
            setMessage("Request fail!")
        }
        
    })
    .catch((err) => {
        console.log(err.message);
});
}

const deleteUser = async (userId: String) => {
  await fetch('http://localhost:8888/auth-api/handleUsers.php?', {
      method: 'GET',
      headers: {'Content-type': 'application/json; charset=UTF-8', 'Authorization': 'Bearer '+userToken, 'DeleteUser': ''+userId},
      })
      .then((response) => response.json())
      .then((data) => {
          
          if (data['success'] === 1) {
              redirectUser()
          }else{
              setMessage("Request fail!")
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
      <div className='mx-auto w-5/6 p-8'>
          <h3 className='text-3xl text-gray-700 font-bold mb-5'>Users</h3>

          <table className="table-auto w-full border-separate border-spacing-y-1">
            <thead>
              <tr className='text-sm'>
                <th className="text-left font-normal pl-8">Name</th>
                <th className="text-left font-normal">Email</th>
                <th className="text-left font-normal">Date</th>
                <th className="text-right font-normal pr-8">Delete</th>
              </tr>
            </thead>
            <tbody>
            {
              users.map( user => 
                <tr key={user['id']} className="bg-gray-100 h-12">
                  <td className="pl-8 font-semibold">{user['name']}</td>
                  <td>{user['email']}</td>
                  <td>{user['created']}</td>
                  <td className="float-right pr-12 h-12"><img onClick={() => deleteUser(user['id'])} className="h-7 pt-3" src={pencil} alt="Pencil" /></td>
                </tr>
              )
            }                     
            </tbody>
          </table>
          


          <p className="text-red-400">{ message }</p>
      
      </div>
  </div>

  );
}

export default Users;
