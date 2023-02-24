import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import EditCoop from '../../Components/EditCoop/EditCoop'
import FormCad from '../../Components/FormCad/FormCad'
import Header from '../../Components/Header/Header'
import Menu from '../../Components/Menu/Menu'
import ProductCoop from '../../Components/ProductCoop/ProductCoop'
import { Context } from '../../Context/Context'
import './style.css'

export default function CoopPage() {
    const [show, setShow] = useState(true)
    const [showEditCoop, setShowEditCoop] = useState(true)
    const [coop, setCoop] = useState({})
    const localization = useLocation()
    const path = localization.pathname.split("/")[2]
    const { user } = useContext(Context)

    const EditCoooop = ()=>{
        if(showEditCoop){
            setShowEditCoop(false)
        }else{
            setShowEditCoop(true)
        }
    }

    useEffect(()=>{
        const getCoop = async()=>{
            const res = await axios.get(`http://localhost:8000/coop/${path}`)
            setCoop(res.data)
        }
        getCoop()
    }, [path])


    const SetShow = ()=>{
        setShow(false)
    }

  return (
    <div className='fullConteinerCoopPage'>
        <Header />
        <Menu />
        <div className="conteinerCoop">
            <div className="sideBarCoop">
                <div className="descCoop">
                    <div className="avaliacoesCoop">
                        <span className="textCoop">Avaliações</span>
                        <div className="starCoop">
                            <span className='numCoop'>4.85</span>
                            <i className="fa-solid fa-star"></i>
                            <i className="fa-solid fa-star"></i>
                            <i className="fa-solid fa-star"></i>
                            <i className="fa-solid fa-star"></i>
                            <i className="fa-solid fa-star"></i>
                        </div>
                    </div>
                    <div className="enderecoCoop">
                        <span className="textCoop">Endereço</span>
                        <div className="descEndCoop">
                            {coop.sobre}
                        </div>
                    </div>
                    <div className="avaliacoesCoop">
                        <span className="textCoop">Horário</span>
                        <div className="descEndCoop">{coop.horario}</div>
                    </div>
                </div>
                {user._id === path && (
                    <>
                    <button className="buttonCoop" onClick={SetShow}>
                        <i className="fa-regular fa-pen-to-square mW"></i> Cradastrar
                    </button>
                    <button className="buttonCoopEdit" onClick={EditCoooop}>
                        <i class="fa-solid fa-user-pen mW"></i> Editar
                    </button>
                    </>
                )}
            </div>
            <div className="settingCoop">
                <div className="nomeCoopCont">{coop.nome}</div>
                {showEditCoop && (<EditCoop path={path} />)}
                {show && (<ProductCoop text={"Produto"} path={path} />)}
                {!show && (<FormCad setShow={setShow} />)}
            </div>
        </div>
    </div>
  )
}
