import http from '../http'

function login(param: any) {
  return http.post('login', param)
}

/**
 * 获取验证码
 * @param phone 手机号
 */
function getCaptcha(): Promise<{ num: number }> {
  return http.get('login/getCaptcha')
}

function query(param: any) {
  return http.post('employee/query', param)
}

function register(param: any) {
  return http.post('register', param)
}

function reset(param: any) {
  return http.post('register/password/reset', param)
}

function getparmet() : Promise<Array<any>> {
  return http.get('role/getAll')
}

function update(param: any) {
  return http.post('employee/update', param)
}

function deleteple(param: any) {
  return http.post('employee/update/batch/delete', param)
}

export default {
  login,
  getCaptcha,
  query,
  register,
  reset,
  getparmet,
  update,
  deleteple
}
