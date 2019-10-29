<template>
  <div class="logincontent">
    <div class="centerTabs">
      <h1>西安咸阳国际机场能源预付费系统</h1>
      <p>Energy Prepayment System of Xianyang Intermational Airport in Xi’an</p>
    </div>
    <div class="ivu-card">
          <h4>登录</h4>
          <Form class="formInline" ref="formInline" :model="formInline" :rules="ruleInline" inline>
            <FormItem prop="user">
                <Input type="text" v-model="formInline.user" placeholder="请输入用户名">
                </Input>
            </FormItem>
            <FormItem prop="password">
                <Input type="password" v-model="formInline.password" placeholder="请输入密码">
                </Input>
            </FormItem>
            <FormItem>
                <Checkbox v-model="single" style="color:#fff;">记住密码</Checkbox>
                <a class="wjPass" href="javascript:;">忘记密码?</a>
            </FormItem>
            <FormItem>
                <Button class="loginButton" type="primary" @click="handleSubmit('formInline')">登录</Button>
            </FormItem>
        </Form>

    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data () {
    return {
      RememberPassword: false,
      single:'',
      formInline: {
        user: "",
        password: ""
      },
      ruleInline: {
        user: [{ required: true, message: "请填写用户名", trigger: "blur" }],
        password: [
          { required: true, message: "请填写密码", trigger: "blur" },
          {
            type: "string",
            min: 6,
            message: "密码长度不能小于6位",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    handleSubmit (name) {
      var _this = this;
      if (!_this.formInline.user) {
        _this.$Message.error("用户名不能为空!");
        return;
      }
      if (!_this.formInline.password) {
        _this.$Message.error("密码不能为空");
        return;
      }

      this.$router.push('/');
      return;

      let parameter = {
        username: _this.formInline.user,
        password: _this.formInline.password
      };

      },
    lookpasswordss () {
      this.lookpassword = !this.lookpassword;
    }
  }
};
</script>
<style scoped lang="less">
.logincontent {
  width: 100vw;
  height: 100vh;
  background-image: url('../assets/image/bj.png');
  background-repeat: no-repeat;
  background-size: 100%;
  background-position: top center;
  position: relative;
  img {
    width: 70vw;
    margin: 0;
    padding: 0;
  }
  .centerTabs {
    width: 100vw;
    padding: 0 40px 0 20px;
    height: 40.6vh;
    background: rgba(255, 255, 255, .3);
    position: absolute;
    top: calc(34vh - 15px);
    padding-left: 6vw;
    h1{
      font-size: 44px;
      color: #fff;
      margin-top: 14vh;
    }
    p{
      font-size: 21px;
      color: #fff;
      padding: 1vh 0;
    }
  }
  .ivu-card {
   position: absolute;
    width: 26.3vw;
    border-left: 1px solid #ccc;
    height: 30vh;
    top: calc(44vh - 55px);
    right: 27vw;
    padding-left: 5vw;
    background: rgba(0,0,0,0);
    box-shadow: none;
    h4{
      text-align: center;
      font-size: 28px;
      color:#fff;
    }
    .formInline{
      width:100%;
      height:90%;
      .ivu-input-group-prepend{
        padding:0;
      }
    }
  }
  .recCheck{
    P{
      color:#eee;
      width:50%;
      float:left;
      &:hover{
        cursor: pointer;
      }
      &:last-child{
        float:right;
        text-align: right;
        text-decoration: underline #eee;
      }
    }
  }
  .ivu-form-inline .ivu-form-item {
      display: block;
  }
  .wjPass{
    float:right;
    text-decoration: underline!important;
    color:#fff;
  }
  .loginButton{
    width: 400px;
    height: 46px;
    background:#00c1e0;
    border:1px solid #00c1e0;
    font-size:20px;
    color:#fff;
  }
}
</style>