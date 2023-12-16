import LayoutLogin from "@/components/layouts/LayoutLogin";
import { CreateContext } from "@/context/ContextProviderGlobal";
import { createUser } from "@/service/user";
import { Button, Form, Input } from "antd";
import { useRouter } from "next/router";
import React, { useContext, useState } from "react";

function Register() {
  const { errorNoti, successNoti } = useContext(CreateContext);
  const router = useRouter();
  const [loading, setLoading] = useState(false)
  const redirectLogin = () => {
    router.push("/login");
  };
  const createAccount = async (e) => {
    setLoading(true)
    const { confirm, ...datas } = e;
    try {
      await createUser(datas);
      successNoti('Đăng ký thành công')
      redirectLogin()
    } catch (error) {
      errorNoti('vui lòng kiểm tra lại thông tin!');
    } finally {
      setLoading(false)
    }
  };
  return (
    <div>
      <div className="my-5 font-[500] text-center text-[30px]">Quên Mật Khẩu</div>
      <Form onFinish={createAccount}>
        <Form.Item
          name="email"
          rules={[
            { required: true, message: "Không được bỏ trống!" },
            { type: "email", message: "Bắt buộc email" },
          ]}
        >
          <Input size="large" placeholder="Email" />
        </Form.Item>
        <Button
          className="w-full !bg-primary !text-[white] !my-3"
          size="large"
          htmlType="submit"
          loading={loading}
        >
          Gửi Code đến địa chỉ Email trên
        </Button>
        <span
          className="block text-right underline cursor-pointer underline-offset-1 text-primary font-medium"
          onClick={redirectLogin}
        >
          Đăng nhập
        </span>
      </Form>
    </div>
  );
}

export default Register;

Register.getLayout = function getLayout(page) {
  return <LayoutLogin>{page}</LayoutLogin>;
};
