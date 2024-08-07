import "./editor.scss";

import {
	Button,
	ResponsiveWrapper,
} from "@wordpress/components";
import {
	MediaUpload,
	MediaUploadCheck,
	RichText,
	useBlockProps,
} from "@wordpress/block-editor";

import EditButton from "./edit-button";
import { __ } from "@wordpress/i18n";

const Edit = (props) => {
	const { attributes, setAttributes } = props;
	const blockProps = useBlockProps();
	return (
		<div>
			<div {...blockProps} className="grid mb-2">
				<div className="col-md-6">
					<RichText
						tagName="h2"
						value={attributes.title}
						allowedFormats={[
							"core/bold",
							"core/italic",
							"core/text-color",
							"core/strikethrough",
						]}
						onChange={(title) => setAttributes({ title })}
						placeholder={__("Title...")}
					/>
					<div className="mb-2">
						<RichText
							tagName="text"
							value={attributes.content}
							allowedFormats={[
								"core/bold",
								"core/italic",
								"core/text-color",
								"core/strikethrough",
							]}
							onChange={(content) => setAttributes({ content })}
							placeholder={__("Content...")}
						/>
					</div>

					<div className="d-flex gap-1">
						{attributes.buttons.map((button, index) => (
							<EditButton
								key={index}
								buttons={attributes.buttons}
								label={button.label}
								url={button.url}
								setAttributes={setAttributes}
								index={index}
							/>
						))}
					</div>
				</div>
				<div className="col-md-6">
					<MediaUploadCheck>
						<MediaUpload
							onSelect={(media) =>
								setAttributes({ mediaId: media.id, mediaUrl: media.url })
							}
							allowedTypes={["image"]}
							value={attributes.mediaId}
							render={({ open }) => (
								<button
									onClick={open}
									className={`mb-1 ${
										attributes.mediaId == 0
											? "editor-post-featured-image__toggle"
											: "editor-post-featured-image__preview"
									}`}
								>
									{attributes.mediaId == 0 && __("Choose an image", "awp")}
									{props.media != undefined && (
										<ResponsiveWrapper
											naturalWidth={props.media.media_details.width}
											naturalHeight={props.media.media_details.height}
										>
											<img src={props.media.source_url} />
										</ResponsiveWrapper>
									)}
								</button>
							)}
						/>
					</MediaUploadCheck>
					{attributes.mediaId != 0 && (
						<MediaUploadCheck>
							<MediaUpload
								title={__("Replace image", "awp")}
								value={attributes.mediaId}
								onSelect={(media) =>
									setAttributes({ mediaId: media.id, mediaUrl: media.url })
								}
								allowedTypes={["image"]}
								render={({ open }) => (
									<Button onClick={open} variant="primary">
										{__("Replace image", "awp")}
									</Button>
								)}
							/>
						</MediaUploadCheck>
					)}
					{attributes.mediaId != 0 && (
						<MediaUploadCheck>
							<Button
								onClick={(media) =>
									setAttributes({
										mediaId: 0,
										mediaUrl: "",
									})
								}
								isDestructive
							>
								{__("Remove image", "awp")}
							</Button>
						</MediaUploadCheck>
					)}
				</div>
			</div>
		</div>
	);
};

export default Edit;
