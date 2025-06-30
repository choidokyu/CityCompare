// offsets 배열: 완전 분리 (UTC/영문국가/영문도시/한글라벨/국기)
const offsets = [
  { value: "-12:00", utc: "UTC-12:00", country: "United States", city: "Baker Island", label: "베이커섬(미국령)", img: "images/flags/the_United_States.png" },
  { value: "-11:00", utc: "UTC-11:00", country: "American Samoa", city: "Pago Pago", label: "사모아(파고파고)", img: "images/flags/American_Samoa.png" },
  { value: "-10:00", utc: "UTC-10:00", country: "United States", city: "Hawaii", label: "미국(하와이)", img: "images/flags/Hawaii.png" },
  { value: "-09:00", utc: "UTC-09:00", country: "United States", city: "Alaska", label: "미국(알래스카)", img: "images/flags/Alaska.png" },
  { value: "-08:00", utc: "UTC-08:00", country: "United States", city: "Los Angeles", label: "미국(LA)", img: "images/flags/the_United_States.png" },
  { value: "-07:00", utc: "UTC-07:00", country: "United States", city: "Denver", label: "미국(덴버)", img: "images/flags/the_United_States.png" },
  { value: "-06:00", utc: "UTC-06:00", country: "United States", city: "Chicago", label: "미국(시카고)", img: "images/flags/the_United_States.png" },
  { value: "-05:00", utc: "UTC-05:00", country: "United States", city: "New York", label: "미국(뉴욕)", img: "images/flags/the_United_States.png" },
  { value: "-04:00", utc: "UTC-04:00", country: "Chile", city: "Santiago", label: "칠레(산티아고)", img: "images/flags/Chile.png" },
  { value: "-03:00", utc: "UTC-03:00", country: "Argentina", city: "Buenos Aires", label: "아르헨티나(부에노스아이레스)", img: "images/flags/Argentina.png" },
  { value: "-01:00", utc: "UTC-01:00", country: "Cape Verde", city: "Praia", label: "카보베르데(프라이아)", img: "images/flags/Cape_Verde.png" },
  { value: "+00:00", utc: "UTC+00:00", country: "United Kingdom", city: "London", label: "영국(런던)", img: "images/flags/the_United_Kingdom.png" },
  { value: "+01:00", utc: "UTC+01:00", country: "Algeria", city: "Algiers", label: "알제리(알제)", img: "images/flags/Algeria.png" },
  { value: "+02:00", utc: "UTC+02:00", country: "Egypt", city: "Cairo", label: "이집트(카이로)", img: "images/flags/Egypt.png" },
  { value: "+03:00", utc: "UTC+03:00", country: "Tanzania", city: "Dar es Salaam", label: "탄자니아(다르에스살람)", img: "images/flags/Tanzania.png" },
  { value: "+03:30", utc: "UTC+03:30", country: "Iran", city: "Tehran", label: "이란(테헤란)", img: "images/flags/Iran.png" },
  { value: "+04:00", utc: "UTC+04:00", country: "United Arab Emirates", city: "Dubai", label: "아랍에미리트(두바이)", img: "images/flags/the_United_Arab_Emirates.png" },
  { value: "+04:30", utc: "UTC+04:30", country: "Afghanistan", city: "Kabul", label: "아프가니스탄(카불)", img: "images/flags/the_Taliban.png" },
  { value: "+05:00", utc: "UTC+05:00", country: "Pakistan", city: "Islamabad", label: "파키스탄(이슬라마바드)", img: "images/flags/Pakistan.png" },
  { value: "+05:30", utc: "UTC+05:30", country: "India", city: "New Delhi", label: "인도(뉴델리)", img: "images/flags/India.png" },
  { value: "+05:45", utc: "UTC+05:45", country: "Nepal", city: "Kathmandu", label: "네팔(카트만두)", img: "images/flags/Nepal.png" },
  { value: "+06:00", utc: "UTC+06:00", country: "Bangladesh", city: "Dhaka", label: "방글라데시(다카)", img: "images/flags/Bangladesh.png" },
  { value: "+06:30", utc: "UTC+06:30", country: "Myanmar", city: "Yangon", label: "미얀마(양곤)", img: "images/flags/Myanmar.png" },
  { value: "+07:00", utc: "UTC+07:00", country: "Thailand", city: "Bangkok", label: "태국(방콕)", img: "images/flags/Thailand.png" },
  { value: "+08:00", utc: "UTC+08:00", country: "China", city: "Beijing", label: "중국(베이징)", img: "images/flags/Republic_of_China.png" },
  { value: "+09:00", utc: "UTC+09:00", country: "South Korea", city: "Seoul", label: "대한민국(서울)", img: "images/flags/South_Korea.png" },
  { value: "+09:30", utc: "UTC+09:30", country: "Australia", city: "Adelaide", label: "호주(애들레이드)", img: "images/flags/Australia.png" },
  { value: "+10:00", utc: "UTC+10:00", country: "Australia", city: "Sydney", label: "호주(시드니)", img: "images/flags/Australia.png" },
  { value: "+11:00", utc: "UTC+11:00", country: "Solomon Islands", city: "Honiara", label: "솔로몬제도(호니아라)", img: "images/flags/the_Solomon_Islands.png" },
  { value: "+12:00", utc: "UTC+12:00", country: "New Zealand", city: "Auckland", label: "뉴질랜드(오클랜드)", img: "images/flags/New_Zealand.png" },
  { value: "+13:00", utc: "UTC+13:00", country: "Samoa", city: "Apia", label: "사모아(아피아)", img: "images/flags/Samoa.png" },
  { value: "+14:00", utc: "UTC+14:00", country: "Kiribati", city: "Kiritimati", label: "키리바시(라인제도)", img: "images/flags/Kiribati.png" }
];

