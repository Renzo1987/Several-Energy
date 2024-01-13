import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Dropdown from 'react-bootstrap/Dropdown';
import UserIcon from "../../../assets/user-icon.png";
import AuthContext from "../../../context/AuthProvider";


function UserDropDown() {

  const { auth, setAuth } = useContext(AuthContext)
  const navigate = useNavigate()
  const handleLogout = () => {
    setAuth({})
    navigate("/login")
  }

  return (
    <Dropdown>
      <Dropdown.Toggle id="dropdown-basic">
        <img src={UserIcon} className="user-icon" alt="" />
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item>Contacto: {auth.contacto}</Dropdown.Item>
        <Dropdown.Item>Delegación: {auth.delegacion}</Dropdown.Item>
        <Dropdown.Item href="#/action-3"><button className='logout-btn' onClick={handleLogout}>Cerrar sesión</button></Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default UserDropDown;