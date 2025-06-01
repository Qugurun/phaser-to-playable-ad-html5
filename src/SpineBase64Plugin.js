import "phaser";

export default class SpineBase64Plugin extends Phaser.Plugins.BasePlugin {
    constructor(pluginManager) {
        super(pluginManager);

        // JSON
        Phaser.Loader.LoaderPlugin.prototype.spineJson64 = function (jsonKey, jsonPath) {
            const jsonData = JSON.parse(atob(window.assets[jsonPath].data));
            this.scene.game.cache.json.add(jsonKey, jsonData);

            return this;
        };

        // ATLAS
        Phaser.Loader.LoaderPlugin.prototype.spineAtlas64 = function (atlasKey, atlasPath, premultipliedAlpha = false) {

            const atlasString = atob(window.assets[atlasPath].data);

            this.scene.game.cache.text.add(atlasKey, {
                data: atlasString,
                premultipliedAlpha: premultipliedAlpha,
            });

            const dir = atlasPath.substring(0, atlasPath.lastIndexOf('/') + 1);
            const textureKey = atlasString.split('\n')[0].trim();
            const imagePath = dir + textureKey;

            const pngBase64 = window.assets[imagePath].data;
            const pngDataUri = `data:${window.assets[imagePath].mime};base64,${pngBase64}`;

            this.image(`${atlasKey}!${textureKey}`, pngDataUri);
        }
    }
}