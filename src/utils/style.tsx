export const GlobalStyles = () => (
  <style>
    {`
    * {
      font-family: "Inter", sans-serif;
      padding: 0;
      margin: 0;
      box-sizing: border-box;
      font-weight: 500px,
    }
    html, body {
      background-color: #1F1D22;
      height: 100%;
      width: 100%;
    }
    #root {
      height: 100%;
      width: 100%;
    }
      /* Firefox (uncomment to work in Firefox, although other properties will not work!)  */
/** {
  scrollbar-width: thin;
  scrollbar-color:rgb(27, 26, 28) #2E2A34;
}*/

/* Chrome, Edge and Safari */
*::-webkit-scrollbar {
  height: 3px;
  width: 3px;
}
*::-webkit-scrollbar-track {
  border-radius: 5px;
  background-color: #2E2A34;
}

*::-webkit-scrollbar-track:hover {
  background-color:rgb(30, 29, 31);
}

*::-webkit-scrollbar-track:active {
  background-color:rgb(40, 38, 41);
}

*::-webkit-scrollbar-thumb {
  border-radius: 5px;
  background-color:rgb(39, 36, 41);
}

*::-webkit-scrollbar-thumb:hover {
  background-color:rgb(15, 12, 18);
}

*::-webkit-scrollbar-thumb:active {
  background-color:rgb(18, 15, 21);
}

  `}
  </style>
);