import type React from "react";

interface IconProps extends React.SVGProps<SVGSVGElement> {}

const DualArrow: React.FC<IconProps> = (props) => (
  <svg
    width={props.width}
    height={props.height}
    viewBox="0 0 33 32"
    fill={props.color}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M21.7929 17.2929C22.1834 16.9024 22.8166 16.9024 23.2071 17.2929L27.2071 21.2929C27.5976 21.6834 27.5976 22.3166 27.2071 22.7071L23.2071 26.7071C22.8166 27.0976 22.1834 27.0976 21.7929 26.7071C21.4024 26.3166 21.4024 25.6834 21.7929 25.2929L25.0858 22L21.7929 18.7071C21.4024 18.3166 21.4024 17.6834 21.7929 17.2929Z"
      fill="#E8E6EA"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M5.5 22C5.5 21.4477 5.94772 21 6.5 21H26.5C27.0523 21 27.5 21.4477 27.5 22C27.5 22.5523 27.0523 23 26.5 23H6.5C5.94772 23 5.5 22.5523 5.5 22Z"
      fill="#E8E6EA"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M11.2071 5.29289C11.5976 5.68342 11.5976 6.31658 11.2071 6.70711L7.91421 10L11.2071 13.2929C11.5976 13.6834 11.5976 14.3166 11.2071 14.7071C10.8166 15.0976 10.1834 15.0976 9.79289 14.7071L5.79289 10.7071C5.40237 10.3166 5.40237 9.68342 5.79289 9.29289L9.79289 5.29289C10.1834 4.90237 10.8166 4.90237 11.2071 5.29289Z"
      fill="#E8E6EA"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M5.5 10C5.5 9.44772 5.94772 9 6.5 9H26.5C27.0523 9 27.5 9.44772 27.5 10C27.5 10.5523 27.0523 11 26.5 11H6.5C5.94772 11 5.5 10.5523 5.5 10Z"
      fill="#E8E6EA"
    />
  </svg>
);

export default DualArrow;
