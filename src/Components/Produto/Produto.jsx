import axios from 'axios'
import React, { useEffect, useState } from 'react'
import './style.css'
const host = "http://localhost:8000/"


export default function Produto({text}) {
    const [data, setData] = useState([])

    useEffect(()=>{
        const getData = async()=>{
            const res = await axios.get("http://localhost:8000/product")
            setData(res.data)
        }
        getData()
    }, [])
  return (
    <div className='fullContentProduct'>
        <h5 className="headeProduct">{text}</h5>
        
        <div className="productContent">
            {data?.map((data)=>(
                <div className="cardProduct" key={data?._id}>
                    <img src={host+data?.profilePic} alt="" className="imgCardProduct" />
                    <h6 className="nameProduct">{data?.nome}</h6>
                    <div className="precoCard">
                        <span className="PrecoProduct atual">R ${data?.precoatual}</span>
                        <span className="PrecoProduct deshed">R ${data?.precoanterior}</span>
                    </div>
                </div>
            ))}

        </div>
    </div>
  )
}
