import "./editor.scss"

import {
	Button,
	PanelBody
} from "@wordpress/components";
import { MediaUpload, useBlockProps } from "@wordpress/block-editor";

import EditGallery from "./edit-gallery";
import { __ } from "@wordpress/i18n";
import { useState } from "react";

const Edit = ({ attributes, setAttributes }) => {
	const [images, setImages] = useState(attributes.images || []);
    const blockProps = useBlockProps();
	const onImageSelect = (newImages) => {
		 setAttributes({ images: images.concat(newImages) });
	};

	return (
        <div {...blockProps}>
            <EditGallery images={attributes.images} />
                <MediaUpload
                    onSelect={(media) => onImageSelect(media)}
                    allowedTypes={["image"]}
                    value={attributes.images}
                    multiple
                    render={({ open }) => (
                        <Button
                            onClick={open}
                            variant="primary">
                            {__("Select Images")}
                        </Button>
                    )}
                />
        </div>
    );
};

export default Edit;
