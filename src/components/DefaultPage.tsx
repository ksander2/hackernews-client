import React, { useEffect } from 'react';
import { useNavigate } from "react-router";

const DefaultPage: React.FC = () => {
    const navigate = useNavigate();

    useEffect(()=> {
        navigate('/top');
    },[])
    return <div />
};

export default DefaultPage;
