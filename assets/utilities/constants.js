import colors from '../scss/exports/colors.module.scss'

/**
 * NOTE: This is only usable in Storybook.
 */

/**
 * Icons names extracted from the /public/icons directory
 * @type {string[]}
 */
export const ICONS = process.env.ICON_LIB

/**
 * All CI colors
 * @type {Object<string, string>}
 */
export const COLORS = colors

/**
 * All CI color names
 * @type {string[]}
 */
export const COLOR_NAMES = Object.keys(colors)
