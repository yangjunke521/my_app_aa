import axios from 'axios'
const actions= {
 /**
  * 获取单位这一类的-厂站类型的数据
  */
    getCZselectData({commit}, params) {
        let id = '7'
        http('GET', '../static/json/select_dcsj.json').then(data => {
            debugger
                console.log(data)
        })
    },
}
export default actions
