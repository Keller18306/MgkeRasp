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
                                <Link to="/groups/">Для групп</Link>
                                <ul className="level_1">
                                    <li>
                                        <Link to="/groups/week">На неделю</Link>
                                    </li>
                                    <li>
                                        <Link to="/groups/day">На день</Link>
                                    </li>
                                    <li>
                                        <Link to="/groups/blind">Для слабовидящих</Link>
                                    </li>
                                </ul>

                                <Link to="/teachers/">Для учителей</Link>
                                <ul className="level_1">
                                    <li>
                                        <Link to="/teachers/week">На неделю</Link>
                                    </li>
                                    <li>
                                        <Link to="/teachers/day">На день</Link>
                                    </li>
                                </ul>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
}