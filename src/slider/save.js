import "./style.scss"

import EditGallery from "./edit-gallery";
import Slider from "react-slick";
import { useBlockProps } from "@wordpress/block-editor";

const Save = ({ attributes }) => {
		const blockProps = useBlockProps.save();

	return (
        <div
            className="my-slider"
			{...blockProps}>
			{/* {attributes.images.map((image,index) => (
				<img src={image.url} />
			))} */}
			<EditGallery images={attributes.images} />
        </div>
    );
};

export default Save;
