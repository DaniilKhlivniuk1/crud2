let api="http://localhost:1234/";function getStudents(){fetch(api).then(e=>e.json()).then(e=>renderStudents(e)).catch(e=>console.error(e))}function renderStudents(e){let t=document.querySelector("#students-table tbody");t.innerHTML="",e.forEach(e=>{let n=document.createElement("tr");n.innerHTML=`
      <td>${e.id}</td>
      <td>${e.name}</td>
      <td>${e.age}</td>
      <td>${e.course}</td>
      <td>${e.skills.join(", ")}</td>
      <td>${e.email}</td>
      <td>${e.isEnrolled?"Так":"Ні"}</td>
      <td>
        <button onclick="updateStudent(${e.id})">\u{41E}\u{43D}\u{43E}\u{432}\u{438}\u{442}\u{438}</button>
        <button onclick="deleteStudent(${e.id})">\u{412}\u{438}\u{434}\u{430}\u{43B}\u{438}\u{442}\u{438}</button>
      </td>
    `,t.appendChild(n)})}function updateStudent(e){let t=prompt("Нове ім'я:");t&&fetch(`${api}/${e}`,{method:"PATCH",headers:{"Content-Type":"application/json"},body:JSON.stringify({name:t})}).then(()=>getStudents()).catch(e=>console.error(e))}function deleteStudent(e){confirm("Ви впевнені, що хочете видалити цього студента?")&&fetch(`${api}/${e}`,{method:"DELETE"}).then(()=>getStudents()).catch(e=>console.error(e))}document.getElementById("get-students-btn").addEventListener("click",getStudents),document.getElementById("add-student-form").addEventListener("submit",function(e){e.preventDefault(),fetch(api,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({name:document.getElementById("name").value,age:Number(document.getElementById("age").value),course:document.getElementById("course").value,skills:document.getElementById("skills").value.split(",").map(e=>e.trim()),email:document.getElementById("email").value,isEnrolled:document.getElementById("isEnrolled").checked})}).then(()=>getStudents()).catch(e=>console.error(e))});
//# sourceMappingURL=crud2.619557a3.js.map
