import React from 'react'
import { Redirect } from 'react-router-dom'

export default function ProtectedRoute(props) {
    const { component: Component } = props
    const isAuthenticated = localStorage.token

    return isAuthenticated ? (
        <Component />
    ) : (
        <Redirect to={{ pathname: '/login' }} />
    )
}