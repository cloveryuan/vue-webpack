import xhr from './xhr/'
import { rootPath, rootPathCore } from './xhr/config'

/**
 * 用户认证所用到的 API
 */
class SlidesService {

  /**
   * 检测当前用户是否已经登录
   * @resolve {Object} userData / null
   */
  loadData (errFun) {
    return xhr({
      url: rootPath + '/mgets?skuIds=J_954086&type=1',
      localUrl: '/data/slidesData.json',
      errFun: errFun
    })
  }
}

// 实例化后导出，全局单例
export default new SlidesService()
