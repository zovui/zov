<template>
    <div class="date-demo">
        <p> 单选 </p>
        日：
        <DatePicker
            autofocus
            placeholder="日"
            v-model="a1"
            format="YYYY年MM月DD日"
        />
        月：
        <DatePicker
            placeholder="月"
            type="month"
            v-model="a2"
        />
        年：
        <DatePicker
            placeholder="年"
            type="year"
            v-model="a3"
        />
        <p> 多选 </p>
        日：
        <DatePicker
            multiple
            placeholder="日"
            v-model="d1"
        />
        月：
        <DatePicker
            multiple
            placeholder="月"
            type="month"
            v-model="d2"
        />
        年：
        <DatePicker
            multiple
            placeholder="年"
            type="year"
            v-model="d3"
        />
        周：
        <DatePicker
            multiple
            placeholder="周"
            type="week"
            format="YY年，第W周"
            v-model="d4"
        />
        <div style="border: 3px dashed; text-align: left; margin: 15px;padding: 15px">
            <h3>参数</h3>
            <p>@v-model         必传，Array || String，组件输出的值</p>
            <p>@format          非必传，Date类型，可以根据下面表格对照组合format后的日期string</p>
            <p>@multiple        非必传，Boolean，多选，默认:false</p>
            <p>@no-arrow        非必传，Boolean，drop容器的尖角，默认:true</p>
            <p>@placeholder     非必传，String，placeholder，默认:''</p>
            <p>@autofocus       非必传，Boolean，自动获取焦点，默认:false</p>
            <p>@disabled        非必传，Boolean，disabled，默认:false</p>
            <h3>回调事件</h3>
            <p>@on-change       组件drop呼出、收起的回调，形参：Boolean</p>
            <p>@on-open-change  组件值发生变化后的回调，形参：单选【当前所选项的item】，多选【已选所有项的items】</p>
            <h3>补充说明</h3>
            <p style="color: red">
                <b>组件对数据的处理分为parse和format两部分</b>
                <b>1、parse</b>
                <br>v-model接收的值为date类型，date格式应该遵循js原生格式，也就是说能被 Date 对象验证通过的字符串。
                <br>例如：
                <br>new Date('2019.12.11')
                <br>new Date('2019/12/11')
                <br>new Date('2019-12-11')
                <br>因此组件接受默认值得数据格式应该如下：
                <br>'2019-11'
                <br>'2019'
                <br>'19'
                <br>'2019-2-03'
                <br>['2011-05-06', '2012-06-09']
                <br>......
                <br>
                <b>2、format</b>
                <br>组件可以通过设置format字段自由组合date字符串，作为组件的输出。
                <br>例如
                <br>YYYY年MM月DD日，2019年12月20日
                <br>YYYY=MM=DD，2019=12=20
                <br>开发者也可以通过on-change事件的回调中对dayjs对象进行format
            </p>
            <b>format 格式：</b>
            <table>
                <thead>
                <tr>
                    <th width="100">格式</th>
                    <th width="100">输出</th>
                    <th>描述</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td><code>YY</code>
                    </td>
                    <td>18</td>
                    <td>两位数的年份</td>
                </tr>
                <tr>
                    <td><code>YYYY</code>
                    </td>
                    <td>2018</td>
                    <td>四位数的年份</td>
                </tr>
                <tr>
                    <td><code>M</code>
                    </td>
                    <td>1-12</td>
                    <td>月份，从 1 开始</td>
                </tr>
                <tr>
                    <td><code>MM</code>
                    </td>
                    <td>01-12</td>
                    <td>月份，两位数</td>
                </tr>
                <tr>
                    <td><code>MMM</code>
                    </td>
                    <td>Jan-Dec</td>
                    <td>简写的月份名称</td>
                </tr>
                <tr>
                    <td><code>MMMM</code>
                    </td>
                    <td>January-December</td>
                    <td>完整的月份名称</td>
                </tr>
                <tr>
                    <td><code>D</code>
                    </td>
                    <td>1-31</td>
                    <td>月份里的一天</td>
                </tr>
                <tr>
                    <td><code>DD</code>
                    </td>
                    <td>01-31</td>
                    <td>月份里的一天，两位数</td>
                </tr>
                <tr>
                    <td><code>d</code>
                    </td>
                    <td>0-6</td>
                    <td>一周中的一天，星期天是 0</td>
                </tr>
                <tr>
                    <td><code>dd</code>
                    </td>
                    <td>Su-Sa</td>
                    <td>最简写的一周中一天的名称</td>
                </tr>
                <tr>
                    <td><code>ddd</code>
                    </td>
                    <td>Sun-Sat</td>
                    <td>简写的一周中一天的名称</td>
                </tr>
                <tr>
                    <td><code>dddd</code>
                    </td>
                    <td>Sunday-Saturday</td>
                    <td>一周中一天的名称</td>
                </tr>
                <tr>
                    <td><code>H</code>
                    </td>
                    <td>0-23</td>
                    <td>小时</td>
                </tr>
                <tr>
                    <td><code>HH</code>
                    </td>
                    <td>00-23</td>
                    <td>小时，两位数</td>
                </tr>
                <tr>
                    <td><code>h</code>
                    </td>
                    <td>1-12</td>
                    <td>小时, 12 小时制</td>
                </tr>
                <tr>
                    <td><code>hh</code>
                    </td>
                    <td>01-12</td>
                    <td>Hours, 12 小时制, 两位数</td>
                </tr>
                <tr>
                    <td><code>m</code>
                    </td>
                    <td>0-59</td>
                    <td>分钟</td>
                </tr>
                <tr>
                    <td><code>mm</code>
                    </td>
                    <td>00-59</td>
                    <td>分钟，两位数</td>
                </tr>
                <tr>
                    <td><code>s</code>
                    </td>
                    <td>0-59</td>
                    <td>秒</td>
                </tr>
                <tr>
                    <td><code>ss</code>
                    </td>
                    <td>00-59</td>
                    <td>秒 两位数</td>
                </tr>
                <tr>
                    <td><code>SSS</code>
                    </td>
                    <td>000-999</td>
                    <td>毫秒 三位数</td>
                </tr>
                <tr>
                    <td><code>Z</code>
                    </td>
                    <td>+5:00</td>
                    <td>UTC 的偏移量</td>
                </tr>
                <tr>
                    <td><code>ZZ</code>
                    </td>
                    <td>+0500</td>
                    <td>UTC 的偏移量，数字前面加上 0</td>
                </tr>
                <tr>
                    <td><code>A</code>
                    </td>
                    <td>AM PM</td>
                    <td></td>
                </tr>
                <tr>
                    <td><code>a</code>
                    </td>
                    <td>am pm</td>
                    <td></td>
                </tr>
                </tbody>
            </table>
<pre>
    format 是矫正时间格式的依赖，开发者需要保证给组件传入默认的value格式是遵循format规定的。
    默认：
    YYYY
    YYYY-MM
    YYYY-MM-DD
    YYYY-WW
    YYYY hh
    YYYY hh:mm
    YYYY hh:mm:ss
</pre>
        </div>
    </div>
</template>
<script>
export default {
    data () {
        return {
            a1: '2019-03-10',
            a2: '2019-02',
            a3: '2019-02',
            d1: ['2019-03-10', '2019-03-11'],
            d2: ['2019-01', '2019-02'],
            d3: ['2019-02', '2018'], // 从第一项可以看出有值矫正
            d4: ['2019-09']
        }
    }
}
</script>
<style scoped lang="scss">
    .date-demo{
        display: block;
    }
</style>
