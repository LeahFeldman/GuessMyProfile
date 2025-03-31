document.addEventListener("DOMContentLoaded", ()=> {

    let btn = document.getElementById("predictBtn");
    let nameInput = document.getElementById("nameInput");
    const validateName= () => {
        let name = nameInput.value;
        document.getElementById("errorMessage").style.setProperty("display", 'none');
        if(name.trim() === ""){
            document.getElementById("errorMessage").textContent="We can't help you if you don't enter a name.";
            document.getElementById("errorMessage").style.setProperty("display", 'block');
        }
        
        
    }

    nameInput.addEventListener("input", () => validateName());
    btn.addEventListener("click", guess);

    function guess(){
        validateName();

        const name = nameInput.value;

        //GENDER
        // Show loading indicator
        genderResult.innerHTML = "Give us a minute to figure you out..";
        fetch('https://api.genderize.io?name=' + name)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            if (data.gender) {
                genderResult.innerHTML = "We're guessing you are " + data.gender + ".";
            } else {
                genderResult.innerHTML = "You stumped us! We give up on predicting your gender.";
            }
        })
        .catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
            genderResult.innerHTML = "Sorry, there's been an issue. Just love us anyway.";
        });

        // AGE
        // Show loading indicator
        ageResult.innerHTML = "Give us a minute to figure you out...";
        fetch('https://api.agify.io?name=' + name)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            if (data.age) {
                ageResult.innerHTML = "Ok, you're probably around " + data.age + " years old.";
            } else {
                ageResult.innerHTML = "Sorry, you're just to awesome to put an age to.";
            }
        })
        .catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
            ageResult.innerHTML = "Sorry, we're not sure what happend.";
        });

        // NATIONALITY
        // Show loading indicator
        nationalityResult.innerHTML = "Give us a minute to figure you out...";
        fetch('https://api.nationalize.io?name=' + name)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            if (data.country) {
                nationalityResult.innerHTML = "We think you're probably from ";
                for(let i = 0; i<data.country.length; i++){
                    nationalityResult += data.country[i].country_id;
                    if(i < data.country.length -1 ){
                        nationalityResult += ","
                    }
                    if(i == data.country.length -2){
                        nationalityResult += "or";
                    }
                }
            } else {
                nationalityResult.innerHTML = "Sorry, we can't guess where you're from.";
            }
        })
        .catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
            nationalityResult.innerHTML = "Oops! Something went wrong...";
        });
    }
})