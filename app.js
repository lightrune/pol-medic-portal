(() => {
  const config = window.POL_MEDIC_PORTAL_CONFIG || {};
  const v2Link = document.querySelector("#v2Link");
  const v3Link = document.querySelector("#v3Link");
  const v3Status = document.querySelector("#v3Status");
  const v3LinkLabel = document.querySelector("#v3LinkLabel");
  const v3Notice = document.querySelector("#v3Notice");
  const toast = document.querySelector("#toast");
  let toastTimer;

  const showToast = (message) => {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove("show"), 3200);
  };

  const applyLink = (link, item) => {
    if (!link || !item?.enabled || !item?.url) return false;
    link.href = item.url;
    link.removeAttribute("aria-disabled");
    link.classList.remove("is-disabled");
    return true;
  };

  if (v2Link) {
    v2Link.classList.add("is-disabled");
    v2Link.setAttribute("aria-disabled", "true");
    v2Link.removeAttribute("href");
  }

  const v3Enabled = applyLink(v3Link, config.v3);
  if (v3Enabled) {
    v3Status?.classList.add("is-live");
    if (v3Status) v3Status.innerHTML = '<i aria-hidden="true"></i> 시범 운영 중';
    if (v3LinkLabel) v3LinkLabel.textContent = "V3 문진 시작하기";
    if (v3Notice) v3Notice.textContent = "V3 시범운영 결과는 V2와 분리해 관리됩니다.";
  }

  document.querySelectorAll('a[aria-disabled="true"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      showToast(link.dataset.disabledMessage || "현재 이용할 수 없는 버전입니다.");
    });
  });
})();

