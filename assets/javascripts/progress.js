(() => {
  "use strict";

  const STORAGE_PREFIX = "synthetic-data-book:progress:v1:";

  function hashText(value) {
    let hash = 2166136261;

    for (let index = 0; index < value.length; index += 1) {
      hash ^= value.charCodeAt(index);
      hash = Math.imul(hash, 16777619);
    }

    return (hash >>> 0).toString(36);
  }

  function readProgress(key, fallback) {
    try {
      const saved = window.localStorage.getItem(key);
      return saved === null ? fallback : saved === "1";
    } catch (_error) {
      return fallback;
    }
  }

  function writeProgress(key, checked) {
    try {
      window.localStorage.setItem(key, checked ? "1" : "0");
    } catch (_error) {
      // The checkbox remains usable for the current page when storage is blocked.
    }
  }

  function removeProgress(key) {
    try {
      window.localStorage.removeItem(key);
    } catch (_error) {
      // Reset still updates the current page when storage is blocked.
    }
  }

  function taskKey(item, occurrence) {
    const taskText = item.textContent.replace(/\s+/g, " ").trim();
    const page = window.location.pathname.replace(/\/+$/, "") || "/";
    return `${STORAGE_PREFIX}${page}:${hashText(taskText)}:${occurrence}`;
  }

  function createProgressPanel(firstList, inputs) {
    const panel = document.createElement("div");
    panel.className = "task-progress";
    panel.setAttribute("role", "region");
    panel.setAttribute("aria-label", "Tiến độ checklist");

    const status = document.createElement("span");
    status.className = "task-progress__status";
    status.setAttribute("aria-live", "polite");

    const reset = document.createElement("button");
    reset.className = "task-progress__reset";
    reset.type = "button";
    reset.textContent = "Đặt lại tiến độ trang";

    const updateStatus = () => {
      const completed = inputs.filter(({ input }) => input.checked).length;
      status.textContent = `Tiến độ checklist: ${completed}/${inputs.length}`;
    };

    reset.addEventListener("click", () => {
      inputs.forEach(({ input, key, sourceChecked }) => {
        removeProgress(key);
        input.checked = sourceChecked;
      });
      updateStatus();
    });

    panel.append(status, reset);
    firstList.parentNode.insertBefore(panel, firstList);

    return updateStatus;
  }

  function initializeProgress() {
    const content = document.querySelector(".md-content");
    if (!content || content.querySelector(".task-progress")) {
      return;
    }

    const taskItems = Array.from(content.querySelectorAll("li.task-list-item"));
    if (taskItems.length === 0) {
      return;
    }

    const occurrences = new Map();
    const inputs = [];

    taskItems.forEach((item) => {
      const input = item.querySelector('input[type="checkbox"]');
      if (!input) {
        return;
      }

      const textHash = hashText(item.textContent.replace(/\s+/g, " ").trim());
      const occurrence = occurrences.get(textHash) || 0;
      occurrences.set(textHash, occurrence + 1);

      const key = taskKey(item, occurrence);
      const sourceChecked = input.checked;

      input.disabled = false;
      input.removeAttribute("disabled");
      input.checked = readProgress(key, sourceChecked);
      input.setAttribute("aria-label", item.textContent.replace(/\s+/g, " ").trim());

      inputs.push({ input, key, sourceChecked });
    });

    if (inputs.length === 0) {
      return;
    }

    const firstList = taskItems[0].closest("ul, ol");
    if (!firstList || !firstList.parentNode) {
      return;
    }

    const updateStatus = createProgressPanel(firstList, inputs);

    inputs.forEach(({ input, key }) => {
      input.addEventListener("change", () => {
        writeProgress(key, input.checked);
        updateStatus();
      });
    });

    updateStatus();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initializeProgress, { once: true });
  } else {
    initializeProgress();
  }

  if (typeof document$ !== "undefined") {
    document$.subscribe(initializeProgress);
  }
})();
