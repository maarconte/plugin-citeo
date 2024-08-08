import "./editor.scss"

import { PanelBody, PanelRow, ToggleControl } from "@wordpress/components";
import { useBlockEditContext, useBlockProps } from "@wordpress/block-editor";

import { Slider } from "./slider";
import { __ } from "@wordpress/i18n";
import { useState } from "react";

const Edit = ({ attributes, setAttributes }) => {
	const [images,setImages] = useState(attributes.images || []);
	const { autoplay, navigation, pagination } = attributes;
    const { clientId } = useBlockEditContext();
    const blockProps = useBlockProps();

	return (
        <div>
            <div {...blockProps}>
                <Slider
                    attributes={attributes}
                    clientId={clientId}
                />
            </div>

                <PanelBody title={__("Settings", "wpe")}>
                    <PanelRow>
                        <ToggleControl
                            label={__("Autoplay", "wpe")}
                            checked={autoplay}
                            onChange={(value) => setAttributes({ autoplay: value })}
                            help={__(
                                "“Autoplay” will automatically advance the slides. Note: this is intentionally disabled in the editor, but will affect the front end.",
                            )}
                        />
                    </PanelRow>
                    <PanelRow>
                        <ToggleControl
                            label={__("Navigation", "wpe")}
                            checked={navigation}
                            onChange={(value) => setAttributes({ navigation: value })}
                            help={__("“Navigation” will display arrows so user can navigate forward/backward.")}
                        />
                    </PanelRow>
                    <PanelRow>
                        <ToggleControl
                            label={__("Pagination", "wpe")}
                            checked={pagination}
                            onChange={(value) => setAttributes({ pagination: value })}
                            help={__("“Pagination” will display dots along the bottom for user to click through slides.")}
                        />
                    </PanelRow>
                </PanelBody>
        </div>
    );
};

export default Edit;
