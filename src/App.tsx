import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Users from "./pages/Users";
import Update from "./pages/Update";

function App() {
  return (
  <BrowserRouter>
    <Routes>
      <Route index element={<Register />} />
      <Route path="login" element={<Login />} />
      <Route path="profile" element={<Profile />} />
      <Route path="users" element={<Users />} />
      <Route path="update" element={<Update />} />
      {/* <Route path="*" element={<NoPage />} /> */}
    </Routes>
  </BrowserRouter>
  );
}

export default App;
