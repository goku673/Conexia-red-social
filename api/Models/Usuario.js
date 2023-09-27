import { DataTypes} from "sequelize";

// vamo a implementar con clases  los modelos 


export default ( sequelize) => {

      sequelize.define('Usuario',{
            id :  { 
                type : DataTypes.UUID    , // es como declarar un typo de variable alfanumerico
                defaultValue : DataTypes.UUIDV4,
                primaryKey : true,
                allowNull : false,
               } , 
            name : {
                type :  DataTypes.STRING, 
                allowNull : false,
            },
            email : {
                type :  DataTypes.STRING,
                allowNull :false,
                unique : true,
            }, 
            password :  { 
                 type : DataTypes.STRING,
                 allowNull: false,
            },
            image: {
               type:DataTypes.BLOB,
            },
            date : {
                type: DataTypes.DATE,       // tipo de dato para la fecha 
                defaultValue: DataTypes.NOW, //da el valor de la fecha el que se creo ;
            }
      })
}



























