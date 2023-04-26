import { Navigate, Outlet } from 'react-router-dom'

import useAuth from '../hooks/useAuth'

function PrivateRoutes() {
    const { isAuthenticated } = useAuth()
    ///if (!isAuthenticated) return <Navigate replace to='/login' />
    ///*** ojoo he quitado este iff */
    return <Outlet />
}
export { PrivateRoutes }
