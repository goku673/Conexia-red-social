import  {DataTypes} from "sequelize";


export default  (sequelize) => {
         sequelize.define('Seguidor',{
               idFollower : {  // primary Key
                   type : DataTypes.UUID,
                   primaryKey : true, 
                   allowNull : false, 
                   defaultValue : DataTypes.UUIDV4,
                   }, 
                idUser : {
                    type : DataTypes.UUID,
                   }, 

                fecha : { 
                     type : DataTypes.DATE,
                     defaultValue: DataTypes.NOW,
                }, 
                idSeguidor : { 
                    type : DataTypes.UUID;
                }

         })
}


