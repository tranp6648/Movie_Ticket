import { useLocation, useNavigate } from 'react-router-dom';
import './Menu.css'
import { useState,useEffect } from 'react';
function Menu(){
    const navigate = useNavigate();
    const location = useLocation();

    const IDAccount = location.state?.IDAccount || '';
    const [isSticky, setIsSticky] = useState(false);

    // Xử lý sự kiện cuộn trang
    const handleScroll = () => {
        const scrollTop = window.scrollY;
        setIsSticky(scrollTop > 0); // Nếu scroll > 0, set isSticky thành true
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
    return(
        <div>
 <section className={`elementor-section elementor-top-section elementor-element elementor-element-453658a elementor-section-full_width elementor-section-content-middle ${isSticky ? 'header_sticky sticky_bg_dark' : 'sticky_bg_transparent'} elementor-section-height-default elementor-section-height-default`}><div className='elementor-container elementor-column-gap-no'>
                <div className='elementor-widget-wrap elementor-element-populated'>
                    <div className='elementor-element elementor-element-f2fecd8 elementor-widget elementor-widget-ova_logo'>
                       
                        
                                <a href="">
                                    <img src="https://demo.ovatheme.com/aovis/wp-content/uploads/2023/02/logo-white.png" className='img' style={{width:'108px',height:'auto'}} alt="" />
                                    <img src="https://demo.ovatheme.com/aovis/wp-content/uploads/2023/02/logo-white.png" style={{width:'108px',height:'auto'}} alt="" />
                                </a>
                        
                        
                    </div>
                </div>
                <div className='elementor-column elementor-col-33 elementor-top-column elementor-element elementor-element-5e4d312'>
                    <div className='elementor-widget-wrap elementor-element-populated'>
                        <div className='elementor-element elementor-element-0bbfee0 elementor-view-primary-menu elementor-widget__width-auto elementor-hidden-tablet elementor-hidden-mobile elementor-widget elementor-widget-aovis_elementor_menu_nav'>
                            <div className='elementor-widget-container'>
                                <nav className='main-navigation'>
                                   
                                    <div className='primary-navigation'>
                                        <ul id='menu-primary-menu' className='menu'>
                                        <li id='menu-item-56' className='menu-item menu-item-type-post_type menu-item-object-page menu-item-home menu-item-has-children menu-item-56'>
                                            <a href="" onClick={()=>  navigate('/layout',{ state: { IDAccount:IDAccount } })}>
                                                Home
                                                
                                            </a>
                                        </li>
                                        <li id='menu-item-56' className='menu-item menu-item-type-post_type menu-item-object-page menu-item-home menu-item-has-children menu-item-56'>
                                            <a href="">
                                                Movies
                                                <i class="fa fa-caret-down" id='icon' aria-hidden="true"></i>
                                            </a>
                                            <ul className='sub-menu' style={{listStyle:'none'}}>
                                                <li className='menu-item menu-item-type-post_type menu-item-object-page menu-item-home menu-item-has-children menu-item-56' id='menu-item-56'>
                                                    <a href="" style={{color:'#737373',textDecoration:'none'}} onClick={()=>  navigate('/AllMovie',{ state: { IDAccount:IDAccount } })}>Movie All</a>
                                                </li>
                                              
                                              
                                            </ul>
                                        </li>
                                        <li id='menu-item-56' className='menu-item menu-item-type-post_type menu-item-object-page menu-item-home menu-item-has-children menu-item-56'>
                                            <a href="" onClick={()=>  navigate('/MovieActor',{ state: { IDAccount:IDAccount } })}>
                                                Actor
                                                
                                            
                                            </a>
                                           
                                        </li>
                                        <li id='menu-item-56' className='menu-item menu-item-type-post_type menu-item-object-page menu-item-home menu-item-has-children menu-item-56'>
                                            <a href="" onClick={()=>  navigate('/UserVoucher',{ state: { IDAccount:IDAccount } })}>
                                               Voucher
                                                
                                            
                                            </a>
                                           
                                        </li>
                                        <li id='menu-item-56' className='menu-item menu-item-type-post_type menu-item-object-page menu-item-home menu-item-has-children menu-item-56'>
                                            <a href="" onClick={()=>  navigate('/EventHome',{ state: { IDAccount:IDAccount } })}>
                                                Events
                                                
                                            
                                            </a>
                                           
                                        </li>
                                        <li id='menu-item-56' className='menu-item menu-item-type-post_type menu-item-object-page menu-item-home menu-item-has-children menu-item-56'>
                                            <a href="" onClick={()=>  navigate('/BlogHome',{ state: { IDAccount:IDAccount } })}>
                                                Blog
                                                
                                            
                                            </a>
                                           
                                        </li>
                                    
                                       
                                        <li id='menu-item-56' className='menu-item menu-item-type-post_type menu-item-object-page menu-item-home menu-item-has-children menu-item-56'>
                                            <a href="" onClick={()=>  navigate('/Contact',{ state: { IDAccount:IDAccount } })}>
                                                Contact
                                               
                                            </a>
                                        </li>
                                        <li id='menu-item-56' className='menu-item menu-item-type-post_type menu-item-object-page menu-item-home menu-item-has-children menu-item-56'>
                                            <a href="" onClick={()=>  navigate('/About',{ state: { IDAccount:IDAccount } })}>
                                                About
                                               
                                            </a>
                                        </li>
                                        </ul>
                                    </div>
                                </nav>
                            </div>
                        </div>
                    
                    </div>
                </div>
                <div className='elementor-column elementor-col-33 elementor-top-column elementor-element elementor-element-e24734f elementor-hidden-tablet elementor-hidden-mobile'>
                    <div className='elementor-widget-wrap elementor-element-populated'>
                        <div className='elementor-element elementor-element-8ad989f elementor-widget__width-auto elementor-widget elementor-widget-aovis_elementor_search_popup'>
                            <div className='ova_wrap_search_popup'>
                            <i class="fas fa-search" style={{color:'white',fontSize:'24pxx'}}></i>
                            </div>
                        </div>
                       
                    </div>
                    <div className='elementor-element elementor-element-2f55708 elementor-widget__width-auto elementor-view-default elementor-widget elementor-widget-icon'>
                            <div className='elementor-widget-container'>
                                <div className='elementor-icon-wrapper' style={{marginLeft:'32px'}}>
                                    
                                    <a  className='elementor-icon' onClick={()=>navigate(`${IDAccount=='' ?'/Account' :'/Myorder'}`,{ state: {  IDAccount: IDAccount} })}>
                                    <i class="fa-solid fa-user" style={{color:'white',fontSize:'24pxx'}}></i>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className='elementor-element elementor-element-9108b98 elementor-widget__width-auto elementor-hidden-desktop elementor-view-primary-menu elementor-widget elementor-widget-aovis_elementor_menu_canvas'>
<div className="elementor-widget-container">
    <nav className="menu-canvas">
        <button className="menu-toggle">
            <span></span>
        </button>
        <nav className='container-menu dir_left'>
            <div className="close-menu"></div>
            <div className="primary-navigation">
                <ul className="menu" id='menu-primary-menu-1'>
                    <li className='menu-item menu-item-type-post_type menu-item-object-page menu-item-home menu-item-has-children menu-item-56'>
                        <a href="">Home</a>
                        <button className='dropdown-toggle'></button>
                        ul.
                    </li>
                </ul>
            </div>
        </nav>
    </nav>
</div>
</div>
                        {IDAccount!='' && (
                            <div>
 <div className='elementor-element elementor-element-2f55708 elementor-widget__width-auto elementor-view-default elementor-widget elementor-widget-icon'>
    <div className='elementor-widget-container'>
        <div className='elementor-icon-wrapper' style={{marginLeft:'32px'}}>
            
            <a href=''  className='elementor-icon' onClick={()=>navigate(`/layout`)}>
            <i class="fa fa-sign-out" style={{color:'white',fontSize:'24pxx'}}></i>
            </a>
        </div>
    </div>
</div>
<div className='elementor-element elementor-element-9108b98 elementor-widget__width-auto elementor-hidden-desktop elementor-view-primary-menu elementor-widget elementor-widget-aovis_elementor_menu_canvas'>

</div>
                            </div>
   
                        )}
                
                </div>
            </div>
            </section>
        </div>
    )
}
export default Menu;