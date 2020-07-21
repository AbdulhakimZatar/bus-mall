'use strict';

var productsSection = document.getElementById('all_products');
var votingRounds = 25;

var allProducts = [];
var totalClicks = 0;

var productsName = [];
var numberOfClicks = [];
var numberofTimesShown = [];

var leftImageIndex = 0;
var centerImageIndex = 0;
var rightImageIndex = 0;

function Product(name, path){
    this.name = name;
    this.path = path;

    this.numberOfClicks = 0;
    this.numberofTimesShown = 0;

    this.usedBefore = false;

    allProducts.push(this);
    productsName.push(this.name)
}

new Product('Bag', 'img/bag.jpg');
new Product('Banana', 'img/banana.jpg');
new Product('Bathroom', 'img/bathroom.jpg');
new Product('Boots', 'img/boots.jpg');
new Product('Breakfast', 'img/breakfast.jpg');
new Product('Bubblegum', 'img/bubblegum.jpg');
new Product('Chair', 'img/chair.jpg');
new Product('Cthulhu', 'img/cthulhu.jpg');
new Product('Dog-duck', 'img/dog-duck.jpg');
new Product('Dragon', 'img/dragon.jpg');
new Product('Pen', 'img/pen.jpg');
new Product('Pet-sweep', 'img/pet-sweep.jpg');
new Product('Scissors', 'img/scissors.jpg');
new Product('Shark', 'img/shark.jpg');
new Product('Sweep', 'img/sweep.png');
new Product('Tauntaun', 'img/tauntaun.jpg');
new Product('Unicorn', 'img/unicorn.jpg');
new Product('USB', 'img/usb.gif');
new Product('Water-can', 'img/water-can.jpg');
new Product('Wine-glass', 'img/wine-glass.jpg');

generateRandomImage();

productsSection.addEventListener('click', productClickHandler);

function generateRandomImage(){
    var leftImage = document.getElementById('left_product_img');
    var centerImage = document.getElementById('center_product_img');
    var rightImage = document.getElementById('right_product_img');

    // console.log(allProducts[rightImageIndex].usedBefore);

    // console.log(allProducts[rightImageIndex].usedBefore);

    leftImageIndex = generateRandomNumber();
    centerImageIndex = generateRandomNumber();
    rightImageIndex = generateRandomNumber();


    while(leftImageIndex === rightImageIndex || leftImageIndex === centerImageIndex || allProducts[leftImageIndex].usedBefore === true)
        {
            leftImageIndex = generateRandomNumber();
        }
    while(centerImageIndex === rightImageIndex || centerImageIndex === leftImageIndex || allProducts[centerImageIndex].usedBefore === true)
        {
            centerImageIndex = generateRandomNumber();
        }
    while(rightImageIndex === leftImageIndex || rightImageIndex === centerImageIndex || allProducts[rightImageIndex].usedBefore === true)
        {
            rightImageIndex = generateRandomNumber();
        }

     

    var leftPath = allProducts[leftImageIndex].path;
    var centerPath = allProducts[centerImageIndex].path;
    var rightPath = allProducts[rightImageIndex].path;



    allProducts[leftImageIndex].numberofTimesShown +=1;
    allProducts[centerImageIndex].numberofTimesShown +=1;
    allProducts[rightImageIndex].numberofTimesShown +=1;

    leftImage.setAttribute('src', leftPath);
    centerImage.setAttribute('src', centerPath);
    rightImage.setAttribute('src', rightPath);

}

function generateRandomNumber(){
    return Math.floor(Math.random()* allProducts.length);
}

function productClickHandler(){

    if (totalClicks < votingRounds){
        var clickedElement = event.target;
        var clickedElementId = clickedElement.id;

        if(clickedElementId === 'left_product_img' || clickedElementId === 'center_product_img' || clickedElementId === 'right_product_img'){
            totalClicks += 1;

            if(clickedElementId === 'left_product_img'){
                allProducts[leftImageIndex].numberOfClicks +=1;
            }
            if(clickedElementId === 'center_product_img'){
                allProducts[leftImageIndex].numberOfClicks +=1;
            }
            if(clickedElementId === 'right_product_img'){
                allProducts[leftImageIndex].numberOfClicks +=1;
            }
            allProducts[leftImageIndex].usedBefore = false;
            allProducts[centerImageIndex].usedBefore = false;
            allProducts[rightImageIndex].usedBefore = false;
            generateRandomImage();
           
            allProducts[leftImageIndex].usedBefore = true;
            allProducts[centerImageIndex].usedBefore = true;
            allProducts[rightImageIndex].usedBefore = true;

        }
    }else{
        populateNumberOfClicksArr();
        generateUserMessage();
        productsSection.removeEventListener('click', productClickHandler);
        generateChart();
    }
}

function generateUserMessage(){
    var ulElement = document.getElementById('finalResult');

    for (let index = 0; index < allProducts.length; index++) {
        var listItem = document.createElement('li');
        listItem.textContent = allProducts[index].name + ': ' + allProducts[index].numberOfClicks + ' votes | ' + allProducts[index].numberofTimesShown + ' shown.';
        ulElement.appendChild(listItem);
    }
}

function populateNumberOfClicksArr(){
    for (let index = 0; index < allProducts.length; index++) {
        numberOfClicks.push(allProducts[index].numberOfClicks);   
        numberofTimesShown.push(allProducts[index].numberofTimesShown);  
    }
}

function generateChart(){
    var ctx = document.getElementById('myChart').getContext('2d');
    var myChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: productsName,
        datasets: [{
          label: '# of Clicks',
          data: numberOfClicks,
          backgroundColor: "rgba(255,99,132,0.2)",
          borderColor: "rgba(255,99,132,1)",
          hoverBackgroundColor: "rgba(255,99,132,0.4)",
          hoverBorderColor: "rgba(255,99,132,1)",
          borderWidth: 1
        },{
            label: '# of Shown',
            data: numberofTimesShown,
            backgroundColor: "rgba(55,88,249,0.2)",
            borderColor: "rgba(55,88,249,1)",
            hoverBackgroundColor: "rgba(55,88,249,0.4)",
            hoverBorderColor: "rgba(55,88,249,1)",
            borderWidth: 1
          }
    ]
      },
      options: {
        maintainAspectRatio: false,
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
}

