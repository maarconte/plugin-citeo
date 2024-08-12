import {
    ALLOWED_BLOCKS,
    DEFAULT_BLOCK,
    DEFAULT_BLOCK_ATTRIBUTES,
    DEFAULT_INNERBLOCK,
    DEFAULT_INNERBLOCK_ATTRIBUTES,
    PLACEHOLDER_IMG_1,
    PLACEHOLDER_IMG_2,
    PLACEHOLDER_IMG_3,
} from "./constants";
/**
 * WordPress dependencies
 */
import { ButtonBlockAppender, store as blockEditorStore, useInnerBlocksProps } from "@wordpress/block-editor";
import { select, subscribe } from "@wordpress/data";

/**
 * Internal Dependencies
 */
import { SwiperInit } from "./swiper-init";
import { __ } from "@wordpress/i18n";
import { memo } from "@wordpress/element";
import { useRefEffect } from "@wordpress/compose";

/**
 * Slider component.
 */
export const Slider = memo(({ clientId, attributes }) => {
    const sliderRef = useRefEffect((element) => {
        const options = {
            ...attributes,
            ...{
                autoplay: false,
                grabCursor: false,
				simulateTouch: false
            },
        };

        // Initialize slider.
        let slider = SwiperInit(element, options);

        // Store the current slide order to detect changes, such as adding, removing, or reordering slides.
        let slideOrder = select(blockEditorStore).getBlockOrder(clientId);

        // Subscribe slider update events like adding, removing, or reordering slides.
        const unsubscribeSliderUpdateListener = subscribe(() => {
            const currentSlidesOrder = select(blockEditorStore).getBlockOrder(clientId);

            // Check if the slider has been changed.
            if (currentSlidesOrder.toString() !== slideOrder.toString()) {
                const selectedBlock = select(blockEditorStore).getSelectedBlock();
                const slideAdded = currentSlidesOrder.length > slideOrder.length;
                const slideRemoved = currentSlidesOrder.length < slideOrder.length;
                const slideMoved = currentSlidesOrder.length === slideOrder.length;
                const activeIndex = slider.activeIndex;

                // Store the current slide order before destroying the slider instance.
                slideOrder = currentSlidesOrder;
                slider.destroy();

                window.requestAnimationFrame(() => {
                    // Initialize slider.
                    slider = SwiperInit(element, options);

                    // Determine where the slider should go.
                    let slideToIndex = activeIndex;
                    if (slideAdded) {
                        slideToIndex = slideOrder.length;
                    } else if (slideRemoved) {
                        slideToIndex = activeIndex - 1;
                    } else if (slideMoved) {
                        slideToIndex = slideOrder.findIndex(
                            (clientId) => clientId === selectedBlock.clientId, // eslint-disable-line no-shadow
                        );
                    }

                    if (slideToIndex < 0) {
                        slideToIndex = 0;
                    }

                    // slider.slideTo(slideToIndex, 0);
                });
            }
        });

        return () => {
            unsubscribeSliderUpdateListener();
            slider.destroy();
        };
    });

    // Our nested innerblocks that will be inserted by default.
    const innerBlocksProps = useInnerBlocksProps(
        { className: "swiper-wrapper" },
        {
            allowedBlocks: ALLOWED_BLOCKS,
            defaultBlock: {
                name: DEFAULT_BLOCK,
                attributes: {
                    url: `${PLACEHOLDER_IMG_3}`,
                    ...DEFAULT_BLOCK_ATTRIBUTES,
                },
            },
            directInsert: true,
            orientation: "horizontal",
            template: [
                [
                    DEFAULT_BLOCK,
                    {
                        url: `${PLACEHOLDER_IMG_1}`,
                        ...DEFAULT_BLOCK_ATTRIBUTES,
                    },
                    [
                        [
                            DEFAULT_INNERBLOCK,
                            {
                                placeholder: __("Slide title…", "wpe"),
                                ...DEFAULT_INNERBLOCK_ATTRIBUTES,
                            },
                        ],
                    ],
                ],
                [
                    DEFAULT_BLOCK,
                    {
                        url: `${PLACEHOLDER_IMG_2}`,
                        ...DEFAULT_BLOCK_ATTRIBUTES,
                    },
                    [
                        [
                            DEFAULT_INNERBLOCK,
                            {
                                placeholder: __("Slide title…", "wpe"),
                                ...DEFAULT_INNERBLOCK_ATTRIBUTES,
                            },
                        ],
                    ],
                ],
            ],
            renderAppender: false,
            templateInsertUpdatesSelection: true,
        },
    );

    return (
        <>
            <div
                className="swiper mb-2"
                ref={sliderRef}>
                <div {...innerBlocksProps} />
            </div>

            <ButtonBlockAppender
                className="slider-appender has-icon"
                rootClientId={clientId}
            />
        </>
    );
});
