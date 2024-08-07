
<?php
/**
 * Plugin Name: Mon Plugin Gutenberg
 * Description: Un plugin WordPress Gutenberg personnalisé.
 * Version: 1.0.0
 * Author: Mathilde Arconte
 * License: GPLv2 or later
 * Text Domain: test-com
 */

if (!defined('ABSPATH')) {
	exit; // Exit if accessed directly.
}
//tototo
function create_block_your_plugin_block_init()
{
	register_block_type(__DIR__ . '/build/meta-text-buttons');
	register_block_type(__DIR__ . '/build/slider');
}
add_action('init', 'create_block_your_plugin_block_init');
