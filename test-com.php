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

function create_block_your_plugin_block_init()
{
	wp_enqueue_script(
		'test-com', // Handle for the script
		plugins_url('/test-com/build/slider/view.js', __DIR__), // Path to the script
		array(), // Dependencies (optional)
		'1.0', // Version number
		true // Enqueue in the footer
	);
	register_block_type(__DIR__ . '/build/meta-text-buttons');
	register_block_type(__DIR__ . '/build/slider');
}
add_action('init', 'create_block_your_plugin_block_init');
