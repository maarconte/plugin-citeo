import Edit from "./edit";
import Save from "./save";
import { __ } from "@wordpress/i18n";
import metadata from "./block.json";
import { registerBlockType } from "@wordpress/blocks";

registerBlockType(metadata.name, {
	title: metadata.title,
	icon: metadata.icon,
	category: "layout",
	supports: {
		align: true,
	},
	attributes: {

	},
	edit: Edit,
	save: Save,
});
