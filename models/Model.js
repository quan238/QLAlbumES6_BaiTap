export class Model {
    albumArr = [];
    constructor() {

    }
    //thêm album
    addNewalbum(newalbum) {
        this.albumArr.push(newalbum);
    }
    //lưu local
    savealbum() {
        let sAlbum = JSON.stringify(this.albumArr);
        localStorage.setItem('album', sAlbum);
    }
    // lấy local
    getalbum() {
        if (localStorage.getItem('album')) {
            let menu = JSON.parse(localStorage.getItem('album'));
            this.albumArr = menu;
        } else {
            this.albumArr = [];
        }
    }
    deleteAlbum(album) {
        let index = this.albumArr.findIndex((item) => item.id == album)
        // console.log(index);
        if (index !== -1) {
            this.albumArr.splice(index, 1);
        }
    }
    modifyAlbum(album) {
        let index = this.albumArr.findIndex((item) => item.id == album)
        // console.log(index);
        if (index !== -1) {
            return this.albumArr[index]

        }
    }
    //hàm lưu lại vị trí hiện tại của object cần thực hiện thao tác
    saveIndex(album) {
        let index = this.albumArr.findIndex((item) => item.id == album)
        return index;
    }

}