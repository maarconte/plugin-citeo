import "./style.scss"

import {
	Gallery,
	InspectorControls,
	MediaUpload,
	PanelBody,
} from "@wordpress/components";

import { __ } from "@wordpress/i18n";
import { useState } from "react";

const Edit = ({ attributes, setAttributes }) => {
	const [images, setImages] = useState(attributes.images || []);

	const onImageSelect = (newImages) => {
		setImages(newImages);
		setAttributes({ images: newImages });
	};

	return (
		<div>
			<InspectorControls>
				<PanelBody title={__("Image Slider Settings")}>
					<MediaUpload
						onSelect={onImageSelect}
						allowedTypes="image"
						value={images}
						render={({ open }) => (
							<button onClick={open}>{__("Select Images")}</button>
						)}
					/>
				</PanelBody>
			</InspectorControls>

			<Gallery images={images} />
		</div>
	);
};

export default Edit;
