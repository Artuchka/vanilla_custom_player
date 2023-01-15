const wrapper = document.getElementById("wrapper")
const innerWrapper = document.getElementById("innerWrapper")
const video = document.getElementById("video")
const playPauseBtn = document.getElementById("playPauseBtn")
const fullscreenBtn = document.getElementById("fullscreenBtn")
const theaterBtn = document.getElementById("theaterBtn")
const speedBtn = document.getElementById("speedBtn")
const speedValue = speedBtn.querySelector("span.value")
const volumeRange = document.getElementById("volumeRange")
const timeRange = document.getElementById("timeRange")

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
const toggleMiniPlayer = () => {
	// if (!document.pictureInPictureEnabled) {
	// 	return false
	// }
	console.log("doin")
	if (document.pictureInPictureElement === video) {
		document.exitPictureInPicture()
		wrapper.classList.remove("picture-in-picture")
	} else {
		video.requestPictureInPicture()
		// video.exitPictureInPicture()
		wrapper.classList.add("picture-in-picture")
	}
}

function skipTime(skipValue) {
	video.currentTime += skipValue
}

function skipVolume(skipValue) {
	const newVolume = Math.max(
		Math.min(Math.floor(parseFloat(video.volume * 100) + skipValue), 100),
		0
	).toString()
	setVolume(newVolume)
}

function keyboardAccessHandler(e) {
	const tagName = e.target.tagName.toLowerCase()
	if (tagName == "input" || tagName == "select" || tagName == "textarea") {
		return false
	}

	e.preventDefault()

	const TIME_TEN_SECONDS = 10
	const VOLUME_TEN_PERCENT = 10
	console.log(e)
	switch (e.key) {
		case " ":
			togglePlay()
			break
		case "f":
		case "F":
			toggleFullscreen()
			break
		case "t":
		case "T":
			toggleTheater()
			break
		case "i":
		case "I":
			toggleMiniPlayer()
			break
		case "s":
		case "S":
			handleSpeedChange()
			break
		case "ArrowLeft":
			skipTime(-1 * TIME_TEN_SECONDS)
			break
		case "ArrowRight":
			skipTime(TIME_TEN_SECONDS)
			break
		case "ArrowUp":
			skipVolume(VOLUME_TEN_PERCENT)
			break
		case "ArrowDown":
			skipVolume(-1 * VOLUME_TEN_PERCENT)
			break
	}
}

function handleVolumeRangeChange(e) {
	const value = e.target.value
	setVolume(value)
}

function setVolume(value) {
	video.volume = parseFloat(value / 100)
	volumeRange.value = value
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

function handleTimeChange(e) {
	const value = e.target.value
	console.log({ value })
	video.currentTime = value
}

function setThumb() {
	timeRange.value = video.currentTime
}

function onDOMLoaded() {
	wrapper.dataset.volumeLevel = "muted"
	volumeRange.value = 0
	wrapper.dataset.speed = "1"
	wrapper.classList.add("paused")
	wrapper.classList.remove("theater")
	wrapper.classList.remove("fullscreen")

	video.pause()
	video.volume = 0
	video.playbackRate = 1
	timeRange.value = 0
	console.log({ dur: video.duration })
	timeRange.min = 0
}

function setMax() {
	timeRange.max = video.duration
	console.log({ dur2: video.duration })
}

playPauseBtn.addEventListener("click", togglePlay)
video.addEventListener("click", togglePlay)
video.addEventListener("play", setMax)
video.addEventListener("timeupdate", setThumb)
document.addEventListener("keyup", keyboardAccessHandler)
fullscreenBtn.addEventListener("click", toggleFullscreen)
theaterBtn.addEventListener("click", toggleTheater)
speedBtn.addEventListener("click", handleSpeedChange)
volumeRange.addEventListener("change", handleVolumeRangeChange)
timeRange.addEventListener("change", handleTimeChange)

window.addEventListener("DOMContentLoaded", onDOMLoaded)
