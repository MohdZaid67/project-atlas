export function setupJsonFormatter() {

  const input =
    document.getElementById("jsonInput") as HTMLTextAreaElement;

  const output =
    document.getElementById("jsonOutput") as HTMLTextAreaElement;

  const button =
    document.getElementById("formatBtn") as HTMLButtonElement;

  const minifyButton =
    document.getElementById("minifyBtn") as HTMLButtonElement;

  const copyButton =
    document.getElementById("copyBtn") as HTMLButtonElement;

  const status =
    document.getElementById("jsonStatus") as HTMLParagraphElement;

  // Format JSON
  button.addEventListener("click", () => {

    if (!input.value.trim()) {
      output.value = "";
      status.textContent = "⚠️ Please enter JSON.";
      status.className = "status-message warning";
      return;
    }

    try {
      const parsed = JSON.parse(input.value);
      const formatted = JSON.stringify(parsed, null, 2);

      output.value = formatted;
      copyButton.style.display = "inline-block";

      status.textContent = "✅ JSON formatted successfully.";
      status.className = "status-message success";

    } catch (error) {
      output.value = "";
      copyButton.style.display = "none";

      if (error instanceof Error) {
        status.textContent = `❌ ${error.message}`;
        status.className = "status-message error";
      } else {
        status.textContent = "❌ Invalid JSON.";
        status.className = "status-message error";
      }
    }
  });

  // Minify JSON
  minifyButton.addEventListener("click", () => {

    if (!input.value.trim()) {
      output.value = "";
      status.textContent = "⚠️ Please enter JSON.";
      status.className = "status-message warning";
      return;
    }

    try {
      const parsed = JSON.parse(input.value);
      const minified = JSON.stringify(parsed);

      output.value = minified;
      copyButton.style.display = "inline-block";

      status.textContent = "✅ JSON minified successfully.";
      status.className = "status-message success";

    } catch (error) {
      output.value = "";
      copyButton.style.display = "none";

      if (error instanceof Error) {
        status.textContent = `❌ ${error.message}`;
        status.className = "status-message error";
      } else {
        status.textContent = "❌ Invalid JSON.";
        status.className = "status-message error";
      }
    }
  });

  // Copy result to clipboard
  copyButton.addEventListener("click", () => {
    navigator.clipboard.writeText(output.value);
    copyButton.textContent = "Copied!";

    setTimeout(() => {
      copyButton.textContent = "Copy";
    }, 1500);
  });

}