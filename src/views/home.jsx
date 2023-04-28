import { useEffect, useState } from "react"
import useServer from "../hooks/useServer.js"
import Homes from "../components/Homes.jsx"

function Twitter() {
    const { get } = useServer()
    const [twitters, setTwitter] = useState([])
    
    //const [inputValue, setInputValue] = useState('')//

    //aqui obterngo todos los twttes/retorna la data
    const getTwitts = async () => {
     
      const { data } = await get({ url: '/' })
      console.log(data)
      setTwitter(data.data)
    }

    useEffect(() => {
      getTwitts()
    }, [])

    useEffect(() => {      
      console.log(twitters)
    }, [twitters]) 


    return <>
       
      <h1>Twitters</h1>
    
          {twitters && twitters.map(item => (
          <div key={item.id}>
          <a>{item.text} {item.email}</a>
          <img src={item.image} alt=" " />
          </div>
           ))}    
  
    </>
}
export default Twitter