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
  { value: "-12:00", label: "UTC-12:00 베이커섬(미국령)" },
  { value: "-11:00", label: "UTC-11:00 사모아(파고파고)" },
  { value: "-10:00", label: "UTC-10:00 미국(하와이)" },
  { value: "-09:00", label: "UTC-09:00 미국(알래스카)" },
  { value: "-08:00", label: "UTC-08:00 미국(LA)" },
  { value: "-07:00", label: "UTC-07:00 미국(덴버)" },
  { value: "-06:00", label: "UTC-06:00 미국(시카고)" },
  { value: "-05:00", label: "UTC-05:00 미국(뉴욕)" },
  { value: "-04:00", label: "UTC-04:00 칠레(산티아고)" },
  { value: "-03:00", label: "UTC-03:00 아르헨티나(부에노스아이레스)" },
  { value: "-01:00", label: "UTC-01:00 카보베르데(프라이아)" },
  { value: "+00:00", label: "UTC+00:00 영국(런던)" },
  { value: "+01:00", label: "UTC+01:00 독일(베를린)" },
  { value: "+01:00", label: "UTC+01:00 알제리(알제)" },
  { value: "+02:00", label: "UTC+02:00 이집트(카이로)" },
  { value: "+03:00", label: "UTC+03:00 탄자니아(다르에스살람)" },
  { value: "+03:30", label: "UTC+03:30 이란(테헤란)" },
  { value: "+04:00", label: "UTC+04:00 아랍에미리트(두바이)" },
  { value: "+04:30", label: "UTC+04:30 아프가니스탄(카불)" },
  { value: "+05:00", label: "UTC+05:00 파키스탄(이슬라마바드)" },
  { value: "+05:30", label: "UTC+05:30 인도(뉴델리)" },
  { value: "+05:45", label: "UTC+05:45 네팔(카트만두)" },
  { value: "+06:00", label: "UTC+06:00 방글라데시(다카)" },
  { value: "+06:30", label: "UTC+06:30 미얀마(양곤)" },
  { value: "+07:00", label: "UTC+07:00 태국(방콕)" },
  { value: "+08:00", label: "UTC+08:00 중국(베이징)" },
  { value: "+09:00", label: "UTC+09:00 대한민국(서울)" },
  { value: "+09:00", label: "UTC+09:00 일본(도쿄)" },
  { value: "+09:30", label: "UTC+09:30 호주(애들레이드)" },
  { value: "+10:00", label: "UTC+10:00 호주(시드니)" },
  { value: "+11:00", label: "UTC+11:00 솔로몬제도(호니아라)" },
  { value: "+12:00", label: "UTC+12:00 뉴질랜드(오클랜드)" },
  { value: "+13:00", label: "UTC+13:00 사모아(아피아)" },
  { value: "+14:00", label: "UTC+14:00 키리바시(라인제도)" }
];



function populateOffsets() {
  const left = document.getElementById('utc-offset-left');
  const right = document.getElementById('utc-offset-right');
  offsets.forEach(o => {
    left.add(new Option(o.label, o.value));
    right.add(new Option(o.label, o.value));
  });
  // 기본값: 한국(UTC+09:00), 탄자니아(UTC+03:00)
  left.value = "+09:00";
  right.value = "+03:00";
}
populateOffsets();

