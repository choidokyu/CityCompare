// offsets 배열 (UTC, 라벨, 국기)
const offsets = [
  { value: "-12:00", label: "UTC-12:00 베이커섬(미국령)", img: "https://upload.wikimedia.org/wikipedia/commons/a/a4/Flag_of_the_United_States.svg" },
  { value: "-11:00", label: "UTC-11:00 사모아(파고파고)", img: "https://upload.wikimedia.org/wikipedia/commons/3/31/Flag_of_American_Samoa.svg" },
  { value: "-10:00", label: "UTC-10:00 미국(하와이)", img: "https://upload.wikimedia.org/wikipedia/commons/e/ef/Flag_of_Hawaii.svg" },
  { value: "-09:00", label: "UTC-09:00 미국(알래스카)", img: "https://upload.wikimedia.org/wikipedia/commons/e/e6/Flag_of_Alaska.svg" },
  { value: "-08:00", label: "UTC-08:00 미국(LA)", img: "https://upload.wikimedia.org/wikipedia/commons/a/a4/Flag_of_the_United_States.svg" },
  { value: "-07:00", label: "UTC-07:00 미국(덴버)", img: "https://upload.wikimedia.org/wikipedia/commons/a/a4/Flag_of_the_United_States.svg" },
  { value: "-06:00", label: "UTC-06:00 미국(시카고)", img: "https://upload.wikimedia.org/wikipedia/commons/a/a4/Flag_of_the_United_States.svg" },
  { value: "-05:00", label: "UTC-05:00 미국(뉴욕)", img: "https://upload.wikimedia.org/wikipedia/commons/a/a4/Flag_of_the_United_States.svg" },
  { value: "-04:00", label: "UTC-04:00 칠레(산티아고)", img: "https://upload.wikimedia.org/wikipedia/commons/7/78/Flag_of_Chile.svg" },
  { value: "-03:00", label: "UTC-03:00 아르헨티나(부에노스아이레스)", img: "https://upload.wikimedia.org/wikipedia/commons/1/1a/Flag_of_Argentina.svg" },
  { value: "-01:00", label: "UTC-01:00 카보베르데(프라이아)", img: "https://upload.wikimedia.org/wikipedia/commons/3/38/Flag_of_Cape_Verde.svg" },
  { value: "+00:00", label: "UTC+00:00 영국(런던)", img: "https://upload.wikimedia.org/wikipedia/commons/a/ae/Flag_of_the_United_Kingdom.svg" },
  { value: "+01:00", label: "UTC+01:00 알제리(알제)", img: "https://upload.wikimedia.org/wikipedia/commons/7/77/Flag_of_Algeria.svg" },
  { value: "+02:00", label: "UTC+02:00 이집트(카이로)", img: "https://upload.wikimedia.org/wikipedia/commons/f/fe/Flag_of_Egypt.svg" },
  { value: "+03:00", label: "UTC+03:00 탄자니아(다르에스살람)", img: "https://upload.wikimedia.org/wikipedia/commons/3/38/Flag_of_Tanzania.svg" },
  { value: "+03:30", label: "UTC+03:30 이란(테헤란)", img: "https://upload.wikimedia.org/wikipedia/commons/c/ca/Flag_of_Iran.svg" },
  { value: "+04:00", label: "UTC+04:00 아랍에미리트(두바이)", img: "https://upload.wikimedia.org/wikipedia/commons/c/cb/Flag_of_the_United_Arab_Emirates.svg" },
  { value: "+04:30", label: "UTC+04:30 아프가니스탄(카불)", img: "https://upload.wikimedia.org/wikipedia/commons/5/5c/Flag_of_the_Taliban.svg" },
  { value: "+05:00", label: "UTC+05:00 파키스탄(이슬라마바드)", img: "https://upload.wikimedia.org/wikipedia/commons/3/32/Flag_of_Pakistan.svg" },
  { value: "+05:30", label: "UTC+05:30 인도(뉴델리)", img: "https://upload.wikimedia.org/wikipedia/commons/4/41/Flag_of_India.svg" },
  { value: "+05:45", label: "UTC+05:45 네팔(카트만두)", img: "https://upload.wikimedia.org/wikipedia/commons/9/9b/Flag_of_Nepal.svg" },
  { value: "+06:00", label: "UTC+06:00 방글라데시(다카)", img: "https://upload.wikimedia.org/wikipedia/commons/f/f9/Flag_of_Bangladesh.svg" },
  { value: "+06:30", label: "UTC+06:30 미얀마(양곤)", img: "https://upload.wikimedia.org/wikipedia/commons/8/8c/Flag_of_Myanmar.svg" },
  { value: "+07:00", label: "UTC+07:00 태국(방콕)", img: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Flag_of_Thailand.svg" },
  { value: "+08:00", label: "UTC+08:00 중국(베이징)", img: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Flag_of_the_People%27s_Republic_of_China.svg" },
  { value: "+09:00", label: "UTC+09:00 대한민국(서울)", img: "https://upload.wikimedia.org/wikipedia/commons/0/09/Flag_of_South_Korea.svg" },
  { value: "+09:30", label: "UTC+09:30 호주(애들레이드)", img: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Flag_of_Australia.svg" },
  { value: "+10:00", label: "UTC+10:00 호주(시드니)", img: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Flag_of_Australia.svg" },
  { value: "+11:00", label: "UTC+11:00 솔로몬제도(호니아라)", img: "https://upload.wikimedia.org/wikipedia/commons/7/74/Flag_of_the_Solomon_Islands.svg" },
  { value: "+12:00", label: "UTC+12:00 뉴질랜드(오클랜드)", img: "https://upload.wikimedia.org/wikipedia/commons/3/3e/Flag_of_New_Zealand.svg" },
  { value: "+13:00", label: "UTC+13:00 사모아(아피아)", img: "https://upload.wikimedia.org/wikipedia/commons/3/31/Flag_of_Samoa.svg" },
  { value: "+14:00", label: "UTC+14:00 키리바시(라인제도)", img: "https://upload.wikimedia.org/wikipedia/commons/d/d3/Flag_of_Kiribati.svg" }
];

// 옵션 초기화
function populateOffsets() {
  const left = document.getElementById('utc-offset-left');
  const right = document.getElementById('utc-offset-right');
  left.innerHTML = "";
  right.innerHTML = "";
  offsets.forEach(o => {
    left.add(new Option(o.label, o.value));
    right.add(new Option(o.label, o.value));
  });
  left.value = "+09:00";
  right.value = "+03:00";
}
populateOffsets();

let hourFormat = 12;
let offsetLeft = "+09:00";
let offsetRight = "+03:00";

// 오프셋 파싱: "+09:00" → 9, "-03:30" → -3.5
function parseOffsetStr(offsetStr) {
  const m = offsetStr.match(/([+-])(\d{2}):(\d{2})/);
  if (!m) return 0;
  const sign = m[1] === "-" ? -1 : 1;
  const hour = parseInt(m[2], 10);
  const min = parseInt(m[3], 10);
  return sign * (hour + min / 60);
}

// 시계 업데이트 (전 세계에서 정확한 시간!)
function updateClocks() {
  const now = new Date();
  const offsetLocal = -now.getTimezoneOffset() / 60;
  const offsetLeftH = parseOffsetStr(offsetLeft);
  const offsetRightH = parseOffsetStr(offsetRight);

  const leftTime = new Date(now.getTime() + (offsetLeftH - offsetLocal) * 3600 * 1000);
  const rightTime = new Date(now.getTime() + (offsetRightH - offsetLocal) * 3600 * 1000);

  updateClock(leftTime, "korea", "KOREA", hourFormat);
  updateClock(rightTime, "tanzania", "TANZANIA", hourFormat);
}

// 시계 바늘/라벨 표시
function updateClock(time, region, label, hourFormat) {
  const seconds = time.getSeconds();
  const minutes = time.getMinutes();
  const hours = time.getHours();
  let displayHours = hourFormat === 12 ? hours % 12 : hours;
  const secondDeg = (seconds / 60) * 360;
  const minuteDeg = (minutes / 60) * 360 + (seconds / 60) * 6;
  const hourDeg = (displayHours / hourFormat) * 360 + (minutes / 60) * (360 / hourFormat);
  document.getElementById(`${region}-second-hand`).style.transform = `rotate(${secondDeg}deg)`;
  document.getElementById(`${region}-minute-hand`).style.transform = `rotate(${minuteDeg}deg)`;
  document.getElementById(`${region}-hour-hand`).style.transform = `rotate(${hourDeg}deg)`;
  const dateStr = `${time.getFullYear()}/${String(time.getMonth() + 1).padStart(2, '0')}/${String(time.getDate()).padStart(2, '0')}`;
  let displayTime;
  if (hourFormat === 12) {
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const h = hours % 12 === 0 ? 12 : hours % 12;
    displayTime = `${String(h).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')} ${ampm}`;
  } else {
    displayTime = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  }
  document.getElementById(`${region}-textpath`).textContent = `${label} | ${dateStr} | ${displayTime}`;
}

// 시계 숫자 생성
function generateNumbers(region, hourFormat) {
  const svgNS = "http://www.w3.org/2000/svg";
  const xlinkNS = "http://www.w3.org/1999/xlink";
  const container = document.getElementById(`${region}-numbers`);
  const pathId = `#circlePath-${region}-numbers`;
  while (container.firstChild) container.removeChild(container.firstChild);
  const color = region === "korea" ? "dodgerblue" : "white";
  for (let i = 0; i < hourFormat; i++) {
    const textPath = document.createElementNS(svgNS, "textPath");
    textPath.setAttributeNS(xlinkNS, "xlink:href", pathId);
    textPath.setAttribute("startOffset", `${(i * 100 / hourFormat).toFixed(4)}%`);
    textPath.setAttribute("text-anchor", "middle");
    textPath.setAttribute("fill", color);
    if (i === 0) {
        textPath.setAttribute("startOffset", `0.5%`);
        textPath.textContent = hourFormat;  // 12시간제면 "12", 24시간제면 "24"
    } else {
        textPath.textContent = i;           // 그 외엔 1, 2, 3, ..., 11(또는 23)
    }

    container.appendChild(textPath);
  }
}

// 국기(배경) 동적 변경 함수
function setClockFlag(region, offset) {
  const found = offsets.find(o => o.value === offset);
  if (!found) return;
  const clockDiv = document.querySelector(`.clock.${region === 'korea' ? 'ko' : 'tz'}`);
  if (clockDiv) {
    clockDiv.style.backgroundImage = `url('${found.img}')`;
  }
}

// 이벤트 핸들러
document.getElementById("utc-offset-left").addEventListener("change", function (e) {
  offsetLeft = e.target.value;
  setClockFlag("korea", offsetLeft);
  updateClocks();
});
document.getElementById("utc-offset-right").addEventListener("change", function (e) {
  offsetRight = e.target.value;
  setClockFlag("tanzania", offsetRight);
  updateClocks();
});

document.getElementById("timeFormatForm").addEventListener("submit", function(e) {
  e.preventDefault();
  const selected = document.querySelector('input[name="hour-format"]:checked').value;
  hourFormat = parseInt(selected);
  generateNumbers("korea", hourFormat);
  generateNumbers("tanzania", hourFormat);
  updateClocks();
});

// 초기화
generateNumbers("korea", hourFormat);
generateNumbers("tanzania", hourFormat);
setClockFlag("korea", offsetLeft);
setClockFlag("tanzania", offsetRight);
setInterval(updateClocks, 1000);
updateClocks();








const mapOffsets = [
  { value: "-12:00", label: "UTC-12:00", place: "베이커섬(미국령)", map: "baker-map.png" },
  { value: "+01:00", label: "UTC+01:00", place: "알제리(알제)", map: "dz-map.png" },
  { value: "+03:00", label: "UTC+03:00", place: "탄자니아(다르에스살람)", map: "tz-map.png" },
  { value: "+09:00", label: "UTC+09:00", place: "대한민국(서울)", map: "kr-map.png" },
  // ...더 추가...
];

function buildMapCustomSelect() {
  const container = document.getElementById('utc-map-offset-custom');
  const selected = container.querySelector('.select-selected');
  const items = container.querySelector('.select-items');
  items.innerHTML = "";
  mapOffsets.forEach((o, idx) => {
    const el = document.createElement('div');
    el.innerHTML = `<span>${o.label}</span>
      <img src="images/maps/${o.map}" class="mini-map">
      <span>${o.place}</span>`;
    el.onclick = function() {
      selected.innerHTML = el.innerHTML;
      document.getElementById('utc-map-offset-value').value = o.value;
      items.classList.add('select-hide');
      selected.classList.remove('active');
      // 필요시: 선택시 시계 업데이트 함수 호출
    };
    items.appendChild(el);
    // 기본 선택 (idx==3, 즉 대한민국)
    if(idx === 3) selected.innerHTML = el.innerHTML;
  });

  selected.onclick = function(e) {
    e.stopPropagation();
    closeAllCustomSelectMap(this);
    items.classList.toggle('select-hide');
    selected.classList.toggle('active');
  };
}
function closeAllCustomSelectMap(except) {
  document.querySelectorAll('#utc-map-offset-custom .select-items').forEach(item => item.classList.add('select-hide'));
  document.querySelectorAll('#utc-map-offset-custom .select-selected').forEach(sel => sel.classList.remove('active'));
}
document.addEventListener("click", closeAllCustomSelectMap);

buildMapCustomSelect();
