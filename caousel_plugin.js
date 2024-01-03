(function ($) {
    $.fn.ajBoxSlider = function (options) {
        return this.each(function () {
            const defaults = {
                jsCSS: true,
                dots: true,
                autoplay: true,
                autoplaySpeed: 4000,
            };

            const settings = $.extend({}, defaults, options);

            let currentSlide = 0;
            const slider = $(this);
            const slides = slider.find('.slide');
            
            // next, prev and dots
            slider.append('<div class="prev slider-btn">&laquo</div>');
            slider.append('<div class="next slider-btn">&raquo</div>');

            if(settings.dots) {
                slider.append('<div class="slider-dots"></div>');
            }  

            const dotsContainer = slider.find('.slider-dots');
            const dots = dotsContainer.find('.dot');
            const slideWidth = slides.first().width();
            const slidesCount = slides.length;

            // Create slider dots
            for (let i = 0; i < slidesCount; i++) {
                dotsContainer.append('<span data-slide-index="' + i + '" style="width: 8px;height: 8px;background-color: #FFFFFF;display: inline-block;border-radius: 50%;margin: 0 2px;"></span>');
            }

            // Add click event to slider dots
            dots.on('click', function () {
                const dotIndex = $(this).data('slide-index');
                currentSlide = dotIndex;
                updateSlider();
            });

            slider.find('.prev').on('click', prevSlide);
            slider.find('.next').on('click', nextSlide);

            // Highlight the active dot
            function highlightActiveDot() {
                dots.removeClass('active');
                dots.eq(currentSlide).addClass('active');
            }
            function updateSlider() {
                const newPosition = -currentSlide * slideWidth;
                slides.css('transform', 'translateX(' + newPosition + 'px)');
                highlightActiveDot();
            }
            function nextSlide() {
                if (currentSlide < slidesCount - 1) {
                    currentSlide++;
                } else {
                    currentSlide = 0;
                }
                updateSlider();
            }
            function prevSlide() {
                if (currentSlide > 0) {
                    currentSlide--;
                } else {
                    currentSlide = slidesCount - 1;
                }
                updateSlider();
            }

            // Auto-slide functionality
            if (settings.autoplay) {
                setInterval(function () {
                    nextSlide();
                }, settings.autoplaySpeed);
            }
            
            // Initialize the slider
            updateSlider();

            if(settings.jsCSS) {
                // css            
                slider.css({
                    'width': '100%',
                    'display': 'flex',
                    'overflow': 'hidden',
                    'position': 'relative',
                });
                slides.css({
                    'flex': '0 0 100%',
                    'box-sizing': 'border-box',
                    'transition': 'transform 0.5s ease-in-out',
                });
                slider.find('img').css({
                    'width': '100%',
                    'height': 'auto',
                });
                slider.find('.caption').css({
                    'width': '100%',
                    'color': '#fff',
                    'bottom': '28px',
                    'padding': '16px 0',
                    'text-align': 'center',
                    'position': 'absolute',
                    'background-color': 'rgba(0, 0, 0, .6)'
                });
                slider.find('.slider-btn').css({
                    'top': '50%',
                    'border': 'none',
                    'padding': '10px',
                    'color': '#000000',
                    'cursor': 'pointer',
                    'position': 'absolute',
                    'background-color': '#ffffff',
                    'transform': 'translateY(-50%)'
                });
                slider.find('.slider-dots').css({
                    'left': '50%',
                    'z-index': 99,
                    'bottom': '10px',
                    'position': 'absolute',
                    'transform': 'translateX(-50%)',
                    
                })
                slider.find('.prev').css({'left': '0'});
                slider.find('.next').css({'right': '0'});
            }
        });
    };
})(jQuery);
