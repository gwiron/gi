# gi-mini-dvajs

* gi 是基于 [dva](https://github.com/dvajs/dva/blob/master/README_zh-CN.md) 的代码组织方式 + redux 数据管理思想开发的一个多页面解决方案。
* 主要为了解决 dva 不够方便的多页面应用

## 特性

* 易学易用，对 dva 代码风格一致，api 差不多
* 轻量级，库非常小
* elm 概念：通过 reducers, effects 和 subscriptions 组织 model

## 如何开始

安装

```
npm install --save gi-mini-dvajs
```

引入

```
// es6
import Gi from 'gi-mini-dvajs'

const app = Gi()
```


## api

* Gi()
	* use
	* model
	* router
	* start
* connect

ps:

由于 api 和 dva 差不多，这边就不多介绍了，可以参考[《dva 入门：手把手教你写应用 》](https://github.com/sorrycc/blog/issues/8)

## api 和 dva 不同的地方

app.use 方法里面的钩子只实现了部分

```
app.use({
	onAction: 
	,onError: 
	,onStateChange: 
})
```

app.router 的不同，dva 是使用 react-router 模块来实现单页路由，我们是多 html 使用同一的入口形式，所以路由注册方式不一样（ [可以看我之前写的一篇博客，有说明同一入口的概念](http://www.jianshu.com/p/27f583c6daec) ）

```
import PageMoudle1 from 'PageMoudle1'
import PageMoudle2 from 'PageMoudle2'
import PageMoudle3 from 'PageMoudle4'

app.router(function ( register ) {

	register("/PageMoudle1.html", PageMoudle1)
	register("/PageMoudle2.html", PageMoudle2)
	register("/PageMoudle3.html", PageMoudle3)

})
```

connect，只实现了 mapStateToProps

## example

app.js

```
import Gi from 'gi-mini-dvajs'

// app.use()

app.router(function ( register ) {

	register("/my-test.html", MyTest)
})

app.module({
  namespace: 'count',
  state: {
    record: 0,
    current: 0,
  },
  reducers: {
    addCount (state) {
      const newCurrent = state.current + 1;
      return { ...state,
        record: newCurrent > state.record ? newCurrent : state.record,
        current: newCurrent,
      };
    },
    minus(state) {
      return { ...state, current: state.current - 1}
    },
  },
  effects: {
    async add(action, { select, call, put }) {
      console.log( await select(({ count }) => {
        return count
      }))
      await put({ type: 'minus' })
    },
  },
  subscriptions: {
    keyboardWatcher() {
      console.log('--> subscripttion' )
    }
  }
})

app.start('#root')
```

my-test.js
```
import React, { Component } from 'react'
import util from './lib/util'
import { connect } from 'gi-mini-dvajs'

class MyTest extends Component {
  render () {
    const { count, dispatch } = this.props
    return <div >
       <h1>count.current ---> { count.current }</h1>
       <div style={{
         height: 200
         ,backgroundColor: 'red'
       }} onClick={() => {
         console.log( 'click')
         dispatch({type: 'count/add'})
      }}></div>
     </div>
  }
}


function mapStateToProps ( state ) {
  return state
}
export default connect( mapStateToProps )( MyTest )
```