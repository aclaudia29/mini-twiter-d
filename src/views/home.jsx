import { useEffect, useState } from "react"
import useServer from "../hooks/useServer.js"
import Homes from "../components/Homes.jsx"

function Twitter() {
    const { get } = useServer()
    const [twitter, setTwitter] = useState([])
    //const [inputValue, setInputValue] = useState('')//
    
    const getTwitts = async () => {
      const { data } = await get({ url: '/' })
      console.log(data)
      setTwitter(data)
    }

    useEffect(() => {
      getTwitts()
    }, [])


    useEffect(() => {
      //console.log(twitter)
    }, [twitter]) 

    return <>
        <h1>Aqui se registran los Twitters</h1>
    </>
}
export default Twitter