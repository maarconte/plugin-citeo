import {
	BlockControls,
	__experimentalLinkControl as LinkControl,
	RichText,
} from "@wordpress/block-editor";
import { Popover, ToolbarButton } from "@wordpress/components";
import React, { useState } from "react";
import { link, linkOff } from "@wordpress/icons";

import { __ } from "@wordpress/i18n";

export default function EditButton({ buttons, setAttributes, index, label, url }) {
	const [isEditingURL, setIsEditingURL] = useState(false);

	function unlink() {
		setAttributes({
			buttons: buttons.map((button,i) => {
				if (i === index) {
					return { ...button,url: "" };
				}
				return button;
			}
			),
		});
		setIsEditingURL(false);
	}

	const handleChangeButtonLabel = (value) => {
		setAttributes({
			buttons:
				buttons &&
				buttons.map((button,i) => {
					if (i === index) {
						return { ...button,label: value };
					}
					return button;
				}),
		});
	};

	const handleChangeButtonURL = (url,title) => {
		setAttributes({
			buttons:
				buttons &&
				buttons.map((button,i) => {
					const label = button.label || title;
					if (i === index) {
						return { label: label, url: url };
					}
					return button;
				}),
		});
	};

	return (
		(<div>
			<RichText
				className={`btn btn--primary ${index === 1 ? "btn--outline" : ""} ${!label || !url ? "btn--disabled" : ""}`}
				withoutInteractiveFormatting
				tagName="text"
				value={label}
				allowedFormats={["core/link"]}
				onChange={(value)=>handleChangeButtonLabel(value)}
				placeholder={__("Button")}
			/>
			<BlockControls group="block">
				{!url ? (
					<ToolbarButton
						name="link"
						icon={link}
						title={__(`Link ${index + 1}`)}
						onClick={() => setIsEditingURL(true)}
					/>
				) : (
					<ToolbarButton
						name="link"
						icon={linkOff}
						title={__("Unlink")}
						onClick={() => unlink()}
						isActive
					/>
				)}
			</BlockControls>
			{isEditingURL && (
				<Popover
					placement="bottom"
					onClose={() => setIsEditingURL(false)}
					focusOnMount={isEditingURL ? "firstElement" : false}
					__unstableSlotName="__unstable-block-tools-after"
					shift
				>
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
		</div>)
	);
}
