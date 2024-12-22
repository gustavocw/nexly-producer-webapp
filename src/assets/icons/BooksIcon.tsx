import type React from "react";

interface IconProps extends React.SVGProps<SVGSVGElement> {}

const ModulesIcon: React.FC<IconProps> = (props) => (
  <svg
    width={props.width}
    height={props.height}
    viewBox="0 0 33 32"
    fill={props.color}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M16.4993 2.66699L3.16602 9.33366L16.4993 16.0003L29.8327 9.33366L16.4993 2.66699Z"
      stroke="#E8E6EA"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M3.16602 22.667L16.4993 29.3337L29.8327 22.667"
      stroke="#E8E6EA"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M3.16602 16L16.4993 22.6667L29.8327 16"
      stroke="#E8E6EA"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);

export default ModulesIcon;
