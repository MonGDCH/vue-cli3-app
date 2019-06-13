# loadingbar 文档

### 配置参数:

#### 使用方式

```
loadingbar.config({
     percentNum: 0.1
})
```

|参数|说明|类型|可选择|默认值|
|:----|:---|:----- |:-----|-----|
|speed| 加载速度 | Number | 0-100 | 5 |
| easing | spinner加载动画 | String | linear, ease, cubic-bezier... | 贝萨尔曲线值|
| percentNum | 每次前进的百分比 |Float|0-1|Math.random()|
|showSpinner|是否显示spinner|Boolean|true, false| false|



### api接口:

#### start, 开始

```
loadingbar.start()
```

#### end, 结束

```
loadingbar.finish()
```

#### error, 错误结束

```
loadingbar.error()
```
