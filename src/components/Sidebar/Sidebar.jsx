import React, { useState, useContext } from 'react'
import './Sidebar.css'
import { assets } from '../../assets/assets'
import { Context } from '../../Context/context'

function Sidebar() {
    const [extended, setExtended] = useState(false)
    const { prevprompt  , fetchresponse , prompt , setprompt } = useContext(Context)

    const loadprompt = async(item)=>{
        setprompt(item);
        await fetchresponse(item);
    }

    return (
        <div className='sidebar'>
            <div className="top">
                <img onClick={() => setExtended(prev => !prev)} className='menu' src={assets.menu_icon} alt="" />
                <div className="newchat">
                    <img src={assets.plus_icon} alt="" />
                    {extended ? <p>New Chat</p> : null}
                </div>
                {extended ? <div className="recent">
                    <p className="recent-tiles">Recent</p>
                    {prevprompt.map((item, index) => {
                        return (
                            <div onClick = {()=>{
                                loadprompt(item);
                            }} key={index} className="recent-entry" >
                                <img src={assets.message_icon} alt="" />
                                <p>{item.slice(0,18)} ...</p>
                            </div>
                        )
                    })}
                </div> : null}
            </div>
            <div className="bottom">
                <div className="bottom-item recent-entry">
                    <img src={assets.question_icon} alt="" />
                    {extended ? <p>Help</p> : null}
                </div>
                <div className="bottom-item recent-entry">
                    <img src={assets.history_icon} alt="" />
                    {extended ? <p>Activity</p> : null}
                </div>
                <div className="bottom-item recent-entry">
                    <img src={assets.setting_icon} alt="" />
                    {extended ? <p>Setting</p> : null}
                </div>
            </div>
        </div>
    )
}

export default Sidebar
