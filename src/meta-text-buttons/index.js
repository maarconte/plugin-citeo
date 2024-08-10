import { mediaAndText as icon, media } from "@wordpress/icons";

import Edit from "./edit";
import Save from "./save";
import { __ } from "@wordpress/i18n";
import metadata from "./block.json";
import { registerBlockType } from "@wordpress/blocks";
import { withSelect } from "@wordpress/data";

registerBlockType(metadata.name, {
    title: metadata.title,
    icon,
    category: "layout",
    supports: {
        splitting: true,
        typography: {
            fontSize: true,
            lineHeight: true,
            __experimentalFontFamily: true,
            __experimentalTextDecoration: true,
            __experimentalFontStyle: true,
            __experimentalFontWeight: true,
            __experimentalLetterSpacing: true,
            __experimentalTextTransform: true,
            __experimentalWritingMode: true,
            __experimentalDefaultControls: {
                fontSize: true,
            },
        },
        color: {
            gradients: true,
            link: true,
            __experimentalDefaultControls: {
                background: true,
                text: true,
            },
		},
		highlight: true,

    },
    attributes: {
        title: {
            type: "rich-text",
            source: "rich-text",
            selector: "h1,h2,h3,h4,h5,h6",
        },
        level: {
            type: "number",
            default: 2,
        },
        levelOptions: {
            type: "array",
        },
        content: {
            type: "rich-text",
            source: "rich-text",
            selector: "text",
            __experimentalRole: "content",
        },
        mediaId: {
            type: "number",
            default: 0,
        },
        mediaUrl: {
            type: "string",
            default: "",
        },
        mediaAlt: {
            type: "string",
            default: "",
        },
        buttons: {
            type: "array",
            default: [
                {
                    label: "",
                    url: "",
                    icon: "",
					iconPosition: "left",
					isVisible: true
                },
                {
                    label: "",
                    url: "",
                    icon: "",
					iconPosition: "left",
					isVisible: true
                },
            ],
		},
		showButton1: {
			type: "boolean",
			default: true,
		},
		showButton2: {
			type: "boolean",
			default: true,
		}
    },
    edit: withSelect((select, props) => {
        return {
			media: props.attributes.mediaId ? select("core").getMedia(props.attributes.mediaId) : undefined,

        };
    })(Edit),
    save: Save,
});
