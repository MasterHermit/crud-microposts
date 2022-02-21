class UI {
  constructor() {
    this.post = document.querySelector("#posts");
    this.titleInput = document.querySelector("#title");
    this.bodyInput = document.querySelector("#body");
    this.idInput = document.querySelector("#id");
    this.postSubmit = document.querySelector(".post-submit");
    this.forState = "add";
  }
  showPost(posts) {
    let output = "";
    posts.forEach(function (post) {
      output += `
            <div class="card mb-3">
            <div class="card-body ">
            <h4 class="card-title">${post.title}</h4>
            <p class="card-text">${post.body}</p>
            <a href="#" class="edit card-link " data-id="${post.id}">
            <i class="fa fa-pencil"></i>
            
            </a>
            <a href="#" class=" card-link delete" data-id="${post.id}">
            <i class="fa fa-remove "></i>
            
            </a>
            </div>
            
            </div>
            
            `;
    });
    this.post.innerHTML = output;
  }
  showAlert(message, classname) {
    this.clearAlert();
    const div = document.createElement("div");
    div.className = classname;
    div.appendChild(document.createTextNode(message));
    const container = document.querySelector(".postsContainer");
    const posts = document.querySelector("#posts");
    container.insertBefore(div, posts);

    setTimeout(() => {
      this.clearAlert();
    }, 3000);
  }
  clearAlert() {
    const curAlert = document.querySelector(".alert");
    if (curAlert) {
      curAlert.remove();
    }
  }
  clearFeild() {
    this.titleInput.value = "";
    this.bodyInput.value = "";
  }
  fillForm(data) {
    this.titleInput.value = data.title;
    this.bodyInput.value = data.body;
    this.idInput.value = data.id;

    this.changeFormState("edit");
  }
  clearIdInput(){
    this.idInput.value ="";
  }
  changeFormState(state) {
    if (state === "edit") {
      this.postSubmit.textContent="Update Post";
      this.postSubmit.className="post-submit btn btn-warning btn-block";

      //create cancel button
      const button = document.createElement("button");
      button.className="btn btn-light btn-block post-cancel";
      button.appendChild(document.createTextNode("cancel Text"))
      //get parent element
      const cardform = document.querySelector(".card-form");
      //get element to insertBefore
      const formEnd=document.querySelector(".form-end");
      cardform.insertBefore(button,formEnd);

    } else {
      this.postSubmit.textContent="Post It";
      this.postSubmit.className="post-submit btn btn-primary btn-block";
      // remove cancel button if it exists
      if(document.querySelector(".post-cancel")){
        document.querySelector(".post-cancel").remove();

      }
      this.clearIdInput();
      this.clearFeild();

      
    }
  }
}

export const ui = new UI();
