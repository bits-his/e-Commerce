import React from 'react';
import { Outlet } from 'react-router-dom';
import SideNav from './Sidenav';
import Header from './header';
import useIsPhoneSize from '../utils/useIsPhoneSize';

export default function Layout() {
    const isPhoneSize = useIsPhoneSize();

    return (
        <div style={{ display: 'flex' }}>
            {isPhoneSize ? (
                <>
                    <SideNav style={{ flex: '0 0 200px' }} className='d-none' />
                    <div style={{ flex: '1' }}>
                        <Header/>
                        <Outlet />
                    </div>
                </>
            ):(
                <>
                    <SideNav style={{ flex: '0 0 200px'}} />
                    <div style={{ flex: '1' }} className='main-outlet position-relative'>
                        <Header/>
                        <Outlet />
                    </div>
                </>
            )}
        </div>
    );
}
