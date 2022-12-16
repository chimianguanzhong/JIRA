import React from "react";
import { useAuth } from "context/auth-context";
import { Form, Input } from "antd";
import { LongButton } from "unauthenticated-app/index";
import { useAsync } from "utils/use-async";

// interface Base {
//   id: number
// }
//
// interface Advance extends Base {
//   name: string
// }
//
// const test = (p: Base) => {
// }
//
// 鸭子类型(duck typing)：面向接口编程 而不是 面向对象编程
// const a = {id: 1, name: 'jack'}  // Base里面有的属性a都有
// test(a)  // 所以虽然test接收的是Base类型的参数，但是a比Base高级，所以a也可以被接收，这就是ts中的类型兼容
// const apiUrl = process.env.REACT_A PP_API_URL;

export const LoginScreen = ({
  onError,
}: {
  onError: (error: Error) => void;
}) => {
  const { login } = useAuth(); // 将发送post请求的login方法封装到useAuth hook 中
  const { run, isLoading } = useAsync(undefined, { throwOnError: true });

  // HTMLFormElement extends Element
  /**
   * ts中的类型兼容：
   * Element 有的类型 HTMLFormElement 一定有
   * HTMLFormElement 有的类型 Element 不一定有
   */
  const handleSubmit = async (values: {
    username: string;
    password: string;
  }) => {
    try {
      await run(login(values));
    } catch (e: any) {
      onError(e);
    }
  };

  // 编写表单
  return (
    // 获取表单里的数据 handleSubmit。表单提交的时候， form会给handleSubmit传递event，event就是HTMLFormElement类型
    <Form onFinish={handleSubmit}>
      <Form.Item
        name={"username"}
        rules={[{ required: true, message: "请输入用户名" }]}
      >
        <Input placeholder={"用户名"} type="text" id={"username"} />
      </Form.Item>
      <Form.Item
        name={"password"}
        rules={[{ required: true, message: "请输入密码" }]}
      >
        <Input placeholder={"密码"} type="password" id={"password"} />
      </Form.Item>
      <Form.Item>
        <LongButton loading={isLoading} htmlType={"submit"} type={"primary"}>
          登录
        </LongButton>
      </Form.Item>
    </Form>
  );
};
