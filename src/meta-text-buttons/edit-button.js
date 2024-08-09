import {
	BlockControls,
	__experimentalLinkControl as LinkControl,
	RichText,
} from "@wordpress/block-editor";
import { Popover, ToolbarButton, ToolbarDropdownMenu, ToolbarGroup } from "@wordpress/components";
import React, { useState } from "react";
import { arrowLeft, arrowRight, link, linkOff, symbol } from "@wordpress/icons";

import { __ } from "@wordpress/i18n";

export default function EditButton({ buttons, setAttributes, index, label, url,icon, iconPosition = "left" }) {
    const [isEditingURL, setIsEditingURL] = useState(false);
const [isEditingIcon, setIsEditingIcon] = useState(false);
    function unlink() {
        setAttributes({
            buttons: buttons.map((button, i) => {
                if (i === index) {
                    return { ...button, url: "" };
                }
                return button;
            }),
        });
        setIsEditingURL(false);
    }

    const handleChangeButtonLabel = (value) => {
        setAttributes({
            buttons:
                buttons &&
                buttons.map((button, i) => {
                    if (i === index) {
                        return { ...button, label: value };
                    }
                    return button;
                }),
        });
    };

    const handleChangeButtonURL = (url, title) => {
        setAttributes({
            buttons:
                buttons &&
                buttons.map((button, i) => {
                    const label = button.label || title;
                    if (i === index) {
                        return { ...button,label: label, url: url };
                    }
                    return button;
                }),
        });
	};

	const handleChangeButtonIcon = (icon) => {
		setAttributes({
			buttons:
				buttons &&
				buttons.map((button,i) => {
					if (i === index) {
						return { ...button,icon: icon };
					}
					return button;
				}),
		});
	}

  const iconMarkup = iconPosition === "left" ? <span className="btn__icon">{icon}</span> : null;

    return (
        <div>
            <RichText
                className={`btn btn--primary ${index === 1 ? "btn--outline" : ""} ${!label || !url ? "btn--disabled" : ""}`}
                withoutInteractiveFormatting
                tagName="text"
                value={label}
                allowedFormats={["core/link"]}
                onChange={(value) => handleChangeButtonLabel(value)}
                placeholder={__("Button")}
            />
            <BlockControls
                group="block"
                __experimentalShareWithChildBlocks>
                {!url ? (
                    <ToolbarGroup>
                        <ToolbarButton
                            name="link"
                            icon={link}
                            title={__(`Link ${index + 1}`)}
                            onClick={() => setIsEditingURL(true)}
                        />
                        <ToolbarButton
                            name="icon"
                            icon={symbol}
                            title={__("Icon")}
                            onClick={() => setIsEditingIcon(true)}
                        />
                    </ToolbarGroup>
                ) : (
                    <ToolbarGroup>
                        <ToolbarButton
                            name="link"
                            icon={linkOff}
                            title={__("Unlink")}
                            onClick={() => unlink()}
                            isActive
                        />
                        <ToolbarDropdownMenu
                            icon={symbol}
                            label="Select icon"
                            controls={[
                                {
                                    title: "Right",
                                    icon: arrowRight,
                                    onClick: () => console.log("right"),
                                },
                                {
                                    title: "Left",
                                    icon: arrowLeft,
                                    onClick: () => console.log("left"),
                                },
                            ]}
                        />
                    </ToolbarGroup>
                )}
            </BlockControls>
            {isEditingURL && (
                <Popover
                    placement="bottom"
                    onClose={() => setIsEditingURL(false)}
                    focusOnMount={isEditingURL ? "firstElement" : false}
                    __unstableSlotName="__unstable-block-tools-after"
                    shift>
                    <LinkControl
                        value={url}
                        onChange={({ url, title }) => {
                            handleChangeButtonURL(url, title);
                        }}
                        onRemove={() => {
                            unlink();
                        }}
                        forceIsEditingLink={isEditingURL}
                    />
                </Popover>
            )}
        </div>
    );
}
