import React from 'react'

export default function Carousel() {
    return (
        <div>

            <div id="carousel-example-1z" class="carousel slide carousel-fade" data-ride="carousel">

                <ol class="carousel-indicators">
                    <li data-target="#carousel-example-1z" data-slide-to="0" class="active"></li>
                    <li data-target="#carousel-example-1z" data-slide-to="1"></li>
                    <li data-target="#carousel-example-1z" data-slide-to="2"></li>
                </ol>


                <div class="carousel-inner" role="listbox">

                    <div class="carousel-item active">
                        <img height='200px' class="d-block w-100" src="https://www.netmeds.com/images/cms/aw_rbslider/slides/1578911946_Home_Page_Bannergggg.jpg"
                            alt="First slide" />
                    </div>


                    <div class="carousel-item">
                        <img height='200px' class="d-block w-100" src="https://www.netmeds.com/images/cms/aw_rbslider/slides/1578056465_Home_Bannerpooooo.jpg"
                            alt="Second slide" />
                    </div>


                    <div class="carousel-item">
                        <img height='200px' class="d-block w-100" src="https://www.netmeds.com/images/cms/aw_rbslider/slides/1578923005_Home_Page_Bannerhhhh.jpg"
                            alt="Third slide" />
                    </div>

                </div>

                <a class="carousel-control-prev" href="#carousel-example-1z" role="button" data-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="sr-only">Previous</span>
                </a>
                <a class="carousel-control-next" href="#carousel-example-1z" role="button" data-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="sr-only">Next</span>
                </a>

            </div>

        </div>
    )
}
