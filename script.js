const wrapper = document.getElementById("wrapper")
const innerWrapper = document.getElementById("innerWrapper")
const video = document.getElementById("video")
const playPauseBtn = document.getElementById("playPauseBtn")
const fullscreenBtn = document.getElementById("fullscreenBtn")
const theaterBtn = document.getElementById("theaterBtn")
const speedBtn = document.getElementById("speedBtn")
const speedValue = speedBtn.querySelector("span.value")
const volumeRange = document.getElementById("volumeRange")

const togglePlay = () => {
	if (video.paused) {
		video.play()
		wrapper.classList.remove("paused")
	} else {
		video.pause()
		wrapper.classList.add("paused")
	}
}
const toggleTheater = () => {
	wrapper.classList.toggle("theater")
}

const toggleFullscreen = () => {
	if (!document.fullscreenEnabled) {
		return false
	}
	if (document.fullscreenElement === innerWrapper) {
		document.exitFullscreen()
		wrapper.classList.remove("fullscreen")
	} else {
		innerWrapper.requestFullscreen()
		wrapper.classList.add("fullscreen")
	}
}

function keyboardAccessHandler(e) {
	const tagName = e.target.tagName.toLowerCase()
	if (tagName == "input" || tagName == "select" || tagName == "textarea") {
		return false
	}

	console.log({ tagName })
}

function handleVolumeRangeChange(e) {
	const value = e.target.value
	console.log({ value })
	video.volume = parseFloat(value / 100)
	if (value == 0) {
		wrapper.dataset.volumeLevel = "muted"
	} else if (value > 0 && value < 70) {
		wrapper.dataset.volumeLevel = "low"
	} else if (value > 70) {
		wrapper.dataset.volumeLevel = "high"
	}
}

function handleSpeedChange() {
	const currentSpeed = parseFloat(wrapper.dataset.speed)
	let newSpeed = 1
	if (currentSpeed < 1.5) {
		newSpeed = (currentSpeed + 0.1).toFixed(1)
	}
	video.playbackRate = newSpeed
	wrapper.dataset.speed = newSpeed
	speedValue.textContent = `${newSpeed}x`
}

function onDOMLoaded() {
	wrapper.dataset.volumeLevel = "muted"
	wrapper.dataset.speed = "1"
	wrapper.classList.add("paused")
	wrapper.classList.remove("theater")
	wrapper.classList.remove("fullscreen")

	video.pause()
	video.volume = 0
	video.playbackRate = 1
}

playPauseBtn.addEventListener("click", togglePlay)
video.addEventListener("click", togglePlay)
document.addEventListener("keyup", keyboardAccessHandler)
fullscreenBtn.addEventListener("click", toggleFullscreen)
theaterBtn.addEventListener("click", toggleTheater)
speedBtn.addEventListener("click", handleSpeedChange)
volumeRange.addEventListener("change", handleVolumeRangeChange)

window.addEventListener("DOMContentLoaded", onDOMLoaded)