let hourFormat = 12;
let offsetLeft = "+09:00";
let offsetRight = "+03:00";


// 시계 업데이트
function updateClocks() {
  const now = new Date();
  const offsetLocal = -now.getTimezoneOffset() / 60;
  const offsetLeftH = parseOffsetStr(offsetLeft);
  const offsetRightH = parseOffsetStr(offsetRight);

  const leftTime = new Date(now.getTime() + (offsetLeftH - offsetLocal) * 3600 * 1000);
  const rightTime = new Date(now.getTime() + (offsetRightH - offsetLocal) * 3600 * 1000);

  const leftObj = offsets.find(o => o.value === offsetLeft);
  const rightObj = offsets.find(o => o.value === offsetRight);

  const leftLabel = leftObj ? `${leftObj.country} (${leftObj.city})` : "LEFT";
  const rightLabel = rightObj ? `${rightObj.country} (${rightObj.city})` : "RIGHT";

  updateClock(leftTime, "korea", leftLabel, hourFormat);
  updateClock(rightTime, "tanzania", rightLabel, hourFormat);
}

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

function generateNumbers(region, hourFormat) {
  const svgNS = "http://www.w3.org/2000/svg";
  const xlinkNS = "http://www.w3.org/1999/xlink";
  const container = document.getElementById(`${region}-numbers`);
  const pathId = `#circlePath-${region}-numbers`;
  while (container.firstChild) container.removeChild(container.firstChild);
  for (let i = 0; i < hourFormat; i++) {
    const textPath = document.createElementNS(svgNS, "textPath");
    textPath.setAttributeNS(xlinkNS, "xlink:href", pathId);
    textPath.setAttribute("startOffset", `${(i * 100 / hourFormat).toFixed(4)}%`);
    textPath.setAttribute("text-anchor", "middle");
    textPath.setAttribute("fill", "white");
    textPath.setAttribute("stroke", "black");
    textPath.setAttribute("stroke-width", "2");
    textPath.setAttribute("paint-order", "stroke fill");
    textPath.setAttribute("stroke-linejoin", "round");
    if (i === 0) {
        textPath.setAttribute("startOffset", `0.6%`);
        textPath.textContent = hourFormat;
    } else {
        textPath.textContent = i;
    }
    container.appendChild(textPath);
  }
}

function setClockFlag(region, offset) {
  const found = offsets.find(o => o.value === offset);
  if (!found) return;
  const clockDiv = document.querySelector(`.clock.${region === 'korea' ? 'ko' : 'tz'}`);
  if (clockDiv) {
    clockDiv.style.backgroundImage = `url('${found.img}')`;
  }
}

