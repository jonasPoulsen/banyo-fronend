import pencil from './../Pencil.svg';
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";


function Profile() {

  const [message, setMessage] = useState('');
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [isAdmin, setIsAdmin] = useState(0);

  const navigate = useNavigate();
  const redirectUser = () => {
    navigate("/login");
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

            if (data['user'].admin == 1) {
              setIsAdmin(1);
            }
        
          }else{
              setMessage("No user")
          }
          
      })
      .catch((err) => {
          console.log(err.message);
    });
  }

  const logOutUser = () => {
    localStorage.setItem('token', '');
    redirectUser();
  }
  
  useEffect(() => {

    const token = localStorage.getItem('token') || "";
    if (token !== "") {
      getUserData(JSON.parse(token))
    }
    
  }, [])

  return (
    <div className='bg-gray-200 h-screen pt-32'>
        <div className='mx-auto bg-gray-50 rounded-xl w-5/6 md:w-2/3 lg:w-1/2 max-w-xl p-8 pb-32'>
          <div className="flex justify-end pb-8">
          <Link className='text-gray-400 hover:text-blue-400' to="/update"><img className="h-5 w-5" src={pencil} alt="Pencil" /></Link>
          </div>
          
          <p className='text-3xl text-gray-700 font-bold mb-5'>{userName}</p>

          <table className="table-auto">
            <tbody>
              <tr className="h-12">
                <td>Email</td>
                <td className="pl-7">{userEmail}</td>
              </tr>
              <tr className="h-12">
                <td>Password</td>
                <td className="pl-7">**********</td>            
              </tr>              
            </tbody>
          </table>

          <p className="text-red-400">{ message }</p>
          
        </div>
        { isAdmin? <div className="text-center pt-4">
            <Link className='text-gray-400 hover:text-blue-400' to="/users">You got ADMIN rights - Click to see</Link>
          </div> : <div></div>

        }
        
        <div className="p-2 pt-5 text-center mt-32">
          <button 
            className="rounded-full w-64 h-12 text-gray-400 outline outline-1"
            onClick={logOutUser}
          >Log out</button>
        </div>
    </div>
  );
}

export default Profile;
