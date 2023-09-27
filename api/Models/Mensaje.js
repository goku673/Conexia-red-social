import DataTypes from "sequelize";


export default  (sequelize) => {
      sequelize.define("Mensaje", {
          idMessage : { 
             type : DataTypes.UUID,
             primaryKey : true,
             allowNull :false, 
             defaultValue : DataTypes.UUIDV4,
            },
            text : { 
                type : DataTypes.TEXT,
                allowNull: false,
            },
            date : {
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW,
            }
        
      })
}