function buildMapCustomSelect(targetId, hiddenId, defaultValue, regionKey) {
  const container = document.getElementById(targetId);
  const selected = container.querySelector('.select-selected');
  const items = container.querySelector('.select-items');
  items.innerHTML = "";

  offsets.forEach((o) => {
    const el = document.createElement('div');
    el.innerHTML = `<span>${o.utc}</span>
      <img src="${o.img}" class="mini-map">
      <span>${o.country} (${o.city})</span>`;
    el.onclick = function() {
      selected.innerHTML = el.innerHTML;
      document.getElementById(hiddenId).value = o.value;
      items.classList.add('select-hide');
      selected.classList.remove('active');
      if (regionKey === 'left') {
        offsetLeft = o.value;
        setClockFlag("korea", offsetLeft);
      } else {
        offsetRight = o.value;
        setClockFlag("tanzania", offsetRight);
      }
      updateClocksAndBar();
    };
    items.appendChild(el);
    if(o.value === defaultValue) selected.innerHTML = el.innerHTML;
  });

  selected.onclick = function(e) {
    e.stopPropagation();
    closeAllCustomSelectMap(this);
    items.classList.toggle('select-hide');
    selected.classList.toggle('active');
  };
}

function closeAllCustomSelectMap(except) {
  document.querySelectorAll('.custom-select .select-items').forEach(item => item.classList.add('select-hide'));
  document.querySelectorAll('.custom-select .select-selected').forEach(sel => sel.classList.remove('active'));
}
document.addEventListener("click", closeAllCustomSelectMap);

buildMapCustomSelect('utc-map-offset-left', 'utc-map-offset-value-left', '+09:00', 'left');
buildMapCustomSelect('utc-map-offset-right', 'utc-map-offset-value-right', '+03:00', 'right');

document.getElementById("timeFormatForm").addEventListener("submit", function(e) {
  e.preventDefault();
  const selected = document.querySelector('input[name="hour-format"]:checked').value;
  hourFormat = parseInt(selected);
  generateNumbers("korea", hourFormat);
  generateNumbers("tanzania", hourFormat);
  updateClocksAndBar();
});

generateNumbers("korea", hourFormat);
generateNumbers("tanzania", hourFormat);
setClockFlag("korea", offsetLeft);
setClockFlag("tanzania", offsetRight);

// --------- [여기서부터 타임라인 compare bar 8번째 칸 고정 기능 적용] ---------

function renderTimezoneCompareBar() {
  const bar = document.getElementById('timezone-compare-bar');
  if (!bar) return;

  const left = offsets.find(o => o.value === offsetLeft);
  const right = offsets.find(o => o.value === offsetRight);

  const now = new Date();
  const leftOffset = parseOffsetStr(offsetLeft);
  const rightOffset = parseOffsetStr(offsetRight);
  const utcH = now.getUTCHours();

  // 각 도시 현지 시각(0~23)
  const leftHour = (utcH + leftOffset + 24) % 24;
  const rightHour = (utcH + rightOffset + 24) % 24;

  // "8번째 칸"에 현재시각이 오게 숫자배열 생성
  function makeTimeline(cityHour) {
    const posNow = 7; // 8번째 칸(0-index 기준)
    let arr = [];
    for (let i = 0; i < 24; i++) {
      const hour = (cityHour - posNow + i + 24) % 24;
      arr.push(hour);
    }
    return arr;
  }

  function hourLabel(h) {
    if (hourFormat === 12) {
      let label = h % 12 === 0 ? 12 : h % 12;
      let ampm = h < 12 ? 'am' : 'pm';
      return `${label}${ampm}`;
    }
    return h;
  }

  function timelineHTML(cityHour) {
    const arr = makeTimeline(cityHour);
    return arr.map((h, idx) => {
      let cls = (idx === 7) ? "timeline-hour now" : "timeline-hour";
      return `<div class="${cls}">${hourLabel(h)}</div>`;
    }).join('');
  }

  function row(obj, cityHour) {
    if (!obj) return '';
    // 현지 시:분 표시
    const date = new Date(now.getTime() + (parseOffsetStr(obj.value) - (-now.getTimezoneOffset()/60)) * 60 * 60 * 1000);
    let hh = date.getHours(), mm = date.getMinutes();
    let disp = hourFormat === 12
      ? `${((hh % 12) || 12)}:${String(mm).padStart(2,'0')} ${(hh < 12 ? 'AM' : 'PM')}`
      : `${String(hh).padStart(2,'0')}:${String(mm).padStart(2,'0')}`;
    return `
      <div class="city-row">
        <img src="${obj.img}" class="city-flag" />
        <div class="city-info">
          <div class="city-name">${obj.city}</div>
          <div class="city-country">${obj.country}</div>
        </div>
        <div class="city-time">${disp}</div>
        <div class="city-timeline">${timelineHTML(cityHour)}</div>
      </div>
    `;
  }

  bar.innerHTML = row(left, leftHour) + row(right, rightHour);
}

