import { ReactNode, useContext } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../AppContext";

interface Props {
    user :any,
    children: ReactNode
}

function AdminGuard({ children,user }: Props) {
    
    return user && !user.isAdmin ? (
        // <Navigate
        //     to="/adminPanel"
           
        // />
<p> אתה לא מורשה </p>
    ) : (
        <>{children}</>

    )
}

export default AdminGuard;