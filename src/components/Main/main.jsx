import React, { useContext } from 'react'
import './Main.css'
import { assets } from '../../assets/assets'
import { Context } from '../../Context/context'

function Main() {
    
    const {fetchresponse , prompt , showresult ,loading , resultData ,  input , setinput , response} =useContext(Context);

    return (
        <div className='Main'>
            <div className="nav">
                <p>Gemini</p>
                <img src={assets.user_icon} alt="" />
            </div>
            <div className="main-container">
                {!showresult?<>
                    <div className="greet">
                    <p><span>Hello, Dev</span></p>
                    <p>How can I Help you today?</p>
                </div>
                <div className="cards">
                    <div className="card">
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita doloribus quaerat sequi enim ullam, .</p>
                        <img src={assets.compass_icon} alt="" />
                    </div>
                    <div className="card">
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita doloribus quaerat sequi enim ullam, .</p>
                        <img src={assets.bulb_icon} alt="" />
                    </div>
                    <div className="card">
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita doloribus quaerat sequi enim ullam, </p>
                        <img src={assets.message_icon} alt="" />
                    </div>
                    <div className="card">
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita doloribus quaerat sequi enim ullam, </p>
                        <img src={assets.code_icon} alt="" />
                    </div>
                </div>
                </> : <div className="result">
                        <div className="result-title">
                            <img src={assets.user_icon} alt="" />
                            <p>{prompt}</p>
                        </div>
                        <div className="result-content">
                            <img src={assets.gemini_icon} alt="" />
                            {loading?<div className='loader'>
                                <hr />
                                <hr />
                                <hr />
                            </div> : <p dangerouslySetInnerHTML={{__html:response}}></p>}
                            
                        </div>
                    </div>}
                
                <div className="main-bottom">
                    <div>
                        
                    </div>
                    <div className="search-box">
                        <input onChange={(e)=>setinput(e.target.value)} value={input} type="text" placeholder='Enter a promp here'/>
                        <div>
                            <img src={assets.gallery_icon} alt="" />
                            <img src={assets.mic_icon} alt="" />
                            <img onClick={()=>{
                                fetchresponse();
                            }} src={assets.send_icon} alt="" />
                        </div>
                    </div>
                    <p className='bottom-info'>
                        Lorem ipsum dolor sit amet, 
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Main
