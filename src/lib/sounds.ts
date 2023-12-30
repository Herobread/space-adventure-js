// soundLibrary.ts
interface SoundLibrary {
	[key: string]: HTMLAudioElement[]
}

interface Sounds {
	sounds: SoundLibrary
	play: (soundKey: string) => void
}

const sounds: Sounds = {
	sounds: {},
	play(soundKey: string): void {
		const soundInstances = this.sounds[soundKey] || []
		const newSound = new Audio(soundPaths[soundKey])

		soundInstances.push(newSound)
		this.sounds[soundKey] = soundInstances

		newSound.play()
	},
}

type SoundPaths = {
	[key: string]: string
}

function loadSounds(soundPaths: SoundPaths): void {
	for (const key in soundPaths) {
		if (Object.prototype.hasOwnProperty.call(soundPaths, key)) {
			const audio = new Audio(soundPaths[key])
			sounds.sounds[key] = [audio]
		}
	}
}

const soundPaths: SoundPaths = {
	shoot: "sounds/shoot.wav",
	asteroidHit: "sounds/asteroid-hit.wav",
	asteroidExplosion: "sounds/asteroid-explosion.wav",
	asteroidBeltAlert: "sounds/asteroid-belt-alert.wav",
	ufoAlert: "sounds/ufo-alert.wav",
	ufoDeath: "sounds/ufo-death.wav",
	playerDeath: "sounds/player-death.wav",
	ufoShoot: "sounds/ufo-shoot.wav",
	asteroidBelt: "sounds/asteroid-belt.wav",
	playerSpawn: "sounds/player-spawn.wav",
	bigScore: "sounds/big-score.wav",
	playerHit: "sounds/player-hit.wav",
	playerRegen: "sounds/player-regen.wav",
}

loadSounds(soundPaths)

export { sounds }
