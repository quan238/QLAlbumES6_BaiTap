import {
    Album
} from "/models/Album.js"
import {
    Model
} from "../models/Model.js"

//tạo object model từ MODEL 
let model = new Model();
model.getalbum();
// let album = [];

//button thêm album 
document.getElementById("btnThemAlbum").onclick = (event) => {

    let albumDetail = new Album;
    let arrInput = document.querySelectorAll('.form-group input,.form-control');

    for (let input of arrInput) {
        let value = input.value;
        let id = input.id;

        let temp = '';
        albumDetail = {
            ...albumDetail,
            [id]: value,
        }

    }

    //hàm filter dùng để set alert mỗi khi add biến trùng
    var done = true;
    (model.albumArr.filter((value, index, arr) => {
        for (let temp in value) {
            if (value[temp] == albumDetail["name"]) {
                alert("Ton Tai Gia Tri Name");
                clear();
                done = false;
            }
        }
        return;
    }))

    // nếu done false thì không add 
    if (done) {
        // hàm for each dùng để set ID riêng biệt cho mỗi object 
        model.albumArr.forEach((o, i) => o.id = i + 1);
        model.addNewalbum(albumDetail);
        model.savealbum();
        createAlbum();
    }
}

// render Album
const createAlbum = () => {
    let cardAlbum = '';
    for (let album of model.albumArr) {
        cardAlbum += ` 
        <div class="col-md-4">
            <div class="card mb-4 box-shadow">
                <div class="reponsive-img"   style="background-image: url(${album.src});">
            </div>
        <div class="card-body">
                <h3>${album.name}</h3>
                <p class="card-text">${album.description}</p>
                <p class="card-text">${album.type}</p>
         <div class="d-flex justify-content-between align-items-center">
            <div class="btn-group">
                <button type="button"  onclick="modifyAlbum(${album.id}); saveIndex(${album.id});" class="btn btn-success text-white btn-sm btn-outline-secondary mr-2">Chỉnh sửa</button>
                <button type="button" onclick="deleteAlbum(${album.id})" class="btn btn-danger text-white btn-sm btn-outline-secondary">Xóa</button>
            </div>
        </div>
        </div>
      </div>
      </div>
      `
    }
    document.getElementById("addalbum").innerHTML = cardAlbum;
}

//nếu không tồn tại gì trong album thì createAlbum
if (document.getElementById("addalbum")) {
    createAlbum();
}

//hàm deleteALbum 
window.deleteAlbum = (srcAlbum) => {

    model.deleteAlbum(srcAlbum);
    model.savealbum();
    //set lại ID cho object mỗi khi xóa
    model.albumArr.forEach((o, i) => o.id = i + 1);
    createAlbum();

}

// onclick chỉnh sửa album 
window.modifyAlbum = (a) => {
    //gán modifyA giá trị object hiện tại
    let modifyA = model.modifyAlbum(a)
    let arrInput = document.querySelectorAll('.form-group input,.form-control');
    for (let toInput in modifyA) {
        //duyêt vào object modifyA vòng lặp
        for (let input of arrInput) {
            //cho vòng lặp chạy từ input
            let id = input.id;
            //nếu id của object trùng với id của ô trong input
            if (input.id == toInput) {
                //hiển thị lên object hiện tại lên input
                document.getElementById(id).value = modifyA[toInput];
                break;
            }
        }
    }

    disabledBtn("btnCapNhatAlbum")
    EnabledBtn("btnThemAlbum");
}


let indexChange = -1;
// hàm lấy vị trí của object hiện tại 
window.saveIndex = (a) => {
    indexChange = model.saveIndex(a);
}

//hàm update 
document.getElementById("btnCapNhatAlbum").onclick = (event) => {

    event.preventDefault();

    let arrInput = document.querySelectorAll('.form-group input,.form-control');
    let albumDetail = new Album;

    model.savealbum();
    model.albumArr.forEach((o, i) => o.id = i + 1);
    createAlbum();

    for (let input of arrInput) {
        let value = input.value;
        let id = input.id;

        let temp = '';
        albumDetail = {
            ...albumDetail,
            [id]: value,
        }
    }

    let done = true;
    //filter mảng chứa dữ liệu album 
    (model.albumArr.filter((value, index, arr) => {
        for (let temp in value) {
            // dùng hàm lặp trong object để lặp từng ID
            /* nếu giá trị name trong mảng album = với giá trị trong object 
            của object add vào và vị trí hiện tại của mảng khác với vị trí của object cần chỉnh sưaã thì alert*/
            // vị trí khác vì để có thể chỉnh được giá trị của chính nó
            if (value["name"] == albumDetail["name"] && index != indexChange) {
                alert("Ton Tai Gia Tri Name");
                clear();
                done = false;
                return;
            } else if ((value["description"] != albumDetail["description"] ||
                    value["src"] != albumDetail["src"] ||
                    value["type"] != albumDetail["type"]) && index != indexChange && value["name"] != albumDetail["name"]) {
                done = true;
                return
            }

        }
    }))
    // nếu hàm trên chưa chạy thì -> 
    if (done) {
        model.albumArr.splice(indexChange, 1);
        //cập nhật lại ID 
        model.albumArr.forEach((o, i) => o.id = i + 1);
        model.addNewalbum(albumDetail);
        model.savealbum();
        createAlbum();
        clear();
        EnabledBtn("btnCapNhatAlbum");
        disabledBtn("btnThemAlbum");
    }
}

//clear value trong input
function clear() {
    let input = document.querySelectorAll('.form-group input');
    input.forEach(input => input.value = '');
}

function disabledBtn(x) {
    document.getElementById(x).disabled = false;
}

function EnabledBtn(x) {
    document.getElementById(x).disabled = true;
}

// createAlbum();