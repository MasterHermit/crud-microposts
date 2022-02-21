import { http } from "./http";
import { ui } from "./ui";

//get post on dom load

document.addEventListener("DOMContentLoaded", getPosts);
document.querySelector(".post-submit").addEventListener("click", submitPost);
document.querySelector("#posts").addEventListener("click", deletePost);
document.querySelector("#posts").addEventListener("click", editState);
document.querySelector(".card-form").addEventListener("click", cancelEdit);

function getPosts() {
  http
    .get(" http://localhost:3000/posts")
    .then((data) => ui.showPost(data))
    .catch((err) => console.log(err));
}

function submitPost() {
  const title = document.querySelector("#title").value;
  const body = document.querySelector("#body").value;
  const id = document.querySelector("#id").value;
  const data = {
    title: title,
    body: body,
  };
  if (title === "" || body === "") {
    ui.showAlert("please add a title or body", "alert alert-danger");
  } else {
    if (id === "") {
      http
        .post(" http://localhost:3000/posts", data)
        .then((data) => {
          ui.showAlert("post added", "alert alert-success");

          ui.clearFeild();
          getPosts();
        })
        .catch((err) => console.log(err));
    } else {
      http
      .put(`http://localhost:3000/posts/${id}`, data)
      .then((data) => {
        ui.showAlert("post added", "alert alert-success");

        ui.changeFormState("add");
        getPosts();
      })
      .catch((err) => console.log(err));
    }
  }
}

function deletePost(e) {
  e.preventDefault();

  if (e.target.parentElement.classList.contains("delete")) {
    const id = e.target.parentElement.dataset.id;
    if (confirm("are you sure")) {
      http
        .delete(`http://localhost:3000/posts/${id}`)
        .then((data) => {
          ui.showAlert("post removed", "alert alert-success");
          getPosts();
        })
        .catch((err) => console.log(err));
    }
  }
}

function editState(e) {
  e.preventDefault();
  if (e.target.parentElement.classList.contains("edit")) {
    const id = e.target.parentElement.dataset.id;
    const title =
      e.target.parentElement.previousElementSibling.previousElementSibling
        .textContent;
    const body = e.target.parentElement.previousElementSibling.textContent;

    const data = {
      id: id,
      title: title,
      body: body,
    };
    ui.fillForm(data);
  }
}

function cancelEdit(e) {
  if (e.target.classList.contains("post-cancel")) {
    ui.changeFormState("add");
  }
  e.preventDefault();
}
