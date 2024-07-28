import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import './AdminNavBar.css';
import AdminDashBoardComponent from '../../components/AdminDashBoardComponent/AdminDashBoardComponent';
import AddBookFormComponent from '../../components/AddBookFormComponent/AddBookFormComponent';
import LogoImage from '../../assets/img/open_book_logo.png';
import {
    LogOut,
    LayoutDashboard,
    BookPlus,
    LibraryBig,
    UsersRound,
    UserRoundPlus,
    ChevronLeft,
    ChevronRight,
} from 'lucide-react';
import AllBooksComponent from '../../components/AllBooksComponent/AllBooksComponent';

function AdminNavBar() {
    const [isExpanded, setIsExpanded] = useState(true);

    const toggleNavbar = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <div className={`admin-page-container ${isExpanded ? 'expanded' : 'collapsed'}`}>
            <BrowserRouter>
                <aside className={`navbar-container ${isExpanded ? 'expanded' : 'collapsed'}`}>
                    <div className='navbar-brand'>
                        <NavLink to='/' className='app-logo'>
                            <img src={LogoImage} alt='Book hub logo' />
                            {isExpanded && <div className='app-name'>Book hub</div>}
                        </NavLink>
                    </div>
                    <div className='page-links'>
                        <NavLink to='/' className='page-link' activeClassName='active'>
                            <LayoutDashboard size={18} className="icon" />
                            <p className={isExpanded ? '' : 'collapsed'}>Dashboard</p>
                        </NavLink>
                        <NavLink to='/allbooks' className='page-link' activeClassName='active'>
                            <LibraryBig size={18} className="icon" />
                            <p className={isExpanded ? '' : 'collapsed'}>All Books</p>
                        </NavLink>
                        <NavLink to='/addbook' className='page-link' activeClassName='active'>
                            <BookPlus size={18} className="icon" />
                            <p className={isExpanded ? '' : 'collapsed'}>Add Books</p>
                        </NavLink>
                        <NavLink to='/allusers' className='page-link' activeClassName='active'>
                            <UsersRound size={18} className="icon" />
                            <p className={isExpanded ? '' : 'collapsed'}>All Users</p>
                        </NavLink>
                        <NavLink to='/adduser' className='page-link' activeClassName='active'>
                            <UserRoundPlus size={18} className="icon" />
                            <p className={isExpanded ? '' : 'collapsed'}>Add Users</p>
                        </NavLink>
                    </div>
                    <div className='admin-logout-button'>
                        <LogOut size={18} className='icon'/>
                        {isExpanded && <span>Logout</span>}
                    </div>
                </aside>
                <div className='main-content'>
                    <Routes>
                        <Route path='/' element={<AdminDashBoardComponent />} />
                        <Route path='/allbooks' element={<AllBooksComponent />} />
                        <Route path='/addbook' element={<AddBookFormComponent />} />
                    </Routes>
                </div>
            </BrowserRouter>
        </div>
    );
}

export default AdminNavBar;
