import React from "react"
import { useNavigate,Navigate } from "react-router-dom"
import { Form,Input,Button ,message} from "antd"
import './index.css'
import { getMenu } from "../../api"
const Login=()=>{
    const navigate=useNavigate()
    //Needs to redirect to the login page if not logged in
    if(localStorage.getItem('token')){
   return(<Navigate to='/home' replace/>)
    }
    const handleSubmmit=(val)=>{
        if(!val.password||!val.username){
            message.open(
                {
                    type:'warning',
                    content:'please input name and password'
                }
            )
        }
        getMenu(val).then((data)=>{
              console.log(data);
              localStorage.setItem('token',data.data.token)
              navigate('/home')
        })
    }
return(
    <Form className="login-container" onFinish={handleSubmmit}>
        <div className="login_title">System Login</div>
        <Form.Item label='account' name='username' className="el-input">
            <Input placeholder="Please enter your username"/>
        </Form.Item>
        <Form.Item label='password' name='password' className="el-input">
            <Input.Password placeholder="Please Input your pasword "/>
        </Form.Item>
        <Form.Item className="login-button">
            <Button type="primary" htmlType="submit">Login</Button>
        </Form.Item>
    </Form>
)
}

export default Login