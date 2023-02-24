import React from 'react'
import './style.css'

export default function EditCoop() {
  return (
    <div className='fullEditCoopConteiner'>
        <div className="imgEditConteiner">
            <img src="../logo-sem-fundo.png" alt="" id='imgCooop' name='imgCooop' className="getImgCoop" />
            <label htmlFor="imgCooop" className='labalImgCoop'><i class="fa-solid fa-upload"></i> Imagem</label>
        </div>
        <div className="dataCoopFuull">
            <div className="sobreAllInputs">
                <h3 className='marginTextCoop'>Editar Cooperativa</h3>
                <input type="text" placeholder='Whatsapp' className='inpData' />
                <input type="text" placeholder='Sobre' className='inpData' />
                <input type="text" placeholder='Email' className='inpData' />
                <input type="text" placeholder='Horário' className='inpData' />
            </div>
            <button className="fonfirmEditCoop inpData">Salvar</button>
        </div>
    </div>
  )
}
