/** image onto base64 */
export default function convertToBase64(file, blob) {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader(blob);
    fileReader.readAsDataURL(file);

    fileReader.onload = () => {
      resolve(fileReader.result);
    };

    fileReader.onerror = (error) => {
      reject(error);
    };
  });
}
