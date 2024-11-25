import React, { useState, useEffect } from 'react';
import OffCanvas from '../Components/OffCanvas';
import BackgroundImage from '../Components/ImagemTela';

function Home() {
    const imageUrl = '/src/Image/fundohome.png';
    return (
        <BackgroundImage imageUrl={imageUrl}>
            <div>
                <OffCanvas/>
            </div>
        </BackgroundImage>
    )
}

export default Home;