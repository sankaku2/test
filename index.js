let countId; //スタート時の演出のclearIntervalのid
let answer; //問題の正解
let score = 0; //解けた問題数
let color = 2; //スタート時の色の閾値
let numberArr = [];
let correctAudio = new Audio("素数correct.mp3");
let errAudio = new Audio("素数err.mp3");
correctAudio.controls = true;
errAudio.controls = true;
const select = document.getElementById("select");
select.addEventListener("change", () => {
  if (select.value === "dark") {
    document.body.setAttribute("data-bs-theme", "dark");
  } else {
    document.body.setAttribute("data-bs-theme", "light");
  }
})

function exam() {
  let num = Math.trunc((Math.random() * 299) + 2);
  let bubble = num;
  numberArr = [];
  if (num % 2 === 0 || num % 3 === 0 || num % 5 === 0) {
    exam();
  } else {
    let k = 0;
    for (let i = 2; bubble >= i; i++) {
      if (bubble % i === 0) {
        bubble = bubble / i;
        numberArr[k] = i;
        i--;
        k++;
      }
      if (k === 1) {
        answer = "True";
      } else {
        answer = "False";
      }
      /*if (num % i === 0) {
        answer = "False";
        break;
      } else if (i === 2) {
        answer = "True";
        break;
      }*/
    }
    console.log(numberArr);
    document.getElementById("examDisplay").textContent = num;
  }

}

//始まるときのカウントダウンが表示される関数
function startDirection() {
  document.getElementById("main").style.display = "none";
  document.getElementById("header").style.display = "none";
  document.getElementById("startDisplay").classList.remove("d-none");
  countId = setInterval(function () {
    if (color == 0) {
      //
      document.getElementById("main").style.display = "";
      document.getElementById("header").style.display = "";
      document.getElementById("startDisplay").classList.add("d-none");
      //
      clearInterval(countId);
      //
      color = 2;
      score = 0;
      time = 180;
      document.getElementById("circle").textContent = "3";
      document.getElementById("time").textContent = `${time}`;
      document.getElementById("circle").classList.remove("color2", "color1");
      document.getElementById("circle").style.backgroundColor = "red";
      //
      exam();
      let timeId = setInterval(function () {
        time--;
        document.getElementById("time").textContent = `${time}`;
        if (time == 0) {
          //リザルト画面に切り替え
          document.getElementById("main").style.display = "none";
          document.getElementById("header").style.display = "none";
          document.getElementById("scoreDisplay").classList.remove("d-none");
          //スコアを書く
          document.getElementById("scoreBoard").textContent = `${score}`;
          //
          clearInterval(timeId);
        }
      }, 1000);
      return 0;
    }
    document.getElementById("circle").style.backgroundColor = "";
    document.getElementById("circle").classList.add(`color${color}`);
    document.getElementById("circle").textContent = `${color}`;
    color--;
  }, 1000);
}
//スタートボタンを押したときのイベントハンドラ
document.getElementById("startButton").addEventListener("click", function () {
  startDirection();
});

//リスタートボタンを押したときのイベントハンドラ
document.getElementById("restartButton").addEventListener("click", function () {
  document.getElementById("scoreDisplay").classList.add("d-none");
  startDirection();
});
//キーボードを押したときのイベントハンドラ
document.getElementById("T").addEventListener("click", function () {
  if (answer === "True") {
    score++;
    document.getElementById("answerCircle").classList.remove("d-none");
    correctAudio.currentTime = 0;
    correctAudio.play();
    answer = "";
    setTimeout(() => {
      document.getElementById("answerCircle").classList.add("d-none");
      exam();
    }, 1000);
  } else if (answer === "False") {
    document.getElementById("cross").classList.remove("d-none");
    errAudio.currentTime = 0;
    errAudio.play();
    answer = "";
    setTimeout(() => {
      document.getElementById("cross").classList.add("d-none");
      let string = "";
      for (const number of numberArr) {
        string += number + "×";
      }
      string = string.slice(0, -1);
      console.log(string);
      document.getElementById("examDisplay").textContent = string;
    }, 1000);
    setTimeout(() => {
      exam();
    }, 5000);
  }
});
document.getElementById("F").addEventListener("click", function () {
  if (answer === "False") {
    score++;
    document.getElementById("answerCircle").classList.remove("d-none");
    correctAudio.currentTime = 0;
    correctAudio.play();
    answer = "";
    setTimeout(() => {
      document.getElementById("answerCircle").classList.add("d-none");
      correctAudio.pause();
      exam();
    }, 1000);
  } else if (answer === "True") {
    document.getElementById("cross").classList.remove("d-none");
    errAudio.currentTime = 0;
    errAudio.play();
    answer = "";
    setTimeout(() => {
      document.getElementById("cross").classList.add("d-none");
      errAudio.pause();
      exam();
    }, 1000);
  }
});
