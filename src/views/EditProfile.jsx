import useAuth from '../hooks/useAuth.js';
import useServer from '../hooks/useServer.js'
import { useEffect, useRef, useState } from 'react';
//import { toast } from 'react-toastify';
import { toast } from 'sonner'

function EditProfile({  }) { 
    const { user } = useAuth()
    const { put } = useServer()
    const [showModal, setShowModal] = useState(false);
    const [name, setName] = useState(user.name)
    const [email, setEmail] = useState(user.email)
    const [password, setPassword] = useState('')
    const [file, setFile] = useState('')
    const fileRef = useRef()

    useEffect(() => {
        const savedData = getFromLocalStorage('user');
        if (name === savedData.user.name) return
        const timer = setTimeout(async () => {
            const credentials = { name, email }
            const { data } = await put({ url: '/user/', body: credentials })
            
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
            const formData = new FormData(document.forms[0]);
            const { data } = await put({ url: '/user/avatar', body: formData, hasImage: true })
            
            if (data.status === 'ok') toast.success('Avatar ha sido actualizado')
        })()
    }, [file])


    const getFromLocalStorage = (key) => {
        try {
            const data = localStorage.getItem(key);
            return data ? JSON.parse(data) : null;
        } catch (error) {
            console.error('Error al leer de localStorage:', error);
            return null;
        }
    };
    const handleEditProfile = e => {
        e.preventDefault();
        setShowModal(true);
    };
    
    return <>
        {                  <form className="formEditProfile">
                            <div className="inputContainer">
                                <label htmlFor="avatar" className="label">Avatar</label>
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
                            <div className="modal-buttons">
                                <button >Cerrar</button>
                            </div>
                        </form>
                    
        }
    </>
}
export default EditProfile
   

