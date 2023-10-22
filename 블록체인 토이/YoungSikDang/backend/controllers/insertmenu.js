const {Menus} = require("../models")

exports.insertMenu = async(req,res)=>{
 
    const {menuname , menuprice} = req.body;
    // console.log(menuname)
    // console.log(menuprice)
    // console.log(req.file.path);

    const data = await Menus.create({
        menu_img : req.file.path,
        menu_name : menuname,
        menu_price : menuprice,
    })

    res.send("메뉴 등록 완료");

}

exports.getMenu = async(req,res)=>{
    console.log("들어옴?");
    const data = await Menus.findAll({
        raw : true,
    })
    // console.log(data);
    res.json(data);
}