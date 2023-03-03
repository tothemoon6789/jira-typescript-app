import React, { lazy } from "react";
import { Route } from "react-router-dom";

const route = [
    {
        path: '',
        element: React.lazy(() => import('../pages/HomeTemplate/HomeTemplate').then(({ HomeTemplate }) => ({ default: HomeTemplate })),),
        nested: [
            {
                path: '',
                element: lazy(() => import('../pages/HomeTemplate/HomePage/HomePage').then(({ HomePage }) => ({ default: HomePage })),),
            },
            {
                path: 'management',
                element: lazy(() => import('../pages/HomeTemplate/Management/Management').then(({ Management }) => ({ default: Management })),),
            },
            {
                path: 'create',
                element: lazy(() => import('../pages/HomeTemplate/CreateProject/CreateProject').then(({ CreateProject }) => ({ default: CreateProject })),),
            }
        ]
    }
    ,
    {
        path:'login',
        element: lazy(() => import('../pages/LoginTemplate/LoginTemplate').then(({ LoginTemplate }) => ({ default: LoginTemplate })),),

    },
    {
        path:'sign-in',
        element: lazy(() => import('../pages/SinginTemplate/SinginTemplate').then(({ SinginTemplate }) => ({ default: SinginTemplate })),),

    }
]
const renderRoute = () => {
    return route.map((route) => {
        if (route.nested) {
            return <Route key={route.path} path={route.path} element={<route.element/>}>
                {
                    route.nested.map((item) => {
                        return <Route key={item.path} path={item.path} element={<item.element/>}></Route>
                    })
                }
            </Route>

        } else {
            return <Route key={route.path} path={route.path} element={<route.element/>}>

            </Route>
        }
    })
}
export default renderRoute