import {useEffect} from "react";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";

export default function Protected({
                                      authentication,
                                      children,
                                  }: {
    authentication: boolean;
    children: React.ReactNode;
}) {
    const navigate = useNavigate();
    const authStatus = useSelector((state: any) => state.user?.authStatus);

    useEffect(() => {
        // If page requires authentication, and user is not authenticated
        if (authentication && authStatus === false) {
            navigate("/login", {replace: true});
        }
    }, [authStatus, authentication, navigate]);

    // Don't block anything for public pages
    if (!authentication) {
        return <>{children}</>;
    }

    // If still checking auth, you can return loading or null
    if (authStatus === null) {
        return <div>Loading...</div>; // Optional spinner while checking
    }

    // If authenticated, render content
    if (authStatus === true) {
        return <>{children}</>;
    }

    // If not authenticated, and already redirected, render nothing
    return null;
}