// 시계+타임라인 동시 갱신
function updateClocksAndBar() {
  updateClocks();
  renderTimezoneCompareBar();
}
setInterval(updateClocksAndBar, 1000);
updateClocksAndBar();

function fnButton() {
  alert("확장/원복 기능 구현 필요");
}




// // 오프셋 파싱: "+09:00" → 9, "-03:30" → -3.5
// function parseOffsetStr(offsetStr) {
//   const m = offsetStr.match(/([+-])(\d{2}):(\d{2})/);
//   if (!m) return 0;
//   const sign = m[1] === "-" ? -1 : 1;
//   const hour = parseInt(m[2], 10);
//   const min = parseInt(m[3], 10);
//   return sign * (hour + min / 60);
// }

// UTC offset 문자열을 소수점 시간으로 변환 (+09:30 -> 9.5 등)
function parseOffsetStr(offset) {
  let sign = offset.startsWith('-') ? -1 : 1;
  let parts = offset.replace(/^[+-]/, '').split(':');
  let hours = parseInt(parts[0], 10);
  let minutes = parseInt(parts[1] || "0", 10);
  return sign * (hours + minutes / 60);
}



function renderBigNumbers(region, hourFormat, baseOffset, compareOffset) {
  const g = document.getElementById(`clock-big-numbers-${region}`);
  if (!g) return;
  g.innerHTML = "";

  const cx = 105, cy = 105;
  const r = 100;
  const count = hourFormat;

  let fontSize = hourFormat === 12 ? 8 : 8;

  // 시차 계산
  // compareOffset이 baseOffset보다 몇 시간 느린지(또는 빠른지)
  let diff = compareOffset - baseOffset;

  for (let i = 0; i < count; i++) {
    // "내" 시계 기준 0~23(또는 1~12)번째 숫자가 "상대방" 시계 기준 몇 시인지
    // 예: 8번째(오전 8시)라면, 반대편 도시는 (8+시차) % 24

    // 기준이 되는 시간 (0~23, 1~12)
    let display;
    if (hourFormat === 12) {
      let myHour = (i === 0 ? 12 : i);  // 원형 숫자 12,1,2,3...
      let otherHour = (myHour + diff + 12 - 1) % 12 + 1; // 1~12로 보정
      display = otherHour;
    } else {
      let myHour = i;  // 0~23
      let otherHour = (myHour + diff + 24) % 24;
      display = otherHour;
    }

    let base = (hourFormat === 12) ? 3 : 6;
    let angle = ((i - base) / count) * 2 * Math.PI;
    let x = cx + r * Math.cos(angle);
    let y = cy + r * Math.sin(angle);
    let deg = angle * 180 / Math.PI + 90;

    g.innerHTML += `
      <text 
        x="${x}" y="${y}" 
        text-anchor="middle" 
        dominant-baseline="middle"
        font-size="${fontSize}"
        fill="#005cbf" stroke="#fff" stroke-width="0.7"
        paint-order="stroke fill" font-family="Arial"
        transform="rotate(${deg} ${x} ${y})"
      >${display}</text>
    `;
  }
}








// ...나머지 시계/옵션 처리 함수들...
// 시계 생성, 업데이트 부분 등 기존과 동일

// 최초 실행 및 시간제 바뀔 때 호출:
function refreshAllClocksAndNumbers() {
  // 항상 최신 값으로 offset 계산!
  let koreaOffset = parseOffsetStr(offsetLeft);
  let tanzaniaOffset = parseOffsetStr(offsetRight);

  generateNumbers("korea", hourFormat);
  generateNumbers("tanzania", hourFormat);
  renderBigNumbers('korea', hourFormat, koreaOffset, tanzaniaOffset);
  renderBigNumbers('tanzania', hourFormat, tanzaniaOffset, koreaOffset);
  setClockFlag("korea", offsetLeft);
  setClockFlag("tanzania", offsetRight);
  updateClocksAndBar();
}
refreshAllClocksAndNumbers();




document.getElementById("timeFormatForm").addEventListener("submit", function(e) {
  e.preventDefault();
  const selected = document.querySelector('input[name="hour-format"]:checked').value;
  hourFormat = parseInt(selected);
  refreshAllClocksAndNumbers();
});