import CreateUser from "../components/forms/CreateUser";
import { Link } from "react-router-dom";

function Register() {
  return (
    <div className='bg-blue-950 h-screen pt-32'>
        <div className='mx-auto bg-gray-100 rounded-xl w-5/6 md:w-2/3 lg:w-1/2 max-w-xl p-8'>
          
          <p className='text-3xl text-center text-gray-700 font-bold mb-5'>
          Create Profile
          </p>

          <CreateUser />

          <div className="p-2 pt-5">
            <Link className='text-gray-400 hover:text-blue-400' to="/login">Already User</Link>
          </div>

        </div>
    </div>
  );
}

export default Register;
