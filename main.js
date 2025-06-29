let hourFormat = 12; // 기본값 12시간

function updateClocks() {
  const now = new Date();
  const nowKorea = new Date(now.toLocaleString("en-US", { timeZone: "Asia/Seoul" }));
  const nowTanzania = new Date(now.toLocaleString("en-US", { timeZone: "Africa/Dar_es_Salaam" }));
  updateClock(nowKorea, "korea", "KOREA", hourFormat);
  updateClock(nowTanzania, "tanzania", "TANZANIA", hourFormat);
}

function updateClock(time, region, label, hourFormat) {
  const seconds = time.getSeconds();
  const minutes = time.getMinutes();
  let hours = time.getHours();
  let displayHours = hours;
  let maxHours = hourFormat;

  if (hourFormat === 12) {
    displayHours = hours % 12;
    if (displayHours === 0) displayHours = 12;
  }

  // 시계 바늘 각도 계산
  const secondDeg = (seconds / 60) * 360;
  const minuteDeg = (minutes / 60) * 360 + (seconds / 60) * 6;
  const hourDeg = (displayHours / hourFormat) * 360 + (minutes / 60) * (360 / hourFormat);

  document.getElementById(`${region}-second-hand`).style.transform = `rotate(${secondDeg}deg)`;
  document.getElementById(`${region}-minute-hand`).style.transform = `rotate(${minuteDeg}deg)`;
  document.getElementById(`${region}-hour-hand`).style.transform = `rotate(${hourDeg}deg)`;

  // 라벨(날짜/시간)
  const dateStr = `${time.getFullYear()}/${String(time.getMonth() + 1).padStart(2, '0')}/${String(time.getDate()).padStart(2, '0')}`;
  let displayTime;
  if (hourFormat === 12) {
    const ampm = hours >= 12 ? 'PM' : 'AM';
    let h12 = hours % 12;
    if (h12 === 0) h12 = 12;
    displayTime = `${String(h12).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')} ${ampm}`;
  } else {
    displayTime = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  }
  document.getElementById(`${region}-textpath`).textContent = `${label} | ${dateStr} | ${displayTime}`;
}

// 시계 숫자(1~12 or 1~24) 동적으로 생성
function generateNumbers(region, hourFormat) {
  const svgNS = "http://www.w3.org/2000/svg";
  const xlinkNS = "http://www.w3.org/1999/xlink";
  const container = document.getElementById(`${region}-numbers`);
  const pathId = `#circlePath-${region}-numbers`;

  // 이전 숫자 모두 삭제 후 새로 그림
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }
  const color = region === "korea" ? "dodgerblue" : "white";

  for (let i = 0; i <= hourFormat; i++) {
    const textPath = document.createElementNS(svgNS, "textPath");
    textPath.setAttributeNS(xlinkNS, "xlink:href", pathId);
    textPath.setAttribute("startOffset", `${((i - 1) * 100 / hourFormat).toFixed(4)}%`);
    textPath.setAttribute("text-anchor", "middle");
    textPath.setAttribute("fill", color);
    textPath.textContent = i;
    container.appendChild(textPath);
  }
}

// 처음 로딩 시 12시간 숫자 생성
generateNumbers("korea", hourFormat);
generateNumbers("tanzania", hourFormat);

setInterval(updateClocks, 1000);
updateClocks();

function fnButton() {
  const compareDiv = document.getElementById('compare');
  if (!document.fullscreenElement) {
    compareDiv.requestFullscreen?.();
    compareDiv.webkitRequestFullscreen?.();
    compareDiv.msRequestFullscreen?.();
  } else {
    document.exitFullscreen?.();
    document.webkitExitFullscreen?.();
    document.msExitFullscreen?.();
  }
}

// 라디오 버튼 폼 이벤트 처리
document.getElementById("timeFormatForm").addEventListener("submit", function(e) {
  e.preventDefault();
  const selected = document.querySelector('input[name="hour-format"]:checked').value;
  hourFormat = parseInt(selected);
  generateNumbers("korea", hourFormat);
  generateNumbers("tanzania", hourFormat);
  updateClocks();
});
