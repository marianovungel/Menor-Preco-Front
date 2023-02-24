import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { Context } from '../../Context/Context'
import './style.css'

export default function Menu() {
  const { user } = useContext(Context)
  return (
    <div className='fullContentMenu'>
        <div className="itensMenu">
            <li className="itemContentMenu"><Link to="/" className='a'>Home</Link></li>
            <li className="itemContentMenu"><Link to="/cooperativa">Cooperativa</Link></li>
        </div>
        <div className="serchMenu">
            <input type="text" placeholder='Pesquisar Produto' className="serchMEnuInput" />
            <button className="serchMenuButton">
                <i className="fa-solid fa-magnifying-glass trocarCor"></i>
            </button>
        </div>
        <div className="vazia">
          <Link to={`/cooperativa/${user._id}`}>
            <img src={user.profilePic} alt="" className="imgProfileUseOrCoop" />  
          </Link>
        </div>
    </div>
  )
}
