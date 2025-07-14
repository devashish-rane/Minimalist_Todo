function load() {
    const saved = localStorage.getItem('notepad');
    if (saved !== null) {
        document.getElementById('notepad').value = saved;
    }
    updateCalendar();
}

function saveAndUpdate() {
    const text = document.getElementById('notepad').value;
    localStorage.setItem('notepad', text);
    updateCalendar();
}

document.getElementById('notepad').addEventListener('input', saveAndUpdate);

function updateCalendar() {
    const cal = document.getElementById('calendar');
    cal.innerHTML = '';
    const events = parseEvents(document.getElementById('notepad').value);
    const days = getCurrentWeek();
    days.forEach(day => {
        const container = document.createElement('div');
        container.className = 'day';
        const h = document.createElement('h4');
        h.textContent = day.toDateString();
        container.appendChild(h);
        const ul = document.createElement('ul');
        events.filter(e => sameDay(e.date, day)).forEach(e => {
            const li = document.createElement('li');
            li.textContent = e.text;
            ul.appendChild(li);
        });
        container.appendChild(ul);
        cal.appendChild(container);
    });
}

function parseEvents(text) {
    const lines = text.split(/\n/);
    const months = {jan:0,feb:1,mar:2,apr:3,may:4,jun:5,jul:6,aug:7,sep:8,oct:9,nov:10,dec:11};
    const events = [];
    for (let line of lines) {
        const trimmed = line.trim();
        if (trimmed.startsWith('//')) continue; // done
        if (!trimmed.startsWith('-')) continue; // not a note
        const content = trimmed.slice(1).trim();
        const m = content.match(/@(?:(\d{1,2})([a-zA-Z]+|-\d{1,2}))/);
        if (m) {
            let day = parseInt(m[1],10);
            let monthPart = m[2];
            let month;
            if (monthPart.startsWith('-')) {
                month = parseInt(monthPart.slice(1),10) - 1;
            } else {
                monthPart = monthPart.toLowerCase();
                month = months[monthPart.slice(0,3)];
            }
            if (month !== undefined && !isNaN(day)) {
                const year = new Date().getFullYear();
                const date = new Date(year, month, day);
                events.push({date, text: content.replace(m[0],'').trim()});
            }
        }
    }
    return events;
}

function getCurrentWeek() {
    const now = new Date();
    const start = new Date(now);
    start.setDate(now.getDate() - now.getDay()); // sunday start
    const days = [];
    for (let i=0; i<7; i++) {
        const d = new Date(start);
        d.setDate(start.getDate()+i);
        days.push(d);
    }
    return days;
}

function sameDay(a,b) {
    return a.getFullYear()===b.getFullYear() && a.getMonth()===b.getMonth() && a.getDate()===b.getDate();
}

window.addEventListener('load', load);

