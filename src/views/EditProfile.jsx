import { apiURL } from '../config.js';
import useAuth from '../hooks/useAuth.js';
import useServer from '../hooks/useServer.js'
import { useEffect, useRef, useState } from 'react';
import { toast } from 'sonner'
import "./EditProfile.css"

function EditProfile({ }) {
    const { user } = useAuth()
    const { put } = useServer()
    
    const [name, setName] = useState(user.name)
    const [email, setEmail] = useState(user.email)
    const [avatar, setAvatar] = useState(user.avatar)
    const [password, setPassword] = useState('')
    const [file, setFile] = useState('')
    const fileRef = useRef()

    useEffect(() => {
        if (name === user.name) return

        const timer = setTimeout(async () => {
            const credentials = { name, email }
            const { data } = await put({ url: '/user', body: credentials })
           

            if (data.status === 'ok') toast.success('Nombre o Email han sido actualizados')
        }, 3000);

        return () => clearTimeout(timer);
    }, [name, email])

    useEffect(() => {
        if (!password) return

        const timer = setTimeout(async () => {
            const credentials = { password }
            const { data } = await put({ url: '/user/password', body: credentials })
            if (data.status === 'ok') toast.success('Contraseña ha sido actualizada')
        }, 2000);
        return () => clearTimeout(timer);
    }, [password])

    useEffect(() => {
        if (!file) return

        (async () => {
            const formData = new FormData(document.forms.editForm);
            const { data } = await put({ url: '/user/avatar', body: formData, hasImage: true })

            if (data.status === 'ok') {
                setAvatar(data.data.avatar)
                toast.success('Avatar ha sido actualizado')
            }
        })()
        //console.log(new FormData(document.forms.editForm))
    }, [file])

  
    const handleSubmit = (e) => {
        e.preventDefault()
    }

    return <>
            <div className='name'><h3>{name}</h3></div>
            <div className='email1'><h4>{email}</h4></div>
            
            
        {<form name="editForm" onSubmit={handleSubmit} className="formEditProfile">
            <div>
                <div className="imageContainer">
                    {avatar && <img src={`${apiURL}/uploads/${avatar}`} alt="" />}
                </div>
            </div>
            
            <div className="inputContainer">
                <input type="file" name="avatar" id="avatar" ref={fileRef} onChange={e => setFile(e.target.value)} accept="image/*" className="input" />
            </div>
            <div className="inputContainer">
                <label htmlFor="name" className="label">Nombre</label>
            </div>
            <div className="inputContainer">
                <input type="text" name="name" id="name" className="input" placeholder="pedro perez" value={name} onChange={e => setName(e.target.value)} required />
            </div>
            <div className="inputContainer">
                <label htmlFor="email" className="label">Correo</label>
            </div>
            <div className="inputContainer">
                <input type="text" name="email" id="email" className="input" placeholder="pedro@example.com" value={email} required onChange={e => setEmail(e.target.value)} />
            </div>
            <div className="inputContainer">
                <label htmlFor="password" className="label">Contraseña</label>
            </div>
            <div className="inputContainer">
                <input type="password" name="password" id="password" value={password} onChange={e => setPassword(e.target.value)} className="input" placeholder="123456" />
            </div>
            
        </form>
        }
    </>
}

export default EditProfile


