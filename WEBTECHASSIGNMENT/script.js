
//Calling a function to greet the visitor user with a message
window.onload = function() {
    $.ajax({
        url: 'https://randomuser.me/api/?inc=name,picture',
        dataType: 'json',
        success: function(data) {
            //console.log(data);
            const dataRes = data.results;
            const name = "Welcome "+dataRes[0].name.first+"!!";
            const image = dataRes[0].picture.large;
            const imageContainer = document.querySelector('.visitorImg');
            let img = document.createElement("img");
            img.src = image;
            imageContainer.appendChild(img);
            document.querySelector('.name-container h1').append(name);
        }
    })
}

const SearchButton = document.querySelector('.searchButton');
const SearchBar = document.querySelector('.searchBar');
const cardTemplate = document.querySelector('[data-card-template]');
const cardContainer = document.querySelector('[data-card-container]');

let users = [];

//Function which gets executed when the button is clicked
function displaySorted() {
    cardContainer.innerHTML = '';
    users.forEach(user => {
        const card = cardTemplate.content.cloneNode(true).children[0]; 
		const cardName = card.querySelector('[data-name]');
		const cardMail = card.querySelector('[data-mail]');
		const cardLocation = card.querySelector('[data-location]');
		const cardImg = card.querySelector('[data-img]');
		const cardAge = card.querySelector('[data-age]');
		cardName.textContent = user.title +" " +user.first+" "+user.last;
		cardMail.textContent = user.email;
		cardLocation.textContent = "I am from "+user.location;
		cardImg.src = user.picture;
		cardAge.textContent = "Age "+user.age;
		//Appending the data to the container using template
		cardContainer.append(card);
    })
}

function sortMail(a,b){
    const mailA = a.email.toUpperCase();
    const mailB = b.email.toUpperCase();
    if(mailA<mailB){
        return -1;
    }
    if(mailA>mailB){
        return 1;
    }

    return 0;
}

function sortName(a,b){
    const nameA = a.first.toUpperCase();
    const nameB = b.first.toUpperCase();
    if(nameA<nameB) {
        return -1;
    }
    if(nameA>nameB) {
        return 1;
    }

    return 0;
}

function sortAge(a,b) {
	const ageA = a.age;
	const ageB = b.age;
	if(ageA<ageB){
		return -1;
	}
	if(ageA>ageB){
		return 1;
	}
	
	return 0;
}

//Adding eventlistners to sorting buttons and sorting the array of Objects using functions
document.querySelector('.mailshBtn').addEventListener('click', () => {
    //console.log(users);
    users.sort(sortMail);
    displaySorted();
    //console.log(users);
})

document.querySelector('.mailshZBtn').addEventListener('click', () => {
    users.sort(sortMail);
    users.reverse();
    displaySorted();
})

document.querySelector('.shBtn').addEventListener('click', () => {
    users.sort(sortName);
    displaySorted();
})

document.querySelector('.shZBtn').addEventListener('click', () => {
    users.sort(sortName);
    users.reverse();
    displaySorted();
})

document.querySelector('.ageABtn').addEventListener('click', () => {
    users.sort(sortAge);
    displaySorted();
})

document.querySelector('.ageDBtn').addEventListener('click', () => {
    users.sort(sortAge);
    users.reverse();
    displaySorted();
})

//Executing Function which sends ajax request on click of button
SearchButton.addEventListener('click', () => {
    cardContainer.innerHTML = '';
    $.ajax({
        url: 'https://randomuser.me/api/?inc=name,picture,email,location,dob&results='+SearchBar.value,
        dataType: 'json',
        success: function(data) {
            //console.log(data);
            const dataRes = data.results;
			//Looping through the number of results obtained through ajax call
            users = dataRes.map(user => {
                const card = cardTemplate.content.cloneNode(true).children[0]; 
                const cardName = card.querySelector('[data-name]');
                const cardMail = card.querySelector('[data-mail]');
                const cardLocation = card.querySelector('[data-location]');
                const cardImg = card.querySelector('[data-img]');
				const cardAge = card.querySelector('[data-age]');
                cardName.textContent = user.name.title +" " +user.name.first+" "+user.name.last;
                cardMail.textContent = user.email;
                cardLocation.textContent = "I am from "+user.location.country;
                cardImg.src = user.picture.medium;
				cardAge.textContent = "Age "+user.dob.age;
				//Appending the data to the container using template
                cardContainer.append(card);
                return {first:user.name.first, title:user.name.title, last:user.name.last,age:user.dob.age, location:user.location.country, email:user.email, picture:user.picture.medium, element : card};
            });
        }
    })
})