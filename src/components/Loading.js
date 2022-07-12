import React from 'react';
import loadingGif from '../assets/ATB3o.gif';

const Loading = () => {
    return (
        <>
            <div style={{ width: "100%", height: 0, paddingBottom: "100%", position: "relative" }}>
                <img src={loadingGif} alt="Loading" />
            </div>
        </>
    )
}

export default Loading;