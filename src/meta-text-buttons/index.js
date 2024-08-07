import Edit from "./edit";
import Save from "./save";
import { __ } from "@wordpress/i18n";
import metadata from "./block.json";
import { registerBlockType } from "@wordpress/blocks";
import { withSelect } from "@wordpress/data";
registerBlockType(metadata.name, {
	title: metadata.title,
	icon: metadata.icon,
	category: "layout",
	supports: {
		align: true,
	},
	attributes: {
		title: {
			type: "string",
			source: "html",
			selector: "h2",
		},
		content: {
			type: "string",
			source: "html",
			selector: "text",
		},
		mediaId: {
			type: "number",
			default: 0,
		},
		mediaUrl: {
			type: "string",
			default: "",
		},
		buttons: {
			type: "array",
			default: [
				{
					label: "",
					url: "",
				},
				{
					label: "",
					url: "",
				},
			],
		},
	},
	edit: withSelect((select, props) => {
		return {
			media: props.attributes.mediaId
				? select("core").getMedia(props.attributes.mediaId)
				: undefined,
		};
	})(Edit),
	save: Save,
});
