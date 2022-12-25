import * as path from "path";
import * as os from "os";
import * as fs from "fs";

const main = async () => {
  const pathToDownloads = path.join(os.homedir(), "Downloads");
  const files = await fs.promises.readdir(pathToDownloads);
  let filesCounter = 0;

  for (const file of files) {
    const filePath = path.join(pathToDownloads, file);
    const isFile = fs.lstatSync(filePath).isFile();
    if (isFile && file.trim()) {
      const fileExtension = path
        .extname(filePath)
        .toLowerCase()
        .replace(".", "");
      if (fileExtension.trim()) {
        filesCounter++;
        const isThereAnyFolderWithThisExtension = fs.existsSync(
          path.join(pathToDownloads, fileExtension)
        );
        if (!isThereAnyFolderWithThisExtension) {
          console.log("Creating folder for: " + fileExtension);
          await fs.promises.mkdir(path.join(pathToDownloads, fileExtension));
        }
        console.log("Moving file: " + file);
        fs.promises.rename(
          filePath,
          path.join(pathToDownloads, fileExtension, file)
        );
      }
    }
  }
  if (filesCounter === 0) {
    console.log("There are no files in your Downloads folder");
  }
};

main();
