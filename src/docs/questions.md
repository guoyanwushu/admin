* 组装菜单
  根据oa的菜单，是以children嵌套的方式返回的数据，所以自己写了一个menu-item, 来循环生成菜单
* 菜单组装出来了，但是级联关系是错误的，展开一个子项菜单所有菜单都会展开，关闭一个子项菜单所有菜单都会关闭?
    传入到menu-item的index属性不唯一
* 组装的菜单每一个都是激活状态?
  是因为传入到sub-menu-item的index没有值或者值是一样的，必须保证传到el-submenu和el-menu-item的值总是不一样
* router-view 不显示了， 啥子情况?
  实际上是router.js定义的组件名没对， 在跳转向对应路由时，组件没加载出来
* 路由对应视图的刷新?如果是普通的页面，调用location.reload()就可以实现页面刷新，但是如果是vue的组件呢?怎么实现刷新操作?
  实现思路是跳转向一个中转路由， 然后在中转路由里又跳回来，注意要使用 this.$router.replace,这样子历史记录里就不会有中转路由的记录。还有情况，如果路由是在keep-alive包裹的,刚刚的操作并不会有效，推测是
  keep-alive的优先级比较高，要使keep-alive包裹的组件里能够刷新，可以先通过keep-alive的include排除掉刷新路由，然后replace，重新跳转的时候再加回include
* 如果需要某个对象，不妨先去上下文瞅一瞅，说不定就已经有需要的东西了
* 针对那种固定在tab栏的， 比如首页，这种需要先加入到visitedViews里面去， 然后路由加载成功了之后，还得去定位到那个路由?
    根据meta.fix 先将固定路由加到visitedViews里面去， 然后路由构建完成后 执行一次 push 操作
* tab右键的close now 关闭当前标签页并打开visitedViews里面最后一个标签生效， 怎么把代码移到 tab右边关闭标签的处理事件里头就不生效了呢? 费解!!!

    很扯淡的原因，给小叉叉绑定关闭函数的时候没有阻止冒泡， 导致click冒泡到了 router-link上面去， 前脚刚刚关了当前路由， router-link的点击又触发了打开当前路由，所以就是刚刚那种问题
* v-if 使用要慎重，如果selectTag.meta.fix , 如果selectTag 是个空， 那么就会报错
* 考虑如下情景, \<test-item v-for="item in names">\</test> 根据names的值，遍历生成test-item组件，然后在其中一个test-item中，把这个组件对应的item中删掉， 然后执行后续的逻辑。现在问题就来了，在把item从
    names移除掉之后， 由于是动态渲染， 这个test-item就莫得了 ，但是里面还有未完成的逻辑，然后数据居然tm的变了


