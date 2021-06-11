//ambil semua elemen html
const selectBox = document.querySelector('.select-box'),
    selectBtnX = selectBox.querySelector('.options .playerX'),
    selectBtnO = selectBox.querySelector('.options .playerO'),
    playBoard = document.querySelector('.play-board'),
    players = document.querySelector('.players'),
    allBox = document.querySelectorAll('section span'),
    resultBox = document.querySelector('.result-box'),
    wonText = resultBox.querySelector('.won-text'),
    replayBtn = resultBox.querySelector('button');

window.onload = () => {
    //once window loaded
    for (let i = 0; i < allBox.length; i++) {
        //menambahkan atribun onclick pada semua attribut span
        allBox[i].setAttribute('onclick', 'clickedBox(this)');
    }
};

selectBtnX.onclick = () => {
    selectBox.classList.add('hide'); //sembunyikan select box
    playBoard.classList.add('show'); //tampilkan playboard section
};

selectBtnO.onclick = () => {
    selectBox.classList.add('hide'); //sembunyikan select box
    playBoard.classList.add('show'); //tampilkan playboard section
    players.setAttribute('class', 'players active player'); //set class attribute pada elemen players active player value
};

let playerXIcon = 'fas fa-times'; //ambil nama kelas dari font awesome (X)
let playerOIcon = 'far fa-circle'; //ambil nama kelas dari font awesome (O)
let playerSign = 'X'; //ini adalah variabel global karena kita akan menggunakannya di dalam banyak function
let runBot = true; //kita gunakan variabel ini untuk menghentikan bot apabila salah satu player memenangkan game atau draw

// user click function
function clickedBox(element) {
    if (players.classList.contains('player')) {
        playerSign = 'O'; //jika player memilih (O) maka ubah player ke user O
        element.innerHTML = `<i class="${playerOIcon}"></i>`; //menambahkan elemen circle yang didapat dari font awesome untuk dimasukkan pada box element
        players.classList.add('active'); ///menambahkan class active pada player
        element.setAttribute('id', playerSign); //set id attribute pada span/box dengan playerSign
    } else {
        element.innerHTML = `<i class="${playerXIcon}"></i>`; //menambahkan elemen silang yang didapat dari font awesome untuk dimasukkan pada box element
        players.classList.add('active'); //menambahkan class active pada player
        element.setAttribute('id', playerSign); //set id attribute pada span/box dengan playerSign
    }
    selectWinner(); //panggil fungsi selectWinner
    element.style.pointerEvents = 'none'; //setelah player memilih box apa saja maka box itu tidak dapat diklik lagi
    playBoard.style.pointerEvents = 'none'; //tambahkan pointerEvents 'none' ke playboard sehingga pengguna tidak dapat langsung mengklik box lain sampai bot memilih
    let randomTimeDelay = (Math.random() * 1000 + 200).toFixed(); //generate nomor acak sehingga bot akan secara acak menunda untuk memilih box yang tidak dipilih
    setTimeout(() => {
        bot(); //panggil fungsi bot
    }, randomTimeDelay); //passing random delay value
}

// bot auto select function
function bot() {
    let array = []; //array kosong untuk menyimpan box value yang belum di click
    if (runBot) {
        //jika runBot bernilai true maka lakukan...
        playerSign = 'O'; //jika playerSign memilih O
        for (let i = 0; i < allBox.length; i++) {
            if (allBox[i].childElementCount == 0) {
                //if the box/span has no children means <i> tag
                array.push(i); //masukkan number/index box yang belum di click ke dalam array
            }
        }
        let randomBox = array[Math.floor(Math.random() * array.length)]; //dapatkan random index dari array maka bot akan memilih box yang kosong (belum dipilih)
        if (array.length > 0) {
            //jika nilai array lebih besar dari 0
            if (players.classList.contains('player')) {
                playerSign = 'X'; //jika player memilih O maka bot memilih X
                allBox[randomBox].innerHTML = `<i class="${playerXIcon}"></i>`; //tambahkan icon silang di dalam element select bot
                players.classList.remove('active'); //hapus active class in players
                allBox[randomBox].setAttribute('id', playerSign); //set id attribute pada span/box dengan pilihan player
            } else {
                allBox[randomBox].innerHTML = `<i class="${playerOIcon}"></i>`; //tambahkan icon circle di dalam element select bot
                players.classList.remove('active'); //hapus active class in players
                allBox[randomBox].setAttribute('id', playerSign); //set id attribute pada span/box dengan pilihan player
            }
            selectWinner(); //panggil selectWinner function
        }
        allBox[randomBox].style.pointerEvents = 'none'; //setelah bot memilih box apa pun maka player tidak dapat mengklik box itu
        playBoard.style.pointerEvents = 'auto'; //tambahkan pointerEvents secara otomatis di playboard sehingga player dapat mengklik lagi pada box
        playerSign = 'X'; //jika player memilih X maka bot akan memilih O
    }
}

function getIdVal(classname) {
    return document.querySelector('.box' + classname).id; //return id value
}
function checkIdSign(val1, val2, val3, sign) {
    //check semua id nilainya sama dengan sign (X atau O) atau tidak, jika ya maka return true
    if (
        getIdVal(val1) == sign &&
        getIdVal(val2) == sign &&
        getIdVal(val3) == sign
    ) {
        return true;
    }
}
function selectWinner() {
    //jika salah satu kombinasi menang berikut cocok maka pilih pemenangnya
    if (
        checkIdSign(1, 2, 3, playerSign) ||
        checkIdSign(4, 5, 6, playerSign) ||
        checkIdSign(7, 8, 9, playerSign) ||
        checkIdSign(1, 4, 7, playerSign) ||
        checkIdSign(2, 5, 8, playerSign) ||
        checkIdSign(3, 6, 9, playerSign) ||
        checkIdSign(1, 5, 9, playerSign) ||
        checkIdSign(3, 5, 7, playerSign)
    ) {
        runBot = false; //berikan nilai false ke runBot agar tidak berjalan lagi
        bot(); //panggil bot function
        setTimeout(() => {
            //setelah pertandingan dimenangkan oleh seseorang kemudian sembunyikan playboard section dan tampilkan result box setelah 700ms
            resultBox.classList.add('show');
            playBoard.classList.remove('show');
        }, 700); //1s = 1000ms
        wonText.innerHTML = `Player <p>${playerSign}</p> pemenangnya!`; //tampilkan pemenang playerSign (X or O)
    } else {
        //jika semua box/elemen memiliki nilai id dan masih tidak ada yang menang maka pertandingan seri
        if (
            getIdVal(1) != '' &&
            getIdVal(2) != '' &&
            getIdVal(3) != '' &&
            getIdVal(4) != '' &&
            getIdVal(5) != '' &&
            getIdVal(6) != '' &&
            getIdVal(7) != '' &&
            getIdVal(8) != '' &&
            getIdVal(9) != ''
        ) {
            runBot = false; //berikan nilai false ke runBot agar tidak berjalan lagi
            bot(); //panggil bot function
            setTimeout(() => {
                //setelah pertandingan draw, sembunyikan playboard section dan tampilkan result box setelah 700 ms
                resultBox.classList.add('show');
                playBoard.classList.remove('show');
            }, 700); //1s = 1000ms
            wonText.textContent = 'Match has been drawn!'; //tampilkan text draw
        }
    }
}

replayBtn.onclick = () => {
    window.location.reload(); //reload page jika replay button diclick
};
