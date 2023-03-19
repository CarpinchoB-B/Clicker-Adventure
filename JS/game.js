"use strict";

import {attack, music, click, win, death, buy, dmg_magic, boost_dmg_magic} from "./sound.js";

let damage = 1;
let enemyNumber = 0;
let time = 0;
let timeIncrease = 0;
let clicked = false;
let isSoundOn = true;
let isTipOn = 0;
let isAbility = true;
let increasedMoney = 0;
let increase = [1,5,25,125,625,3125,15625];
let enemyHealth = [100,300,600,1800,5200,15600,46180,138540,415620,1246860];
let healthCurrentEnemy = enemyHealth[0];

const fightArea = document.getElementById("Game");
const testDamage = document.getElementById("TestDamage");
const shop = document.getElementById("Shop");
const shopBuy = document.getElementsByClassName("section_buy");
const options = document.getElementById("LevelOptions");
const soundOn = document.getElementById("soundon");
const soundOff = document.getElementById("soundoff");
const musicOff = document.getElementById("musicoff");
const musicOn = document.getElementById("musicon");
const darktheme = document.getElementById("night");
const lighttheme = document.getElementById("day");
const tip = document.getElementById("tip");
const money = document.getElementById('money');
const enemyForeground = document.getElementById('enemy_img');

let myMoney = money.textContent;

const Enemies = new Array();
Enemies.push('enemy/1.webp');
Enemies.push('enemy/2.webp');
Enemies.push('enemy/3.webp');
Enemies.push('enemy/4.webp');
Enemies.push('enemy/5.webp');
Enemies.push('enemy/6.webp');
Enemies.push('enemy/7.webp');
Enemies.push('enemy/8.webp');
Enemies.push('enemy/9.webp');
Enemies.push('enemy/10.webp');

function IncreaseMoney()
{
    myMoney = money.textContent;
    myMoney = Number(myMoney) + 1 + increasedMoney;
    money.textContent = myMoney;
    console.log("I am here");
}

let moneyInterval;
moneyInterval = setInterval(()=>
{
    IncreaseMoney();
},1000);

const tips = new Array();
tips.push(document.getElementById("Ability1Tip"));
tips.push(document.getElementById("Ability2Tip"));
tips.push(document.getElementById("GameTip"));
tips.push(document.getElementById("GameArrowTip"));
tips.push(document.getElementById("GameTextTip"));

const upgradeTip = document.getElementsByClassName("upgradeTip");
const upgradeTipArrow = document.getElementsByClassName("upgradeTipArrow");
const upgradeTipText = document.getElementsByClassName("upgradeTipText");
const optionTipsArrow = document.getElementsByClassName("options_arrow");
const optionTipsText = document.getElementsByClassName("options_tip_text");

const weapons = new Array();
weapons.push(document.getElementById("WeakSword"));
weapons.push(document.getElementById("Sword"));
weapons.push(document.getElementById("StrongSword"));
weapons.push(document.getElementById("WeakAxe"));
weapons.push(document.getElementById("WeakShield"));
weapons.push(document.getElementById("StrongShield"));
weapons.push(document.getElementById("StrongAxe"));

tip.addEventListener("click",()=>
{
    isTipOn++;
    if(isTipOn % 2 === 0)
    {
        for(let i = 0;i < tips.length;i++)
        {
            tips[i].style.visibility = "visible";
        }
        for(let i = 0;i < optionTipsArrow.length;i++)
        {
            optionTipsArrow[i].style.visibility = "visible";
        }
        for(let i = 0;i < optionTipsText.length;i++)
        {
            optionTipsText[i].style.visibility = 'visible';
        }
        for(let i = 0;i < upgradeTip.length;i++)
        {
            upgradeTip[i].style.visibility = 'visible';
            upgradeTipArrow[i].style.visibility = 'visible';
            upgradeTipText[i].style.visibility = 'visible';
        }
        tip.style.background = "rgb(113, 182, 113)";
    }
    else
    {
        for(let i = 0;i < tips.length;i++)
        {
            tips[i].style.visibility = "hidden";
        }
        for(let i = 0;i < optionTipsArrow.length;i++)
        {
            optionTipsArrow[i].style.visibility = "hidden";
        }
        for(let i = 0;i < optionTipsText.length;i++)
        {
            optionTipsText[i].style.visibility = 'hidden';
        }
        for(let i = 0;i < upgradeTip.length;i++)
        {
            upgradeTip[i].style.visibility = 'hidden';
            upgradeTipArrow[i].style.visibility = 'hidden';
            upgradeTipText[i].style.visibility = 'hidden';
        }
        tip.style.background = "none";
    }
})

