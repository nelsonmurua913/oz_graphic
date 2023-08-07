const formatTime = (seconds: number) => {
  if (!seconds) return `00:00`;
  const minutes = Math.floor(seconds / 60);
  const paddedMinutes = minutes.toString().padStart(2, "0");
  const remainingSeconds = seconds % 60;
  const paddedSeconds = remainingSeconds.toString().padStart(2, "0");
  return `${paddedMinutes}:${paddedSeconds}`;
};

const getMinutes = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  return minutes.toString().padStart(2, "0");
};

const getSeconds = (seconds: number) => {
  const remainingSeconds = seconds % 60;
  return remainingSeconds.toString().padStart(2, "0");
};

const getSecondsFromString = (time: string) => { 
  const [minutes, seconds, ] = time.split(":");
  return parseInt(minutes || '0') * 60 + parseInt(seconds || '0');
}

export { formatTime, getMinutes, getSeconds, getSecondsFromString };
