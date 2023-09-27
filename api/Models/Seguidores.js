import  DataTypes from "sequelize";


export default  (sequelize) => {
         sequelize.define('Seguidor',{
               idFollower : {  // primary Key
                   type : DataTypes.UUID,
                   primaryKey : true, 
                   allowNull : false, 
                   defaultValue : DataTypes.UUIDV4,
                   }, 
                fecha : { 
                     type : DataTypes.DATE,
                     defaultValue: DataTypes.NOW,
                }, 

         })
}


