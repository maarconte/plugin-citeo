import { BlockControls, InspectorControls, __experimentalLinkControl as LinkControl, RichText } from "@wordpress/block-editor";
import {
    __experimentalHeading as Heading,
    Icon,
    Panel,
    PanelBody,
    Popover,
    __experimentalRadio as Radio,
    __experimentalRadioGroup as RadioGroup,
    ToggleControl,
    ToolbarButton,
    ToolbarDropdownMenu,
    ToolbarGroup,
} from "@wordpress/components";
import React, { useState } from "react";
import { arrowLeft, arrowRight, link, linkOff, symbol } from "@wordpress/icons";

import { __ } from "@wordpress/i18n";

export default function EditButton({ buttons,button,setAttributes,index,selectedElement,handleSelectElement }) {
	const { isVisible,url,label,icon,iconPosition = "left" } = button;
	const [isEditingURL,setIsEditingURL] = useState(false);
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

    return (
        <div>
            {selectedElement === "button" + index && (
                <InspectorControls>
                    <Panel>
                        <PanelBody title={__("Button Settings")}>
                            <ToggleControl
                                label={__("Show Button")}
                                checked={isVisible}
                                onChange={(value) => {
                                    setAttributes({
                                        buttons: buttons.map((button, i) => {
                                            if (i === index) {
                                                return { ...button, isVisible: value };
                                            }
                                            return button;
                                        }),
                                    });
                                }}
							/>
							<div className="mb-2">
                            <Heading>{__("Icon")}</Heading>
                            <RadioGroup
                                label={__("Icon")}
                                onChange={(value) => {
                                    setAttributes({
                                        buttons: buttons.map((button, i) => {
                                            if (i === index) {
                                                return { ...button, icon: value };
                                            }
                                            return button;
                                        }),
                                    });
                                }}
                                checked={icon}>
                                <Radio value="arrow-left-alt2">
                                    <Icon icon="arrow-left-alt2" />
                                    Chevron left
                                </Radio>
                                <Radio value="arrow-right-alt2">
                                    <Icon icon="arrow-right-alt2" />
                                    Chevron right
                                </Radio>
                            </RadioGroup>
							</div>
                            <Heading>{__("Icon position")}</Heading>
                            <RadioGroup
                                label={__("Icon position")}
                                onChange={(value) => {
                                    setAttributes({
                                        buttons: buttons.map((button, i) => {
                                            if (i === index) {
                                                return { ...button, iconPosition: value };
                                            }
                                            return button;
                                        }),
                                    });
                                }}
                                checked={iconPosition}>
                                <Radio value="left">Left</Radio>
                                <Radio value="right">Right</Radio>
                            </RadioGroup>
                        </PanelBody>
                    </Panel>
                </InspectorControls>
            )}
            <RichText
                className={`btn btn--primary ${index === 1 ? "btn--outline" : ""} ${!label || !url  || !isVisible ? "btn--disabled" : ""} `}
                tagName="button"
                value={label}
                onChange={(value) => handleChangeButtonLabel(value)}
                placeholder={__("Button")}
                isSelected={selectedElement === "button" + index}
                onFocus={() => handleSelectElement(`button${index}`)}
                allowedFormats={[]}
            />
            {selectedElement === "button" + index && (
                <BlockControls
                    group="block"
                    __experimentalShareWithChildBlocks>
                    <ToolbarGroup>
                        <ToolbarButton
                            name="link"
                            icon={url ? linkOff : link}
                            title={__(`Link ${index + 1}`)}
                            onClick={() => (url ? unlink() : setIsEditingURL(true))}
                            isActive={url ? true : false}
                        />
                        <ToolbarDropdownMenu
                            icon={symbol}
                            label="Select icon"
                            controls={[
                                {
                                    title: "Right",
                                    icon: arrowRight,
                                    onClick: () => handleChangeButtonIcon("arrow-left-alt2"),
                                },
                                {
                                    title: "Left",
                                    icon: arrowLeft,
                                    onClick: () => handleChangeButtonIcon("arrow-right-alt2"),
                                },
                            ]}
                        />
                    </ToolbarGroup>
                </BlockControls>
            )}
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
