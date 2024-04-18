const sql=require("mysql");
// const dotenv=require("dotenv").config();
const db=sql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'sql_login'
});
// db.connect((err) => {
//     if (err) {
        
//         console.log(err);
//         throw err;
//     } 
//     console.log("Database connected");
// });
module.exports=db;