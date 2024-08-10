import "./editor.scss";

import {
    BlockControls,
    HeadingLevelDropdown,
    MediaUpload,
    MediaUploadCheck,
    RichText,
    useBlockEditingMode,
    useBlockProps,
} from "@wordpress/block-editor";
import { Button, PanelBody, ResponsiveWrapper, ToggleControl, ToolbarButton } from "@wordpress/components";

import EditButton from "./edit-button";
import { __ } from "@wordpress/i18n";
import { useState } from "react";

const Edit = (props) => {
    const [selectedElement, setSelectedElement] = useState(null);
    const { attributes, setAttributes, media, levelOptions, onReplace, onRemove } = props;
    const { title, content, buttons, level, mediaId } = attributes;
    const blockEditingMode = useBlockEditingMode();
    const blockProps = useBlockProps();
    const tagName = "h" + attributes.level;
    const onChangeShowButton = (index) => {
        setAttributes({
            buttons:
                buttons &&
                buttons.map((button, i) => {
                    if (i === index) {
                        return { ...button, isVisible: !button.isVisible };
                    }
                    return button;
                }),
        });
	};

	const handleSelectElement = (element) => {
		setSelectedElement(element);
		console.log(element)
	}

    return (
        <div>
            <div
                {...blockProps}
                className="grid mb-2">
                <div className="col-md-6">
                    {selectedElement === "title" && (
                        <BlockControls group="block">
                            <HeadingLevelDropdown
                                value={level}
                                options={levelOptions}
                                onChange={(newLevel) => setAttributes({ level: newLevel })}
                            />
                        </BlockControls>
                    )}
                    <RichText
                        identifier="title"
                        tagName={tagName}
                        value={title}
                        allowedFormats={["core/bold", "core/italic", "core/text-color", "core/strikethrough"]}
                        onChange={(title) => setAttributes({ title })}
                        placeholder={__("Title...")}
                        onReplace={onReplace}
                        onRemove={() => onReplace([])}
                        isSelected={selectedElement === "title"}
                        onFocus={() => handleSelectElement("title")}
                    />
                    <div className="mb-2">
                        <RichText
                            onReplace={onReplace}
                            onRemove={onRemove}
                            identifier="content"
                            tagName="p"
                            value={content}
                        //    allowedFormats={["core/bold", "core/italic", "core/text-color", "core/strikethrough"]}
                            onChange={(content) => setAttributes({ content })}
                            placeholder={__("Content...")}
                            isSelected={selectedElement === "content"}
                            onFocus={() => handleSelectElement("content")}
                        />
                    </div>

                    <div className="d-flex gap-1">
                        {buttons.map((button, index) => (
                            <React.Fragment key={`button_${index}`}>
								<EditButton
										button={button}
                                        icon={button.icon}
                                        iconPosition={button.iconPosition}
                                        buttons={buttons}
                                        label={button.label}
                                        url={button.url}
                                        setAttributes={setAttributes}
										index={index}
										selectedElement={selectedElement}
										handleSelectElement={handleSelectElement}
                                    />
                            </React.Fragment>
                        ))}
                    </div>
                </div>
                <div className="col-md-6">
                    <MediaUploadCheck>
                        <MediaUpload
                            onSelect={(media) => setAttributes({ mediaId: media.id, mediaUrl: media.url, mediaAlt: media.alt })}
                            allowedTypes={["image"]}
                            value={mediaId}
                            render={({ open }) => (
                                <button
                                    onClick={open}
                                    className={`mb-1 ${
                                        mediaId === 0 ? "editor-post-featured-image__toggle" : "editor-post-featured-image__preview"
                                    }`}>
                                    {mediaId === 0 && __("Choose an image", "awp")}
                                    {media != undefined && (
                                        <ResponsiveWrapper
                                            naturalWidth={media.media_details.width}
                                            naturalHeight={media.media_details.height}>
                                            <img src={media.source_url} />
                                        </ResponsiveWrapper>
                                    )}
                                </button>
                            )}
                        />
                    </MediaUploadCheck>
                    {mediaId != 0 && (
                        <>
                            <MediaUploadCheck>
                                <MediaUpload
                                    title={__("Replace image", "awp")}
                                    value={mediaId}
                                    onSelect={(media) => setAttributes({ mediaId: media.id, mediaUrl: media.url, mediaAlt: media.alt })}
                                    allowedTypes={["image"]}
                                    render={({ open }) => (
                                        <Button
                                            onClick={open}
                                            variant="primary">
                                            {__("Replace image", "awp")}
                                        </Button>
                                    )}
                                />
                            </MediaUploadCheck>
                            <MediaUploadCheck>
                                <Button
                                    onClick={(media) =>
                                        setAttributes({
                                            mediaId: 0,
                                            mediaUrl: "",
                                            mediaAlt: "",
                                        })
                                    }
                                    isDestructive>
                                    {__("Remove image", "awp")}
                                </Button>
                            </MediaUploadCheck>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Edit;
