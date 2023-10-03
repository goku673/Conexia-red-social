const { DataTypes } = require('sequelize');

module.exports =(sequelize) => {
  sequelize.define ("Emoticon", {
              idEmoticon: {
                type : DataTypes.UUID,
                primaryKey: true, 
                allowNull : false, 
                defaultValue : DataTypes.UUIDV4,
              },
              typeEmoticon : {
                //type : DataTypes.ENUM("corazon"),    
                type : DataTypes.STRING,
              }
              
         })
} 
