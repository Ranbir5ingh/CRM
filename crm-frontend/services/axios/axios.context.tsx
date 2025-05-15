"use client"
import React from 'react'
import { Axiostype } from './axios.type'
import { AxiosInstance } from 'axios'

export const AxiosContext = React.createContext<Axiostype>({
    axios: {} as AxiosInstance
})
