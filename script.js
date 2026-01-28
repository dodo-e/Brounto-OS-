// ==========================================
// 1. فتح وإغلاق النوافذ (الآلة الحاسبة والساعة)
// ==========================================
const calcIcon = document.getElementById('calculator-icon');
const calcWindow = document.getElementById('calculator-window');
const clockIcon = document.getElementById('clock-icon');
const clockWindow = document.getElementById('clock-window');

calcIcon.onclick = function() {
    calcWindow.style.display = 'block';
    calcWindow.style.zIndex = "100";
};

clockIcon.onclick = function() {
    clockWindow.style.display = 'block';
    clockWindow.style.zIndex = "100";
};

// ==========================================
// 2. التنقل بين برامج الساعة (Tabs)
// ==========================================
function openTab(evt, tabName) {
    let i, tabcontent, tablinks;
    // بيخفي كل محتويات التبويبات
    tabcontent = document.getElementsByClassName("tab-content");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    // بيشيل اللون الأخضر/النشط من الزراير
    tablinks = document.getElementsByClassName("tab-btn");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    // بيظهر التبويب اللي اخترته ويخلي الزرار نشط
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
}

// ==========================================
// 3. تحديث الساعة والمنبه (Real-time)
// ==========================================
let alarmTime = null;

function updateClock() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    
    const currentTimeText = `${hours}:${minutes}:${seconds}`;
    const clockDisplay = document.getElementById('full-clock-display');
    
    if (clockDisplay) {
        clockDisplay.innerText = currentTimeText;
    }

    // هنا بنقارن وقت الساعة بوقت المنبه
    const currentHM = currentTimeText.substring(0, 5); // الساعات والدقائق بس
    if (alarmTime === currentHM) {
        alert("⏰ Alarm time finished!! ⏰");
        alarmTime = null; // عشان ما يفضلش يكرر التنبيه كل ثانية
        document.getElementById('alarm-status').innerText = "No alarm set";
    }
}

function setAlarm() {
    alarmTime = document.getElementById('alarm-time').value;
    if(alarmTime) {
        document.getElementById('alarm-status').innerText = "Alarm set for " + alarmTime;
    }
}

// تشغيل الساعة فوراً وتحديثها كل ثانية
setInterval(updateClock, 1000);
updateClock();

// ==========================================
// 4. ساعة الإيقاف (Stopwatch)
// ==========================================
let swInterval;
let swSeconds = 0;

function startStopwatch() {
    if (swInterval) return; 
    swInterval = setInterval(() => {
        swSeconds++;
        let hrs = Math.floor(swSeconds / 3600);
        let mins = Math.floor((swSeconds - (hrs * 3600)) / 60);
        let secs = swSeconds % 60;
        document.getElementById('stopwatch-display').innerText = 
            `${String(hrs).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    }, 1000);
}

function stopStopwatch() {
    clearInterval(swInterval);
    swInterval = null;
}

function resetStopwatch() {
    stopStopwatch();
    swSeconds = 0;
    document.getElementById('stopwatch-display').innerText = "00:00:00";
}

// ==========================================
// 5. منطق الآلة الحاسبة (تم تعديله عشان ما يضربش في الساعة)
// ==========================================
const display = document.getElementById('calc-display');
// بنمسك الأزرار اللي جوه شبكة الآلة الحاسبة بس
const calcButtons = document.querySelectorAll('.clac-buttons-grid .clac-btn');

calcButtons.forEach(button => {
    button.onclick = function() {
        const value = this.getAttribute('data-value');
        if (!value) return; // لو زرار ملوش قيمة ما يعملش حاجة

        if (value === 'C') {
            display.value = '0';
        } else if (value === 'DEL') {
            display.value = display.value.slice(0, -1);
            if (display.value === '') display.value = '0';
        } else if (value === '=') {
            try {
                display.value = eval(display.value);
            } catch {
                display.value = 'Error';
            }
        } else {
            if (display.value === '0') display.value = value;
            else display.value += value;
        }
    };
});