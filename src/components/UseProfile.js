// "use client"
import { useEffect, useState } from "react";

export default function useProfile() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        setLoading(true);
        fetch('/api/profile').then(response => {
            response.json().then(data => {
                setData(data)
                setLoading(false)
            });
        })
    }, []);

    if(loading) {
        return <div>Loading User UserInfo...</div>;
    }

    if(data && !data.admin){
        return <div>You are not authorized to view this page.</div>;
    }

    return{loading, data};
}