(() => {
  "use strict";

  const PROGRESS_PREFIX = "synthetic-data-book:progress:v1:";
  const ANSWER_PREFIX = "synthetic-data-book:answer:v1:";

  function hashText(value) {
    let hash = 2166136261;

    for (let index = 0; index < value.length; index += 1) {
      hash ^= value.charCodeAt(index);
      hash = Math.imul(hash, 16777619);
    }

    return (hash >>> 0).toString(36);
  }

  function normalizeTaskText(item) {
    return item.textContent.replace(/\s+/g, " ").trim();
  }

  function storageKey(prefix, taskText, occurrence) {
    const page = window.location.pathname.replace(/\/+$/, "") || "/";
    return `${prefix}${page}:${hashText(taskText)}:${occurrence}`;
  }

  function readStoredValue(key, fallback) {
    try {
      const saved = window.localStorage.getItem(key);
      return saved === null ? fallback : saved;
    } catch (_error) {
      return fallback;
    }
  }

  function writeStoredValue(key, value) {
    try {
      window.localStorage.setItem(key, value);
      return true;
    } catch (_error) {
      return false;
    }
  }

  function removeStoredValue(key) {
    try {
      window.localStorage.removeItem(key);
    } catch (_error) {
      // Reset still updates the current page when storage is blocked.
    }
  }

  function cleanPageTitle() {
    const heading = document.querySelector(".md-content h1");
    return heading ? heading.textContent.replace(/¶/g, "").trim() : document.title;
  }

  function cleanPageUrl() {
    const url = new URL(window.location.href);
    url.hash = "";
    url.search = "";
    return url.href;
  }

  function slugify(value) {
    return value
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "")
      .slice(0, 64);
  }

  function quoteMarkdown(value) {
    if (!value.trim()) {
      return "_Chưa trả lời._";
    }

    return value
      .trim()
      .split("\n")
      .map((line) => `> ${line}`)
      .join("\n");
  }

  function exportAnswers(tasks) {
    const title = cleanPageTitle();
    const completed = tasks.filter(({ input }) => input.checked).length;
    const now = new Date();
    const lines = [
      `# Bài làm — ${title}`,
      "",
      `- Trang nguồn: ${cleanPageUrl()}`,
      `- Xuất lúc: ${now.toLocaleString("vi-VN")}`,
      `- Tiến độ: ${completed}/${tasks.length}`,
      "",
      "> Đính kèm tệp này vào một chat mới và yêu cầu kiểm tra từng câu: đúng, đúng một phần hoặc chưa đúng; giải thích chỗ cần sửa.",
      "",
    ];

    tasks.forEach(({ input, taskText, textarea }, index) => {
      lines.push(
        `## ${index + 1}. ${taskText}`,
        "",
        `- Trạng thái: ${input.checked ? "Đã đánh dấu hoàn thành" : "Chưa đánh dấu hoàn thành"}`,
        "",
        "**Câu trả lời, cách làm hoặc bằng chứng:**",
        "",
        quoteMarkdown(textarea.value),
        "",
      );
    });

    const blob = new Blob([`${lines.join("\n")}\n`], {
      type: "text/markdown;charset=utf-8",
    });
    const downloadUrl = URL.createObjectURL(blob);
    const link = document.createElement("a");
    const date = now.toISOString().slice(0, 10);

    link.href = downloadUrl;
    link.download = `bai-lam-${slugify(title) || "chuong"}-${date}.md`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.setTimeout(() => URL.revokeObjectURL(downloadUrl), 1000);
  }

  function createAnswerEditor(task, index) {
    const wrapper = document.createElement("div");
    wrapper.className = "task-answer";

    const label = document.createElement("label");
    label.className = "task-answer__label";
    label.htmlFor = `task-answer-${hashText(task.answerKey)}`;
    label.textContent = `Câu trả lời / ghi chú cho mục ${index + 1}`;

    const textarea = document.createElement("textarea");
    textarea.className = "task-answer__field";
    textarea.id = label.htmlFor;
    textarea.rows = 4;
    textarea.placeholder = "Viết câu trả lời, cách làm hoặc kết quả kiểm chứng…";
    textarea.value = readStoredValue(task.answerKey, "");

    const saveStatus = document.createElement("span");
    saveStatus.className = "task-answer__save-status";
    saveStatus.setAttribute("aria-live", "polite");
    saveStatus.textContent = textarea.value
      ? "Đã khôi phục câu trả lời trên thiết bị này."
      : "Tự động lưu trên thiết bị này.";

    let saveTimer;
    const save = () => {
      window.clearTimeout(saveTimer);
      const saved = writeStoredValue(task.answerKey, textarea.value);
      saveStatus.textContent = saved
        ? "Đã lưu trên thiết bị này."
        : "Không thể tự động lưu; hãy xuất bài làm trước khi rời trang.";
    };

    textarea.addEventListener("input", () => {
      saveStatus.textContent = "Đang lưu…";
      window.clearTimeout(saveTimer);
      saveTimer = window.setTimeout(save, 300);
    });
    textarea.addEventListener("blur", save);

    wrapper.append(label, textarea, saveStatus);
    task.item.appendChild(wrapper);
    task.textarea = textarea;
  }

  function createProgressPanel(firstList, tasks) {
    const panel = document.createElement("div");
    panel.className = "task-progress";
    panel.setAttribute("role", "region");
    panel.setAttribute("aria-label", "Tiến độ và bài làm");

    const summary = document.createElement("div");
    summary.className = "task-progress__summary";

    const status = document.createElement("span");
    status.className = "task-progress__status";
    status.setAttribute("aria-live", "polite");

    const hint = document.createElement("span");
    hint.className = "task-progress__hint";
    hint.textContent = "Câu trả lời được tự động lưu trên trình duyệt hiện tại.";

    const actions = document.createElement("div");
    actions.className = "task-progress__actions";

    const exportButton = document.createElement("button");
    exportButton.className = "task-progress__button task-progress__button--primary";
    exportButton.type = "button";
    exportButton.textContent = "Xuất bài làm (.md)";
    exportButton.addEventListener("click", () => exportAnswers(tasks));

    const resetButton = document.createElement("button");
    resetButton.className = "task-progress__button";
    resetButton.type = "button";
    resetButton.textContent = "Đặt lại dấu tích";

    const updateStatus = () => {
      const completed = tasks.filter(({ input }) => input.checked).length;
      status.textContent = `Tiến độ checklist: ${completed}/${tasks.length}`;
    };

    resetButton.addEventListener("click", () => {
      tasks.forEach(({ input, progressKey, sourceChecked }) => {
        removeStoredValue(progressKey);
        input.checked = sourceChecked;
      });
      updateStatus();
    });

    summary.append(status, hint);
    actions.append(exportButton, resetButton);
    panel.append(summary, actions);
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
    const tasks = [];

    taskItems.forEach((item) => {
      const input = item.querySelector('input[type="checkbox"]');
      if (!input) {
        return;
      }

      const taskText = normalizeTaskText(item);
      const textHash = hashText(taskText);
      const occurrence = occurrences.get(textHash) || 0;
      occurrences.set(textHash, occurrence + 1);

      const progressKey = storageKey(PROGRESS_PREFIX, taskText, occurrence);
      const sourceChecked = input.checked;
      const savedProgress = readStoredValue(progressKey, sourceChecked ? "1" : "0");
      const task = {
        answerKey: storageKey(ANSWER_PREFIX, taskText, occurrence),
        input,
        item,
        progressKey,
        sourceChecked,
        taskText,
        textarea: null,
      };

      input.disabled = false;
      input.removeAttribute("disabled");
      input.checked = savedProgress === "1";
      input.setAttribute("aria-label", taskText);

      tasks.push(task);
    });

    if (tasks.length === 0) {
      return;
    }

    tasks.forEach(createAnswerEditor);

    const firstList = taskItems[0].closest("ul, ol");
    if (!firstList || !firstList.parentNode) {
      return;
    }

    const updateStatus = createProgressPanel(firstList, tasks);

    tasks.forEach(({ input, progressKey }) => {
      input.addEventListener("change", () => {
        writeStoredValue(progressKey, input.checked ? "1" : "0");
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
