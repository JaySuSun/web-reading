import http from '../utils/httpRequest'
// 查询全部发布的招聘列表
export const getRecruit = (params: any) => {
  return http.get('/prms/home/recruit/list', params)
}

// 查询招聘公司详情
// 查询全部发布的招聘列表
export const getCompany = (params: any) => {
  return http.post('/job-admin/company/page4Terminal', params)
}
// 查询公司详情
export const getCompanyDeatil = (params: any) => {
  return http.post('/job-admin/company/detail4Terminal', params)
}
//查询公司下的招聘
export const getCompanyRecruitList = (params: any) => {
  return http.post('/job-admin/company/recruit/page4Terminal', params)
}
// 账号密码登录
export const loginApi = (params: any) => {
  return http.post('/prms/login', params)
}
// 获取身份证件号码
export const getIdRead = () => {
  return http.get('/prms/idRead')
}
// 根据身份证件查询用户信息
export const cardLogin = (params: any) => {
  return http.post('/prms/cardLogin', params)
}
//投递简历
export const postDeliver = (params: any) => {
  return http.post('/prms/deliver', params)
}
