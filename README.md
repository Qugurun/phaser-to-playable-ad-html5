[![Page Views Count](https://badges.toozhao.com/badges/01JWPS9QECXKSW4PQN2YTNQB1A/green.svg)](https://badges.toozhao.com/stats/01JWPS9QECXKSW4PQN2YTNQB1A "Get your own page views count badge on badges.toozhao.com")[![made-with-phaser](https://github.com/Qugurun/phaser-to-playable-ad-html5/raw/refs/heads/main/badge_phaser.svg)](https://phaser.io)
[![en](https://img.shields.io/badge/lang-en-red.svg)](https://github.com/Qugurun/phaser-to-playable-ad-html5/blob/main/README.md)
[![ru](https://img.shields.io/badge/lang-ru-green.svg)](https://github.com/Qugurun/phaser-to-playable-ad-html5/blob/main/README.ru.md)
# Phaser + Vite Template in a Single HTML5 File  

This is a project template for **Phaser 4**, using **Vite** and **Spine 4.2** to bundle the entire game into a single **HTML5** file.  

### Versions  

The template uses:  

- [Phaser 4.0.0-rc.4](https://github.com/phaserjs)  
- [Vite 6.3.1](https://github.com/vitejs/vite)  
- [Spine 4.2.82](https://github.com/EsotericSoftware/spine-runtimes)  

## Requirements  

To install dependencies and run scripts via `npm`, [Node.js](https://nodejs.org) is required.  

## Available Commands  

| Command          | Description                                  |  
| ---------------- | ------------------------------------------- |  
| `npm install`    | Install project dependencies                |  
| `npm run dev`    | Start the development server                |  
| `npm run build`  | Create a production build in the `dist` folder |  
| `npm run assets` | Build all assets into `base64`              |  

## Writing Code  

After cloning the repository, run `npm install` from the project folder. Then, you can start a local development server using the `npm run dev` command.  

The development server runs by default at `http://localhost:8080`. Refer to the **Vite** documentation if you want to change this or add **SSL** support.  

Once the server is running, you can edit any files in the `src` folder. Vite will automatically recompile your code and reload the browser.  

To update assets via `base64`, run `npm run assets`.  

## Project Template Structure  

We provide a standard project structure to get started:  

| Path                              | Description                                                                                                                                                              |  
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |  
| `index.html`                      | Base HTML page for hosting the game.                                                                                                                                     |  
| `public/assets`                   | Game sprites, audio, etc. Accessible directly at runtime via the global `asset()` function.                                                                              |  
| `src/main.js`                     | Application initialization.                                                                                                                                              |  
| `src/game`                        | Folder containing game code.                                                                                                                                             |  
| `src/game/main.js`                | Game entry point: configures and launches the game.                                                                                                                      |  
| `src/game/scenes`                 | Folder containing all Phaser game scenes.                                                                                                                                |  
| `src/SpineBase64Plugin.js`        | Plugin for loading Spine from `base64` (`*.json`, `*.atlas`).                                                                                                            |  
| `tools`                           | Folder containing utility scripts.                                                                                                                                       |  
| `tools/generate-assets-base64.js` | Script for generating the `assets-base64.js` file containing all assets in `base64`. Runs automatically with `npm run dev`, `npm run build`, or separately via `npm run assets`. |  
| `tools/inline-bundle.js`          | Script for merging `bundle.min.js` with `index.html` into a single file. Runs automatically with `npm run build`.                                                        |  
| `tools/packer.js`                 | Script for compressing index.html. Runs automatically during npm run build.                                                                                              |
| `tools/pako_inflate.min.js`       | Minified version of pako is embedded in `index.html` for data decompression. Used in `tools/packer.js.`                                                                  |

## Embedded Assets in Base64  

The template implements automatic asset conversion to `base64` format when running the dev server (`npm run dev`) or via `npm run assets`. The generated data is saved in the `src/assets-base64.js` file, which is imported into `src/game/main.js`.  

Assets are accessed via the global `assets` object, which contains:  

1. Full `base64` data via the `asset(path)` function:  

```js  
const playerSprite = asset("sprite/player.png");  
```  

2. Metadata via direct access to the object:  

```js  
const mimeType = assets["sprite/player.png"].mime;  // Resource MIME type  
const rawData = assets["sprite/player.png"].data;   // Data without prefix  
```  

**Asset paths** are specified relative to the `assets` folder, excluding it from the path. For example:  

- Physical path: `assets/sprite/player.png`  
- Key in the object: `'sprite/player.png'`  

## Loading Static Assets  

To work with static files (audio, video, and other binary data):  

1. Place files in the `public/assets` directory.  
2. Run the dev server (`npm run dev`) if not already running, or `npm run assets` to generate the `base64` data file.  
3. Use in code:  

```js  
preload() {  
  // Loading an image from public/assets  
  this.load.image('logo', asset('logo.png'));  
  
  // Loading from a subdirectory public/assets/default  
  this.load.image('background', asset('default/bg.png'));  
}  
```  

# Working with Spine Assets  

## Loading Spine Animations from Base64  

The template provides specialized methods for loading Spine animations in `base64` format.  

### Main Loading Methods:  

```js  
/**  
 * Loads Spine animation JSON data  
 * @param {string} key - Resource access key  
 * @param {string} jsonPath - Path to the JSON file relative to the assets folder  
 */  
this.load.spineJson64('skeleton-data', 'spine/skeleton.json');  

/**  
 * Loads a Spine atlas  
 * @param {string} key - Resource access key  
 * @param {string} atlasPath - Path to the .atlas file relative to the assets folder  
 * @param {boolean} [preMultipliedAlpha=true] - Pre-multiplied alpha flag  
 */  
this.load.spineAtlas64('skeleton-atlas', 'spine/skeleton.atlas', false);  
```  

## Production Deployment  

After running `npm run build`, your code will be bundled into a single `index.html` and saved in the `dist` folder.  

To deploy the game, upload the entire contents of the `dist` folder to a public web server. Note that `index.html` can also be run locally without a server.
