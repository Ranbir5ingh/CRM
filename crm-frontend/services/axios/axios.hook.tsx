"use client";
import React from "react";
import { AxiosContext } from "./axios.context";

export const useAxios = () => {
  const context = React.useContext(AxiosContext);

  if (!context) {
    throw new Error(" use the axios in axios provider");
  }
  return context;
};
