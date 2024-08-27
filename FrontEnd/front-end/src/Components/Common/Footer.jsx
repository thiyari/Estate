import React from 'react';
import {FaFacebook, FaTwitter, FaLinkedin, FaYoutube, FaWhatsapp} from 'react-icons/fa';

function Footer(){

    return(
        <React.Fragment>
            <footer className="bd-footer py-4 py-md-5 mt-5 bg-white">
                <div className='container p-4'>
                    <div className='row'>
                        <div className='col-sm-6'>
                            <h5>Kind Note</h5>
                            <p>The information provided above in this website is only meant for visual understanding purposes. The data incorporated is not really meant for selling, purchasing or leasing the properties. This site is under development phase.</p>
                        </div>
                        <div className='col-sm-2'>
                            <h5>Navigation</h5>
                            <p><a href="/">Home</a></p>
                            <p><a href="/AboutUs">About Us</a></p>
                            <p><a href="/ContactUs">Contact Us</a></p>
                        </div>
                        <div className='col-sm-2'>
                            <h5>Services</h5>
                            <p><a href="/Plots">Plots</a></p>
                            <p><a href="/Houses">Houses</a></p>
                            <p><a href="/Commercial">Commercial</a></p>
                        </div>
                        <div className='col-sm-2'>
                            <h5>Address</h5>
                            <p>India</p>
                            <p>Po box no-525896</p>
                            <p>+91-9896547813</p>
                        </div>
                    </div>
                </div>
                <section className='d-flex justify-content-center'>
                    <div className='me-5 d-none d-lg-block'>
                        <span>Get connected with us on our Social Media Networks</span>
                    </div>
                    <div>
                        <a href='#facebook'><FaFacebook size={50}/></a>{" "}
                        <a href='#twitter'><FaTwitter size={50}/></a>{" "}
                        <a href='#linkedin'><FaLinkedin size={50}/></a>{" "}
                        <a href='#youtube'><FaYoutube size={50}/></a>{" "}
                        <a href='#whatsapp'><FaWhatsapp size={50}/></a>
                    </div>
                </section>
            </footer>
        </React.Fragment>
    );
}

export default Footer;