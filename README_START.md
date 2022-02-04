Start json-server
npx json-server --watch -p 3030 db.json

Start server
npm run start

Install packages
npm install

In case I forgot
Use dispatch if you want to change reducer state.
Use useEffect with blank second parameter for componentDidMount.
Use useEffect with second parameter to fire a block of code if there is a change in the second parameter.
Don't put useEffect with conditional statements.
Use useSelector if you want to pull reducer valuse.
Use useState for your local variables.