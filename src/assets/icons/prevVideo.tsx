import React from 'react';

const PrevVideo: React.FC<any> = ({width}) => (
    <svg width={width} height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect
            x="-1"
            y="1"
            width="46"
            height="46"
            rx="23"
            transform="matrix(-1 0 0 1 46 0)"
            stroke="#B35500"
            strokeWidth="2"
        />
        <path
            d="M28.4571 14.2929C28.0666 13.9024 27.4334 13.9024 27.0429 14.2929L18.2929 23.0429C18.1054 23.2304 18 23.4848 18 23.75C18 24.0152 18.1054 24.2696 18.2929 24.4571L27.0429 33.2071C27.4334 33.5976 28.0666 33.5976 28.4571 33.2071C28.8476 32.8166 28.8476 32.1834 28.4571 31.7929L20.4142 23.75L28.4571 15.7071C28.8476 15.3166 28.8476 14.6834 28.4571 14.2929Z"
            fill="#B35500"
        />
    </svg>
);

export default PrevVideo;
