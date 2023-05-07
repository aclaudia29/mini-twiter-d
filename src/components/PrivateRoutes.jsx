import { Navigate, Outlet } from 'react-router-dom'

import useAuth from '../hooks/useAuth'

function PrivateRoutes() {
    const { isAuthenticated } = useAuth()
    
    return <Outlet />
}
export { PrivateRoutes }
