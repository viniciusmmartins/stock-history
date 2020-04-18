import chalk from "chalk"

export const consoleColorfy =  (message,color) =>{
    try{
        console.log(chalk[color](message))
    }catch(err){
        console.log(message)
    }
}