export default function () {
  function sayHello(name) {
    return `Hi ${name}. This message is from \nmodule composable`
  }
  return {
    sayHello,
  }
};
