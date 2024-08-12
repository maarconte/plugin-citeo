import { Autoplay, Keyboard, Navigation, Pagination } from "swiper/modules";

/**
 * Swiper dependencies
 *
 * @see https://swiperjs.com/get-started
 */
import { Swiper } from "swiper";

/**
 * Initialize the slider.
 *
 * @param {Element} container HTMLElement.
 * @param {Object}  options   Slider parameters.
 *
 * @return {Object} Returns initialized slider instance.
 *
 * @see https://swiperjs.com/swiper-api#parameters
 */
export function SwiperInit(container, options = {}) {
    const parameters = {
        autoplay: options?.autoplay ?? true,
        centeredSlides: options?.centerSlides ?? false,
        createElements: true,
        grabCursor: options?.grabCursor ?? true,
        initialSlide: 0,
        keyboard: true,
        modules: [Autoplay, Keyboard, Navigation, Pagination],
        navigation: options?.navigation ?? false,
        pagination: options?.pagination ?? false,
		simulateTouch: options?.simulateTouch ?? true,
		slideRole: "group",
		a11y: {
			  				enabled: true,
    prevSlideMessage: 'Previous slide',
    nextSlideMessage: 'Next slide',
  },
    };

    return new Swiper(container, parameters);
}
