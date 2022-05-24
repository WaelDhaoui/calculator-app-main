var items = document.querySelector(".items");

function changeColor(shadow1,shadow2,shadow3,firstC,secondC,thrC,fourC,fifhC,sixC,seventhC,eightC) {
    var last = items.children[3];
    document.body.style.backgroundColor = firstC;

    items.parentElement.previousElementSibling.style.color = secondC
    items.previousElementSibling.style.color = secondC
    items.style.backgroundColor = thrC;
    [...items.children].forEach(function(e) {
        e.style.color =secondC
    });
    last.style.backgroundColor = fourC

    document.querySelector("header > p").style.backgroundColor = thrC;
    document.querySelector("header > p").style.color = secondC

    document.querySelector("header > ul").style.backgroundColor = thrC;

    [...document.getElementsByClassName("num")].forEach(function(e) {
        e.style.color =secondC
        e.style.backgroundColor =fifhC;
        e.style.boxShadow = shadow1;
    });
    [...document.getElementsByClassName("sign")].forEach(function(e) {
        e.style.color =secondC
        e.style.backgroundColor =fifhC;
        e.style.boxShadow = shadow1;
    });

    document.getElementById("del").style.backgroundColor = sixC;
    document.getElementById("del").style.boxShadow = shadow2;
    document.getElementById("reset").style.backgroundColor = sixC;
    document.getElementById("reset").style.boxShadow = shadow2
    document.getElementById("result").style.backgroundColor = seventhC;
    document.getElementById("result").style.boxShadow = shadow3;

    document.querySelector("footer").style.color = eightC;
}

items.addEventListener("click",function() {
    var last = items.children[3];
    if(getComputedStyle(last,null).getPropertyValue("left") === "4px") {
        last.style.left = "21px";
        changeColor("0px 3px #b2a295","0px 3px #1c6166","0px 3px #853b1c","hsl(0, 0%, 90%)","#34352d","#d3cdcd","#c05227","#eae3db","#388187","#c75627","black");
        document.querySelector("header > p").style.backgroundColor = "hsl(0, 0%, 93%)";
        document.querySelector("header > ul").style.backgroundColor = "hsl(0, 5%, 81%)";
    }
    else if(getComputedStyle(last,null).getPropertyValue("left") == "21px") {
        last.style.left = "38px";
        changeColor("0px 3px #832b90","0px 3px #bf15f4","0px 3px #6dfaf1","hsl(268, 75%, 9%)","#ffe431","#1e0836","#10d8d8","#331b4d","#56077c","#00decf","white");

        document.getElementById("del").style.color = "#fff8ff";
        document.getElementById("reset").style.color = "#fff8ff";
    }
    else {
        last.style.left = "4px";
        changeColor("0px 3px #b2a295","0px 3px #424e76","0px 3px #a63a2d","hsl(222, 26%, 31%)","white","#252d44","#d23e34","#eae3db","#647299","#cf4030")

        document.querySelector("header > p").style.backgroundColor = "#181f32";

        [...document.getElementsByClassName("num")].forEach(function(e) {
            e.style.color ="#34352d";
        });
        [...document.getElementsByClassName("sign")].forEach(function(e) {
            e.style.color ="#34352d";
        });
    }
});

document.getElementById("reset").onclick = function() {
    document.querySelector("header > p").textContent = "0";
};

document.getElementById("del").onclick = function() {
    document.querySelector("header > p").textContent = document.querySelector("header > p").textContent.slice(0,document.querySelector("header > p").textContent.length - 1);
    if(document.querySelector("header > p").textContent == "")
    document.querySelector("header > p").textContent = "0";
};

[...document.querySelector("header > ul").children].forEach(function(ele) {
    if(ele.id != "reset" && ele.id != "result" && ele.id != "del") {
        ele.onclick = function() {
            var p = document.querySelector("header > p").textContent;
            if((p.slice(p.lastIndexOf("+")).includes(".") || p.slice(p.lastIndexOf("-")).includes(".") || p.slice(p.lastIndexOf("*")).includes(".") || p.slice(p.lastIndexOf("/")).includes(".") || (!isNaN(p) && p.includes("."))) && ele.textContent == ".") {
                alert("you can't put a comma twice");
            } else if((p.endsWith("+") || p.endsWith("-") || p.endsWith("*") || p.endsWith("/")) && ele.className == "sign") {
                alert("you can't put a sign twice");
            }
            else {
                if(document.querySelector("header > p").textContent == "0" && ele.className != "sign")
                    document.querySelector("header > p").textContent = ele.textContent;
                else {
                    document.querySelector("header > p").textContent += ele.textContent;
                }
            }
        }
    }
});

document.getElementById("result").onclick = function() {
    var p = document.querySelector("header > p").textContent;
    var res = 0;
    var  tNum = [],tSign = [];
    var i=0,j=0;
    do {
        if(p[i] == "+" || p[i] == "-" || p[i] == "x" || p[i] == "/") {
            tNum.push(p.slice(j,i));
            tSign.push(p[i]);
            j=i+1;
        }
        i++;
    }while(i<p.length);
    tNum.push(p.slice(j,i));
    if(tSign[0] == "+")
        res = +tNum[0] + +tNum[1];
    if(tSign[0] == "-")
        res = +tNum[0] - +tNum[1];
    if(tSign[0] == "x")
        res = +tNum[0] * +tNum[1];
    if(tSign[0] == "/")
        res = +tNum[0] / +tNum[1];
    for(let k=2,l=1; k<tNum.length,l<tSign.length; k++,l++) {
        if(tSign[l] == "+")
            res += +tNum[k];
        else if(tSign[l] == "-")
            res -= +tNum[k];
        else if(tSign[l] == "x")
            res = res * +tNum[k];
        else
            res = res / +tNum[k];
    }
    if(res.toString().includes("."))
        document.querySelector("header > p").textContent = res.toFixed(2);
    else
        document.querySelector("header > p").textContent = res
};