import React from "react";
import image from '../face11.jpg';
import '../Admin/admin.css';
import { useLocation } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { useRef,useState } from "react";
import { Outlet } from "react-router-dom";

function Superadmin(){
    const canvasRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  const username = location.state?.username || 'Default Username';
  const ID = location.state?.ID || '';
  const [showDropdown, setShowDropdown] = useState(false);

  const handleDropdownToggle = () => {
    setShowDropdown(!showDropdown);
  };
    return(
        <div>
            <div class="wrapper">
      
            <header className="main-header">

        <a href="index2.html" className="logo"><b>Admin</b>LTE</a>

        <nav className="navbar navbar-static-top" role="navigation">
          <a href="#" className="sidebar-toggle" data-toggle="offcanvas" role="button">
            <span className="sr-only">Toggle navigation</span>
          </a>

          {/* Logo */}
          <a className="navbar-brand cursor-pointer" onClick={handleDropdownToggle}>
            <img src={image} className="user-image" alt="Logo" />
            {/* You can also add text or other elements alongside the logo */}
            {username}
            &nbsp;
            <i className="fa fa-chevron-circle-down"></i>
          </a>
          {showDropdown && (
            <div className="dropdown">
              <a href="#" onClick={() => navigate('/Account')}>
                <i className="fa fa-sign-out" aria-hidden="true"></i> Logout
              </a>
              <a onClick={() => navigate('/Edit', { state: { username: username, ID: ID } })}>
                <i className="fa fa-user" aria-hidden="true"></i> Account
              </a>

              {/* Các mục khác của dropdown có thể được thêm vào đây */}
            </div>
          )}
        </nav>
      </header>
    
      <aside class="main-sidebar">
        
        <section class="sidebar">
          
          <div class="user-panel">
            <div class="pull-left image">
              <img src={image} class="img-circle" alt="User Image" />
            </div>
            <div class="pull-left info">
              <p>Alexander Pierce</p>

              <a href="#"><i class="fa fa-circle text-success"></i> Online</a>
            </div>
          </div>
         
          <form action="#" method="get" class="sidebar-form">
            <div class="input-group">
              <input type="text" name="q" class="form-control" placeholder="Search..."/>
              <span class="input-group-btn">
                <button type='submit' name='search' id='search-btn' class="btn btn-flat"><i class="fa fa-search"></i></button>
              </span>
            </div>
          </form>
          
          <ul class="sidebar-menu">
            <li class="header">MAIN NAVIGATION</li>
            <li class="active treeview">
              <a href="#" onClick={()=>navigate('/superadmin',{state:{username:username}})}>
                <i class="fa fa-dashboard"></i> <span>Dashboard</span> 
              </a>
              
            </li>
            
            <li>
              <a href="" onClick={()=>navigate('/superadmin/createCinema',{state:{username:username}})}>
                <i class="fa fa-th"></i> <span>Create Cinema</span> 
              </a>
            </li>
            <li>
              <a href="" onClick={()=>navigate('/superadmin/detailCinema',{state:{username:username}})}>
                <i class="fa fa-th"></i> <span>Detail Cinema</span> 
              </a>
            </li>
            
            <li>
              <a href="" onClick={()=>navigate('/superadmin/createAdmin',{state:{username:username}})}>
              <i class="fa fa-laptop"></i><span>Create Admin</span> 
              </a>
            </li>
            <li class="treeview">
              <a href="#">
                <i class="fa fa-edit"></i> <span>Forms</span>
                <i class="fa fa-angle-left pull-right"></i>
              </a>
              <ul class="treeview-menu">
                <li><a href="pages/forms/general.html"><i class="fa fa-circle-o"></i> General Elements</a></li>
                <li><a href="pages/forms/advanced.html"><i class="fa fa-circle-o"></i> Advanced Elements</a></li>
                <li><a href="pages/forms/editors.html"><i class="fa fa-circle-o"></i> Editors</a></li>
              </ul>
            </li>
            <li class="treeview">
              <a href="#">
                <i class="fa fa-table"></i> <span>Tables</span>
                <i class="fa fa-angle-left pull-right"></i>
              </a>
              <ul class="treeview-menu">
                <li><a href="pages/tables/simple.html"><i class="fa fa-circle-o"></i> Simple tables</a></li>
                <li><a href="pages/tables/data.html"><i class="fa fa-circle-o"></i> Data tables</a></li>
              </ul>
            </li>
            <li>
              <a href="pages/calendar.html">
                <i class="fa fa-calendar"></i> <span>Calendar</span>
                <small class="label pull-right bg-red">3</small>
              </a>
            </li>
            <li>
              <a href="pages/mailbox/mailbox.html">
                <i class="fa fa-envelope"></i> <span>Mailbox</span>
                <small class="label pull-right bg-yellow">12</small>
              </a>
            </li>
            <li class="treeview">
              <a href="#">
                <i class="fa fa-folder"></i> <span>Examples</span>
                <i class="fa fa-angle-left pull-right"></i>
              </a>
              <ul class="treeview-menu">
                <li><a href="pages/examples/invoice.html"><i class="fa fa-circle-o"></i> Invoice</a></li>
                <li><a href="pages/examples/login.html"><i class="fa fa-circle-o"></i> Login</a></li>
                <li><a href="pages/examples/register.html"><i class="fa fa-circle-o"></i> Register</a></li>
                <li><a href="pages/examples/lockscreen.html"><i class="fa fa-circle-o"></i> Lockscreen</a></li>
                <li><a href="pages/examples/404.html"><i class="fa fa-circle-o"></i> 404 Error</a></li>
                <li><a href="pages/examples/500.html"><i class="fa fa-circle-o"></i> 500 Error</a></li>
                <li><a href="pages/examples/blank.html"><i class="fa fa-circle-o"></i> Blank Page</a></li>
              </ul>
            </li>
            <li class="treeview">
              <a href="#">
                <i class="fa fa-share"></i> <span>Multilevel</span>
                <i class="fa fa-angle-left pull-right"></i>
              </a>
              <ul class="treeview-menu">
                <li><a href="#"><i class="fa fa-circle-o"></i> Level One</a></li>
                <li>
                  <a href="#"><i class="fa fa-circle-o"></i> Level One <i class="fa fa-angle-left pull-right"></i></a>
                  <ul class="treeview-menu">
                    <li><a href="#"><i class="fa fa-circle-o"></i> Level Two</a></li>
                    <li>
                      <a href="#"><i class="fa fa-circle-o"></i> Level Two <i class="fa fa-angle-left pull-right"></i></a>
                      <ul class="treeview-menu">
                        <li><a href="#"><i class="fa fa-circle-o"></i> Level Three</a></li>
                        <li><a href="#"><i class="fa fa-circle-o"></i> Level Three</a></li>
                      </ul>
                    </li>
                  </ul>
                </li>
                <li><a href="#"><i class="fa fa-circle-o"></i> Level One</a></li>
              </ul>
            </li>
            <li><a href="documentation/index.html"><i class="fa fa-book"></i> Documentation</a></li>
            <li class="header">LABELS</li>
            <li><a href="#"><i class="fa fa-circle-o text-danger"></i> Important</a></li>
            <li><a href="#"><i class="fa fa-circle-o text-warning"></i> Warning</a></li>
            <li><a href="#"><i class="fa fa-circle-o text-info"></i> Information</a></li>
          </ul>
        </section>
      
      </aside>

      <Outlet/>
      
      <footer class="main-footer">
        <div class="pull-right hidden-xs">
          <b>Version</b> 2.0
        </div>
        <strong>Copyright &copy; 2014-2015 <a href="http://almsaeedstudio.com">Almsaeed Studio</a>.</strong> All rights reserved.
      </footer>
    </div>
        </div>
    )
}
export default Superadmin;