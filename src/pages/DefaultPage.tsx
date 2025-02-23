import React, { useEffect } from 'react';
import { useNavigate } from "react-router";

export const DefaultPage: React.FC = () => {
    const navigate = useNavigate();

    useEffect(()=> {
        navigate('/top');
    },[])
    return <div />
};
