import request from '@/utils/request'

// get customer
export function getCustomer() {
  return request({
    url: '/api/v1/customer/',
    method: 'get'
  })
}
// get device state
export function getDeviceState() {
  return request({
    url: '/api/v1/robot/device_states/',
    method: 'get'
  })
}
// get arm list
export function getArms(params) {
  return request({
    url: `/api/v1/robot/arms/?${params.join('&')}`,
    method: 'get'
  })
}
