import "./style.scss"

import { gallery as icon, navigation } from "@wordpress/icons";

import Edit from "./edit";
import { __ } from "@wordpress/i18n";
import metadata from "./block.json";
import { registerBlockType } from "@wordpress/blocks";
import save from "./save";

registerBlockType(metadata.name, {
    title: metadata.title,
    icon,
    category: "layout",
    supports: {
        align: true,
    },
    attributes: {
        images: {
            type: "array",
            default: [],
        },
        autoplay: {
            type: "boolean",
            default: false,
        },
        navigation: {
            type: "boolean",
            default: false,
        },
        pagination: {
            type: "boolean",
            default: false,
        },
	},
	supports: {
		html: false,
		align: ['wide','full'],
		className: true,
		color: {
			background: true,
			gradients: true,
			link: true,
			text: true
		},
		spacing: {
			padding: true,
			margin: ["top", "bottom"]
		}
	},
    edit: Edit,
    save
});
