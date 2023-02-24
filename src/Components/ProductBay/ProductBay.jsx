import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './style.css'
import Swal from 'sweetalert2'
import { Context } from '../../Context/Context'
import { useContext } from 'react'
import {useNavigate} from 'react-router-dom'
import FormEditProduct from '../FormEditProduct/FormEditProduct'
import StripeCheckout from 'react-stripe-checkout';
const host = "http://localhost:8000/"
var KEY ="pk_test_51Mejt5DzHiXLpKW7t2j0Hs1MJsqQdi9MZWwgZDvKlFWp0fHUPwZCR3TVQSP6JiQhTFz7DZuPt9xrnVSpmajq006M00EpoULyUo"


export default function ProductBay({data}) {
    const [activeEdit, setActiveEdit] = useState(true)
    const [showCardBay, setShowCardBay] = useState(true)
    const [quantidade, setQuantidade] = useState(0)
    const [novaQuant, setNovaQuant] = useState(0)
    const [total, setTotal] = useState(data && quantidade*data?.precoatual)
    const { user } = useContext(Context)
    let navigate = useNavigate()

    

    useEffect(()=>{
        setTotal(quantidade*data?.precoatual)
    }, [quantidade, data?.precoatual])

    const pagamento = async(token)=>{
        try {
            const res = await axios.post("http://localhost:8000/pay/payment", {
                tokenId: token.id,
                amount: total,
            })
            console.log(res)
            navigate('/')
        } catch (error) {
            console.log(error)
        }
    }

    const onToken = (token)=>{
        token && pagamento(token)
    }
    
    const SetDit = async()=>{
        if(activeEdit){
            setActiveEdit(false)
        }else{
            setActiveEdit(true)
        }
    }


    const confirmDelect = async ()=>{
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.isConfirmed) {
                DeleteProduct()
                Swal.fire(
                    'Deleted!',
                    'Your product has been deleted.',
                    'success'
                )
                navigate('/')
            }
          })
        
    }
    const DeleteProduct = async ()=>{
        try {
            const res = await axios.delete(`http://localhost:8000/product/${data?._id}`, {
                headers:{idcoop: user._id}
            })
            console.log(res)
        } catch (error) {
            alert(error)
        }
    }
    const pagarCardAgora = ()=>{
        if(showCardBay){
            setShowCardBay(false)
        }else{
            setShowCardBay(true)
        }
    }
    const updateValor = ()=>{
        setQuantidade((prev)=>novaQuant)
        setTotal((prev)=>novaQuant*data?.precoatual)
    }
  return (
    <div className='fullContentProdBay'>
        {activeEdit ? (

            <>
                <div className="contentImgProdBay">
                    <img src={data?.profilePic && host+data?.profilePic} alt="" className="prodbay" />
                </div>
                {showCardBay ? (<div className="contentdataProdbay">
                    <li className="nome">
                        <span className='nomePro'>Nome: </span><span className='ValorNome'>{data.nome}</span>
                    </li>
                    <li className="dinheiro">
                        <span className='vAtual'>R ${data.precoatual}</span><span className='vAnte'>R ${data.precoanterior}</span>
                    </li>
                    <li className="descGrup">
                        <span className='nomePro'>descrição:</span>
                        <span className='Valordesc'>
                            <p>Aqui No Menor Preço, Temos Produtos de Boa Qualidade No menor Preço Procível do mercado Formal e Informal, quer do Brasil que Quer  do Mundo Inteiro. Venha Aproveitar Favoritar as suas Cooperativas favoritas para cada produto que tu deseja Comprar, Em um click você terá tudo que deseja em seu dispor.</p>
                            <p>{data.desc}</p>
                        </span>
                    </li>
                    {data.idcoop === user._id && (
                    <li className="buttonsGrup">
                        <button className='DeliteBuu' onClick={SetDit}>Editar</button>
                        <button className='delitBoo' onClick={confirmDelect}>Deletar</button>
                    </li>
                    )}
                    <li className="comprar">
                        <input type="number" onChange={(e)=>setQuantidade(e.target.value)} className='compraValor' placeholder='Quantidade' />
                        <button className='buComp' onClick={pagarCardAgora}>Comprar</button>
                    </li>
                </div>):(
                    <div id="bayCArd" >
                        <li className="nome">
                            <span className='nomePro'>Nome: </span><span className='ValorNome'>{data.nome}</span>
                        </li>
                        <li className="dinheiro">
                            <span className='vAtual'>R ${data.precoatual}</span><span className='vAnte'>R ${data.precoanterior}</span>
                        </li>
                        <div className="totalProduct">
                            <div className="result">
                                <span className="precoatualnew">R ${data.precoatual}</span>
                                <span className="quantinew">*</span>
                                <span className="quantinew">{quantidade}</span>
                                <span className="quantinew">=</span>
                                <span className="resultadonew">R $</span>
                                <span className="resultadonew">{total}</span>
                                <span className="resultadonew">,00 Total</span>
                            </div>
                            <div className="buttonSetValors">
                                <input type="number"  placeholder="Quantidade" onChange={(e)=>setNovaQuant(e.target.value)} className="numeroquanti" />
                                <button className="setAllValors" onClick={updateValor}>Atualizar</button>
                            </div>
                        </div>
                        <div className="ppay">
                            <StripeCheckout
                                name= "Menor-Preço"
                                image="../logo-sem-fundo.png"
                                description={`O seu Total é R $${total}`}
                                amount={total}
                                stripeKey={KEY}
                                token={onToken}
                            >
                                <button className='ComprarAgora'><i class="fa-brands fa-cc-mastercard"></i> <i class="fa-brands fa-cc-visa marginCardBay"></i> Comprar Agora</button>
                            </StripeCheckout>
                        </div>
                        
                    </div>
                )}
            </>
        ):(
            <FormEditProduct data={data} setActiveEdit={setActiveEdit} />
        )}
    </div>
  )
}
