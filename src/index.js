/*
 * @Author: saohui 
 * @Date: 2017-09-20 09:56:36 
 * @Last Modified by: saohui
 * @Last Modified time: 2017-09-22 16:52:16
 */
import React from 'react'
import GiApp from './gi'

let appCtx = null

/**
 * 
 * 单例
 * @return {obj} 对外只提供四个接口
 * {
 *   use
 *   model
 *   router
 *   start
 * }
 */
export default function Gi ( ops ) {
  appCtx = appCtx || new GiApp( ops )
  return {
    use: appCtx.use.bind( appCtx )
    ,model: appCtx.model.bind( appCtx )
    ,router: appCtx.router.bind( appCtx )
    ,start: appCtx.start.bind( appCtx )
  }
}

/**
 * 连接 state => 组件的 props
 * 
 * @export
 * @param {any} mapStateToProps 
 */
export function connect ( mapStateToProps ) {
  return function ( TagetComponent ) {
    return class Wrapper extends React.Component {

      constructor ( props ) {
        super( props )
        
        this.state = {}

        appCtx.addEventStateToProps( this.updateState.bind( this ))
      }

      updateState () {
        this.setState({})
      }

      render () {
        const props = mapStateToProps(
          // 防止原始值被修改
          Object.assign( appCtx.state )
        )
        return <TagetComponent dispatch={( action ) => { appCtx.dispatch( action ) }} { ...props } />
      }
    }
  }
}