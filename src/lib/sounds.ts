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

// Example usage:
const soundPaths: SoundPaths = {
	shoot: "sounds/shoot.wav",
	hit: "sounds/hit.wav",
	death: "sounds/death.wav",
	kill: "sounds/kill.wav",
	oof: "sounds/oof.wav",
	bell: "sounds/bell.wav",
	bonk: "sounds/bonk.wav",
	pan: "sounds/pan.wav",
	emergency: "sounds/emergency.wav",
	ufoShoot: "sounds/ufo-shoot.wav",
	asteroidBelt: "sounds/asteroid-belt.wav",
	playerSpawn: "sounds/player-spawn.wav",
	// Add more sound paths as needed
}

loadSounds(soundPaths)

export { sounds }
