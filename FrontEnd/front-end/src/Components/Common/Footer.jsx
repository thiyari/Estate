import React from 'react';
import {FaFacebook, FaTwitter, FaLinkedin, FaYoutube} from 'react-icons/fa';

function Footer(){

    return(
        <React.Fragment>
            <footer class="bd-footer py-4 py-md-5 mt-5 bg-body-tertiary">
                <section className='d-flex justify-content-center '>
                    <div className='me-5 d-none d-lg-block'>
                        <span>Get connected with us on social media Network</span>
                    </div>
                    <div>
                        <a href=''><FaFacebook/></a>
                        <a href=''><FaTwitter/></a>
                        <a href=''><FaLinkedin/></a>
                        <a href=''><FaYoutube/></a>
                    </div>
                </section>
                <div className='container p-4'>
                    <div className='row'>
                        <div className='col-sm-4'>
                            <h5>About Us</h5>
                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                        </div>
                        <div className='col-sm-2'>
                            <h5>Navigation</h5>
                            <p><a href="#h">Home</a></p>
                            <p><a href='#a'>About Us</a></p>
                            <p><a href='#c'>Contact Us</a></p>
                        </div>
                        <div className='col-sm-2'>
                            <h5>Services</h5>
                            <p><a href='#h'>Home</a></p>
                            <p><a href='#a'>About Us</a></p>
                            <p><a href='#c'>Contact Us</a></p>
                        </div>
                        <div className='col-sm-2'>
                            <h5>Address</h5>
                            <p>India</p>
                            <p>Po box no-501505</p>
                            <p>+91-9542204521</p>
                        </div>
                    </div>
                </div>
            </footer>
        </React.Fragment>
    );
}

export default Footer;