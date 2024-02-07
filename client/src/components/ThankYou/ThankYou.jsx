import Menu from "../Menu/Menu";

function ThankYou(){
return(
    <div>
        <Menu></Menu>
        <div style={{ height: '296px', marginTop: '5px' }}>
                <div className="breadcrumb-area">
                    <div className="container">
                        <div className="breadcrumb-content">
                            <h2 className="font-bold" style={{ color: '#ffffff', textTransform: 'uppercase', textAlign: 'center', fontSize: '36px', marginBottom: '0', paddingBottom: '20px', fontFamily: '"Lato", sans-serif' }}>Thank You</h2>
                            <ul>
                                <li>
                                    <a href="" style={{ textDecoration: 'none' }}>Home</a>
                                </li>
                                <li className="active">Thank You</li>
                            </ul>
                        </div>
                    </div>
                </div>

            </div>
            <div className="elementor elementor-4404" style={{marginTop:'164px'}}>
                <section className="elementor-section elementor-top-section elementor-element elementor-element-32e62829 elementor-section-boxed elementor-section-height-default elementor-section-height-default">
                    <div className="elementor-container elementor-column-gap-default">
                        <div className="elementor-column elementor-col-100 elementor-top-column elementor-element elementor-element-2aa0cd79">
                            <div className="elementor-widget-wrap elementor-element-populated">
                                <div className="elementor-element elementor-element-6e399cab elementor-widget elementor-widget-text-editor">
                                    <div className="elementor-widget-container">
                                        <h3 style={{fontSize:'50px',color:'#000000',fontFamily:'Space Grotesk'}}>Thank you for your ticket.</h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
    </div>
)
}
export default ThankYou;