darktheme.addEventListener("click",()=>
{
    darktheme.style.background = 'rgb(113, 182, 113)';
    lighttheme.style.background = 'rgb(159, 167, 212)';
    fightArea.style.background = 'url(\'../backgrounds/night.jpg\')';
    fightArea.style.backgroundSize = '100% 100%';
});

lighttheme.addEventListener("click",()=>
{
    lighttheme.style.background = 'rgb(113, 182, 113)';
    darktheme.style.background = 'rgb(159, 167, 212)';
    fightArea.style.background = 'url(\'../backgrounds/day.jpg\')';
    fightArea.style.backgroundSize = '100% 100%';
});

musicOff.addEventListener("click",()=>
{
    music.pause();
    musicOff.style.background = 'rgb(113, 182, 113)';
    musicOn.style.background = 'rgb(159, 167, 212)';
});

musicOn.addEventListener("click",()=>
{
    music.play();
    musicOn.style.background = 'rgb(113, 182, 113)';
    musicOff.style.background = 'rgb(159, 167, 212)';
});

soundOn.addEventListener("click",function()
{
    isSoundOn = true;
    soundOn.style.background = 'rgb(113, 182, 113)';
    soundOff.style.background = 'rgb(159, 167, 212)';
});

soundOff.addEventListener("click",function()
{
    isSoundOn = false;
    soundOff.style.background = 'rgb(113, 182, 113)';
    soundOn.style.background = 'rgb(159, 167, 212)';
});

shop.addEventListener("click",()=>
{
    if(buy.paused == true && isSoundOn == true)
    {
        click.play();
    }
});

options.addEventListener("click",()=>
{
    if(buy.paused == true && isSoundOn == true)
    {
        click.play();
    }
});

for(let i = 0;i < shopBuy.length;i++)
{
    shopBuy[i].addEventListener("click",()=>
    {
        let price = weapons[i].textContent;
        if(myMoney >= Number(price))
        {
            money.textContent = myMoney - price;
            damage += i + 1;
            console.log(money.textContent);
            increasedMoney += increase[i];
            price = Number(price) * 1.2;
            weapons[i].textContent = parseInt(price,10);
            if(isSoundOn)
            {
                buy.play();
            }
        }
    });
}

function DealDamage(damage)
{
    if(isSoundOn == true)
    {
        attack.play();
    }
    if(Number(testDamage.value) > 0)
    {
        let hp = Number(testDamage.value);
        if(hp - damage <= 0)
        {
            if(enemyNumber > 9)
            {
                console.log("You win");
                enemyNumber = 0;
            }
            enemyNumber++;
            healthCurrentEnemy = enemyHealth[enemyNumber];
            enemyForeground.src = Enemies[enemyNumber];
            testDamage.value = healthCurrentEnemy;
        }
        else
        {
            hp-=damage;
            testDamage.value = hp;
        }
    } 
}

function UseAbility(time)
{
    let interval;
    if(time === 0)
    {
        if(isSoundOn == true)
        {
            dmg_magic.play();
        }
        console.log('U used ur ability');
        DealDamage(50);
        interval = setInterval(() => {
            time++;
            console.log(time);
            if(time === 10)
            {
                time = 0;
                clearInterval(interval);
                console.log("U can use ur ability");
                clicked = false;
            }
        }, 1000);
    }
}

fightArea.addEventListener("click",function()
{
    DealDamage(damage);
});

document.addEventListener("keydown",function(event)
{
    if(event.key === " " && clicked === false)
    {
        clicked = true;
        UseAbility(time);
    }
    else if(event.key === "f" && isAbility == true || event.key === "F" && isAbility == true)
    {
        let interval;
        let damageInterval;
        let test = 0;
        isAbility = false;
        if(timeIncrease === 0)
        {
            if(isSoundOn == true)
            {
                boost_dmg_magic.play();
            }
            let prevDamage = damage;
            damage*=3;
            interval = setInterval(() => {
                timeIncrease++;
                console.log(timeIncrease);
                if(timeIncrease === 3)
                {
                    timeIncrease = 0;
                    clearInterval(interval);
                    damage = prevDamage;
                }
            }, 1000);
        }
        damageInterval = setInterval(()=>
        {
            timeIncrease++;
            if(timeIncrease === 10)
            {
                timeIncrease = 0;
                clearInterval(damageInterval);
                isAbility = true;
            }
        }, 1000);
    }
});