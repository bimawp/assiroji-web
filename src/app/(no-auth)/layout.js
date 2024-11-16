import Appshell from "@/component/__Appshell";
import React from "react";
import "./../globals.css";
export const metadata = {
  title: "Home Page",
  description: "Welcome to the home page",
};
export default function Layout({ children }) {
  return <Appshell>{children}</Appshell>;
}
