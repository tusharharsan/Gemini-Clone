import { createContext, useState } from "react";
import { run } from "../config/gemini";

export const Context = createContext();

const ContextProvider = ({children})=>{
    const [input , setinput] = useState("");
    const [prompt , setprompt] = useState("");
    const [prevprompt , setprevprompt] = useState([]);
    const [showresult , setshowresult] = useState(false);
    const [loading , setloading] = useState(false);
    const [response , setresponse] = useState("");
    
    const delaypara = (index , nextword) =>{
        setTimeout(() => {
            setresponse((prev)=>prev+nextword);
        }, 75*index);
    }
   
    const fetchresponse = async() =>{
        if(!input) return;
        setresponse("");
        setloading(true);
        setshowresult(true);
        setprompt(input);
        let newresponse = "";
        // if(prompt !==undefined){
        //     newresponse = await run(prompt);
        //     setprompt(prompt);
        // }else{
        //     setprevprompt(prev =>[...prevprompt , input]);
        //     setprompt(input);
        // }
        setprevprompt([...prevprompt , input]);
        
        try {
            const apiresponse = await run(input);
            
            let responseArray = apiresponse.split("**");
            let newarray ="";
            for(let i=0 ; i<responseArray.length ; i++){
                if(i===0 || i%2!==1){
                    newarray +=(responseArray[i]);

                }else{
                    newarray += "<b>"+responseArray[i]+"</b>";

                }
            }
            let newarray2 = newarray.split("*").join("</br>");
            let newresponse = newarray2.split(" ");
            for(let i=0 ; i<newresponse.length ; i++){
                const nextword = newresponse[i];
                delaypara(i , nextword+" ");
                
            }
            setloading(false);
            
            setinput("");
            console.log("API response:", newarray);
        } catch (error) {
            console.error("API error:", error);
            
        }
    };

    const contextvalue = {
        prevprompt,
        setprevprompt,
        prompt,
        setprompt,
        response,
        fetchresponse,
        showresult,
        setshowresult,
        loading,
        setloading,
        setinput,
    }


    return(
        <Context.Provider value={contextvalue}>
            {children}
        </Context.Provider>
    )
}

export default ContextProvider;
