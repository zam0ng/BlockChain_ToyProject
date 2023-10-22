const {DataTypes,Model} = require("sequelize");

class Orders extends Model{
    static init(sequelize){
        return super.init({
            buyer : {
                type : DataTypes.STRING,
                allowNull : null,
            },
            details : {
                type : DataTypes.STRING,
                allowNull : false,
            }
            
        },{
            sequelize,
            underscored : false,
            timestamps : true,
            modelName : "Orders",
            tableName : "orders",
            charset : "utf8",
            collate : "utf8_general_ci",
        })
    }
}

module.exports = Orders;