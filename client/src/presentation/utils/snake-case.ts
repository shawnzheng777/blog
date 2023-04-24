export const toLineString = (name: string) => name.replace(/([A-Z])/g, '_$1').toLowerCase();

// 将传入对象的驼峰命名的键名都改为下划线格式
export const toSnakeCase = (obj: any) => {
  const res: any = {};
  Object.keys(obj).forEach((key) => {
    if (obj[key] instanceof Array) {
      res[toLineString(key)] = obj[key].map((item: any) => (item instanceof Object ? toSnakeCase(item) : item));
    } else if (obj[key] instanceof Object) {
      res[toLineString(key)] = toSnakeCase(obj[key]);
    } else {
      res[toLineString(key)] = obj[key];
    }
  });
  return res;
};
