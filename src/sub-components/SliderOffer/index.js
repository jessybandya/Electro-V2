import React from 'react'

function SliderOffer() {
  return (
    <div>
          {/* ======================== Offer Banner Start ==================== */}
          <section className="offer-banner-wrap gray pt-4">
            <div className="container-fluid">
              <div className="row">
                <div className="col-lg-12 col-md-12">
                  <div className="owl-carousel banner-offers owl-theme">
                    {/* Single Item */}
                    <div className="item">
                      <div className="offer_item">
                        <div className="offer_item_thumb">
                          <div className="offer-overlay" />
                          <img src="assets/img/offer-1.jpg" alt="" />
                        </div>
                        <div className="offer_caption">
                          <div className="offer_bottom_caption">
                            <p>10% Off</p>
                            <div className="offer_title">Good Deals in Your City</div>
                            <span>Save 10% on All Fruits</span>
                          </div>
                          <a href="#" className="btn offer_box_btn">Explore Now</a>
                        </div>
                      </div>
                    </div>
                    {/* Single Item */}
                    <div className="item">
                      <div className="offer_item">
                        <div className="offer_item_thumb">
                          <div className="offer-overlay" />
                          <img src="assets/img/offer-2.jpg" alt="" />
                        </div>
                        <div className="offer_caption">
                          <div className="offer_bottom_caption">
                            <p>25% Off</p>
                            <div className="offer_title">Good Offer on First Time</div>
                            <span>Save 25% on Fresh Vegetables</span>
                          </div>
                          <a href="#" className="btn offer_box_btn">Explore Now</a>
                        </div>
                      </div>
                    </div>
                    {/* Single Item */}
                    <div className="item">
                      <div className="offer_item">
                        <div className="offer_item_thumb">
                          <div className="offer-overlay" />
                          <img src="assets/img/offer-3.jpg" alt="" />
                        </div>
                        <div className="offer_caption">
                          <div className="offer_bottom_caption">
                            <p>30% Off</p>
                            <div className="offer_title">Super Market Deals</div>
                            <span>Save 30% on Eggs &amp; Dairy</span>
                          </div>
                          <a href="#" className="btn offer_box_btn">Explore Now</a>
                        </div>
                      </div>
                    </div>
                    {/* Single Item */}
                    <div className="item">
                      <div className="offer_item">
                        <div className="offer_item_thumb">
                          <div className="offer-overlay" />
                          <img src="assets/img/offer-4.jpg" alt="" />
                        </div>
                        <div className="offer_caption">
                          <div className="offer_bottom_caption">
                            <p>15% Off</p>
                            <div className="offer_title">Better Offer for You</div>
                            <span>Save More Thank 15%</span>
                          </div>
                          <a href="#" className="btn offer_box_btn">Explore Now</a>
                        </div>
                      </div>
                    </div>
                    {/* Single Item */}
                    <div className="item">
                      <div className="offer_item">
                        <div className="offer_item_thumb">
                          <div className="offer-overlay" />
                          <img src="assets/img/offer-5.jpg" alt="" />
                        </div>
                        <div className="offer_caption">
                          <div className="offer_bottom_caption">
                            <p>40% Off</p>
                            <div className="offer_title">Super Market Deals</div>
                            <span>40% Off on All Dry Foods</span>
                          </div>
                          <a href="#" className="btn offer_box_btn">Explore Now</a>
                        </div>
                      </div>
                    </div>
                    {/* Single Item */}
                    <div className="item">
                      <div className="offer_item">
                        <div className="offer_item_thumb">
                          <div className="offer-overlay" />
                          <img src="assets/img/offer-6.jpg" alt="" />
                        </div>
                        <div className="offer_caption">
                          <div className="offer_bottom_caption">
                            <p>15% Off</p>
                            <div className="offer_title">Better Offer for You</div>
                            <span>Drinking is Goodness for Health</span>
                          </div>
                          <a href="#" className="btn offer_box_btn">Explore Now</a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="ht-25" />
          </section>
          <div className="clearfix" />
          {/* ======================== Offer Banner End ==================== */}
    </div>
  )
}

export default SliderOffer