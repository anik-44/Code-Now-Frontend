import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import axios from 'axios';
import {setUser} from "@/store/authSlice";

export default function AuthGate({children}: { children: React.ReactNode }) {
    const dispatch = useDispatch();
    const isAuthenticated = useSelector((state: any) => {
        return state.user.authStatus
    });

    useEffect(() => {
        const validate = async () => {
            try {
                const res = await axios.get('/auth/validate', {
                    headers: {
                        'Cache-Control': 'no-cache',
                    },
                    withCredentials: true,
                });
                dispatch(setUser({
                    username: res.data?.userDetails.name,
                    email: res.data?.userDetails.email,
                    userId: res.data?.userDetails.id,
                    authStatus: true,

                }));
            } catch {
                dispatch(setUser({
                        username: null,
                        email: null,
                        userId: null,
                        authStatus: false,
                    }
                ));
            }
        };

        if (isAuthenticated === null) {
            validate();
        }
    }, [dispatch, isAuthenticated]);

    if (isAuthenticated === null) {
        return <div>Loading...</div>; // Or spinner
    }

    return <>{children}</>;
}
