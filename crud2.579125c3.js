const api = 'https://680dfedbc47cb8074d91bfe7.mockapi.io/ap/post/users';
document.getElementById('get-students-btn').addEventListener('click', getStudents);
document.getElementById('add-student-form').addEventListener('submit', addStudent);
async function getStudents() {
    try {
        const res = await fetch(api);
        const data = await res.json();
        renderStudents(data);
    } catch (err) {
        console.error('GET error:', err);
    }
}
function renderStudents(students) {
    const tbody = document.querySelector('#students-table tbody');
    tbody.innerHTML = '';
    students.forEach((student)=>{
        const row = document.createElement('tr');
        row.innerHTML = `
      <td>${student.id}</td>
      <td>${student.name}</td>
      <td>${student.age}</td>
      <td>${student.course}</td>
      <td>${student.skills?.join(', ')}</td>
      <td>${student.email}</td>
      <td>${student.isEnrolled ? "\u0422\u0430\u043A" : "\u041D\u0456"}</td>
      <td>
        <button onclick="updateStudent(${student.id})">\u{41E}\u{43D}\u{43E}\u{432}\u{438}\u{442}\u{438}</button>
        <button onclick="deleteStudent(${student.id})">\u{412}\u{438}\u{434}\u{430}\u{43B}\u{438}\u{442}\u{438}</button>
      </td>
    `;
        tbody.appendChild(row);
    });
}
async function addStudent(e) {
    e.preventDefault();
    const student = {
        name: document.getElementById('name').value,
        age: Number(document.getElementById('age').value),
        course: document.getElementById('course').value,
        skills: document.getElementById('skills').value.split(',').map((s)=>s.trim()),
        email: document.getElementById('email').value,
        isEnrolled: document.getElementById('isEnrolled').checked
    };
    try {
        await fetch(api, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(student)
        });
        getStudents();
        e.target.reset();
    } catch (err) {
        console.error('POST error:', err);
    }
}
async function updateStudent(id) {
    const updatedName = prompt("\u041D\u043E\u0432\u0435 \u0456\u043C'\u044F:");
    if (!updatedName) return;
    try {
        await fetch(`${api}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: updatedName
            })
        });
        getStudents();
    } catch (err) {
        console.error('UPDATE error:', err);
    }
}
async function deleteStudent(id) {
    if (!confirm("\u0412\u0438 \u0432\u043F\u0435\u0432\u043D\u0435\u043D\u0456, \u0449\u043E \u0445\u043E\u0447\u0435\u0442\u0435 \u0432\u0438\u0434\u0430\u043B\u0438\u0442\u0438 \u0446\u044C\u043E\u0433\u043E \u0441\u0442\u0443\u0434\u0435\u043D\u0442\u0430?")) return;
    try {
        await fetch(`${api}/${id}`, {
            method: 'DELETE'
        });
        getStudents();
    } catch (err) {
        console.error('DELETE error:', err);
    }
}

//# sourceMappingURL=crud2.579125c3.js.map
