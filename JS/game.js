"use strict";

let damage = 1;
let enemyNumber = 1;
let time = 0;
let timeIncrease = 0;
let clicked = false;

const fightArea = document.getElementById("Game");
const testDamage = document.getElementById("TestDamage");


function DealDamage(damage)
{
    if(Number(testDamage.value) > 0)
    {
        let hp = Number(testDamage.value);
        if(hp - damage <= 0)
        {
            if(enemyNumber > 10)
            {
                console.log("You win");
                enemyNumber = 1;
            }
            enemyNumber++;
            testDamage.value = "100";
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
    else if(event.key === "f" || event.key === "F")
    {
        let interval;
        console.log("I am here");
        if(timeIncrease === 0)
        {
            let prevDamage = damage;
            damage*=3;
            console.log('U used ur increase');
            interval = setInterval(() => {
                timeIncrease++;
                console.log(timeIncrease);
                if(timeIncrease === 3)
                {
                    timeIncrease = 0;
                    clearInterval(interval);
                    console.log("U can use ur increase");
                    damage = prevDamage;
                }
            }, 1000);
        }
    }
});