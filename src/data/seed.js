const { execSync } = require('child_process')

const {
    DB_NAME
} = process.env;

try {
    execSync(`mongoimport --db ${DB_NAME} --collection posts --drop --file "${process.cwd()}/src/data/samples/posts.json" --jsonArray`)
} catch (error){
    console.error(error.message);
}
