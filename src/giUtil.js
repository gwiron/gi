/*
 * @Author: saohui 
 * @Date: 2017-09-20 14:16:39 
 * @Last Modified by: saohui
 * @Last Modified time: 2017-09-23 11:55:53
 */
import events from 'events'

export default class GiUtil extends events.EventEmitter {

  /**
   * Perform all subscriptions immediately 
   * 
   * @param {any} subscriptions
   */
  emitSubscriptions ( subscriptions, ...params ) {
    for ( let namespace in subscriptions ) {
      let subscriptFns = subscriptions[ namespace ]
      for ( let key in subscriptFns ) {
        let subscriptFn = subscriptFns[ key ]
        
        subscriptFn( ...params )
  
      }
    }
  }  

  arrDeepFlattenL ( arr ) {
    const flatten = (arr)=> [].concat(...arr); return flatten(arr.map(x=>Array.isArray(x)? arrDeepFlattenL(x): x))
  }

  addEventOnFn ( type, fns ) {
    if ( !fns ) {
      return
    }

    fns = this.arrDeepFlattenL([ fns ])

    fns.forEach( fn => {
      this.on( type, fn )
    })
  }
}