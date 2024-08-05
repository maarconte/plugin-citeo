
<?php
/**
 * Plugin Name: Mon Plugin Gutenberg
 * Description: Un plugin WordPress Gutenberg personnalisé.
 * Version: 1.0.0
 * Author: Mathilde Arconte
 * License: GPLv2 or later
 * Text Domain: test-com
 */

// Enregistrement des blocs
function register_my_blocks()
{
	// ... (code pour enregistrer les blocs comme vu précédemment)
}
add_action('init', 'register_my_blocks');
