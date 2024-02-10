import React from 'react'
import { useDashboardContext } from '../pages/DashboardLayout'
import links from '../utils/links'
import { NavLink } from 'react-router-dom'

export default function NavLinks({isBigSidebar}) {

    const {user,toggleSideBar} = useDashboardContext()

    return (
        <div className="nav-links">
        {links.map((link) => {
            const { text, path, icon } = link;
            const {role} = user
            if(path === 'admin' && role !== 'admin') return
            return (
            <NavLink
                to={path}
                key={text}
                className="nav-link"
                isonClick={isBigSidebar? null: toggleSideBar}
                end
            >
                <span className="icon">{icon}</span>
                {text}
            </NavLink>
            );
        })}
        </div>
  );
}
