import React from 'react';
import { RiMenuLine } from 'react-icons/ri';

let Sidebar = (props) => {

    return (
        <div className={props.collapseSidebar ? "Sidebar" : "Sidebar collapsed"}>
            <div className="sidebar-header">
                <RiMenuLine className="sidebar-icon" onClick={props.handleToggleSidebar} />
                <h1 className="sidebar-logo">{props.sidebarLogo}</h1>
            </div>
            <div className="sidebar-items">
                {props.sidebarItems.map((data, index) => {
                    return(
                        <div key={index} className="item" onClick={data.onclick ? () => {data.onclick()} : null}>
                            {data.icon}
                            <span className="sidebar-text">{data.name}</span>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Sidebar;