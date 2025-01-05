// Function to convert seconds into HH:MM:SS format
export const convertSecondsToHMS = (seconds) => {
    // Calculate hours, minutes, and seconds
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
  
    // Pad single digits with leading zeros if necessary (e.g., "01" for single-digit hours, minutes, or seconds)
    const formattedHours = hours < 10 ? `0${hours}` : hours;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const formattedSeconds = secs < 10 ? `0${secs}` : secs;
  
    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
  };
  