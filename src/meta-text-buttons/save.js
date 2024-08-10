import "./style.scss";

import { RichText, useBlockProps } from "@wordpress/block-editor";

import { Icon } from "@wordpress/components";

const Save = ({ attributes }) => {
    const { title, content, mediaUrl, mediaAlt, buttons } = attributes;
    const blockProps = useBlockProps.save();

    return (
        <div
            className="mb-2"
            {...blockProps}>
            <div className="grid mb-2">
                <div className="col-desk-6 col-tab-12">
                    <div className="mb-2">
                        <RichText.Content
                            tagName="h2"
                            value={title}
                        />
                        <RichText.Content
                            tagName="text"
                            value={content}
                        />
                    </div>
                    <div className="d-flex gap-1">
                        {buttons.map((button, index) => (
                            <React.Fragment key={`button_${index}`}>
                                {button.label && button.url && button.isVisible && (
                                    <a
                                        key={index}
                                        href={button.url}
                                        className={`btn btn--primary ${index === 1 ? "btn--outline" : ""}`}>
										{button?.icon && button?.iconPosition !== "right" && <Icon icon={button?.icon} />}
										{button?.label}
                                        {button?.icon && button?.iconPosition === "right" && <Icon icon={button?.icon} />}
                                    </a>
                                )}
                            </React.Fragment>
                        ))}
                    </div>
                </div>
                <div className="col-desk-6 col-tab-12">
                    <img
                        src={mediaUrl}
                        alt={mediaAlt}
                    />
                </div>
            </div>
        </div>
    );
};

export default Save;
