import { ReactNode, useContext } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../AppContext";

interface Props {
    children: ReactNode
}

function AdminGuard({ children }: Props) {
    const {user} = useAuth();

    function isNotAdmin(): boolean {
        return !(user?.isAdmin)
    }

    return isNotAdmin() ? (
        <Navigate
            to="/"
            replace={true}
        />
    ) : (
        <>{children}</>

    )
}

export default AdminGuard;