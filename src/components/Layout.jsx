import React from 'react';
import { Outlet } from 'react-router-dom';
import SideNav from './Sidenav';
import Header from './header';

export default function Layout() {
    return (
        <div style={{ display: 'flex' }}>
            <SideNav style={{ flex: '0 0 200px' }} />
            <div style={{ flex: '1' }}>
                <Header/>
                <Outlet />
            </div>
        </div>
    );
}
