const api = 'http://localhost:1234/';

function getStudents() {
  fetch(api)
    .then(res => res.json())
    .then(data => renderStudents(data))
    .catch(err => console.error(err));
}

function renderStudents(students) {
  const tbody = document.querySelector('#students-table tbody');
  tbody.innerHTML = '';
  students.forEach(student => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${student.id}</td>
      <td>${student.name}</td>
      <td>${student.age}</td>
      <td>${student.course}</td>
      <td>${student.skills.join(', ')}</td>
      <td>${student.email}</td>
      <td>${student.isEnrolled ? 'Так' : 'Ні'}</td>
      <td>
        <button onclick="updateStudent(${student.id})">Оновити</button>
        <button onclick="deleteStudent(${student.id})">Видалити</button>
      </td>
    `;
    tbody.appendChild(row);
  });
}

document.getElementById('get-students-btn').addEventListener('click', getStudents);

document.getElementById('add-student-form').addEventListener('submit', function (e) {
  e.preventDefault();
  const student = {
    name: document.getElementById('name').value,
    age: Number(document.getElementById('age').value),
    course: document.getElementById('course').value,
    skills: document.getElementById('skills').value.split(',').map(s => s.trim()),
    email: document.getElementById('email').value,
    isEnrolled: document.getElementById('isEnrolled').checked
  };

  fetch(api, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(student)
  })
    .then(() => getStudents())
    .catch(err => console.error(err));
});

function updateStudent(id) {
  const updatedName = prompt('Нове ім\'я:');
  if (!updatedName) return;
  fetch(`${api}/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: updatedName })
  })
    .then(() => getStudents())
    .catch(err => console.error(err));
}

function deleteStudent(id) {
  if (!confirm('Ви впевнені, що хочете видалити цього студента?')) return;
  fetch(`${api}/${id}`, { method: 'DELETE' })
    .then(() => getStudents())
    .catch(err => console.error(err));
}
