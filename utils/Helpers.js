const fs = require("fs");

// single image
function uploadImageSingle(request, image) {
    if (image.mimetype == "image/png" || image.mimetype == "image/jpg" || image.mimetype == "image/jpeg") {
        let ext = image.mimetype.split("/")[1];
        const NewImgName = image.path + "." + ext;
        request.body.image = NewImgName;
        fs.rename(image.path, NewImgName, () => { console.log("uploaded") });
    } else {
        fs.unlink(image.path, () => { console.log("deleted") })
        return response.json({
            status: "not allowed"
        })
    }
}

// get day name by index
function getDayByIndex(index) {
    const weekday = ["sunday","monday","tuesday","wednesday","thursday","friday","saturday"];
    return weekday[index];
}

module.exports = {
    uploadImageSingle,
    getDayByIndex
}