// Shared constants for customization components

import type { ColorOption } from './customization-types';

/**
 * Shared color options used across multiple components
 */
export const CHAIN_COLOUR_OPTIONS: ColorOption[] = [
    { id: 'optval_01K6Z6D5B6166KXE3RQNVDQ5CA', name: 'White', color: '#FBFBFB' },
    { id: 'optval_01K6Z6D5B6166KXE3RQNVDQ5CB', name: 'Grey', color: '#0F0F0F' },
    { id: 'optval_01K6Z6D5B6166KXE3RQNVDQ5CC', name: 'Black', color: '#817F7E' },
    { id: 'optval_01K6Z6D5B6166KXE3RQNVDQ5CD', name: 'Oak', color: '#CDCCCB' },
    { id: 'optval_01K6Z6D5B6166KXE3RQNVDQ5CE', name: 'Walnut', color: '#FAF1C5' },
];

export const BRACKET_COLOUR_OPTIONS: ColorOption[] = [
    { id: 'optval_01K6Z6D5B6166KXE3RQNVDQ5BG', name: 'White', color: '#FBFBFB' },
    { id: 'optval_01K6Z6D5B6166KXE3RQNVDQ5BH', name: 'Grey', color: '#0F0F0F' },
    { id: 'optval_01K6Z6D5B6166KXE3RQNVDQ5BI', name: 'Black', color: '#817F7E' },
    { id: 'optval_01K6Z6D5B6166KXE3RQNVDQ5BJ', name: 'Oak', color: '#CDCCCB' },
    { id: 'optval_01K6Z6D5B6166KXE3RQNVDQ5BK', name: 'Walnut', color: '#FAF1C5' },
];

export const BASE_RAIL_COLOUR_OPTIONS: ColorOption[] = [
    { id: 'optval_01K6Z6D5B6166KXE3RQNVDQ5ERM', name: 'White', color: '#FBFBFB' },
    { id: 'optval_01K6Z6D5B6166KXE3RQNVDQ5ERN', name: 'Grey', color: '#0F0F0F' },
    { id: 'optval_01K6Z6D5B6166KXE3RQNVDQ5ERO', name: 'Black', color: '#817F7E' },
    { id: 'optval_01K6Z6D5B6166KXE3RQNVDQ5ERP', name: 'Oak', color: '#CDCCCB' },
    { id: 'optval_01K6Z6D5B6166KXE3RQNVDQ5ERQ', name: 'Walnut', color: '#FAF1C5' },
];

/**
 * Color options configuration for components
 */
export const COLOR_OPTIONS = [
    {
        id: 'optgrp_01K6Z6D5B6166KXE3RQNVDQ5EN',
        title: 'Chain Colour',
        description: "Select the desired colour for your blind's chain. Note that 'Silver' is a metal chain option.",
        values: CHAIN_COLOUR_OPTIONS
    },
    {
        id: 'optgrp_01K6Z6D5B6166KXE3RQNVDQ5EM',
        title: 'Bracket Colour',
        description: "Pick the colour you'd like for your brackets.",
        values: BRACKET_COLOUR_OPTIONS
    },
    {
        id: 'optgrp_01K6Z6D5B6166KXE3RQNVDQ5EL',
        title: 'Base Rail Colour',
        description: "Our base rails are aluminium, powder coated or anodised. Select your preferred colour.",
        values: BASE_RAIL_COLOUR_OPTIONS
    },
];
