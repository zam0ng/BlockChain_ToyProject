const {DataTypes, Model} = require("sequelize");

class Menus extends Model{
    static init(sequelize){
        return super.init({
            menu_img : {
                type : DataTypes.STRING,
                allowNull : false,
            },
            menu_name : {
                type : DataTypes.STRING,
                allowNull : false,
            },
            menu_price : {
                type : DataTypes.STRING,
                allowNull : false,
            }

        },{
            sequelize,
            underscored : false,
            timestamps : true,
            modelName : "Menus",
            tableName : "menus",
            charset : "utf8",
            collate : "utf8_general_ci"
        })  
    }
}

module.exports = Menus;