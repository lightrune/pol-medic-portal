(() => {
  const config = window.POL_MEDIC_PORTAL_CONFIG || {};
  const v2Link = document.querySelector("#v2Link");
  const v2Status = document.querySelector("#v2Status");
  const v2LinkLabel = document.querySelector("#v2LinkLabel");
  const v2Notice = document.querySelector("#v2Notice");
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

  const v2Enabled = applyLink(v2Link, config.v2);
  if (v2Enabled) {
    v2Status?.classList.add("is-live");
    if (v2Status) v2Status.innerHTML = '<i aria-hidden="true"></i> 상담 운영 중';
    if (v2LinkLabel) v2LinkLabel.textContent = "상담버전 시작하기";
    if (v2Notice) v2Notice.textContent = "기존 V2 대신 서술형 상담버전으로 연결됩니다.";
  }

  const v3Enabled = applyLink(v3Link, config.v3);
  if (v3Enabled) {
    v3Status?.classList.add("is-live");
    if (v3Status) v3Status.innerHTML = '<i aria-hidden="true"></i> 시범 운영 중';
    if (v3LinkLabel) v3LinkLabel.textContent = "폴메딕-문진버전 시작하기";
    if (v3Notice) v3Notice.textContent = "문진버전 결과는 상담버전과 분리해 관리됩니다.";
  }

  document.querySelectorAll('a[aria-disabled="true"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      showToast(link.dataset.disabledMessage || "현재 이용할 수 없는 버전입니다.");
    });
  });
})();

