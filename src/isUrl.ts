const URL_REG_STR: string =
  '^((https|http|ftp|rtsp|mms)?://)' +
  "?(([0-9a-z_!~*'().&=+$%-]+: )?[0-9a-z_!~*'().&=+$%-]+@)?" +
  '(([0-9]{1,3}.){3}[0-9]{1,3}' +
  '|' +
  "([0-9a-z_!~*'()-]+.)*" +
  '([0-9a-z][0-9a-z-]{0,61})?[0-9a-z].' +
  '[a-z]{2,6})' +
  '(:[0-9]{1,4})?' +
  '((/?)|' +
  "(/[0-9a-z_!~*'().;?:@&=+$,%#-]+)+/?)$"

export const isUrlHelper = (url: string): Boolean => {
  const reg = new RegExp(URL_REG_STR)
  return reg.test(url)
}
