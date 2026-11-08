document.addEventListener("click", async (event) => {
  const popup = event.target.closest(".citation-popup");
  document.querySelectorAll(".citation-popup[open]").forEach((other) => {
    if (other !== popup) other.open = false;
  });
  if (!popup) return;
  const summary = popup.querySelector("summary");
  if (event.target.closest(".citation-close")) {
    popup.open = false;
    summary.focus();
    return;
  }
  const copy = event.target.closest(".citation-copy");
  if (!copy) return;
  const text = copy.querySelector(".citation-text");
  const status = copy.querySelector(".citation-status");
  try {
    await navigator.clipboard.writeText(text.textContent.trim());
    status.textContent = "Copied!";
  } catch {
    const range = document.createRange();
    range.selectNodeContents(text);
    const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
    status.textContent = "Press Ctrl+C or Command+C to copy the selected citation.";
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key !== "Escape") return;
  document.querySelectorAll(".citation-popup[open]").forEach((popup) => {
    popup.open = false;
    if (popup.contains(document.activeElement)) popup.querySelector("summary").focus();
  });
});

document.querySelectorAll(".citation-popup").forEach((popup) => {
  popup.addEventListener("toggle", () => {
    if (popup.open) popup.querySelector(".citation-status").textContent = "Click to copy BibTeX";
  });
});
