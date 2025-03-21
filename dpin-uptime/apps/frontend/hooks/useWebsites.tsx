import { useAuth } from "@clerk/clerk-react";
import axios from "axios";
import { use, useEffect } from "react";

export function useWebsites() {
    const {getAuth} = useAuth();
    useEffect(() => {  
        const auth = getAuth();
        axios.get(`${API_BACKEND_URL}/api/v1/websites`, {
            headers: {
                Authorization: `Bearer ${auth.sessionClaims?.sub}`,
            },
        });
     } , []);    
}
