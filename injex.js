console.log("Starting");
const image = new Image();
image.src = './assets/game-assets/platform.png';
const background = new Image();
// background.src = './assets/game-assets/background.png';
background.src = './assets/game-assets/background.png';
const hills = new Image();
hills.src = './assets/game-assets/hills.png';
const canvas= document.querySelector('canvas');
const click= new Image();
click.src='./assets/game-assets/clickme.png';
const platformSmallTall = new Image();
platformSmallTall.src = './assets/game-assets/platformSmallTall.png';
console.log(platformSmallTall);
const spriteRunLeft = new Image();
spriteRunLeft.src = './assets/game-assets/spriteRunLeft.png';
const spriteRunRight = new Image();
spriteRunRight.src = './assets/game-assets/spriteRunRight.png';
const spriteStandLeft = new Image();
spriteStandLeft.src = './assets/game-assets/spriteStandLeft.png';
const spriteStandRight = new Image();
spriteStandRight.src = './assets/game-assets/spriteStandRight.png';
console.log(spriteStandRight);
const Biswajeet = new Image();
Biswajeet.src= './assets/game-assets/Biswajeetraut.png';
const Welcome = new Image();
Welcome.src= './assets/game-assets/welcome.png';
const About = new Image();
About.src= './assets/game-assets/aboutremove.png';
const AboutText = new Image();
AboutText.src= './assets/game-assets/abouttext.png';
const Education = new Image();
Education.src= './assets/game-assets/Education.png';
const Edu1 = new Image();
Edu1.src= './assets/game-assets/Edu1.png';
const Edu2 = new Image();
Edu2.src= './assets/game-assets/Edu2.png';
const Btech = new Image();
Btech.src= './assets/game-assets/btech.png';
const Skill = new Image();
Skill.src= './assets/game-assets/skill.png';
const Skill1 = new Image();
Skill1.src= './assets/game-assets/skill1.png';
const Skill2 = new Image();
Skill2.src= './assets/game-assets/skill2.png';
const Astraunaut = new Image();
Astraunaut.src= './assets/game-assets/astraunaut.png';
const Projects = new Image();
Projects.src= './assets/game-assets/Projects.png';
const How = new Image();
How.src= './assets/game-assets/how.png';
const play = new Image();
play.src= './assets/game-assets/play.png';
const weather = new Image();
weather.src= './assets/game-assets/weather.png';
const vitshop = new Image();
vitshop.src= './assets/game-assets/vitshop.png';
const vacad = new Image();
vacad.src= './assets/game-assets/v-acad.png';
const  vchat= new Image();
vchat.src= './assets/game-assets/vchat.png';
const marketplace = new Image();
marketplace.src= './assets/game-assets/marketplace.png';
const organ= new Image();
organ.src= './assets/game-assets/organ.png';
const drip= new Image();
drip.src= './assets/game-assets/drip.png';
const experience = new Image();
experience.src= './assets/game-assets/experience.png';
console.log(weather);
console.log(experience);
const hpecty = new Image();
hpecty.src= './assets/game-assets/hpecty.png';
const shopweb = new Image();
shopweb.src= './assets/game-assets/shopweb.png';
const pracup = new Image();
pracup.src='./assets/game-assets/pracup.png';
const freelance = new Image();
freelance.src='./assets/game-assets/freelance.png';
const contact = new Image();
contact.src='./assets/game-assets/contact.png';
const howtoplay = new Image();
howtoplay.src='./assets/game-assets/howtoplay.png';
const github = new Image();
github.src='./assets/game-assets/github.png';
const gmail = new Image();
gmail.src='./assets/game-assets/gmail.png';
const linkedin = new Image();
linkedin.src='./assets/game-assets/linkedin.png';
const thankyou = new Image();
thankyou.src='./assets/game-assets/thankyou.png';
const c= canvas.getContext('2d');
canvas.width = 1024;
canvas.height = 576;
const gravity =0.5;
var redirect = false;
var redirect1 = false;
var redirect2= false;
class Player {
    constructor(){
        this.position={
            x: 100,
            y: 100,
        }
        this.velocity={
            x:0,
            y:1
        }
        this.width=66
        this.height=150
        this.image = spriteStandRight
        this.frames=0
        this.sprites ={
            stand:{
                right: spriteStandRight,
                cropWidth: 177,
                width: 66,
                left: spriteStandLeft
            },
            run:{
                right: spriteRunRight,
                cropWidth: 341,
                width: 127.875,
                left: spriteRunLeft,
            },
        }
        this.currentSprite = this.sprites.stand.right
        this.currentCropWidth = this.sprites.stand.cropWidth
    }   
    draw(){
        c.drawImage(this.currentSprite, 
            this.currentCropWidth * this.frames,
            0,
            this.currentCropWidth,
            400,
            this.position.x, 
            this.position.y,
            this.width, 
            this.height)
    }
    update(){
        this.frames += 1;
        if(this.frames>59 && (this.currentSprite== spriteStandRight || this.currentSprite== spriteStandLeft))
        {
            this.frames=0;
        }
        else if(this.frames> 29 && (this.currentSprite== spriteRunRight || this.currentSprite== spriteRunLeft))
        {
            this.frames=0;

        }
        this.draw();
        this.position.x+=this.velocity.x;
        this.position.y+=this.velocity.y;
        if(this.position.y + this.height + this.velocity.y <= canvas.height){
            this.velocity.y+=gravity;
        }
        else{
            // this.velocity.y=0;
        }
    }
}
class Platform {
    constructor({x,y,image}){
        this.position={
            x: x,
            y: y,
        }
        this.image=image
        this.width=image.width
        this.height=image.height
    }
    draw()
    {
        c.drawImage(this.image, this.position.x, this.position.y,this.width,this.height);    
    }
}
class GenericObject {
    constructor({x,y,image}){
        this.position={
            x: x,
            y: y,
        }
        this.image=image
        this.width=image.width
        this.height=image.height
    }
    draw()
    {
        c.drawImage(this.image, this.position.x, this.position.y,this.width,this.height);

    }
}
var player = new Player();
var genericObjects =[]
var platforms = []
var keys={
    right:{
        pressed: false,
    },
    left:{
        pressed: false,
    }
}
let scrollOffset =0;
function init()
{
    redirect = false;
    redirect1 = false;
    redirect2= false;
 player = new Player();
 genericObjects =[new GenericObject({
    x:-1,
    y:-1,
    image: background,
}),new GenericObject({
    x:7000,
    y:-1,
    image: background,
}),new GenericObject({
    x:-1,
    y:-1,
    image: hills,
}),
,new GenericObject({
    x:6000,
    y:-1,
    image: hills,
}),
new GenericObject({
    x: 200,
    y:40,
    image: Biswajeet
}),
new GenericObject({
    x: 800,
    y:40,
    image: Welcome
}),
new GenericObject({
    x: 1300,
    y:40,
    image: About
}),
new GenericObject({
    x: 1450,
    y:150,
    image: AboutText
}),
new GenericObject({
    x: 2400,
    y:40,
    image: Education
}),
new GenericObject({
    x: 3000,
    y:200,
    image: Edu1
}),
new GenericObject({
    x: 3000,
    y:50,
    image: Edu2
}),
new GenericObject({
    x: 2410,
    y:150,
    image: Btech
}),
new GenericObject({
    x: 4000,
    y:40,
    image: Skill
}),
new GenericObject({
    x: 4130,
    y: 150,
    image: Skill1
}),
new GenericObject({
    x: 4160,
    y: 250,
    image: Skill2
})
// new GenericObject({
//     x: 4700,
//     y:140,
//     image: Skill2
// })
,
new GenericObject({
    x: 4850,
    y: 40,
    image: Projects
}),
new GenericObject({
    x: 4850,
    y: 140,
    image: How,
}),
new GenericObject({
    x: 4850,
    y: 260,
    image: play,
}),
new GenericObject({
    x: 5450,
    y: 40,
    image: weather,
}),
new GenericObject({
    x: 6650,
    y: 40,
    image: vitshop,
}),
new GenericObject({
    x: 8400,
    y: 40,
    image: vacad,
}),
new GenericObject({
    x: 9100,
    y: 40,
    image: vchat,
}),
new GenericObject({
    x: 10100,
    y: 40,
    image: marketplace, //Drip
}),
new GenericObject({
    x: 10700,
    y: 40,
    image: drip, //Web3.0
}),
new GenericObject({
    x: 11400,
    y: 40,
    image: organ, //vigo
}),
new GenericObject({
    x: 12600,
    y: 40,
    image: experience, //vigo
}),
new GenericObject({
    x: 12600,
    y: 140,
    image: hpecty, //vigo
}),
new GenericObject({
    x: 13600,
    y: 40,
    image: shopweb, //vigo
}),
new GenericObject({
    x: 14300,
    y: 40,
    image: pracup, //vigo
}),
new GenericObject({
    x: 15000,
    y: 40,
    image: freelance, //vigo
}),
new GenericObject({
    x: 15700,
    y: 40,
    image: contact, //vigo
}),
new GenericObject({
    x: 15700,
    y: 140,
    image: howtoplay, //vigo
}),
new GenericObject({
    x: 16300,
    y: 100,
    image: github, //vigo
}),
new GenericObject({
    x: 16800,
    y: 100,
    image: linkedin, //vigo
}),
new GenericObject({
    x: 17300,
    y: 100,
    image: gmail, //vigo
}),
new GenericObject({
    x: 17800,
    y: 100,
    image: thankyou, //vigo
}),
]
 platforms = [new Platform({x:-1,y:470,image:image}),new Platform({x:image.width-3,y:470,image:image}),new Platform({x:image.width-3,y:210,image:image}),new Platform({x:image.width*2-5,y:210,image:image}),new Platform({x:image.width*3.2,y:470,image:image}),new Platform({x:image.width-3,y:470,image:image}),new Platform({x:image.width-3,y:210,image:image}),
    new Platform({x:image.width*2-150,y:210,image:image}),
    new Platform({x:image.width*4+400,y:470,image:image}),
    new Platform({x:image.width*5+590,y:470,image:image}),
    new Platform({x:image.width*6+650,y:470,image:image}),
    new Platform({x:image.width*7+700,y:470,image:image}),
    new Platform({x:image.width*8+850,y:470,image:image}),
    new Platform({x:image.width*9+900,y:470,image:image}),
    new Platform({x:image.width*10+1050,y:470,image:image}),
    new Platform({x:image.width*12+1180,y:470,image:image}),
    new Platform({x:image.width*13,y:470,image:image}),
    new Platform({x:image.width*14,y:470,image:image}),
    new Platform({x:image.width*15,y:470,image:image}),
    new Platform({x:image.width*16,y:470,image:image}),
    new Platform({x:image.width*17,y:470,image:image}),
    new Platform({x:image.width*18,y:470,image:image}),
    new Platform({x:image.width*19,y:470,image:image}),
    new Platform({x:image.width*20,y:470,image:image}),
    new Platform({x:image.width*21,y:470,image:image}),
    new Platform({x:image.width*22,y:470,image:image}),
    new Platform({x:image.width*23,y:470,image:image}),
    new Platform({x:image.width*24,y:470,image:image}),
    new Platform({x:image.width*25,y:470,image:image}),
    new Platform({x:image.width*26,y:470,image:image}),
    new Platform({x:image.width*27,y:470,image:image}),
    new Platform({x:image.width*28,y:470,image:image}),
    new Platform({x:image.width*29,y:470,image:image}),
    new Platform({x:image.width*30,y:470,image:image}),
    new Platform({x:image.width*31,y:470,image:image}),
    new Platform({x:image.width*32,y:470,image:image}),
    new Platform({x:image.width*33,y:470,image:image}),
    new Platform({x:image.width*35,y:470,image:image}),
    new Platform({x:image.width*36,y:470,image:image}),
    new Platform({x:image.width*37,y:470,image:image}),
    new Platform({x:image.width*38,y:470,image:image}),
    new Platform({x:image.width*39,y:470,image:image}),
    new Platform({x:image.width*40,y:470,image:image}),
    new Platform({x:image.width*41,y:470,image:image}),
    new Platform({x:image.width*42,y:470,image:image}),
    new Platform({x:image.width*43,y:470,image:image}),
    new Platform({x:image.width*44,y:470,image:image}),
    new Platform({x:image.width*45,y:470,image:image}),
    new Platform({x:image.width*46,y:470,image:image}),
    new Platform({x:image.width*47,y:470,image:image}),
    new Platform({x:image.width*48,y:470,image:image}),
    new Platform({x:image.width*49,y:470,image:image}),
    new Platform({x:image.width*50,y:470,image:image}),
    new Platform({x:image.width*51,y:470,image:image}),
    // new Platform({x:image.width*26+400,y:243,image:platformSmallTall}),
    new Platform({x:image.width*15+300,y:320,image:Astraunaut}),
    new Platform({x:image.width*19,y:300,image:Astraunaut}),
    new Platform({x:image.width*24,y:280,image:Astraunaut}),
    new Platform({x:image.width*26,y:260,image:Astraunaut}),
    new Platform({x:image.width*29,y:240,image:Astraunaut}),
    new Platform({x:image.width*31,y:220,image:Astraunaut}),
    new Platform({x:image.width*33,y:200,image:Astraunaut}),
    // new Platform({x:image.width*32,y:180,image:Astraunaut}),
    new Platform({x:image.width*47-100,y:180,image:Astraunaut}),
    new Platform({x:image.width*48,y:170,image:Astraunaut}),
    new Platform({x:image.width*50-100,y:160,image:Astraunaut}),   
]
scrollOffset =0;
}
function animate()
{
    // console.log(scrollOffset);
    requestAnimationFrame(animate)
    c.fillStyle= `white`
    c.fillRect(0,0,canvas.width,canvas.height);
    genericObjects.forEach((genericObject)=>{
        genericObject.draw();
    })
    platforms.map((platform)=>{
        platform.draw();
    })
    player.update();

    if(keys.right.pressed && player.position.x <400){
        console.log("right pressed")
        player.velocity.x =5 ;
    }
    else if(keys.left.pressed && player.position.x>100 || keys.left.pressed && scrollOffset==0 && player.position.x>0){
        player.velocity.x =-5;
    }
    else{

        player.velocity.x =0;
        if(keys.right.pressed)
        {
            scrollOffset+=5
            platforms.map((platform)=>{
                platform.position.x-=5; 
            })
            genericObjects.map((genericObject)=>{
                genericObject.position.x -=3
            })
        }
        else if(keys.left.pressed && scrollOffset > 0)
        {
            scrollOffset-=5
            platforms.map((platform)=>{
                platform.position.x +=5
            })
            genericObjects.map((genericObject)=>{
                genericObject.position.x +=3
            })
            
        }
        //win condition
        if(scrollOffset>2000)
        {
            // console.log("You Win");
        }
        //lose condition
        if(player.position.y > canvas.height)
        {
            // console.log("You lose");
            init();
        }

    }
    //paltform collision detection
    platforms.map((platform)=>{
    if(player.position.y +player.height <= platform.position.y && player.position.y+ player.height + player.velocity.y >= platform.position.y
        && player.position.x + player.width >= platform.position.x
        &&player.position.x <= platform.position.x + platform.width)
    {
        player.velocity.y=0;
    }
    else{

    }
    // weather-app 
    if(player.position.y==169.5 && (player.position.x>=320 && player.position.x<=400))
    {
        console.log(player.position.y +" "+ player.position.x+" ");
                document.getElementById('id').innerHTML=`<a href="https://github.com/BiswajeetRaut/Weather-App" target="blank">Weather App</a>`;
    }
    else{
        // redirect = false;
    // console.log(player.position.y +" "+ player.position.x+" ");
    document.getElementById('id').innerHTML="Link will Appear Here";
    }
    if(player.position.y==149.5 && (player.position.x>=320 && player.position.x<=400)&&redirect1==false)
    {
        console.log(player.position.y +" "+ player.position.x+" ");
        document.getElementById('id').innerHTML=`<a href="https://github.com/BiswajeetRaut/VIT-SHOP" target="blank">Weather App</a>`;
    }
    else{
        // redirect = false;
    // console.log(player.position.y +" "+ player.position.x+" ");

    }
    if(player.position.y==129.5 && (player.position.x>=320 && player.position.x<=400))
    {
        console.log(player.position.y +" "+ player.position.x+" ");
        document.getElementById('id').innerHTML=`<a href="https://github.com/BiswajeetRaut/V-academics" target="blank">V-Academics</a>`;
    }
    else{
        // redirect = false;
    // console.log(player.position.y +" "+ player.position.x+" ");

    }
    if(player.position.y==109.5 && (player.position.x>=320 && player.position.x<=400))
    {
        console.log(player.position.y +" "+ player.position.x+" ");
        document.getElementById('id').innerHTML=`<a href="https://github.com/BiswajeetRaut/V-chat" target="blank">V-Chat</a>`;
    }
    else{
        // redirect = false;
    // console.log(player.position.y +" "+ player.position.x+" ");

    }
    if(player.position.y==89.5 && (player.position.x>=320 && player.position.x<=400))
    {
        console.log(player.position.y +" "+ player.position.x+" ");
        document.getElementById('id').innerHTML=`<a href="https://github.com/BiswajeetRaut/marketplaceWeb3.0" target="blank">Web3.0 MarketPlace</a>`;
    }
    else{
        // redirect = false;
    // console.log(player.position.y +" "+ player.position.x+" ");

    }
    if(player.position.y==69.5 && (player.position.x>=320 && player.position.x<=400))
    {
        console.log(player.position.y +" "+ player.position.x+" ");
        document.getElementById('id').innerHTML=`<a href="https://github.com/BiswajeetRaut/DripMonitoring-System" target="blank">Drip Guardian</a>`;
        
    }
    else{
        // redirect = false;
    // console.log(player.position.y +" "+ player.position.x+" ");

    }
    if(player.position.y==49.5 && (player.position.x>=320 && player.position.x<=400))
    {
        console.log(player.position.y +" "+ player.position.x+" ");
        document.getElementById('id').innerHTML=`<a href="https://github.com/BiswajeetRaut/Organ-Oasis" target="blank">Organ-Oasis</a>`;
    }
    else{
        // redirect = false;
    // console.log(player.position.y +" "+ player.position.x+" ");

    }
    if(player.position.y==29.5 && (player.position.x>=320 && player.position.x<=400))
    {
        console.log(player.position.y +" "+ player.position.x+" ");
        document.getElementById('id').innerHTML=`<a href="https://github.com/BiswajeetRaut/" target="blank">Github</a>`;
    }
    else{
        // redirect = false;
    // console.log(player.position.y +" "+ player.position.x+" ");

    }
    if(player.position.y==19.5 && (player.position.x>=320 && player.position.x<=400))
    {
        console.log(player.position.y +" "+ player.position.x+" ");
        document.getElementById('id').innerHTML=`<a href="https://www.linkedin.com/in/biswajeet-raut-9b14b0267/" target="blank">LinkedIn</a>`;
    }
    else{
        // redirect = false;
    // console.log(player.position.y +" "+ player.position.x+" ");

    }
    if(player.position.y==9.5 && (player.position.x>=320 && player.position.x<=400))
    {
        console.log(player.position.y +" "+ player.position.x+" ");
        document.getElementById('id').innerHTML=`<a href="mailto:biswajeetraut382@gmail.com" target="blank">Mail Me</a>`;
    }
    else{
        // redirect = false;
    // console.log(player.position.y +" "+ player.position.x+" ");

    }
})
 
}
init();
animate();
window.addEventListener("keydown",({key})=>{
    // console.log(key);
    switch(key)
    {
        case 'ArrowUp':
            // console.log('ArrowUp Pressed');
            player.velocity.y -=10
            break
        case 'ArrowDown':
            // console.log('ArrowDown Pressed');

            break
        case 'ArrowLeft':
            // console.log('ArrowLeft Pressed');
            keys.left.pressed  = true;
            player.currentSprite = player.sprites.run.left
            player.currentCropWidth = player.sprites.run.cropWidth
            player.width = player.sprites.run.width
            break
        case 'ArrowRight':
            // console.log('ArrowRight Pressed');
            keys.right.pressed  = true;
            player.currentSprite = player.sprites.run.right
            player.currentCropWidth = player.sprites.run.cropWidth
            player.width = player.sprites.run.width
            break
        // default:
        //     console.log("Press correct keys to play");
    }
    // console.log(keys.left.pressed)
    // console.log(keys.right.pressed)
})
window.addEventListener("keyup",({key})=>{
    // console.log(key);
    switch(key)
    {
        case 'ArrowUp':
            // console.log('ArrowUp Pressed');
            // player.velocity.y-=10 f
            break
        case 'ArrowDown':
            // console.log('ArrowDown Pressed');
            break
        case 'ArrowLeft':
            // console.log('ArrowLeft Pressed');
            keys.left.pressed  = false;
            player.currentSprite= player.sprites.stand.left
            player.currentCropWidth = player.sprites.stand.cropWidth
            player.width = player.sprites.stand.width
            break
        case 'ArrowRight':
            // console.log('ArrowRight Pressed');
            keys.right.pressed  = false;
            player.currentSprite= player.sprites.stand.right
            player.currentCropWidth = player.sprites.stand.cropWidth
            player.width = player.sprites.stand.width
            break
    }
})
window.addEventListener("click",(e)=>{
    // console.log(e);
})
console.log(canvas);
canvas.addEventListener("click",(e)=>{
    // console.log(e);
});
document.getElementById('left').addEventListener('click',()=>{
    keys.left.pressed  = true;
    player.currentSprite = player.sprites.run.left
    player.currentCropWidth = player.sprites.run.cropWidth
    player.width = player.sprites.run.width
    setTimeout(() => {
        keys.left.pressed  = false;
    player.currentSprite= player.sprites.stand.left
    player.currentCropWidth = player.sprites.stand.cropWidth
    player.width = player.sprites.stand.width
    console.log('left');
    }, 500);

});
document.getElementById('right').addEventListener('click',()=>{
    keys.right.pressed  = true;
    player.currentSprite = player.sprites.run.right
    player.currentCropWidth = player.sprites.run.cropWidth
    player.width = player.sprites.run.width
    setTimeout(() => {
        keys.right.pressed  = false;
        player.currentSprite= player.sprites.stand.right
        player.currentCropWidth = player.sprites.stand.cropWidth
        player.width = player.sprites.stand.width
    console.log('right');
    }, 500);
});
document.getElementById('up').addEventListener('click',()=>{
    player.velocity.y -=10
})
