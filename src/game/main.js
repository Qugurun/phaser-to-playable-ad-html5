import { Game as MainGame } from './scenes/Game';
import { AUTO, Scale, Game } from 'phaser';

import { SpinePlugin } from '@esotericsoftware/spine-phaser-v4';
import SpineBase64Plugin from '../SpineBase64Plugin';
import { assets } from '../assets-base64';

// assets
window.assets = assets;
window.asset = function (fileName) {
    return `data:${window.assets[fileName].mime};base64,${window.assets[fileName].data}`;
}

const config = {
    type: AUTO,
    width: 1024,
    height: 768,
    parent: 'game-container',
    backgroundColor: '#028af8',
    scale: {
        mode: Scale.FIT,
        autoCenter: Scale.CENTER_BOTH
    },
    plugins: {
        global: [
            {
                key: 'SpineBase64Plugin',
                plugin: SpineBase64Plugin,
                start: true
            }
        ],
        scene: [
            {
                key: "spine.SpinePlugin",
                plugin: spine.SpinePlugin,
                mapping: "spine",
            }
        ],
    },
    scene: [
        MainGame
    ]
};

const StartGame = (parent) => {
    return new Game({ ...config, parent });
}

export default StartGame;
