import { Result } from "./core";

enum FileReadingError {
  FILE_NOT_FOUND,
  FILE_NOT_READABLE,
  // ,,,
}

function readFile(path: string): Result<string, FileReadingError> {
  // ...

  return {
    ok: true,
    value: "file content",
  };
}

function printFile(path: string) {
  const result = readFile(path);

  if (!result.ok) {
    switch (result.error) {
      case FileReadingError.FILE_NOT_FOUND:
        console.log("File not found");
        return;
      case FileReadingError.FILE_NOT_READABLE:
        console.log("File not readable");
        return;
      default:
        return;
    }
  }

  console.log(result.value);
}
