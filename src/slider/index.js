import Edit from "./edit";
import Save from "./save";
import { __ } from "@wordpress/i18n";
import { gallery as icon } from "@wordpress/icons";
import metadata from "./block.json";
import { registerBlockType } from "@wordpress/blocks";

registerBlockType(metadata.name, {
	title: metadata.title,
	icon,
	category: "layout",
	supports: {
		align: true,
	},
	attributes: {
		images : {
			type: "array",
			default: [],
		}
	},
	edit: Edit,
	save: Save,
});
