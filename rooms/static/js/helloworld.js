// ============================================================
//  Лабораторная работа 7. Вариант 2 — Гостиница.
//  Скрипт работает только в консоли браузера (F12 → Console).
//  Ничего не запускается автоматически при загрузке страницы.
// ============================================================

// ---------- 1. Массив студентов ----------
var groupmates = [
    { "name": "Александр", "surname": "Иванов",   "group": "БВТ1702", "marks": [4, 3, 5] },
    { "name": "Иван",      "surname": "Петров",   "group": "БСТ1702", "marks": [4, 4, 4] },
    { "name": "Кирилл",    "surname": "Смирнов",  "group": "БАП1801", "marks": [5, 5, 5] },
    { "name": "Мария",     "surname": "Кузнецова","group": "БВТ1702", "marks": [3, 3, 4] },
    { "name": "Анна",      "surname": "Соколова", "group": "БАП1801", "marks": [5, 4, 5] }
];

console.log("Массив groupmates загружен. Введите в консоли: showAll()");
console.log(groupmates);


// ---------- 2. Дополнение строки пробелами (аналог ljust) ----------
function rpad(str, length) {
    str = String(str);
    while (str.length < length) {
        str = str + ' ';
    }
    return str;
}


// ---------- 3. Средний балл ----------
function averageMark(student) {
    var marks = student.marks;
    var sum = 0;
    for (var i = 0; i < marks.length; i++) {
        sum = sum + marks[i];
    }
    return sum / marks.length;
}


// ---------- 4. Вывод таблицы в консоль ----------
function printStudents(students, title) {
    if (title) {
        console.log("=== " + title + " ===");
    }

    if (!students || students.length === 0) {
        console.log("(список пуст)");
        console.log("");
        return;
    }

    console.log(
        rpad("Имя", 12),
        rpad("Фамилия", 14),
        rpad("Группа", 10),
        rpad("Оценки", 14),
        rpad("Ср. балл", 10)
    );

    for (var i = 0; i < students.length; i++) {
        var s = students[i];
        console.log(
            rpad(s.name, 12),
            rpad(s.surname, 14),
            rpad(s.group, 10),
            rpad(s.marks.join(", "), 14),
            rpad(averageMark(s).toFixed(2), 10)
        );
    }
    console.log("");
}


// ---------- 5. Вывод всех студентов ----------
function showAll() {
    printStudents(groupmates, "Все студенты");
}


// ---------- 6. Фильтр по группе ----------
function filterByGroup(group) {
    if (!group) {
        console.log("Укажите группу, например: filterByGroup('БВТ1702')");
        return [];
    }

    var result = [];
    for (var i = 0; i < groupmates.length; i++) {
        if (groupmates[i].group === group) {
            result.push(groupmates[i]);
        }
    }

    printStudents(result, "Студенты группы " + group);
    return result;
}


// ---------- 7. Фильтр по среднему баллу ----------
function filterByAverage(minAverage) {
    var threshold = parseFloat(minAverage);

    if (isNaN(threshold)) {
        console.log("Укажите число, например: filterByAverage(4)");
        return [];
    }

    var result = [];
    for (var i = 0; i < groupmates.length; i++) {
        if (averageMark(groupmates[i]) > threshold) {
            result.push(groupmates[i]);
        }
    }

    printStudents(result, "Средний балл выше " + threshold);
    return result;
}


// ---------- 8. Список доступных групп ----------
function showGroups() {
    var groups = [];
    for (var i = 0; i < groupmates.length; i++) {
        if (groups.indexOf(groupmates[i].group) === -1) {
            groups.push(groupmates[i].group);
        }
    }
    console.log("Доступные группы:", groups);
    return groups;
}


// ---------- 9. Вывод через alert (если нужен не консоль) ----------
function showAllAlert() {
    var text = "ВСЕ СТУДЕНТЫ\n\n";
    for (var i = 0; i < groupmates.length; i++) {
        var s = groupmates[i];
        text += s.name + " " + s.surname +
                " | " + s.group +
                " | " + s.marks.join(", ") +
                " | ср. " + averageMark(s).toFixed(2) + "\n";
    }
    alert(text);
}

function filterByGroupAlert(group) {
    var found = filterByGroup(group);
    var text = "Группа " + group + ":\n\n";
    if (found.length === 0) {
        text += "(никого не найдено)";
    } else {
        for (var i = 0; i < found.length; i++) {
            text += found[i].name + " " + found[i].surname +
                    " | ср. " + averageMark(found[i]).toFixed(2) + "\n";
        }
    }
    alert(text);
}

function filterByAverageAlert(minAverage) {
    var found = filterByAverage(minAverage);
    var text = "Средний балл выше " + minAverage + ":\n\n";
    if (found.length === 0) {
        text += "(никого не найдено)";
    } else {
        for (var i = 0; i < found.length; i++) {
            text += found[i].name + " " + found[i].surname +
                    " | ср. " + averageMark(found[i]).toFixed(2) + "\n";
        }
    }
    alert(text);
}


// ---------- 10. Подсказка в консоли ----------
console.log(
    "Доступные команды:\n" +
    "  showAll()                    — все студенты\n" +
    "  showGroups()                 — список групп\n" +
    "  filterByGroup('БВТ1702')     — фильтр по группе\n" +
    "  filterByAverage(4)           — фильтр по среднему баллу\n" +
    "  showAllAlert()               — то же через alert\n" +
    "  filterByGroupAlert('БВТ1702')\n" +
    "  filterByAverageAlert(4)"
);