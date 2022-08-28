import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {FaHome, FaCommentAlt, FaChartLine, FaUserNurse} from 'react-icons/fa'
import {MdGeneratingTokens, MdFeedback} from 'react-icons/md'
import './sidebar.scss';

const EventSidebar = ({eventId}) => {

    const sidebarNavItems = [
        {
            display: 'Profile',
            icon: <FaHome className='sidebar-icons' style={{color: 'black'}} />,
            to: `/event/${eventId}/profile`,
            section: 'profile'
        },
        {
            display: 'Discussion',
            icon: <FaCommentAlt className='sidebar-icons' style={{color: 'black'}} />,
            to: `/event/${eventId}/discussion`,
            section: 'discussion'
        },
        {
            display: 'Statistics',
            icon: <FaChartLine className='sidebar-icons' style={{color: 'black'}} />,
            to: `/event/${eventId}/statistics`,
            section: 'statistics'
        },
        {
            display: 'Members',
            icon: <FaUserNurse className='sidebar-icons' style={{color: 'black'}} />,
            to: `/event/${eventId}/members`,
            section: 'members'
        },
        {
            display: 'Tickets',
            icon: <MdGeneratingTokens className='sidebar-icons-md' style={{color: 'black'}} />,
            to: `/event/${eventId}/tickets`,
            section: 'tickets'
        },
        {
            display: 'Feedback',
            icon: <MdFeedback className='sidebar-icons-md' style={{color: 'black'}} />,
            to: `/event/${eventId}/feedback`,
            section: 'feedback'
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

    // change active index
    useEffect(() => {
        const curPath = window.location.pathname.split('/')[3];
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
