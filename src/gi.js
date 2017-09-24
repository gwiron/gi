/*
 * @Author: saohui 
 * @Date: 2017-09-22 16:20:57 
 * @Last Modified by: saohui
 * @Last Modified time: 2017-09-23 12:00:09
 */
import React from 'react'
import { render } from 'react-dom'
import PRedux from './pRedux'

let isStarted = false

let pages = {}
function register(pathname, page) {
  if (!pages[pathname]) {
    pages[pathname] = page
  } else {
    throw new Error(`"${pathname}" Already exist`)
  }
}

export default class GiApp extends PRedux {
  constructor ( ops ) {
    super()
    
    this.state = {}
    this.reducers = {}
    this.effects = {}
    this.subscriptions = {}


    let pathname = window.location.pathname
    //截取页面名字 /a/b.html ==> b.html
    let pageName = pathname.match(/(\/[\w\-]+\.(html|php)$)/)//tms中会有php的页面
    pageName = pageName && pageName[1] ? pageName[1] : null
    this.pageName = pageName


    ops && this.use( ops )
  }

  use ( ops ) {
    const typeofOps = typeof ops
    if ( typeofOps != 'object' && typeofOps == 'function' ) {
      throw 'Ops can only be object or function'
    }
    
    this.addEventOnAction( ops.onAction )
    this.addEventOnError( ops.onError )
    this.addEventOnStateChange( ops.onStateChange )
  }

  model ( item ) {

    if ( !item && typeof item != 'object' ) {
      console.warn('Model needs to be an object')
      return
    }
    
    const namespace = item.namespace

    if ( !namespace || namespace == '' ) {
      throw TypeError('Namespace can\'t empty')
    }

    /**
     * model register
     */
    this.state[ namespace ] = item.state || {}
    this.reducers[ namespace ] = item.reducers || {}
    this.effects[ namespace ] = item.effects || {}
    this.subscriptions[ namespace ] = item.subscriptions || {}
  }

  router ( registerRouter ) {

    if ( !registerRouter || typeof registerRouter != 'function' ) {
      throw TypeError('Model needs to be an function')
    }

    registerRouter( register )
  }

  start ( appDom ) {
    
    if ( isStarted ) {
      console.warn('Multiple start cannot be performed')
      return
    }
    isStarted = true

    /**
     * Perform all subscriptions immediately 
     */
    this.emitSubscriptions( this.subscriptions, 
      
                            { dispatch: this.dispatch.bind( this )}, 
                            ( e ) => { this.emit( this.EFFECT_OR_SUBSCR_ERROR, e )} )

                            
    const pageName = this.pageName
    let Page = pageName ? pages[pageName] : null
    , ResultComponent = null
    
    if ( !appDom ) {
      return Page
    }

    render( ResultComponent, document.querySelector( appDom ))
  }
}