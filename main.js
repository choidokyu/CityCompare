function updateClocks() {
  const now = new Date();
  const nowKorea = new Date(now.toLocaleString("en-US", { timeZone: "Asia/Seoul" }));
  const nowTanzania = new Date(now.toLocaleString("en-US", { timeZone: "Africa/Dar_es_Salaam" }));
  updateClock(nowKorea, "korea", "KOREA");
  updateClock(nowTanzania, "tanzania", "TANZANIA");
}

function updateClock(time, region, label) {
  const seconds = time.getSeconds();
  const minutes = time.getMinutes();
  const hours = time.getHours();

  const secondDeg = (seconds / 60) * 360;
  const minuteDeg = (minutes / 60) * 360 + (seconds / 60) * 6;
  const hourDeg = (hours / 24) * 360 + (minutes / 60) * 15;

  document.getElementById(`${region}-second-hand`).style.transform = `rotate(${secondDeg}deg)`;
  document.getElementById(`${region}-minute-hand`).style.transform = `rotate(${minuteDeg}deg)`;
  document.getElementById(`${region}-hour-hand`).style.transform = `rotate(${hourDeg}deg)`;

  const dateStr = `${time.getFullYear()}/${String(time.getMonth() + 1).padStart(2, '0')}/${String(time.getDate()).padStart(2, '0')}`;
  const timeStr = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  document.getElementById(`${region}-textpath`).textContent = `${label} | ${dateStr} | ${timeStr}`;
}

function generateNumbers(region) {
  const svgNS = "http://www.w3.org/2000/svg";
  const xlinkNS = "http://www.w3.org/1999/xlink";
  const container = document.getElementById(`${region}-numbers`);
  const pathId = `#circlePath-${region}-numbers`;

  const color = region === "korea" ? "dodgerblue" : "white";

  for (let i = 1; i <= 24; i++) {
    const textPath = document.createElementNS(svgNS, "textPath");
    textPath.setAttributeNS(xlinkNS, "xlink:href", pathId);
    textPath.setAttribute("startOffset", `${((i - 1) * 100 / 24).toFixed(4)}%`);
    textPath.setAttribute("text-anchor", "middle");
    textPath.setAttribute("fill", color);
    textPath.textContent = i;
    container.appendChild(textPath);
  }
}

generateNumbers("korea");
generateNumbers("tanzania");

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
