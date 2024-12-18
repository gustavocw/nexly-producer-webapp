import React from 'react';

const ProxVideo: React.FC<any> = ({width}) => (
    <svg width={width} height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="1" y="1" width="46" height="46" rx="23" stroke="#B35500" strokeWidth="2" />
        <path
            d="M19.5429 14.2929C19.9334 13.9024 20.5666 13.9024 20.9571 14.2929L29.7071 23.0429C29.8946 23.2304 30 23.4848 30 23.75C30 24.0152 29.8946 24.2696 29.7071 24.4571L20.9571 33.2071C20.5666 33.5976 19.9334 33.5976 19.5429 33.2071C19.1524 32.8166 19.1524 32.1834 19.5429 31.7929L27.5858 23.75L19.5429 15.7071C19.1524 15.3166 19.1524 14.6834 19.5429 14.2929Z"
            fill="#B35500"
        />
    </svg>
);

export default ProxVideo;
