import StateAudio from '../../engine/audio/StateAudio';

class PlayAudio extends StateAudio {
    constructor (state, effectsSpriteName, backgroundSpriteName) {
        super(state, effectsSpriteName, backgroundSpriteName);
        this.entities = state.soldiers;
        this.player = state.player;
    }

    update (delta) {
        for (let entity of this.entities) {
            if (entity === this.player && entity.actions.firedBullet) {
                this.effects.play(entity.currentWeapon.name);
            }
        }
    }
}

export default PlayAudio;