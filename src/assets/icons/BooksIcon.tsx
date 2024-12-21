import type React from "react";

interface IconProps extends React.SVGProps<SVGSVGElement> {}

const BooksIcon: React.FC<IconProps> = (props) => (
  <svg
    width={props.width}
    height={props.height}
    viewBox="0 0 33 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M4.5 6C4.5 4.89543 5.39543 4 6.5 4H10.5C11.6046 4 12.5 4.89543 12.5 6V26C12.5 27.1046 11.6046 28 10.5 28H6.5C5.39543 28 4.5 27.1046 4.5 26V6ZM10.5 6H6.5V26H10.5V6Z"
      fill={props.color ? props.color : "#E8E6EA"}
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M4.5 10C4.5 9.44772 4.94772 9 5.5 9H11.5C12.0523 9 12.5 9.44772 12.5 10C12.5 10.5523 12.0523 11 11.5 11H5.5C4.94772 11 4.5 10.5523 4.5 10Z"
      fill={props.color ? props.color : "#E8E6EA"}
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M10.5 6C10.5 4.89543 11.3954 4 12.5 4H16.5C17.6046 4 18.5 4.89543 18.5 6V26C18.5 27.1046 17.6046 28 16.5 28H12.5C11.3954 28 10.5 27.1046 10.5 26V6ZM16.5 6H12.5V26H16.5V6Z"
      fill={props.color ? props.color : "#E8E6EA"}
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M10.5 22C10.5 21.4477 10.9477 21 11.5 21H17.5C18.0523 21 18.5 21.4477 18.5 22C18.5 22.5523 18.0523 23 17.5 23H11.5C10.9477 23 10.5 22.5523 10.5 22Z"
      fill={props.color ? props.color : "#E8E6EA"}
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M16.8813 7.2027C16.5941 6.13126 17.2299 5.02988 18.3013 4.7427L22.1813 3.7027C23.2528 3.41551 24.3541 4.05126 24.6413 5.1227L29.8413 24.5227C30.1285 25.5941 29.4928 26.6955 28.4213 26.9827L24.5413 28.0227C23.4699 28.3099 22.3685 27.6741 22.0813 26.6027L16.8813 7.2027ZM22.7013 5.6427L18.8213 6.6827L24.0213 26.0827L27.9013 25.0427L22.7013 5.6427Z"
      fill={props.color ? props.color : "#E8E6EA"}
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M28.6662 20.5775C28.8099 21.1108 28.494 21.6596 27.9608 21.8032L22.1608 23.3657C21.6275 23.5094 21.0787 23.1935 20.9351 22.6603C20.7914 22.127 21.1072 21.5782 21.6405 21.4346L27.4405 19.8721C27.9738 19.7284 28.5226 20.0443 28.6662 20.5775Z"
      fill={props.color ? props.color : "#E8E6EA"}
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M25.5652 8.99158C25.7078 9.52514 25.3908 10.0733 24.8573 10.2159L19.0573 11.7659C18.5237 11.9084 17.9756 11.5915 17.833 11.0579C17.6904 10.5244 18.0073 9.97625 18.5409 9.83366L24.3409 8.28366C24.8745 8.14107 25.4226 8.45802 25.5652 8.99158Z"
      fill={props.color ? props.color : "#E8E6EA"}
    />
  </svg>
);

export default BooksIcon;
