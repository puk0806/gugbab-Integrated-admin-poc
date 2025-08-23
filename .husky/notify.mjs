import { execSync } from "child_process";
import os from "os";

function macOsNotify(title, message) {
  try {
    const script = `display notification "${message}" with title "${title}"`;
    execSync(`osascript -e '${script}'`);
  } catch (error) {
    console.error(error);
  }
}
export function notify(title, message) {
  const platform = os.platform();

  switch (platform) {
    case "win32":
      console.log("Unsupported Windows for notifications");
      break;
    case "darwin":
      macOsNotify(title, message);
      break;
    case "linux":
      console.log("Unsupported Linux for notifications");
      break;
    default:
      console.log("Unsupported OS for notifications");
      break;
  }
}
