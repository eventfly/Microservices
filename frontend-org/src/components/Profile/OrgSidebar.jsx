import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {FaHome, FaCommentAlt, FaChartLine, FaUserNurse} from 'react-icons/fa'
import '../sidebar.scss';

const EventSidebar = () => {

    const sidebarNavItems = [
        {
            display: 'Account',
            icon: <FaHome className='sidebar-icons' style={{color: 'black'}} />,
            to: `/profile/account`,
            section: 'account'
        },
        {
            display: 'Settings',
            icon: <FaCommentAlt className='sidebar-icons' style={{color: 'black'}} />,
            to: `/profile/settings`,
            section: 'settings'
        },
        {
            display: 'Package',
            icon: <FaChartLine className='sidebar-icons' style={{color: 'black'}} />,
            to: `/profile/package`,
            section: 'package'
        },
        {
            display: 'Members',
            icon: <FaChartLine className='sidebar-icons' style={{color: 'black'}} />,
            to: `/profile/members`,
            section: 'members'
        },
        {
            display: 'About',
            icon: <FaUserNurse className='sidebar-icons' style={{color: 'black'}} />,
            to: `/profile/about`,
            section: 'about'
        },
    ]



    const [activeIndex, setActiveIndex] = useState(-1);
    const [stepHeight, setStepHeight] = useState(0);
    const sidebarRef = useRef();
    const indicatorRef = useRef();
    const location = useLocation();

    useEffect(() => {
        setTimeout(() => {
            const sidebarItem = sidebarRef.current.querySelector('.sidebar__menu__item');
            indicatorRef.current.style.height = `${sidebarItem.clientHeight}px`;
            setStepHeight(sidebarItem.clientHeight);
        }, 50);
    }, []);

    //change active index
    useEffect(() => {
        const curPath = window.location.pathname.split('/')[2];
        console.log(curPath)
        console.log(window.location.pathname)
        const activeItem = sidebarNavItems.findIndex(item => item.section === curPath);
        setActiveIndex(curPath.length === 0 ? 0 : activeItem);
    }, [location]);


    return <div className='sidebar'>
        <div ref={sidebarRef} className="sidebar__menu">
            <div
                ref={indicatorRef}
                className="sidebar__menu__indicator"
                style={{
                    transform: `translateX(-50%) translateY(${activeIndex * stepHeight}px)`
                }}
            ></div>

            {
                sidebarNavItems.map((item, index) => (
                    <Link to={item.to} key={index}>
                        <div className='sidebar__menu__item'>
                            <div className="sidebar__menu__item__icon">
                                {item.icon}
                            </div>
                            <div className={`sidebar-icon-title ${activeIndex === index ? 'active-item' : 'inactive-item'}`}>
                                {item.display}
                            </div>
                        </div>
                    </Link>
                ))
            }
        </div>
    </div>;
};

export default EventSidebar;
