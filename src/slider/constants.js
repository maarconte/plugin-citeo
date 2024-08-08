/**
 * These are the block we'll allow to be inserted
 * as a slide.
 */
export const ALLOWED_BLOCKS = ["core/cover"];

/**
 * This is the default block we'll use for our slide.
 */
export const DEFAULT_BLOCK = "core/cover";

/**
 * These are the attributes we assign for our DEFAULT_BLOCK.
 */
export const DEFAULT_BLOCK_ATTRIBUTES = {
    align: "center",
    className: "swiper-slide",
    contentPosition: "bottom left",
    customOverlayColor: "#000000",
    dimRatio: 20,
    layout: {
        type: "constrained",
    },
    style: {
        color: {
            text: "#ffffff",
        },
        elements: {
            heading: {
                color: {
                    text: "#ffffff",
                },
            },
            link: {
                color: {
                    text: "#ffffff",
                },
            },
        },
        spacing: {
            padding: {
                top: "var:preset|spacing|large",
                bottom: "var:preset|spacing|large",
                left: "var:preset|spacing|large",
                right: "var:preset|spacing|large",
            },
        },
    },
};

/**
 * These are the default inner blocks we'll use
 * when our DEFAULT_BLOCK is inserted.
 */
export const DEFAULT_INNERBLOCK = "core/paragraph";

/**
 * These are the attributes we assign for our default
 * inner blocks.
 */
export const DEFAULT_INNERBLOCK_ATTRIBUTES = {
    fontSize: "large",
    style: {
        color: {
            text: "#ffffff",
        },
    },
};

/**
 * Some default Unsplash images...
 * (feel free to replace)
 */
export const PLACEHOLDER_IMG_1 =
    "https://images.unsplash.com/photo-1655149000476-5905506e5ee3?q=80&w=2950&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
export const PLACEHOLDER_IMG_2 =
    "https://images.unsplash.com/photo-1655149002375-d91e26bb69d1?q=80&w=2966&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
export const PLACEHOLDER_IMG_3 =
    "https://images.unsplash.com/photo-1655149002351-132042bee905?q=80&w=2922&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
