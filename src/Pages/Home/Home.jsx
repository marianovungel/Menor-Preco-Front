import React, { useContext } from 'react'
import Destaque from '../../Components/Destaque/Destaque'
import Header from '../../Components/Header/Header'
import Menu from '../../Components/Menu/Menu'
import Produto from '../../Components/Produto/Produto'
import { Context } from '../../Context/Context'
import './style.css'

export default function Home() {
  const { user } = useContext(Context)
  console.log(user)
  return (
    <div className='fullConteinerHome'>
        <Header />
        <Menu />
        <Destaque />
        <Produto text={"Produtos em Destaque"} />
        <div className="headerHome"></div>
    </div>
  )
}
