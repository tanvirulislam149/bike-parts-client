import { signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Navigate, useLocation } from "react-router-dom";
import auth from "./firebase.init";
import Loading from "./Pages/Loading";

function RequiredAdmin({ children }) {
    const [user, loading] = useAuthState(auth);
    const [admin, setAdmin] = useState();
    const [dLoading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`https://pacific-inlet-53322.herokuapp.com/checkAdmin/${user?.email}`)
            .then(res => res.json())
            .then(data => {
                setAdmin(data);
                setLoading(false);
            });
    }, [user])

    if (loading || dLoading) {
        return <Loading></Loading>
    }


    if (admin?.role !== "admin") {
        signOut(auth);
        return
    }

    return children;
}
export default RequiredAdmin;