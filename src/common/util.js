/**
 * 工具函数集
 */
export default class Util
{
    /**
     * 设置HTML文档标题
     *
     * @param  string   title 标题
     * @return {[type]}       [description]
     */
    static documentTitle = (title) => {
        if(title){
            window.document.title = title;
        }
    }
}