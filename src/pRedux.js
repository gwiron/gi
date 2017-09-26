/*
 * @Author: saohui 
 * @Date: 2017-09-22 16:07:21 
 * @Last Modified by: saohui
 * @Last Modified time: 2017-09-26 08:43:18
 */
import 'babel-polyfill'

import jsonuri from 'jsonuri'
import GiUtil from './giUtil'

export default class PRedux extends GiUtil {

  MAP_STATE_TO_PROPS = 'MAP_STATE_TO_PROPS'
  BEFORE_ACTION = 'BEFORE_ACTION'
  STATE_CHANGE = 'STATE_CHANGE'
  EFFECT_OR_SUBSCR_ERROR = 'EFFECT_OR_SUBSCR_ERROR'

  async dispatch ( action ) {
    const type = action.type
    , namespace = type.split('/')[0]
    
    /**
     * 执行 分发 action 之前，执行 onAction
     */
    this.emit(  this.BEFORE_ACTION, 

                this.dispatch.bind( this ),
                this.getState.bind( this ) )

    /**
     * 优先处理 effect
     * 拥有 effect 的时候 不会进行 reducer 
     */
    const effect = jsonuri.get( this.effects, type ) || null
    
    if ( effect ) {
      ( async () => {
        try {
          await effect( action, {
            put: async ( action ) => {
              const typeing = action.type
              let retType = ''
              
              if ( typeing.indexOf('/') != -1 ) {
                if ( typeing.indexOf( namespace +'/') != -1 ) {
                  console.warn('[sagaEffects.put] '+ typeing +' should not be prefixed with namespace '+ namespace )
                }

                retType = typeing
              } else {
                retType = namespace +'/'+ typeing
              }
              
              await this.dispatch({ 
                ...action
                ,type: retType
              })
            }
            ,call: async ( callBack, ...args ) => {
              return await callBack.apply( null, args )
            }
            ,select: async ( getState ) => {
              return await getState( Object.assign( this.state ))
            }
          })
        } catch ( e ) {
          // Error unified processing effect => onError( e )
          this.emit( this.EFFECT_OR_SUBSCR_ERROR, e, this.dispatch.bind( this ))
        }
      })()
      return
    }


    /**
     * reducer 处理
     */
    const reducer = jsonuri.get( this.reducers, type ) || null

    if ( !reducer ) {
      console.warn('Dispatch\'s action has no qualified reducer')
      return
    }

    const stateing = jsonuri.get( this.state, namespace )
    
    const nextState = reducer( stateing, action )

    /**
     * 更新 state
     */
    jsonuri.set( this.state, namespace, nextState )
    
    this.emit( this.MAP_STATE_TO_PROPS )

    
    this.emit( this.STATE_CHANGE, this.getState.bind( this ))
  }

  addEventStateToProps ( mapStateToProps ) {
    mapStateToProps && this.on( this.MAP_STATE_TO_PROPS, mapStateToProps )
  }
  
  
  /**
   * hooks 订阅区
   * 
   */
  addEventOnAction ( onActions ) {
    this.addEventOnFn( this.BEFORE_ACTION, onActions )
  }
  addEventOnStateChange( onStateChanges ) {
    this.addEventOnFn( this.STATE_CHANGE, onStateChanges )
  }
  addEventOnError( onErrors ) {
    this.addEventOnFn( this.EFFECT_OR_SUBSCR_ERROR, onErrors )
  }


  getState () {
    return Object.assign( this.state )
  }
}