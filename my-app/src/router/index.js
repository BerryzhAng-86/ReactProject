//import all routes
import {createBrowserRouter,Navigate} from 'react-router-dom'
import {  Component } from 'react'
import Main from '../pages/main'
import Home from '../pages/home'
import Mall from '../pages/mall'
import Users from '../pages/users'
import pageOne from '../pages/others/pageOne'
import pageTwo from '../pages/others/pageTwo'
import Login from '../pages/login'

const routes=[{
    path:'/',
    Component:Main,
    children:[{
       path:'/',
       //Initial navigation
       element:<Navigate to="home" replace />
    },
    {
        path:'home',
        Component:Home
     },{
        path:'mall',
        Component:Mall
     },{
        path:'user',
        Component:Users
     },{
        path:'other',
        children:[{
            path:'pageOne',
            Component:pageOne
        },{
            path:'pageTwo',
            Component:pageTwo
        }]
     }
]
},{
   path:'/login',
   Component:Login
}]
export default createBrowserRouter(routes)