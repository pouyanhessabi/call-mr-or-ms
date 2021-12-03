// get all the values from html file
const form = document.getElementById("form");
const nameInput = document.getElementById("name");
const gender_result = document.getElementById("gender_result");
const probability_result = document.getElementById("probability_result");
const male = document.getElementById("male");
const female = document.getElementById("female");
const save = document.getElementById("save");
const clear = document.getElementById("clear");
const getGender = document.getElementById("getGender");


// call the API
form.addEventListener("submit", (e) => {

    e.preventDefault();

    checkNameRegex(nameInput.value);

    if (localStorage.getItem(nameInput.value)) {
        console.log("Name found in the local storage");
        getGender.innerHTML = localStorage.getItem(nameInput.value);
    }
    else {
        console.log("Name didn't find in the storage");
        getGender.innerHTML = "Not Specified";
    }

});


// validate the name with propere regex
function checkNameRegex(name) {

    var regex = /^[a-zA-Z ]*$/;
    if (!regex.test(name) || name.length == 0) {

        male.checked = true;
        nameInput.innerHTML = "";
        gender_result.innerHTML = "Not Specified";
        probability_result.innerHTML = "Not Specified";
    }
    else {
        fetchData(name);
    }

}


// تابع دریافت دیتا
async function fetchData(name) {

    let result = await fetch(`https://api.genderize.io/?name=${name}`)
    var obj =await result.json();
    gender_result.innerHTML = obj.gender;
    probability_result.innerHTML = obj.probability;

    if (obj.gender === "male") {
        male.checked = true;
    }
    else {
        female.checked = true;
    }
}


// add to local storage
save.addEventListener("click", () => {
    let checked = male.checked ? "male" : "female";
    localStorage.setItem(nameInput.value, checked);
    showNotifications("Name saved", "saved");
    getGender.innerHTML = checked;
});


// delete from local storage
clear.addEventListener("click", () => {
    localStorage.removeItem(nameInput.value);
    getGender.innerHTML = "Not Specified";
});

// shows notifications by type
function showNotifications(text, type) {
    let savedWrapper = document.getElementById(type);
    savedWrapper.style.width = '100%';
    savedWrapper.textContent = text;
    console.log('timeout staretd');
    setTimeout(() => {
        console.log('timeout finished');
        savedWrapper.style.width = '0';
        savedWrapper.textContent = ''
    }, 4000)
}
