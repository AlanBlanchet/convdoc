const { exec } = require("child_process");

const args = process.argv.slice(2);
const m = args.length == 0 ? console.log("No git message set") : args[0];
const gitM = m ? ` - ${m}` : "";

console.log("Staging to git");
exec("git add .", (err, o) => {
  console.log(o);
  console.log(
    `Committing with message "${process.env.npm_package_version}${gitM}"`
  );
  exec(
    `git commit -m "${process.env.npm_package_version}${gitM}"`,
    (err, o) => {
      console.log(o);
      console.log("Pushing to github...");
      exec(`git push`, (err, o) => {
        console.log(o);
        console.log("Done !");
      });
    }
  );
});