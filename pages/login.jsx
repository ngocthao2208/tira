import LayoutLogin from "@/components/layouts/LayoutLogin";
import { CreateContext } from "@/context/ContextProviderGlobal";
import { loginUser } from "@/service/user";
import {
  GooglePlusOutlined,
  InstagramOutlined,
  TwitterOutlined,
} from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import { useRouter } from "next/router";
import React, { useContext, useState } from "react";

function Login() {
  const { errorNoti, userAuth } = useContext(CreateContext);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const redirectRegister = (path) => {
    router.push("/register");
  };
  const submit = async (e) => {
    setLoading(true);
    try {
      const { data } = await loginUser(e);
      localStorage.setItem("token", data.token);
      userAuth(true)
    } catch (error) {
      errorNoti("Vui lòng kiểm tra lại thông tin!");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <div className="my-5 font-[500] text-center text-[30px]">Đăng Nhập</div>
      <Form onFinish={submit}>
        <Form.Item
          name="email"
          rules={[
            { required: true, message: "Không được bỏ trống!" },
            { type: "email", message: "Bắt buộc email" },
          ]}
        >
          <Input size="large" placeholder="Email" className="round-[15px]" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Không được bỏ trống!" }]}
        >
          <Input.Password size="large" placeholder="Mật khẩu" />
        </Form.Item>
        <Button
          className="w-full !bg-primary !my-2 !font-medium !text-[white] !rounded-[20px]"
          size="large"
          htmlType="submit"
          loading={loading}
        >
          Đăng Nhập
        </Button>
        <span
          className="block text-right text-primary underline underline-offset-1 cursor-pointer font-medium"
          onClick={redirectRegister}
        >
          Đăng kí tài khoản
        </span>
      </Form>
    </div>
  );
}

export default Login;

Login.getLayout = function getLayout(page) {
  return <LayoutLogin>{page}</LayoutLogin>;
};
