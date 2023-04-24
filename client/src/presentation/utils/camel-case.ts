export const toHumpString = (name: any) => name.replace(/_(\w)/g, (_all: any, letter: string) => letter.toUpperCase());

// 将传入对象的下划线格式键名都改为驼峰命名
export const toCamelCase = (obj: any) => {
  const res: any = {};
  Object.keys(obj).forEach((key) => {
    if (obj[key] instanceof Array) {
      res[toHumpString(key)] = obj[key].map((item: any) => (item instanceof Object ? toCamelCase(item) : item));
    } else if (obj[key] instanceof Object) {
      res[toHumpString(key)] = toCamelCase(obj[key]);
    } else {
      res[toHumpString(key)] = obj[key];
    }
  });
  return res;
};
