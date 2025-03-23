import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

const UrlRedirectionPage = () => {
    const { url } = useParams();

    useEffect(()=>{
        if(url){
            window.location.href = import.meta.env.VITE_SERVER_URL + `/${url}`;
        }
    },[url]);

  return null;
}

export default UrlRedirectionPage;