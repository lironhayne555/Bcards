import { ReactNode, useContext } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../AppContext";

interface Props {
    children: ReactNode
}

function BusinessGuard({ children }: Props) {
    const {user} = useAuth();
    function isBusiness(): boolean {
        return !(user?.isBusiness)
    }

    return isBusiness() ? (
        <Navigate
            to="/login"
            replace={true}
        />
    ) : (
        <>{children}</>

    )
}

export default BusinessGuard;