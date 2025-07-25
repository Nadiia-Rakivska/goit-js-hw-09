let formData = {
  email: "",
  message: ""
}

const feedbackFormElem = document.querySelector(".feedback-form");
feedbackFormElem.addEventListener("input", e => {
  const email = e.currentTarget.elements.email.value.trim();
  const message = e.currentTarget.elements.message.value.trim();  
  formData.email = email;
  formData.message = message;
  if (email||message) {
     saveToLs("feedback-form-state", formData);
  }

})

function saveToLs(key, value) {
  const formDataJson = JSON.stringify(value);
  localStorage.setItem("feedback-form-state", formDataJson);
}

function getFromLs(key) {
  try {
    const data = JSON.parse(localStorage.getItem("feedback-form-state"));    
    return data;
  }catch {}
}

document.addEventListener('DOMContentLoaded', () => {
  const lsData = getFromLs("feedback-form-state");
  try {
    formData.email = lsData.email;
    formData.message = lsData.message;
    feedbackFormElem.elements.email.value = lsData.email;
    feedbackFormElem.elements.message.value = lsData.message;
  } catch {}
});

feedbackFormElem.addEventListener("submit", e => {
  e.preventDefault();
  const form = e.currentTarget;
  if (formData.email && formData.message) {  
    console.log(formData);    
    formData.email = "";
    formData.message = "";
    form.reset();
    localStorage.removeItem("feedback-form-state");
  }
  else {
    alert("Fill please all fields")
  }
})