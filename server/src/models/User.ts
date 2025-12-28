import { DataTypes , Model} from 'sequelize';
import sequelize from '../config/db';
import Prompt  from './Prompt';
export class User extends Model {
    public id!: string;
    public name!: string;
    public phone!: string;
    public role!: 'admin' | 'user';
    public readonly history?: Prompt[];
}

User.init({
    id: {
        type:DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
        unique: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,

    },
     phone: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    role: {
        type: DataTypes.ENUM('admin', 'user'),
        defaultValue: 'user',
    },
    
},
 {
    sequelize,
    tableName: 'users',
});
export default User;

