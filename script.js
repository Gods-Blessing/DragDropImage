document.addEventListener("DOMContentLoaded", function () {
  const dropzone = document.getElementById("dropzone");
  const fileInput = document.getElementById("fileInput");
  const fileList = document.getElementById("fileList");
  const MAX_IMAGES = 5;

  //Write the code of all the dropzone functionality here
  fileInput.addEventListener("change", handleFiles, false);
  dropzone.addEventListener("dragover", (e)=>{
    e.preventDefault();
  })

  dropzone.addEventListener('drop', (e)=>{
    e.preventDefault();
    let files = e.dataTransfer.files;
    for(let file of files){
      displayFile(file)
    }
  })
  
  function handleFiles() {
    const fileList = this.files;
    for (let i = 0; i < fileList.length; i++) {
      displayFile(fileList[i]);
    }
  }

  function displayFile(file) {
    let fileLength = fileList.childNodes.length;
    console.log(fileLength);
    if(fileLength > 5){
      alert("You cannot upload more than 5 files.");
      return;
    }
    const reader = new FileReader();
    const div = document.createElement("div");
    div.className = "file-name";
    const img = document.createElement("img");
    const textArea = document.createElement('textarea');
    const rightButton = document.createElement('button');
    const deleteButton = document.createElement('button');
    img.alt = file.name;
    img.className = "thumbnail";
    textArea.className = "text-description";
    div.appendChild(img);
    div.appendChild(textArea);
    rightButton.addEventListener('click', ()=>{
      textArea.disabled = true;
      alert("Description Added!")
    })
    deleteButton.addEventListener('click', ()=>{
      div.remove();
    })
    rightButton.innerText = "Add Description"
    deleteButton.innerText = "Delete"
    div.appendChild(rightButton)
    div.appendChild(deleteButton)
    reader.onload = function (e) {
      img.src = e.target.result;
      fileList.appendChild(div);
    };
    reader.readAsDataURL(file);
  }

  //Function to load the data from localStorage
  function loadFromLocalStorage() {
    const storedImagesData = JSON.parse(
      localStorage.getItem("storedImagesData") || "[]"
    );
    console.log("Loaded from localStorage:", storedImagesData);
    storedImagesData.forEach((data) => {
      const div = document.createElement("div");
      div.className = "file-name";

      const img = document.createElement("img");
      img.src = data.src;
      img.className = "thumbnail";
      div.appendChild(img);

      // Write rest of the code here
    });
  }
});
