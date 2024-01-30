export function toHexString(byteArray: ArrayLike<number>) {
  return Array.prototype.map
    .call(byteArray, function (byte) {
      return ("0" + (byte & 0xff).toString(16)).slice(-2);
    })
       .join("");
}
