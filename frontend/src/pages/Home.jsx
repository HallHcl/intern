import React from 'react';
import Layout from '../components/Layout';
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';   
import './HomeStyle.css';

const Home = () => {
  return (
    <div>
      <Layout />
      <main className="main-content">

        {/* Carousel Section */}
        <section className="carousel-section container-fluid p-0">
          <Carousel fade>
            <Carousel.Item>
              <img
                className="d-block w-100 img-fluid"
                src="https://www.turbo.co.th/static-images/ntb.co.th/images/banner/webp/1725260088108-desktop.webp"
                alt="First slide"
              />
              <Carousel.Caption>
               
              </Carousel.Caption>
            </Carousel.Item>

            <Carousel.Item>
              <img
                className="d-block w-100 img-fluid"
                src="https://www.turbo.co.th/static-images/ntb.co.th/images/banner/webp/1719584057009-desktop.webp"
                alt="Second slide"
              />
              <Carousel.Caption>
              
              </Carousel.Caption>
            </Carousel.Item>

            <Carousel.Item>
              <img
                className="d-block w-100 img-fluid"
                src="https://www.turbo.co.th/static-images/ntb.co.th/images/banner/webp/1719584874678-desktop.webp"
                alt="Third slide"
              />
              <Carousel.Caption>
           
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
        </section>

        {/* Hero Section */}
        <section className="hero-section">
          <div className="hero-text text-center">
            <h1 className="display-4 fw-bold">Welcome to Turbo Finance</h1>
            <p className="lead">Your trusted IT support partner</p>
          </div>
        </section>

        {/* Card Section Carousel */}
        <section id="cardSectionCarousel">
          <div className="card-content">
            <div className="card-header-box">
              <div className="card-header">E-Book</div>
            </div>
            <div className="three-row card-detail">
              <ul className="slider-list">
                <li className="slider-slide">
                  <div className="content-card">
                    <div className="image-banner" style={{ maxHeight: '270px' }}>
                      <div className="picture" style={{ width: '100%' }}>
                        <img
                          alt="คู่มือการใช้โน๊ตบุ้ค"
                          title="คู่มือการใช้โน๊ตบุ้ค"
                          src="https://res.cloudinary.com/itcity-production/image/upload/f_jpg,q_80,w_1000/v1727856057/products/PRD202410008308/skus/cni2xo7pillpuo4tn3s3.jpg"
                          style={{ width: '100%', height: '100%' }}
                        />
                      </div>
                    </div>
                    <div className="content-section">
                      <a href="/notebook-ebook" style={{ textDecoration: 'none', color: 'inherit' }}>
                        <div className="content-header">คู่มือการใช้โน๊ตบุ้ค</div>
                        <div className="content-detail">คู่มือการใช้โน๊ตบุ้คนี้ออกแบบมาเพื่อช่วยให้คุณเข้าใจวิธีการใช้งานโน๊ตบุ้คได้อย่างดี</div>
                        <div className="see-more-box">
                          <div className="see-more-text">อ่านต่อ</div>
                          <div className="slide-box"><i className="icon-sl-readmore"></i></div>
                        </div>
                      </a>
                    </div>
                  </div>
                </li>
                <li className="slider-slide">
                  <div className="content-card">
                    <div className="image-banner" style={{ maxHeight: '270px' }}>
                      <div className="picture" style={{ width: '100%' }}>
                          <img
                            alt="คู่มือการใช้เครื่องปริ้น"
                            title="คู่มือการใช้เครื่องปริ้น"
                            src="https://iristechworld.com/wp-content/uploads/2023/02/epson-m3170-one-510x510-1.jpg"
                            style={{ width: '100%', height: '100%' }}
                          />
                      </div>
                    </div>
                    <div className="content-section">
                    <a href="/printer-ebook" style={{ textDecoration: 'none', color: 'inherit' }}>
                      <div className="content-header">คู่มือการใช้เครื่องปริ้น</div>
                      <div className="content-detail">คู่มือการใช้โน๊ตบุ้คนี้ออกแบบมาเพื่อช่วยให้คุณเข้าใจวิธีการใช้งานโน๊ตบุ้คได้อย่างดี</div>
                      <div className="see-more-box">
                        <div className="see-more-text">อ่านต่อ</div>
                        <div className="slide-box"><i className="icon-sl-readmore"></i></div>
                      </div>
                      </a>
                    </div>
                  </div>
                </li>


                <li className="slider-slide">
                  <div className="content-card">
                    <div className="image-banner" style={{ maxHeight: '270px' }}>
                      <div className="picture" style={{ width: '100%' }}>
                          <img
                            alt="คู่มือการใช้ Wifi and VPN"
                            title="คู่มือการใช้ Wifi and VPN"
                            src="https://static.vecteezy.com/system/resources/previews/047/649/894/non_2x/secure-vpn-wireless-shield-vpn-wifi-icon-free-png.png"
                            style={{ width: '100%', height: '100%' }}
                          />
                      </div>
                    </div>
                    <div className="content-section">
                    <a href="/wifi-ebook" style={{ textDecoration: 'none', color: 'inherit' }}>
                      <div className="content-header">คู่มือการใช้ Wifi and VPN</div>
                      <div className="content-detail">คู่มือการใช้โน๊ตบุ้คนี้ออกแบบมาเพื่อช่วยให้คุณเข้าใจวิธีการใช้งานโน๊ตบุ้คได้อย่างดี</div>
                      <div className="see-more-box">
                        <div className="see-more-text">อ่านต่อ</div>
                        <div className="slide-box"><i className="icon-sl-readmore"></i></div>
                      </div>
                      </a>
                    </div>
                  </div>
                </li>

                {/* เพิ่มรายการสินเชื่ออื่น ๆ ตามต้องการ */}
              </ul>
              <div className="slider-control-bottomcenter">
                <div className="custom-bottom-control">
                  {/* เพิ่มปุ่มเลื่อนที่นี่ */}
                  <div className="btn-control active"></div>
                  <div className="btn-control"></div>
                </div>
              </div>
            </div>
          </div>
        </section>

      </main>

      {/* Footer Section */}
      <footer id="desktopFooter">
        <div className="des-footer">

          {/* Left Column */}
          <div className="des-footer-col">
            <label id="label-product" htmlFor="menuToggleProduct">
              ผลิตภัณฑ์ <i className="icon-sl-arrowdown"></i><i className="icon-sl-arrowup"></i>
            </label>
            <div id="menuProduct" className="menu">
              <div>
                <p><a href="https://www.turbo.co.th/loans/motorcycle" className="footer-link">สินเชื่อมอเตอร์ไซค์</a></p>
                <p><a href="https://www.turbo.co.th/loans/car" className="footer-link">สินเชื่อรถยนต์</a></p>
                <p><a href="https://www.turbo.co.th/loans/tractor" className="footer-link">สินเชื่อรถแทรกเตอร์</a></p>
                <p><a href="https://www.turbo.co.th/loans/land" className="footer-link">สินเชื่อโฉนดที่ดิน</a></p>
                <p><a href="https://www.turbo.co.th/loans/nanofinance" className="footer-link">สินเชื่อนาโนไฟแนนซ์</a></p>
                <p><a href="https://www.turbo.co.th/insurances/car" className="footer-link">ประกันรถยนต์</a></p>
                <p><a href="https://www.turbo.co.th/insurances/motorcycle" className="footer-link">ประกันรถมอเตอร์ไซค์</a></p>
              </div>
              <div>
                <p><a href="http://drive.ntb.co.th/documents/penalty-and-service-fee.pdf" target="_blank" rel="noopener noreferrer" className="footer-link">ประกาศดอกเบี้ยและค่าธรรมเนียม</a></p>
                <p><a href="http://drive.ntb.co.th/documents/penalty-and-service-fee.pdf" className="footer-link">การเปิดเผยข้อมูล</a></p>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="des-footer-col">
            <label htmlFor="menuToggleContacus">
              ติดต่อเรา <i className="icon-sl-arrowdown"></i><i className="icon-sl-arrowup"></i>
            </label>
            <div id="menuProduct" className="menu">
              <p>สำนักงานใหญ่</p>
              <p>บริษัท เงินเทอร์โบ จำกัด (มหาชน)</p>
              <p>500 หมู่ 3 ถนนติวานนท์ ตำบลบ้านใหม่ อำเภอปากเกร็ด จังหวัดนนทบุรี 11120</p>
              <p>โทร : <a className="footer-tel" href="tel:028578888">📞02-857-8888</a></p>
              <p>
                <a href="https://www.facebook.com/ngernturbo/" target="_blank" rel="noopener noreferrer" className="footer-social">
                  <i className="icon-sl-facebook"></i>
                </a>
                <a href="https://line.me/R/ti/p/@ngernturbo" target="_blank" rel="noopener noreferrer" className="footer-social">
                  <i className="icon-sl-line"></i>
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="des-footer-last">
          <div className="des-footer-last-row">
            <div className="policy-list">
              <ul>
                <li><a href="http://drive.ntb.co.th/documents/penalty-and-service-fee.pdf">นโยบายเกี่ยวกับคุกกี้ (Cookie)</a></li>
                <li><a href="http://drive.ntb.co.th/documents/penalty-and-service-fee.pdf">นโยบายการคุ้มครองข้อมูลส่วนบุคคล</a></li>
                <li><a href="http://drive.ntb.co.th/documents/penalty-and-service-fee.pdf">คำชี้แจงเกี่ยวกับการใช้กล้องวงจรปิด</a></li>
              </ul>
            </div>
            <div className="des-footer-last-col">สงวนลิขสิทธิ์ พ.ศ. 2561 บริษัท เงินเทอร์โบ จำกัด (มหาชน)</div>
          </div>
        </div>

      </footer>
    </div>
  );
};

export default Home;
