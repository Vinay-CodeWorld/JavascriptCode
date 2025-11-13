"use strict";



class userProfile{
    constructor(elementId) {
       this.element = document.getElementById(elementId);
        
        // Find the button *inside* that <div>
        this.button = this.element.querySelector('#fetch-button');
        this.user={
        name:'loading...',
        email:'...',
        avtar:''
        }
        
        this.button.addEventListener('click',this.fetchUser.bind(this));

    }
     fetchUser(){
        fetch('https://randomuser.me/api/')
         .then(response=>response.json())
          .then((data)=>{
            console.log(data)
            const user=data.results[0];
            this.user.name=user.name.first;
            this.user.email=user.email;
            this.user.avtar=user.picture.thumbnail;
            this.render();
          })
          .catch((error)=>{console.log(error)})


         
    }
    render(){
    this.element.innerHTML = `
    <img src="${this.user.avtar}" alt="User Avatar">
    <h2>${this.user.name}</h2>
    <p>${this.user.email}</p>
    <button id="fetch-button">Get New User</button>
    `;

  this.button = this.element.querySelector('#fetch-button');
  this.button.addEventListener('click', () => this.fetchUser());
}

}
 new userProfile("user-profile");

