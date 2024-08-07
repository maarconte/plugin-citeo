import "./style.scss"

import { RichText, useBlockProps } from "@wordpress/block-editor";
const Save = ({ attributes }) => {
	const blockProps = useBlockProps.save();

	return (
		<div className="mb-2" {...blockProps}>
			<div className="grid mb-2">
				<div className="col-md-6">
					<div className="mb-2">
						<RichText.Content tagName="h2" value={attributes.title} />
						<RichText.Content tagName="text" value={attributes.content} />
					</div>
					<div className="d-flex gap-1">
						{attributes.buttons.map((button, index) => (
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
					<img src={attributes.mediaUrl} alt="" />
				</div>
			</div>
		</div>
	);
};

export default Save;
