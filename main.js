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
  { value: "-12:00", label: "UTC-12:00 (베이커섬, 미국령)" },
  { value: "-11:00", label: "UTC-11:00 (니우에, 사모아)" },
  { value: "-10:00", label: "UTC-10:00 (하와이, 타히티)" },
  { value: "-09:30", label: "UTC-09:30 (마르키즈 제도, 프랑스령)" },
  { value: "-09:00", label: "UTC-09:00 (알래스카, 감비어 제도)" },
  { value: "-08:00", label: "UTC-08:00 (LA, 밴쿠버, 티후아나)" },
  { value: "-07:00", label: "UTC-07:00 (덴버, 피닉스, 에드먼턴)" },
  { value: "-06:00", label: "UTC-06:00 (시카고, 멕시코시티, 과테말라시티)" },
  { value: "-05:00", label: "UTC-05:00 (뉴욕, 토론토, 리마, 보고타)" },
  { value: "-04:30", label: "UTC-04:30 (카라카스, 베네수엘라)" },
  { value: "-04:00", label: "UTC-04:00 (산티아고, 아순시온, 라파스)" },
  { value: "-03:00", label: "UTC-03:00 (브라질리아, 부에노스아이레스, 몬테비데오)" },
  { value: "-02:00", label: "UTC-02:00 (남조지아, 남샌드위치 제도)" },
  { value: "-01:00", label: "UTC-01:00 (아조레스, 카보베르데)" },
  { value: "+00:00", label: "UTC+00:00 (런던, 리스본, 카사블랑카)" },
  { value: "+01:00", label: "UTC+01:00 (베를린, 파리, 로마, 마드리드)" },
  { value: "+02:00", label: "UTC+02:00 (카이로, 아테네, 요하네스버그)" },
  { value: "+03:00", label: "UTC+03:00 (모스크바, 탄자니아/다르에스살람, 이스탄불, 나이로비)" },
  { value: "+03:30", label: "UTC+03:30 (테헤란, 이란)" },
  { value: "+04:00", label: "UTC+04:00 (아제르바이잔, 두바이, 아부다비)" },
  { value: "+04:30", label: "UTC+04:30 (카불, 아프가니스탄)" },
  { value: "+05:00", label: "UTC+05:00 (이슬라마바드, 타슈켄트, 예카테린부르크)" },
  { value: "+05:30", label: "UTC+05:30 (인도/뉴델리, 콜카타, 뭄바이)" },
  { value: "+05:45", label: "UTC+05:45 (카트만두, 네팔)" },
  { value: "+06:00", label: "UTC+06:00 (다카, 알마티, 비슈케크)" },
  { value: "+06:30", label: "UTC+06:30 (양곤, 미얀마, 코코스 제도)" },
  { value: "+07:00", label: "UTC+07:00 (방콕, 하노이, 자카르타)" },
  { value: "+08:00", label: "UTC+08:00 (베이징, 싱가포르, 울란바토르, 퍼스)" },
  { value: "+08:45", label: "UTC+08:45 (오스트레일리아 Eucla)" },
  { value: "+09:00", label: "UTC+09:00 (서울, 도쿄, 야쿠츠크, 평양)" },
  { value: "+09:30", label: "UTC+09:30 (애들레이드, 다윈)" },
  { value: "+10:00", label: "UTC+10:00 (시드니, 멜버른, 블라디보스토크, 괌)" },
  { value: "+10:30", label: "UTC+10:30 (오스트레일리아 Lord Howe)" },
  { value: "+11:00", label: "UTC+11:00 (솔로몬 제도, 뉴칼레도니아, 마가단)" },
  { value: "+12:00", label: "UTC+12:00 (피지, 오클랜드, 캄차카, 마셜 제도)" },
  { value: "+12:45", label: "UTC+12:45 (채텀 제도, 뉴질랜드)" },
  { value: "+13:00", label: "UTC+13:00 (통가, 사모아, 피닉스 제도)" },
  { value: "+14:00", label: "UTC+14:00 (라인 제도, 키리바시)" }
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
