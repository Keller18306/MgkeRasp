import React, { PropsWithChildren } from "react";
import { Link } from "react-router-dom";

export default function ViewerHeader({ children }: PropsWithChildren): JSX.Element {
    return <div className="header">
        <div className="content">{children}</div>
        <div className="navbar">
            <div className="panel section_menu">
                <div className="panel-heading">Ещё в этом разделе</div>
                <div className="panel-body">
                    <ul className="level_0 parent_active">
                        <li className="active parent">
                            <Link to="/">Расписание занятий</Link>
                            <ul className="level_1">
                                <li>
                                    <Link to="/week">Расписание на неделю</Link>
                                </li>
                                <li>
                                    <Link to="/day">Расписание на день</Link>
                                </li>
                                <li>
                                    <Link to="/blind">Расписание для слабовидящих</Link>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
}