import { Scene } from 'phaser';

export class Game extends Scene {
    constructor() {
        super('Game');
    }

    preload() {
        this.load.spineJson64("bee-data", "spine/skeleton.json");
        this.load.spineAtlas64("bee-atlas", "spine/skeleton.atlas", false);

        this.load.image('background', asset('bg.png'));
        this.load.image('logo', asset('logo.png'));

        this.load.bitmapFont('DimboRegularBitmap', asset('fonts/DimboRegular.png'), asset('fonts/DimboRegular.xml'));

        this.load.font('DimboRegular', asset('DimboRegular.ttf'));
    }

    create() {
        this.add.image(512, 384, 'background');
        this.add.image(512, 350, 'logo').setDepth(100);
        this.add.text(512, 490, 'Make something fun!\nand share it with us:\ntg: @phaser_community', {
            fontFamily: 'DimboRegular', fontSize: 38, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        }).setOrigin(0.5).setDepth(100);

        const spineBee = this.add.spine(
            512,
            170,
            "bee-data",
            "bee-atlas"
        );
        spineBee.animationState.setAnimation(0, "idle", true);

        this.tweens.add({
            targets: spineBee,
            y: 200,
            duration: 1000,
            ease: 'Cubic.easeInOut',
            yoyo: true,
            repeat: -1
        });

        const text = this.add.bitmapText(this.game.config.width / 2, 50, 'DimboRegularBitmap', 'Phaser 3 Bitmap Font', 64)
            .setOrigin(0.5);
    }
}

