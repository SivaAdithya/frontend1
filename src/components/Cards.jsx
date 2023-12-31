import React from 'react';
import Card from './Card';
import { useParams } from 'react-router-dom';
import Axios from 'axios'
import { useState, useEffect } from 'react';
import './Cards.css';
import Footer from './Footer';
import Header from './Header';


export default function Cards()
{

    const [resData,setData] = useState([]);
    const {email} = useParams();
    const GetAuction = async()=>{

        const url = "https://server1-two.vercel.app/backend/getauc/";

        Axios.get(url)
        .then((res)=>{

            if(res.status===200)
            {
                console.log("Response receiv")
                setData(res.data);
            }
            else{

                console.log("Response not receiv")
                Promise.reject();
            }

        })
        .catch((err)=>alert(err));
   
    }

    useEffect(()=>
    {
        GetAuction();
        console.log(resData);
        
    },[])

    const Card_ele = resData.map((data,ind)=>{

        
        return data.status!=='Complete' && <a href={`/card-det/${data._id}/${email}`}><Card key={data._id} id={data._id} img={data.images[0]} title={data.name} price={data.price} time={data.time} status={data.status} desc={data.description} cond={data.condition}/></a>

    })

return(

<div>
  <Header />
  <br></br><br></br><br></br><br></br>
<div className="cards">

{ Card_ele}

</div>
<br></br><br></br><br></br>
<Footer />
</div>

)



}