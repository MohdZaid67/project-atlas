export function setupUuidGenerator() {
  const output = document.getElementById("uuidOutput") as HTMLElement;
  const generateBtn = document.getElementById("generateBtn") as HTMLButtonElement;
  const copyBtn = document.getElementById("copyBtn") as HTMLButtonElement;

  let currentUuid = "";

  generateBtn.addEventListener("click", () => {
    currentUuid = crypto.randomUUID();
    output.textContent = currentUuid;
  });

  copyBtn.addEventListener("click", () => {
    if (!currentUuid) {
      copyBtn.textContent = "Generate first!";
      setTimeout(() => {
        copyBtn.textContent = "Copy";
      }, 1500);
      return;
    }

    navigator.clipboard.writeText(currentUuid);
    copyBtn.textContent = "Copied!";
    setTimeout(() => {
      copyBtn.textContent = "Copy";
    }, 1500);
  });
}