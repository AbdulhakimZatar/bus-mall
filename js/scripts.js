'use strict';

var productsSection = document.getElementById('all_products');
var votingRounds = 25;

var allProducts = [];
var totalClicks = 0;

var leftImageIndex;
var centerImageIndex;
var rightImageIndex;

function Product(name, path){
    this.name = name;
    this.path = path;

    this.numberOfClicks = 0;
    this.numberofTimesShown = 0;

    allProducts.push(this);
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

    leftImageIndex = generateRandomNumber();
    centerImageIndex = generateRandomNumber();
    rightImageIndex = generateRandomNumber();

    while(leftImageIndex === rightImageIndex || leftImageIndex === centerImageIndex)
    {
        leftImageIndex = generateRandomNumber();
    }
    while(rightImageIndex === leftImageIndex || rightImageIndex === centerImageIndex)
    {
        rightImageIndex = generateRandomNumber();
    }
    while(centerImageIndex === rightImageIndex || centerImageIndex === leftImageIndex)
    {
        centerImageIndex = generateRandomNumber();
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
            generateRandomImage();
        }
    }else{
        generateUserMessage();
        productsSection.removeEventListener('click', productClickHandler);
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


