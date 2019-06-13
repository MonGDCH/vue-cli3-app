
/**
 * 侧边滑出弹层插件
 */
export default class Slider{
    /**
     * 构造方法
     */
    constructor(config){
        this.opts = {
            "direction": config.direction || "left",    // 弹出方向
            "distance": config.distance || "60%",       // 弹层宽度
            "dom": this.Q(config.dom),                  // 容器节点(必填)
            "time": config.time || "",                  // 自动关闭时间
            "maskClose": (config.maskClose + "").toString() !== "false" ? true: false,      // 点击遮罩关闭弹层
            "callback": config.callback || ""           // 关闭弹层时回调函数
        };
        this.rnd = this.rnd();
        this.dom = this.opts.dom[0];
        this.wrap = "";
        this.inner = "";
        this.mask = "";
        this.init()
    }

    /**
     * 获取dom
     */
    Q(dom){
        return document.querySelectorAll(dom)
    }

    /**
     * 是否移动端
     */
    isMobile(){
        return navigator.userAgent.match(/(iPhone|iPod|Android|ios)/i) ? true: false
    }

    /**
     * 绑定事件
     */
    addEvent(obj, event, fn){
        if(obj.attachEvent){
            obj.attachEvent("on" + event, fn)
        }
        else{
            obj.addEventListener(event, fn, false)
        }
    }

    /**
     * 随机数
     */
    rnd(){
        return Math.random().toString(36).substr(2, 6)
    }

    /**
     * 初始化
     */
    init(){
        var that = this;
        if(!that.dom){
            console.log("未正确绑定弹窗容器");
            return
        }
        var d = document.createElement("div");
        var e = document.createElement("div");
        var f = document.createElement("div");
        d.setAttribute("class", "mSlider-main ms-" + that.rnd);
        e.setAttribute("class", "mSlider-inner");
        f.setAttribute("class", "mSlider-mask");
        that.Q("body")[0].appendChild(d);
        that.Q(".ms-" + that.rnd)[0].appendChild(e);
        that.Q(".ms-" + that.rnd)[0].appendChild(f);
        that.wrap = that.Q(".ms-" + that.rnd)[0];
        that.inner = that.Q(".ms-" + that.rnd + " .mSlider-inner")[0];
        that.mask = that.Q(".ms-" + that.rnd + " .mSlider-mask")[0];
        that.inner.appendChild(that.dom);
        switch(that.opts.direction)
        {
            case "top":
                that.top = "0";
                that.left = "0";
                that.width = "100%";
                that.height = that.opts.distance;
                that.translate = "0,-100%,0";
                break;
            case "bottom":
                that.bottom = "0";
                that.left = "0";
                that.width = "100%";
                that.height = that.opts.distance;
                that.translate = "0,100%,0";
                break;
            case "right":
                that.top = "0";
                that.right = "0";
                that.width = that.opts.distance;
                // that.height = document.documentElement.clientHeight + "px";
                that.height = '100%'
                that.translate = "100%,0,0";
                break;
            default:
                that.top = "0";
                that.left = "0";
                that.width = that.opts.distance;
                // that.height = document.documentElement.clientHeight + "px";
                that.height = '100%'
                that.translate = "-100%,0,0"
        }
        that.wrap.style.display = "none";
        that.wrap.style.position = "fixed";
        that.wrap.style.top = "0";
        that.wrap.style.left = "0";
        that.wrap.style.width = "100%";
        that.wrap.style.height = "100%";
        that.wrap.style.zIndex = 99;
        that.inner.style.position = "absolute";
        that.inner.style.top = that.top;
        that.inner.style.bottom = that.bottom;
        that.inner.style.left = that.left;
        that.inner.style.right = that.right;
        that.inner.style.width = that.width;
        that.inner.style.height = that.height;
        that.inner.style.backgroundColor = "#fff";
        that.inner.style.transform = "translate3d(" + that.translate + ")";
        that.inner.style.webkitTransition = "all .2s ease-out";
        that.inner.style.transition = "all .2s ease-out";
        that.inner.style.zIndex = 100;
        that.mask.style.width = "100%";
        that.mask.style.height = "100%";
        that.mask.style.opacity = "0";
        that.mask.style.backgroundColor = "black";
        that.mask.style.zIndex = "98";
        that.mask.style.webkitTransition = "all .2s ease-out";
        that.mask.style.transition = "all .2s ease-out";
        that.mask.style.webkitBackfaceVisibility = "hidden";
        that.events()
    }

    /**
     * 打开弹层
     */
    open(){
        var that = this;
        that.wrap.style.display = "block";
        setTimeout(function(){
            that.inner.style.transform = "translate3d(0,0,0)";
            that.inner.style.webkitTransform = "translate3d(0,0,0)";
            that.mask.style.opacity = 0.5
        }, 30);
        if(that.opts.time){
            that.timer = setTimeout(function(){
                that.close()
            }, that.opts.time)
        }
    }

    /**
     * 关闭弹层
     */
    close(){
        var that = this;
        that.timer && clearTimeout(that.timer);
        that.inner.style.webkitTransform = "translate3d(" + that.translate + ")";
        that.inner.style.transform = "translate3d(" + that.translate + ")";
        that.mask.style.opacity = 0;
        setTimeout(function(){
            that.wrap.style.display = "none";
            that.timer = null;
            that.opts.callback && that.opts.callback()
        }, 300)
    }

    /**
     * 删除dom
     * @return {[type]} [description]
     */
    rm(){
        var that = this
        document.body.removeChild(that.wrap)
    }

    /**
     * 统一绑定事件
     */
    events(){
        var that = this;
        that.addEvent(that.mask, "touchmove", function(f){
            f.preventDefault()
        });
        that.addEvent(that.mask, (that.isMobile() ? "touchend": "click"), function(f){
            if(that.opts.maskClose){
                that.close()
            }
        })
    }
} 


