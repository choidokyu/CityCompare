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
  const hours = time.getHours();
  let displayHours;

  if (hourFormat === 12) {
    displayHours = hours % 12; // 0~11
  } else {
    displayHours = hours; // 0~23
  }

  // 시계 바늘 각도 (0부터 시작)
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
    const h = hours % 12; // 0~11
    displayTime = `${String(h).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')} ${ampm}`;
  } else {
    displayTime = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  }
  document.getElementById(`${region}-textpath`).textContent = `${label} | ${dateStr} | ${displayTime}`;
}

// 시계 숫자(0~11 or 0~23) 동적으로 생성
function generateNumbers(region, hourFormat) {
  const svgNS = "http://www.w3.org/2000/svg";
  const xlinkNS = "http://www.w3.org/1999/xlink";
  const container = document.getElementById(`${region}-numbers`);
  const pathId = `#circlePath-${region}-numbers`;

  // 기존 숫자 모두 삭제
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }
  const color = region === "korea" ? "dodgerblue" : "white";

  // 0~(hourFormat-1)
  for (let i = 0; i < hourFormat; i++) {
    const textPath = document.createElementNS(svgNS, "textPath");
    textPath.setAttributeNS(xlinkNS, "xlink:href", pathId);
    textPath.setAttribute("startOffset", `${(i * 100 / hourFormat).toFixed(4)}%`);
    textPath.setAttribute("text-anchor", "middle");
    textPath.setAttribute("fill", color);
    // 0만 12(12시간) 또는 24(24시간)으로 표기
    if (i === 0) {
        textPath.setAttribute("startOffset", `0.5%`);
        textPath.textContent = hourFormat;
    } else {
        textPath.textContent = i;
    }
    container.appendChild(textPath);
  }
}

// 처음 로딩 시 숫자 생성
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



const offsets = [
  "-12:00","-11:00","-10:00","-09:30","-09:00","-08:00","-07:00","-06:00",
  "-05:00","-04:30","-04:00","-03:00","-02:00","-01:00",
  "+00:00","+01:00","+02:00","+03:00","+04:00","+04:30",
  "+05:00","+05:30","+05:45","+06:00","+06:30","+07:00",
  "+08:00","+09:00","+09:30","+10:00","+11:00","+12:00","+13:00","+14:00"
];

function populateOffsets() {
  const left = document.getElementById('utc-offset-left');
  const right = document.getElementById('utc-offset-right');
  offsets.forEach(o => {
    const text = `UTC${o}`;
    left.add(new Option(text, o));
    right.add(new Option(text, o));
  });
  // 기본값: 한국(UTC+09:00), 탄자니아(UTC+03:00)
  left.value = "+09:00";
  right.value = "+03:00";
}
populateOffsets();
