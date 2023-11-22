import { FC, PropsWithChildren } from "react";
import FlowbiteContext from "./context/FlowbiteContext";
import "./globals.css";
import SessionAuthProvider from "./context/SessionAuthProvider";

const RootLayout: FC<PropsWithChildren> = function ({ children }) {
  return (
    <html lang="en">
      <body>
        <FlowbiteContext>      <SessionAuthProvider> {children} </SessionAuthProvider> </FlowbiteContext>
      </body>
    </html>
  );
};

export default RootLayout;
