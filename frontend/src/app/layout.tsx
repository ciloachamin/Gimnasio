import { FC, PropsWithChildren } from "react";
import FlowbiteContext from "./context/FlowbiteContext";
import "./globals.css";

import SessionAuthProvider from "./context/SessionAuthProvider";
import { AosInit } from "./AosInit";

// En algún lugar del código donde se inicializa la aplicación


const RootLayout: FC<PropsWithChildren> = function ({ children }) {
  return (
    <html lang="en">
      <AosInit />
      <body>
        <FlowbiteContext>      <SessionAuthProvider> {children} </SessionAuthProvider> </FlowbiteContext>
      </body>
    </html>
  );
};

export default RootLayout;
