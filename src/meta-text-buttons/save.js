import "./style.scss"

import { RichText, useBlockProps } from "@wordpress/block-editor";

const Save = ({ attributes }) => {
	const { title, content, mediaUrl, mediaAlt, buttons } = attributes;
	const blockProps = useBlockProps.save();

	return (
		<div className="mb-2" {...blockProps}>
			<div className="grid mb-2">
				<div className="col-md-6">
					<div className="mb-2">
						<RichText.Content tagName="h2" value={title} />
						<RichText.Content tagName="text" value={content} />
					</div>
					<div className="d-flex gap-1">
						{buttons.map((button, index) => (
							button?.label && button?.url && (
								<a
									key={index}
									href={button.url}
									className={`btn btn--primary ${index === 1 ? "btn--outline" : ""}`}
								>
									{button.label}
								</a>
							)
						))}

					</div>
				</div>
				<div className="col-md-6">
					<img src={mediaUrl} alt={mediaAlt} />
				</div>
			</div>
		</div>
	);
};

export default Save;
