import request from '@/utils/request'

export function login(data) {
  const formData = new FormData()
  for (const key in data) {
    if (Object.hasOwnProperty.call(data, key)) {
      const value = data[key];
      formData.append(key, value)
    }
  }
  return request({
    url: '/api/v1/login/',
    method: 'post',
    data: formData
  })
}

export function getInfo(token) {
  return request({
    url: '/api/v1/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/api/v1/user/logout',
    method: 'post'
  })
}
