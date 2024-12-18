import React from 'react';

const DislikeVideo: React.FC<any> = ({ width, height }) => (
    <svg width={width} height={height} viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M28.9102 9.88756L23.4852 5.68756C22.7852 4.98756 21.2102 4.63756 20.1602 4.63756H13.5102C11.4102 4.63756 9.13516 6.21256 8.61016 8.31256L4.41016 21.0876C3.53516 23.5376 5.11016 25.6376 7.73516 25.6376H14.7352C15.7852 25.6376 16.6602 26.5126 16.4852 27.7376L15.6102 33.3376C15.2602 34.9126 16.3102 36.6626 17.8852 37.1876C19.2852 37.7126 21.0352 37.0126 21.7352 35.9626L28.9102 25.2876"
            stroke="white"
            strokeWidth="1.5"
            strokeMiterlimit="10"
        />
        <path
            d="M37.835 9.88755V27.0375C37.835 29.4875 36.785 30.3625 34.335 30.3625H32.585C30.135 30.3625 29.085 29.4875 29.085 27.0375V9.88755C29.085 7.43755 30.135 6.56255 32.585 6.56255H34.335C36.785 6.56255 37.835 7.43755 37.835 9.88755Z"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);

export default DislikeVideo;
